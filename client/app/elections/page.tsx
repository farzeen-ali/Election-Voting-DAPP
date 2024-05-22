"use client";
import React from "react";
import { BiPlus } from "react-icons/bi";
import ElectionFormDialog from "@/components/ElectionFormDialog";
import { contract } from "@/lib/thirdweb";
import { prepareEvent } from "thirdweb";
import { useContractEvents } from "thirdweb/react";
import ElectionCard from "@/components/ElectionCard";
import { useRouter } from "next/navigation";

const preparedEvent = prepareEvent({
  signature:
    "event ElectionCreated(uint indexed electionId, string name, string description, uint startTime, uint endTime)",
});

const ElectionPage = () => {
  const router = useRouter();
  // we need to fetch ElectionCreated
  const { data: event } = useContractEvents({
    contract,
    events: [preparedEvent],
  });

  return (
    <div className="bg-zinc-50 h-screen pt-28 px-28">
      <div className="grid grid-cols-4 gap-5">
        <ElectionFormDialog>
          <div className="h-[200px] border bg-white border-slate-300 shadow-md rounded-[8px] cursor-pointer hover:bg-slate-100 transition-all hover:-translate-y-[0.1rem] flex items-center justify-center">
            <BiPlus size={100} />
          </div>
        </ElectionFormDialog>
        {event?.map((item, i) => {
          return (
            <ElectionCard onClick={() => {router.push(`elections/${item.args.electionId}`)}} key={item.args.electionId} election={item.args} />
          );
        })}
      </div>
    </div>
  );
};

export default ElectionPage;
