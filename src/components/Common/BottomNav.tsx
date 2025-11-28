'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Bookmark, LogIn, Search, Settings } from "lucide-react"
import { useSession } from "next-auth/react"
import { cn } from "@/lib/utils"
import { JSX } from "react"

export default function BottomNav() {
    const { data: session, status } = useSession()
    const pathname = usePathname() || "/"

    // Main nav items that are always visible
    const mainNavItems: { label: string; icon: JSX.Element; slug: string }[] = [
        { label: "Home", icon: <Home className="w-6 h-6" />, slug: "/" },
        { label: "Form", icon: <Bookmark className="w-6 h-6" />, slug: "/form" },
        { label: "Search", icon: <Search className="w-6 h-6" />, slug: "/search" },
        { label: "Settings", icon: <Settings className="w-6 h-6" />, slug: "/settings" },
    ]

    // Determine conditional nav item
    let conditionalNavItem: { label: string; icon: JSX.Element; slug: string } | null = null
    if (status === "authenticated") {
        conditionalNavItem = { label: "Dashboard", icon: <Home className="w-6 h-6" />, slug: "/dashboard" }
    } else if (status === "unauthenticated") {
        conditionalNavItem = { label: "Sign In", icon: <LogIn className="w-6 h-6" />, slug: "/sign-in" }
    }

    // Combine all nav items for rendering
    const navItems = [...mainNavItems]
    if (status === "loading") {
        // Placeholder skeleton for conditional item
        navItems.push({ label: "", icon: <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse" />, slug: "loading" })
    } else if (conditionalNavItem) {
        navItems.push(conditionalNavItem)
    }

    // Check if nav item is active
    const isActive = (slug: string) => slug === "/" ? pathname === "/" : pathname.startsWith(slug)

    return (
        <div className="fixed bottom-0 left-0 w-full z-50 md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-t">
            <div className="grid grid-cols-5 max-w-lg mx-auto">
                {navItems.map(item => (
                    <Link
                        key={item.slug}
                        href={item.slug === "loading" ? "#" : item.slug}
                        className={cn(
                            "flex flex-col items-center justify-center py-2 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-lg",
                            isActive(item.slug) ? "bg-gray-100 dark:bg-gray-700" : "",
                            item.slug === "loading" ? "pointer-events-none" : ""
                        )}
                    >
                        <span
                            className={cn(
                                "mb-1",
                                isActive(item.slug)
                                    ? "text-blue-600 dark:text-blue-400"
                                    : "text-gray-500 dark:text-gray-400"
                            )}
                        >
                            {item.icon}
                        </span>
                        {item.label && (
                            <span
                                className={cn(
                                    "text-xs font-medium",
                                    isActive(item.slug)
                                        ? "text-blue-600 dark:text-blue-400"
                                        : "text-gray-500 dark:text-gray-400"
                                )}
                            >
                                {item.label}
                            </span>
                        )}
                    </Link>
                ))}
            </div>
        </div>
    )
}
