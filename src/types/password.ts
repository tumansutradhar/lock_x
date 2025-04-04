export interface Password {
    id: string;
    website: string;
    username: string;
    password: string;
    email: string;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
    favicon?: string;
}

export type PasswordFormData = Omit<Password, "id" | "createdAt" | "updatedAt" | "favicon">;
