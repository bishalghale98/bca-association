'use client'

import { MessageSquare } from 'lucide-react'

export default function ForgotPasswordHeader() {
    return (
        <div className="px-8 pt-8 pb-6 text-center space-y-4">
            <div className="flex justify-center">
                <div className="bg-gray-900 dark:bg-white rounded-lg p-3 shadow-sm">
                    <MessageSquare className="w-6 h-6 text-white dark:text-gray-900" />
                </div>
            </div>
            <div className="space-y-2">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Reset your password
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Enter your email and we&apos;ll send you a reset link
                </p>
            </div>
        </div>
    )
}
