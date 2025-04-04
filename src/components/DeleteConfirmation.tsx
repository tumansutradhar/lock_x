import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "@/components/ui/alert-dialog";

interface DeleteConfirmationProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    websiteName: string;
}

const DeleteConfirmation = ({
    isOpen,
    onClose,
    onConfirm,
    websiteName,
}: DeleteConfirmationProps) => {
    return (
        <AlertDialog open={isOpen} onOpenChange={(open: boolean) => !open && onClose()}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Do you want to delete this password?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently delete the password for{" "}
                        <span className="font-semibold">{websiteName}</span>. This action
                        cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="bg-[#EF4444] text-[#F8FAFC] hover:bg-[#EF4444]/90"
                    >
                        Yes, Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteConfirmation;
