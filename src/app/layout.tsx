import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import AuthProvider from "@/context/AuthProvider";
import { Analytics } from "@vercel/analytics/next"



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BCA Association | Student Form & Admin Dashboard",
  description:
    "Official BCA Association platform for student form submission, skill tracking, event participation, and academic support. Built with Next.js for fast, secure, and modern performance.",
  keywords: [
    "BCA Association",
    "BCA Student Form",
    "BCA Nepal",
    "BCA Skill Tracking",
    "BCA Events",
    "Tribhuvan University BCA",
    "BCA Admin Dashboard",
    "BCA Portal",
    "Student Management System",
  ],
  openGraph: {
    title: "BCA Association | Student Form & Dashboard",
    description:
      "Submit your student details, track skills, participate in events and get academic support through the official BCA Association portal.",
    type: "website",
    siteName: "BCA Association",
  },
  twitter: {
    title: "BCA Association | Student Form",
    description:
      "Official platform for BCA student form submissions, events, and admin dashboard.",
    card: "summary_large_image",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
          <Toaster position="bottom-right" />
        </body>
        <Analytics />
      </AuthProvider>
    </html>
  );
}
