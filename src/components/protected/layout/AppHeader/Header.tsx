"use client";

import React from "react";
import { HeaderToggle } from "./HeaderToggle";
import { HeaderBreadcrumbs } from "./HeaderBreadcrumbs";
import { HeaderQuickActions } from "./HeaderQuickActions";


interface HeaderProps {
    onSidebarToggle?: () => void;
    title?: string;
    breadcrumbs?: Array<{ label: string; href?: string }>;
}

export const Header: React.FC<HeaderProps> = ({
    onSidebarToggle,
    title = "Dashboard",
    breadcrumbs = [],
}) => {
    return (
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white/80 backdrop-blur-sm px-6 transition-all">

            {/* Left Section */}
            <div className="flex items-center gap-4">
                <HeaderToggle onClick={onSidebarToggle} />

                <HeaderBreadcrumbs title={title} breadcrumbs={breadcrumbs} />
            </div>

            {/* Right Section */}
            <HeaderQuickActions />
        </header>
    );
};
