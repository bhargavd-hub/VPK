'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'
import { useApp } from '@/lib/context'
import { Button, Input } from '@/components/ui/Forms'

export default function LoginPage() {
  const { login } = useApp()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) { setError('Please fill in all fields.'); return }
    login({ id: '1', name: email.split('@')[0], email })
    router.push('/account')
  }

  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-brand-offBlack mb-2">Sign In</h1>
        <p className="text-neutral-dark mb-8">Welcome back! Sign in to your VPK account.</p>

        {error && <p className="text-red-500 text-sm mb-4 bg-red-50 p-3 rounded">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input label="Email Address" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required />
          <div className="relative">
            <Input label="Password" type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Your password" required />
            <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 bottom-3 text-neutral hover:text-brand-offBlack">
              {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-brand-orange" />
              <span className="text-neutral-dark">Remember me</span>
            </label>
            <Link href="/forgot-password" className="text-brand-orange hover:underline">Forgot password?</Link>
          </div>
          <Button type="submit" className="w-full">Sign In</Button>
        </form>

        <p className="text-center text-sm text-neutral-dark mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-brand-orange font-bold hover:underline">Create Account</Link>
        </p>

        {/* Demo accounts info */}
        <div className="mt-8 p-4 bg-neutral-lightest rounded-lg text-xs text-neutral-dark">
          <p className="font-bold mb-1">Demo: Any email + any password will log you in.</p>
        </div>
      </div>
    </div>
  )
}
