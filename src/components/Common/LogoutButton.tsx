"use client";

import React from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button"; // Vercel button component
import { LogOut } from "lucide-react"; // optional icon

interface LogoutButtonProps {
    label?: string;       // Button text
    className?: string;   // Extra CSS classes
    redirectUrl?: string; // Optional redirect after logout
}

const LogoutButton: React.FC<LogoutButtonProps> = ({
    label = "Sign Out",
    className = "",
    redirectUrl,
}) => {
    const handleSignOut = () => {
        signOut({
            callbackUrl: redirectUrl || "/",
        });
    };

    return (
        <Button
            onClick={handleSignOut}
            className={`flex items-center gap-2 transition-colors duration-200 hover:bg-red-600 focus:ring-2 focus:ring-offset-1 focus:ring-red-500 ${className}`}
            variant="destructive"
            size="lg"
        >
            <LogOut className="w-4 h-4" />
            {label}
        </Button>
    );
};

export default LogoutButton;
