import { useState } from "react";
import { Password, PasswordFormData } from "@/types/password";
import PasswordItem from "./PasswordItem";
import PasswordForm from "./PasswordForm";
import { Button } from "@/components/ui/button";
import { Plus, Download, Copy } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, } from "@/components/ui/dialog";

interface PasswordListProps {
    passwords: Password[];
    onAdd: (data: PasswordFormData) => void;
    onUpdate: (id: string, data: PasswordFormData) => void;
    onDelete: (id: string) => void;
    onExport: (id: string) => string | null;
}

const PasswordList = ({
    passwords,
    onAdd,
    onUpdate,
    onDelete,
    onExport,
}: PasswordListProps) => {
    const [formOpen, setFormOpen] = useState(false);
    const [exportDialogOpen, setExportDialogOpen] = useState(false);
    const [exportText, setExportText] = useState("");
    const [selectedPassword, setSelectedPassword] = useState<Password | undefined>(undefined);

    const handleAdd = () => {
        setSelectedPassword(undefined);
        setFormOpen(true);
    };

    const handleEdit = (password: Password) => {
        setSelectedPassword(password);
        setFormOpen(true);
    };

    const handleSave = (data: PasswordFormData) => {
        if (selectedPassword) {
            onUpdate(selectedPassword.id, data);
        } else {
            onAdd(data);
        }
    };

    const handleExport = (id: string) => {
        const exportedText = onExport(id);
        if (exportedText) {
            setExportText(exportedText);
            setExportDialogOpen(true);
        }
    };

    const handleDownloadExport = () => {
        const element = document.createElement("a");
        const file = new Blob([exportText], { type: "text/plain" });
        element.href = URL.createObjectURL(file);
        element.download = "password-export.txt";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);

        toast({
            title: "Export successful",
            description: "Your password has been exported to a text file",
        });

        setExportDialogOpen(false);
    };

    const handleCopyExport = () => {
        navigator.clipboard.writeText(exportText);
        toast({
            title: "Copied to clipboard",
            description: "The password information has been copied to your clipboard",
        });
        setExportDialogOpen(false);
    };

    return (
        <div className="space-y-4">
            {passwords.length === 0 ? (
                <div className="text-center py-12">
                    <h3 className="text-lg font-medium mb-2">No passwords saved yet</h3>
                    <p className="text-sm text-gray-500 mb-4">
                        Add your first password to get started
                    </p>
                    <Button onClick={handleAdd} className="mx-auto">
                        <Plus className="h-5 w-5 mr-1" /> Add Password
                    </Button>
                </div>
            ) : (
                <>
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold">Your Passwords</h2>
                        <Button onClick={handleAdd} className="rounded-md">
                            <Plus className="h-4 w-4 mr-1" /> Add New
                        </Button>
                    </div>
                    <div className="grid gap-3">
                        {passwords.map((password) => (
                            <PasswordItem key={password.id} password={password} onEdit={handleEdit} onDelete={onDelete} onExport={handleExport} />
                        ))}
                    </div>
                </>
            )}
            <PasswordForm isOpen={formOpen} onClose={() => setFormOpen(false)} onSave={handleSave} currentPassword={selectedPassword} />
            <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Export Password</DialogTitle>
                    </DialogHeader>
                    <div className="bg-gray-50 p-4 rounded-md font-mono text-sm whitespace-pre-wrap">
                        {exportText}
                    </div>
                    <div className="flex gap-2 justify-end mt-4">
                        <Button variant="outline" onClick={() => setExportDialogOpen(false)}>
                            Close
                        </Button>
                        <Button variant="outline" onClick={handleCopyExport} className="flex items-center gap-1">
                            <Copy className="h-4 w-4" /> Copy
                        </Button>
                        <Button onClick={handleDownloadExport} className="flex items-center gap-1">
                            <Download className="h-4 w-4" /> Download
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PasswordList;
