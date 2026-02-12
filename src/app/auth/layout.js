'use client';

import { AuthProvider } from "@/hooks/authContext";
import { Toaster } from "react-hot-toast";

export default function AuthLayout({ children }) {
    return (
        <AuthProvider>
            <Toaster position="top-right" />
            {children}
        </AuthProvider>
    );
}
