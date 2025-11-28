"use client";

import { ChevronsUpDown } from "lucide-react";
import LogoutButton from "../../../Common/LogoutButton";
import { useSession } from "next-auth/react";
import { getInitials } from "@/lib/helper/getInitials";

export default function SidebarUser({ isCollapsed }: { isCollapsed: boolean }) {


    const { data: session } = useSession()

    return (
        <div className="border-t border-gray-200 p-4">
            {!isCollapsed ? (
                <div className="space-y-3">

                    {/* naming card */}
                    <div className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-50">
                        <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-gray-800 text-white text-xs">
                            {getInitials(session?.user?.name)}
                        </div>

                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{session?.user.name}</p>
                            <p className="text-xs text-gray-500">{session?.user.role}</p>
                        </div>

                        <ChevronsUpDown className="h-4 w-4 text-gray-400" />
                    </div>

                    <LogoutButton
                        label="Sign Out"
                        className="w-full text-left text-gray-700 hover:text-gray-900"
                    />
                </div>
            ) : (
                <div className="flex flex-col items-center space-y-3">
                    <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-gray-800 text-white text-xs">
                        BG
                    </div>
                    <LogoutButton className="h-8 w-8 text-gray-500 hover:text-gray-900" label="" />
                </div>
            )}
        </div>
    );
}
