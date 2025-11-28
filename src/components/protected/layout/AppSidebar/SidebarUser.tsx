"use client";

import { useSession } from "next-auth/react";
import { SidebarUserDropdown } from "./SidebarUserDropdown";

export default function SidebarUser({ isCollapsed }: { isCollapsed: boolean }) {
    const { data: session } = useSession();

    return (
        <div className="border-t border-gray-200 p-4">
            <SidebarUserDropdown
                name={session?.user?.name ?? "User"}
                email={session?.user?.email ?? ""}
                role={session?.user?.role ?? "user"}
                isCollapsed={isCollapsed}
            />
        </div>
    );
}
