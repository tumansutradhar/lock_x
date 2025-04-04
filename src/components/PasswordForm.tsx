import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Password, PasswordFormData } from "@/types/password";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, } from "@/components/ui/dialog";
import { Eye, EyeOff } from "lucide-react";

interface PasswordFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: PasswordFormData) => void;
    currentPassword?: Password;
}

const emptyFormData: PasswordFormData = {
    website: "",
    username: "",
    password: "",
    email: "",
    notes: "",
};

const PasswordForm = ({
    isOpen,
    onClose,
    onSave,
    currentPassword,
}: PasswordFormProps) => {
    const [formData, setFormData] = useState<PasswordFormData>(emptyFormData);
    const [showPassword, setShowPassword] = useState(false);

    const isEditMode = !!currentPassword;

    useEffect(() => {
        if (currentPassword) {
            setFormData({
                website: currentPassword.website,
                username: currentPassword.username,
                password: currentPassword.password,
                email: currentPassword.email,
                notes: currentPassword.notes,
            });
        } else {
            setFormData(emptyFormData);
        }
    }, [currentPassword, isOpen]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {isEditMode ? "Edit Password" : "Add New Password"}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                {formData.website.charAt(0).toUpperCase() || "W"}
                            </div>
                            <div className="grid w-full gap-1.5">
                                <Label htmlFor="website">Website Name</Label>
                                <Input id="website" name="website" value={formData.website} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="grid w-full gap-1.5">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input id="password" name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} required className="pr-10" />
                                <Button type="button" variant="ghostAlt" size="icon" className="absolute right-0 top-0 " onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? (
                                        <Eye className="h-5 w-5" />
                                    ) : (
                                        <EyeOff className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                        </div>
                        <div className="grid w-full gap-1.5">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" name="username" value={formData.username} onChange={handleChange} />
                        </div>
                        <div className="grid w-full gap-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
                        </div>
                        <div className="grid w-full gap-1.5">
                            <Label htmlFor="notes">Short Note</Label>
                            <Textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} className="resize-none" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit">{isEditMode ? "Save" : "Add"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default PasswordForm;
