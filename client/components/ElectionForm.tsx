'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useSendTransaction } from "thirdweb/react"
import { PreparedTransaction, prepareContractCall } from "thirdweb"
import { contract } from "@/lib/thirdweb"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  electionName: z.string().min(2).max(50),
  electionDescription: z.string().min(2).max(50),
  electionStartDate: z.coerce.date(),
  electionEndDate: z.coerce.date(),
})

export default function ElectionForm() {
  const { toast } = useToast();
   // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      electionName: "",
      electionDescription: "",
      electionStartDate: new Date(), // Current date
      electionEndDate: new Date(), // Current date
    },
  })

  const { mutateAsync: sendTransaction } = useSendTransaction();
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { electionName: _name, electionDescription: _description, electionStartDate: _startTime, electionEndDate: _endTime } = values;
    // Convert JS DateTime Object To UNIX
    const _startEpoch = BigInt(Math.floor(new Date(_startTime).getTime() / 1000));
    const _endEpoch = BigInt(Math.floor(new Date(_endTime).getTime() / 1000));

    // Validate the times
    if (_startEpoch >= _endEpoch) {
      toast({
        title: "Error",
        description: "Start time must be before end time",
        variant: "destructive",
      });
      return;
    }

    const transaction = prepareContractCall({
      contract,
      method: 'createElection',
      params: [_name, _description, _startEpoch, _endEpoch],
    }) as PreparedTransaction;

    try {
      const data = await sendTransaction(transaction);
      toast({
        title: "Election Created Successfully!!!",
        variant: 'default',
      });
    } catch (error) {
      toast({
        title: "Ooopss Error!",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="electionName"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Election Name <span className={cn("text-black", { 'hidden': !fieldState.invalid })}>*</span></FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Please enter the name of the election.
              </FormDescription>
              {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="electionDescription"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Election Description <span className={cn("text-black", { 'hidden': !fieldState.invalid })}>*</span></FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Please provide a description for the election.
              </FormDescription>
              {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="electionStartDate"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Start Date <span className={cn("text-black", { 'hidden': !fieldState.invalid })}>*</span></FormLabel>
              <FormControl>
                <Input type="date" {...field} value={field.value instanceof Date ? field.value.toISOString().substring(0, 10) : field.value} />
              </FormControl>
              <FormDescription>
                Please select the start date of the election.
              </FormDescription>
              {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="electionEndDate"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>End Date <span className={cn("text-black", { 'hidden': !fieldState.invalid })}>*</span></FormLabel>
              <FormControl>
                <Input type="date" {...field} value={field.value instanceof Date ? field.value.toISOString().substring(0, 10) : field.value} />
              </FormControl>
              <FormDescription>
                Please select the end date of the election.
              </FormDescription>
              {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
