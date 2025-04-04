import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                default: "bg-[#0F172A] text-[#F8FAFC] hover:bg-[#0F172A]/90",
                destructive: "bg-[#EF4444] text-[#F8FAFC] hover:bg-[#EF4444]/90",
                outline: "border border-[#E2E8F0] bg-[#FFFFFF] hover:bg-[#F1F5F9] hover:text-[#0F172A]",
                secondary: "bg-[#F1F5F9] text-[#0F172A] hover:bg-[#F1F5F9]/80",
                ghost: "bg-[#F1F5F9] hover:text-[#0F172A]",
                ghostAlt: "bg-[#FFFFFF] rounded-md rounded-l-none border-[#E2E8F0] border-t border-r border-b border-l-0 border-gray-300",
                link: "text-[#0F172A] underline-offset-4 hover:underline",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
