import { useState } from "react";
import { usePasswordManager } from "@/hooks/usePasswordManager";
import SearchBar from "@/components/SearchBar";
import PasswordList from "@/components/PasswordList";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Download, Copy } from "lucide-react";

const Index = () => {
    const {
        passwords,
        addPassword,
        updatePassword,
        deletePassword,
        exportPasswordAsText,
        exportAllPasswordsAsText,
        searchTerm,
        setSearchTerm,
    } = usePasswordManager();

    const [exportAllDialogOpen, setExportAllDialogOpen] = useState(false);
    const [allPasswordsText, setAllPasswordsText] = useState("");

    const handleExportAll = () => {
        const exportedText = exportAllPasswordsAsText();
        if (exportedText) {
            setAllPasswordsText(exportedText);
            setExportAllDialogOpen(true);
        }
    };

    const handleDownloadAllExport = () => {
        const element = document.createElement("a");
        const file = new Blob([allPasswordsText], { type: "text/plain" });
        element.href = URL.createObjectURL(file);
        element.download = "all-passwords-export.txt";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        setExportAllDialogOpen(false);
    };

    const handleCopyAllExport = () => {
        navigator.clipboard.writeText(allPasswordsText);
        setExportAllDialogOpen(false);
    };

    return (
        <div className="max-w-3xl mx-auto p-4 sm:p-6">
            <header className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">LockX</h1>
                {passwords.length > 0 && (
                    <Button variant="outline" size="sm" onClick={handleExportAll} className="rounded-md">
                        Export All
                    </Button>
                )}
            </header>
            <div className="mb-6">
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            <PasswordList passwords={passwords} onAdd={addPassword} onUpdate={updatePassword} onDelete={deletePassword} onExport={exportPasswordAsText} />
            <Dialog open={exportAllDialogOpen} onOpenChange={setExportAllDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Export All Passwords</DialogTitle>
                    </DialogHeader>
                    <div className="bg-gray-50 p-4 rounded-md font-mono text-sm max-h-96 overflow-y-auto whitespace-pre-wrap">
                        {allPasswordsText}
                    </div>
                    <div className="flex gap-2 justify-end mt-4">
                        <Button variant="outline" onClick={() => setExportAllDialogOpen(false)}>
                            Close
                        </Button>
                        <Button variant="outline" onClick={handleCopyAllExport} className="flex items-center gap-1">
                            <Copy className="h-4 w-4" /> Copy
                        </Button>
                        <Button onClick={handleDownloadAllExport} className="flex items-center gap-1">
                            <Download className="h-4 w-4" /> Download
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Index;
