"use client";

import Link from "next/link";
import { BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40 shadow-sm sticky top-0 z-40">
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
            <Link
              href="/"
              className="text-foreground hover:text-primary font-medium transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-accent/50 active:bg-accent"
            >
              Home
            </Link>
            <Link
              href="/form"
              className="text-foreground hover:text-primary font-medium transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-accent/50 active:bg-accent"
            >
              Form
            </Link>
            <Link
              href="/sign-in"
              className="text-foreground hover:text-primary font-medium transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-accent/50 active:bg-accent"
            >
              Sign In
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-accent/50 transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border/40 py-4 animate-in slide-in-from-top duration-200">
            <nav className="flex flex-col space-y-2">
              <Link
                href="/"
                className="text-foreground hover:text-primary font-medium transition-colors duration-200 px-4 py-3 rounded-lg hover:bg-accent/50 active:bg-accent"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/form"
                className="text-foreground hover:text-primary font-medium transition-colors duration-200 px-4 py-3 rounded-lg hover:bg-accent/50 active:bg-accent"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Form
              </Link>
              <Link
                href="/admin/dashboard"
                className="text-foreground hover:text-primary font-medium transition-colors duration-200 px-4 py-3 rounded-lg hover:bg-accent/50 active:bg-accent"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Admin
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}