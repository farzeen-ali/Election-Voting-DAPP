'use client'
import { navLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useActiveAccount } from "thirdweb/react";
import { Customtooltip } from "./CustomTooltip";

const Sidebar = () => {
  const pathName = usePathname();
  const activeAccount = useActiveAccount();

  return (
    <div className='fixed top-1/2 -translate-y-1/2 left-6 bg-blue-900 text-white rounded-lg py-6 px-4 shadow-xl'>
      <ul className='flex flex-col items-center space-y-2 text-lg'>
        {
          navLinks.map((item, i) => {
            if(item.name === 'Admin' && !activeAccount) return null;
            return (
              <li key={i} className={cn("group cursor-pointer border-l-4 border-transparent transition-all duration-300 hover:border-blue-300 hover:translate-x-2", {'text-blue-300': pathName === item.path})}>
                <Link href={item.path}>
                  <div className="flex flex-col items-center group-hover:text-blue-300 transition-colors duration-300">
                    <Customtooltip tooltipText={item.name}>
                      <span className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-800 group-hover:bg-blue-300 group-hover:text-white transition-colors duration-300">
                        {item.icon}
                      </span>
                    </Customtooltip>
                  </div>
                </Link>
              </li>
            )
          })
        }
      </ul>
    </div>
  );
}

export default Sidebar;
