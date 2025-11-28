'use client'

import SignInForm from '@/components/Auth/SignInForm'
import SocialLogin from '@/components/Auth/SocialLogin'
import { MessageSquare } from 'lucide-react'
import Link from 'next/link';

const SignInPage = () => {
  return (
    <>
      {/* Header */}
      <div className="px-8 pt-8 pb-6 text-center space-y-4">
        <div className="flex justify-center">
          <div className="bg-gray-900 dark:bg-white rounded-lg p-3 shadow-sm">
            <MessageSquare className="w-6 h-6 text-white dark:text-gray-900" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Welcome back</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Sign in to your account to continue</p>
        </div>
      </div>

      {/* Form */}
      <div className="px-8 pb-8 space-y-6">
        <SignInForm />
        {/* <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white dark:bg-gray-800 px-3 text-gray-500 dark:text-gray-400">Or continue with</span>
          </div>
        </div>

        <div className="text-center mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="font-medium text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div> */}
      </div>

    </>

  )
}

export default SignInPage
