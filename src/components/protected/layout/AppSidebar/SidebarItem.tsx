"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import React from "react";

interface SidebarItemProps {
    item: {
        label: string;
        href: string;
        icon: React.ElementType;
        badge?: number;
    };
    isCollapsed: boolean;
}

export default function SidebarItem({ item, isCollapsed }: SidebarItemProps) {
    const pathname = usePathname();
    const isActive = pathname === item.href;
    const Icon = item.icon;
    const isExternal = item.href.startsWith("http");

    const content = (
        <div
            className={cn(
                "group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                "hover:bg-gray-100 hover:shadow-sm",
                isActive
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "text-gray-700",
                isCollapsed && "justify-center"
            )}
        >
            <Icon
                className={cn(
                    "h-4 w-4 transition-transform",
                    isActive && "text-blue-600",
                    "group-hover:scale-110"
                )}
            />

            {!isCollapsed && <span className="flex-1 truncate">{item.label}</span>}

            {!isCollapsed && item.badge && (
                <span
                    className={cn(
                        "text-xs px-2 rounded-full",
                        isActive ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                    )}
                >
                    {item.badge}
                </span>
            )}
        </div>
    );

    if (isExternal) {
        return (
            <a href={item.href} target="_blank" rel="noopener noreferrer">
                {content}
            </a>
        );
    }

    return <Link href={item.href}>{content}</Link>;
}
