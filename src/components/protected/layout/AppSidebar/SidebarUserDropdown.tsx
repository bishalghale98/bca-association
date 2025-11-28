"use client";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronsUpDown, Settings, LogOut } from "lucide-react";
import { getInitials } from "@/lib/helper/getInitials";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Props {
    name: string;
    role?: string;
    email?: string;
    isCollapsed: boolean;
}

export function SidebarUserDropdown({ name, email, role, isCollapsed }: Props) {
    const router = useRouter();
    const initials = getInitials(name);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="w-full">
                {!isCollapsed ? (
                    // Expanded Sidebar Layout
                    <div className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
                        <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarFallback className="rounded-lg bg-gray-800 text-white">
                                {initials}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 text-left">
                            <p className="text-sm font-medium text-gray-900">{name}</p>
                            <p className="text-xs text-gray-500">{role}</p>
                        </div>

                        <ChevronsUpDown className="h-4 w-4 text-gray-400" />
                    </div>
                ) : (
                    // Collapsed Sidebar Layout
                    <div className="flex flex-col items-center gap-3 cursor-pointer">
                        <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarFallback className="rounded-lg bg-gray-800 text-white">
                                {initials}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                )}
            </DropdownMenuTrigger>

            {/* Dropdown Content */}
            <DropdownMenuContent side="top" align="start" className="w-56 rounded-lg">
                <DropdownMenuLabel className="p-0">
                    <div className="flex items-center gap-2 px-3 py-2">
                        <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarFallback className="rounded-lg bg-gray-800 text-white">
                                {initials}
                            </AvatarFallback>
                        </Avatar>

                        <div className="grid leading-tight">
                            <span className="truncate font-medium">{name}</span>
                            {email && (
                                <span className="truncate text-xs text-muted-foreground">
                                    {email}
                                </span>
                            )}
                        </div>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={() => (router.push("setting"))}
                    className="cursor-pointer"
                >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={() => signOut()}
                    className="cursor-pointer"
                >
                    <LogOut className="h-4 w-4 mr-2" />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
