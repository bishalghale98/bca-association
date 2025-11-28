'use client'

import Link from "next/link"
import { BookOpen, Menu, X } from "lucide-react"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { data: session, status } = useSession()
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname?.startsWith(href)
  }

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Form", href: "/form" },
  ]

  if (status === "authenticated") navItems.push({ label: "Dashboard", href: "/dashboard" })
  else if (status === "unauthenticated") navItems.push({ label: "Sign In", href: "/sign-in" })

  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40 shadow-sm sticky top-0 z-50">
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
            <div className="hidden sm:block space-y-0.5">
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
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "font-medium px-4 py-2 rounded-lg transition-colors duration-200",
                  isActive(item.href)
                    ? "bg-accent text-primary"
                    : "text-foreground hover:text-primary hover:bg-accent/50 active:bg-accent"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-accent/50 transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/30 transition-opacity duration-300",
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Side Panel */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-64 bg-background shadow-lg z-50 transform transition-transform duration-300",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-border/40">
          <p className="font-semibold text-lg">Menu</p>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-accent/50 transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex flex-col p-4 space-y-2">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "font-medium px-4 py-3 rounded-lg transition-colors duration-200",
                isActive(item.href)
                  ? "bg-accent text-primary"
                  : "text-foreground hover:text-primary hover:bg-accent/50 active:bg-accent"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
