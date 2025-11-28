import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: {
		default: "BCA Association Dashboard",
		template: "%s | BCA Association",
	},
	description:
		"A complete administration dashboard for managing BCA Association users, forms, authentication, and semester data.",
	keywords: [
		"BCA Association",
		"Admin Dashboard",
		"Next.js App Router",
		"Student Management",
		"College Election",
	],
	category: "Technology",
	robots: {
		index: false, // Dashboard pages should NOT be indexed
		follow: false,
	},
	openGraph: {
		title: "BCA Association Dashboard",
		description:
			"Secure admin dashboard for managing student and system data.",
		type: "website",
	},
};


export default function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <main className={inter.className}>{children}</main>;
}
