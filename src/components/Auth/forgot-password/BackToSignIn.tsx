'use client'

import Link from 'next/link'

export default function BackToSignIn() {
    return (
        <div className="text-center pt-4 my-5">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
                Remember your password?{' '}
                <Link
                    href="/sign-in"
                    className="font-medium text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                    Back to sign in
                </Link>
            </p>
        </div>
    )
}
