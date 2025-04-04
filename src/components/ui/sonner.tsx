import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
    const { theme = "system" } = useTheme();

    return (
        <Sonner
            theme={theme as ToasterProps["theme"]}
            className="toaster group"
            toastOptions={{
                classNames: {
                    toast: "group toast group-[.toaster]:bg-[#FFFFFF] group-[.toaster]:text-[#020817] group-[.toaster]:border-border group-[.toaster]:shadow-lg",
                    description: "group-[.toast]:text-[#64748B]",
                    actionButton: "group-[.toast]:bg-[#0F172A] group-[.toast]:text-[#F8FAFC]",
                    cancelButton: "group-[.toast]:bg-[#F1F5F9] group-[.toast]:text-[#64748B]",
                },
            }}
            {...props}
        />
    );
};

export { Toaster };
