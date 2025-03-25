// app/verify-email/page.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
export default function VerifyEmail() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is already confirmed
    supabase.auth.getUser().then(({ data }) => {
      if (data.user?.email_confirmed_at) {
        router.push('/dashboard')
      }
    })
  }, [router])

  return (
    <div className="max-w-md mx-auto p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Check your email</h1>
      <p className="mb-6">
        We've sent a confirmation link to your email address.
        Please click the link to verify your account.
      </p>
      <button
        onClick={() => router.push('/')}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Return Home
      </button>
    </div>
  )
}