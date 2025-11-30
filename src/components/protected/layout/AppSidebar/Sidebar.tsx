"use client";

import { cn } from "@/lib/utils";
import SidebarHeader from "./SidebarHeader";
import SidebarSection from "./SidebarSection";
import SidebarUser from "./SidebarUser";
import { externalItems, mainItems } from "@/constant/protected/AppSidebar";

interface SidebarProps {
    isCollapsed?: boolean;
    onClose?: () => void;
}

export default function Sidebar({
    isCollapsed = false,
    onClose,
}: SidebarProps) {
    return (
        <>
            
            {!isCollapsed && (
                <div
                    className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-30 lg:hidden transition-all duration-300"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "flex flex-col h-full bg-white border-r border-gray-200 transition-all z-40",
                    isCollapsed ? "w-20 relative" : "w-64 fixed lg:relative left-0 top-0 lg:left-auto lg:top-auto"
                )}
            >
                <SidebarHeader isCollapsed={isCollapsed} />

                <nav className="flex-1 p-4 space-y-6">
                    <SidebarSection
                        title="Platform"
                        items={mainItems}
                        isCollapsed={isCollapsed}
                    />

                    {externalItems.length > 0 && (
                        <SidebarSection
                            title="Resources"
                            items={externalItems}
                            isCollapsed={isCollapsed}
                        />
                    )}
                </nav>

                <SidebarUser isCollapsed={isCollapsed} />
            </aside>
        </>
    );
}