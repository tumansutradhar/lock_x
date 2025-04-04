import { useState } from "react";
import { Password } from "@/types/password";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye, EyeOff, Edit, Trash, Share2, Globe } from "lucide-react";
import DeleteConfirmation from "./DeleteConfirmation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PasswordItemProps {
    password: Password;
    onEdit: (password: Password) => void;
    onDelete: (id: string) => void;
    onExport: (id: string) => void;
}

const PasswordItem = ({
    password,
    onEdit,
    onDelete,
    onExport,
}: PasswordItemProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [imgError, setImgError] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleCopyPassword = () => {
        navigator.clipboard.writeText(password.password);
        toast({
            title: "Password copied",
            description: "Password copied to clipboard",
        });
    };

    const getDomain = (url: string) => {
        try {
            const fullUrl = url.startsWith("http") ? url : `https://${url}`;
            const domain = new URL(fullUrl).hostname;
            return domain;
        } catch {
            return url;
        }
    };

    const domain = getDomain(password.website);
    const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

    return (
        <Card className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 rounded-md">
                    <AvatarImage src={faviconUrl} alt={password.website} onError={() => setImgError(true)} />
                    <AvatarFallback className="rounded-md bg-primary/10 text-primary">
                        {imgError ? (
                            <Globe className="h-5 w-5" />
                        ) : (
                            password.website.charAt(0).toUpperCase()
                        )}
                    </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium truncate">{domain}</h3>
                    <p className="text-xs text-gray-500 truncate">
                        {password.username || password.email}
                    </p>
                </div>
                <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={togglePasswordVisibility} title={showPassword ? "Hide password" : "Show password"}>
                        {showPassword ? (
                            <Eye className="h-4 w-4" />
                        ) : (
                            <EyeOff className="h-4 w-4" />
                        )}
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Share2 className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onExport(password.id)}>
                                Export as Text
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleCopyPassword}>
                                Copy Password
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="ghost" size="icon" onClick={() => onEdit(password)} title="Edit password">
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setDeleteDialogOpen(true)} title="Delete password">
                        <Trash className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            {showPassword && (
                <div className="mt-2 p-2 bg-gray-50 rounded text-sm flex items-center justify-between">
                    <span className="font-mono">{password.password}</span>
                    <Button variant="ghost" size="sm" onClick={handleCopyPassword} className="h-6 text-xs">
                        Copy
                    </Button>
                </div>
            )}
            <DeleteConfirmation isOpen={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} onConfirm={() => onDelete(password.id)} websiteName={password.website} />
        </Card>
    );
};

export default PasswordItem;
