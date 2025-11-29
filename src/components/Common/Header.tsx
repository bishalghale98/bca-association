'use client'

import Link from "next/link"
import { BookOpen } from "lucide-react"
import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { JSX } from "react"

export default function Header() {
  const { data: session, status } = useSession()
  const pathname = usePathname() || "/"

  // Main nav items
  const mainNavItems: { label: string; href: string }[] = [
    { label: "Home", href: "/" },
    { label: "Form", href: "/form" },
  ]

  // Determine conditional nav item
  let conditionalNavItem: { label: string; href: string } | null = null
  if (status === "authenticated") {
    conditionalNavItem = { label: "Dashboard", href: "/dashboard" }
  } else if (status === "unauthenticated") {
    conditionalNavItem = { label: "Sign In", href: "/sign-in" }
  }

  // Combine all nav items
  const navItems = [...mainNavItems]
  if (status === "loading") {
    // Placeholder skeleton for conditional item
    navItems.push({ label: "", href: "loading" })
  } else if (conditionalNavItem) {
    navItems.push(conditionalNavItem)
  }

  // Active check
  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <header className="bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-b border-border/40 shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition-all duration-200 active:scale-95 rounded-lg p-1 -ml-1"
          >
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-200">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="sm:block space-y-0.5">
              <p className="font-semibold text-foreground leading-none tracking-tight">
                BCA Association
              </p>
              <p className="text-xs text-muted-foreground leading-none">
                Student Portal
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              item.href === "loading" ? (
                // Skeleton placeholder for loading state
                <div
                  key={item.href}
                  className="w-20 h-6 bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse"
                />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "font-medium px-4 py-2 rounded-lg transition-colors duration-200",
                    isActive(item.href)
                      ? "bg-accent text-blue-600 dark:text-blue-400"
                      : "text-foreground hover:text-primary hover:bg-accent/50 active:bg-accent"
                  )}
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
