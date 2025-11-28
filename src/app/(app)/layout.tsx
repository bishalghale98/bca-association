import Footer from '@/components/Common/Footer';
import Header from '@/components/Common/Header';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

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

export default function Layout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<Header />

			<main className={inter.className}>{children}</main>

			<Footer />


		</>
	)
}
