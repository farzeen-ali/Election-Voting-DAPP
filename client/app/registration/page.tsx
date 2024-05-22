'use client';
import { Button } from '@/components/ui/button'
import React from 'react'
import { useActiveAccount } from 'thirdweb/react'
import { PreparedTransaction, prepareContractCall, resolveMethod } from "thirdweb"
import { useSendTransaction } from "thirdweb/react";
import { contract } from '@/lib/thirdweb';
import { useReadContract } from "thirdweb/react";
import { cn } from '@/lib/utils';
 
 
const RegistrationPage = () => {
  const activeAccount = useActiveAccount();
 
  const { mutateAsync: sendTransaction } = useSendTransaction();
 
  const { data, isLoading } = useReadContract({
    contract,
    method: ("voters"),
    params: [activeAccount?.address as string]
  });
 
  console.log(data);
 
  const handleRegisterClick = async () => {
    const transaction = prepareContractCall({
      contract,
      method: ("registerVoter"),
      params: [activeAccount?.address]
    }) as PreparedTransaction;
 
    sendTransaction(transaction)
      .then((data) => { console.log("Transaction successful") })
      .catch((error :Error) => { console.log("Transaction failed", error.message) });
  }
 
 
  return (
    <div>
      <div className='bg-zinc-300 h-screen border border-black flex items-center justify-center flex-col gap-4'>
        {
          data?.[0] ? (<>
          <p className='font-bold text-3xl bg-slate-200 px-3 py-3 rounded-[8px] shadow-md'>{activeAccount?.address}</p>
        <p className='text-xl font-semibold'>You are a <span className='bg-green-300'>registered voter</span>!</p>
        </>) : (<>
          <Button className={cn('', {'disabled bg-black-400': !activeAccount?.address})} onClick={handleRegisterClick}>
          Register As a Voter!
        </Button></>)
        }
       
       
      </div>
    </div>
  )
}
 
export default RegistrationPage