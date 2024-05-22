import React, { HTMLAttributes } from 'react';
import { FaRegCalendarAlt } from "react-icons/fa";
type ElectionType = {
    electionId: bigint,
    name: string,
    description: string,
    startTime: bigint,
    endTime: bigint
}
interface ElectionCardProps extends HTMLAttributes<HTMLDivElement>{
    election: ElectionType
}

const ElectionCard = ({election, ...props}:ElectionCardProps) => {
    const {electionId, name, description, startTime, endTime} = election;
    const startDateJS = new Date(Number(startTime) * 1000).toISOString();
    const endDateJS = new Date(Number(endTime) * 1000).toISOString();

  return (
    <div {...props}
        key={electionId}
              className="h-[200px] border relative border-slate-300 shadow-md rounded-[8px] cursor-pointer hover:bg-slate-100 transition-all hover:-translate-y-[0.1rem]"
            >
              <h1 className="font-bold text-center text-2xl border w-full absolute left-[50%] -translate-x-[50%] top-5">
                {name}
              </h1>
              <h2 className="w-full text-center text-muted-foreground absolute left-[50%] -translate-x-[50%] top-16">
                {description}
              </h2>
              <div className="w-full absolute left-4 top-20 gap-2 text-muted-foreground flex flex-col">
                <h3 className="flex gap-2 items-center text-sm">
                  <FaRegCalendarAlt /> Start Date: {startDateJS}
                </h3>
                <h3 className="flex gap-2 items-center text-sm">
                  <FaRegCalendarAlt /> End Date: {endDateJS}
                </h3>
              </div>
            </div>
  );
}

export default ElectionCard;
