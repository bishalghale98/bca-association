'use client'

import { useSession } from 'next-auth/react'
import React from 'react'

const Page = () => {
    const { data: session, status } = useSession()

    console.log('Session:', session)

    return (
        <div>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'unauthenticated' && <p>You are not logged in</p>}
            {status === 'authenticated' && (
                <p>Welcome, {session.user?.name} ({session.user?.email})</p>
            )}
        </div>
    )
}

export default Page
