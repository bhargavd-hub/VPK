'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, CheckCircle } from 'lucide-react'
import { Button, Input } from '@/components/ui/Forms'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSent(true)
  }

  if (sent) {
    return (
      <div className="w-full min-h-[70vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-brand-offBlack mb-3">Check your email</h1>
          <p className="text-neutral-dark mb-2">We've sent a password reset link to</p>
          <p className="font-bold text-brand-orange mb-8">{email}</p>
          <p className="text-sm text-neutral mb-6">Didn't receive it? Check your spam folder or try again.</p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => setSent(false)} variant="secondary" size="sm">Try Again</Button>
            <Link href="/login"><Button size="sm">Back to Sign In</Button></Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-brand-orange/10 flex items-center justify-center mx-auto mb-4">
            <Mail size={28} className="text-brand-orange" />
          </div>
          <h1 className="text-3xl font-bold text-brand-offBlack mb-2">Forgot Password?</h1>
          <p className="text-neutral-dark">Enter your email and we&apos;ll send you a reset link.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
          <Button type="submit" className="w-full">Send Reset Link</Button>
        </form>
        <p className="text-center text-sm text-neutral-dark mt-6">
          Remember your password?{' '}
          <Link href="/login" className="text-brand-orange font-bold hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  )
}
