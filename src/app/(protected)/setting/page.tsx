'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SettingsPage() {
  const pathname = usePathname();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleDeleteAccount = () => {
    // Handle account deletion here
    setShowDeleteDialog(false);
  };

  const navItems = [
    { href: '/settings/profile', label: 'Profile' },
    { href: '/settings/password', label: 'Password' },
    { href: '/settings/two-factor', label: 'Two-Factor Auth' },
    { href: '/settings/appearance', label: 'Appearance' },
  ];

  return (
    <div className="px-4 py-6">
      <div className="mb-8 space-y-0.5">
        <h2 className="text-xl font-semibold tracking-tight">Settings</h2>
        <p className="text-sm text-muted-foreground">
          Manage your profile and account settings
        </p>
      </div>

      <div className="flex flex-col lg:flex-row lg:space-x-12">
        {/* Sidebar Navigation */}
        <aside className="w-full max-w-xl lg:w-48">
          <nav className="flex flex-col space-y-1 space-x-0">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all h-9 px-4 py-2 w-full justify-start ${pathname === item.href
                    ? 'bg-muted'
                    : 'hover:bg-accent hover:text-accent-foreground'
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <div className="bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full my-6 lg:hidden" />

        {/* Main Content */}
        <div className="flex-1 md:max-w-2xl">
          <section className="max-w-xl space-y-12">
            {/* Profile Information Section */}
            <div className="flex flex-col space-y-6">
              <header>
                <h3 className="mb-0.5 text-base font-medium">
                  Profile information
                </h3>
                <p className="text-sm text-muted-foreground">
                  Update your name and email address
                </p>
              </header>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid gap-2">
                  <label
                    htmlFor="name"
                    className="flex items-center gap-2 text-sm leading-none font-medium select-none"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-input h-9 min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none mt-1 block w-full focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                  />
                </div>

                <div className="grid gap-2">
                  <label
                    htmlFor="email"
                    className="flex items-center gap-2 text-sm leading-none font-medium select-none"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    autoComplete="username"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-input h-9 min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none mt-1 block w-full focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-9 px-4 py-2"
                  >
                    Save
                  </button>
                  {isSaved && (
                    <p className="text-sm text-neutral-600">Saved.</p>
                  )}
                </div>
              </form>
            </div>

            {/* Delete Account Section */}
            <div className="space-y-6">
              <header>
                <h3 className="mb-0.5 text-base font-medium">
                  Delete account
                </h3>
                <p className="text-sm text-muted-foreground">
                  Delete your account and all of its resources
                </p>
              </header>

              <div className="space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10">
                <div className="relative space-y-0.5 text-red-600 dark:text-red-100">
                  <p className="font-medium">Warning</p>
                  <p className="text-sm">
                    Please proceed with caution, this cannot be undone.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowDeleteDialog(true)}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all bg-destructive text-white shadow-xs hover:bg-destructive/90 h-9 px-4 py-2"
                >
                  Delete account
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Delete Account Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-2">Delete Account</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Are you sure you want to delete your account? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteDialog(false)}
                className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}