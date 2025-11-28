import BottomNav from '@/components/Common/BottomNav'
import Footer from '@/components/Common/Footer'
import Header from '@/components/Common/Header'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Create Next App with TypeScript, Tailwind CSS, NextAuth, Prisma, tRPC, and more.',
}

export default function Layout({
	children,
}: {
	children: React.ReactNode
}) {
	return (

		<>

			<Header />

			<main className={inter.className}>
				<div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 px-4">
					<div className="relative z-10 w-full max-w-md">
						<div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm transition-all duration-200 hover:shadow-md">

							{children}

						</div>
					</div>
				</div>

			</main>

			<BottomNav />

			<Footer />

		</>



	)
}
