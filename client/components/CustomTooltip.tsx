import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
 
 
interface CustomtooltipProps {
    tooltipText: string;
    children: React.ReactNode;
}
 
export const Customtooltip = ({ tooltipText, children }: CustomtooltipProps) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>{children}</TooltipTrigger>
                <TooltipContent>
                    <p>{tooltipText}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
} 