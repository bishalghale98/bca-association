'use client'

import React from 'react'
import { useSession } from 'next-auth/react'
import LogoutButton from '@/components/Common/LogoutButton'

const Page: React.FC = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <p className="text-red-500 font-medium">You are not logged in</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6 p-4">
      <div className="bg-card rounded-xl shadow-md p-6 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Welcome, {session?.user?.name}!
        </h1>
        <p className="text-sm text-muted-foreground">{session?.user?.email}</p>
      </div>

      <LogoutButton
        label="Sign Out"
        className="w-48"
        redirectUrl="/login"
      />
    </div>
  )
}

export default Page
