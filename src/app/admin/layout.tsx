import React from "react";
import AuthGuard from "@/components/AuthGuard";

export default function nameLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthGuard>
            {children}
        </AuthGuard>
    );
}