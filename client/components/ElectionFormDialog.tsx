import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ElectionForm from "./ElectionForm";


interface ElectionFormDialogProps{
  children: React.ReactNode;
}

export default function ElectionFormDialog({children}: ElectionFormDialogProps) {
  return (
    <Dialog>
  <DialogTrigger>{children}</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create a new Election</DialogTitle>
      <ElectionForm/>
    </DialogHeader>
  </DialogContent>
</Dialog>

  )
}
