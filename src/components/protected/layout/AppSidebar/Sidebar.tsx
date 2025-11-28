"use client";

import { cn } from "@/lib/utils";
import SidebarHeader from "./SidebarHeader";
import SidebarSection from "./SidebarSection";
import SidebarUser from "./SidebarUser";
import { externalItems, mainItems } from "@/constant/protected/AppSidebar";

export default function Sidebar({
    isCollapsed = false,
}: {
    isCollapsed?: boolean;
}) {
    return (
        <aside
            className={cn(
                "flex flex-col h-full bg-white border-r border-gray-200 transition-all",
                isCollapsed ? "w-20" : "w-64"
            )}
        >
            <SidebarHeader isCollapsed={isCollapsed} />

            <nav className="flex-1 p-4 space-y-6">
                <SidebarSection
                    title="Platform"
                    items={mainItems}
                    isCollapsed={isCollapsed}
                />

                <SidebarSection
                    title="Resources"
                    items={externalItems}
                    isCollapsed={isCollapsed}
                />
            </nav>

            <SidebarUser isCollapsed={isCollapsed} />
        </aside>
    );
}
