import { useState, useEffect } from "react";
import { Password, PasswordFormData } from "@/types/password";
import { toast } from "@/components/ui/use-toast";

export function usePasswordManager() {
    const [passwords, setPasswords] = useState<Password[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPassword, setSelectedPassword] = useState<Password | null>(
        null
    );

    useEffect(() => {
        const savedPasswords = localStorage.getItem("passwords");
        if (savedPasswords) {
            try {

                interface Password {
                    id: string;
                    website: string;
                    username: string;
                    password: string;
                    createdAt: Date | string;
                    updatedAt: Date | string;
                }

                const parsedPasswords = JSON.parse(savedPasswords);
                // const formattedPasswords = parsedPasswords.map((pw: any) => ({
                const formattedPasswords = parsedPasswords.map((pw: Password) => ({
                    ...pw,
                    createdAt: new Date(pw.createdAt),
                    updatedAt: new Date(pw.updatedAt),
                }));
                setPasswords(formattedPasswords);
            } catch (error) {
                console.error("Failed to parse passwords from localStorage", error);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("passwords", JSON.stringify(passwords));
    }, [passwords]);

    const addPassword = (passwordData: PasswordFormData) => {
        const newPassword: Password = {
            ...passwordData,
            id: crypto.randomUUID(),
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        setPasswords((prevPasswords) => [...prevPasswords, newPassword]);
        toast({
            title: "Password saved",
            description: `Password for ${passwordData.website} has been saved.`,
        });
        return newPassword;
    };

    const updatePassword = (id: string, passwordData: PasswordFormData) => {
        setPasswords((prevPasswords) =>
            prevPasswords.map((pw) =>
                pw.id === id ? { ...pw, ...passwordData, updatedAt: new Date() } : pw
            )
        );
        toast({
            title: "Password updated",
            description: `Password for ${passwordData.website} has been updated.`,
        });
    };

    const deletePassword = (id: string) => {
        const passwordToDelete = passwords.find((pw) => pw.id === id);
        setPasswords((prevPasswords) => prevPasswords.filter((pw) => pw.id !== id));
        toast({
            title: "Password deleted",
            description: passwordToDelete
                ? `Password for ${passwordToDelete.website} has been deleted.`
                : "Password has been deleted.",
        });
    };

    const exportPasswordAsText = (id: string) => {
        const passwordToExport = passwords.find((pw) => pw.id === id);
        if (!passwordToExport) return null;

        const content = `Website: ${passwordToExport.website}
Username: ${passwordToExport.username}
Email: ${passwordToExport.email}
Password: ${passwordToExport.password}
Notes: ${passwordToExport.notes}
`;

        return content;
    };

    const exportAllPasswordsAsText = () => {
        if (passwords.length === 0) return null;

        let content = "# Exported Passwords\n\n";

        passwords.forEach((pw, index) => {
            content += `## ${index + 1}. ${pw.website}\n`;
            content += `- Username: ${pw.username}\n`;
            content += `- Email: ${pw.email}\n`;
            content += `- Password: ${pw.password}\n`;
            if (pw.notes) content += `- Notes: ${pw.notes}\n`;
            content += "\n";
        });

        return content;
    };

    const filteredPasswords = passwords.filter(
        (pw) =>
            pw.website.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pw.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pw.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return {
        passwords: filteredPasswords,
        addPassword,
        updatePassword,
        deletePassword,
        exportPasswordAsText,
        exportAllPasswordsAsText,
        searchTerm,
        setSearchTerm,
        selectedPassword,
        setSelectedPassword,
    };
}
