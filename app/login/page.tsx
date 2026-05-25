'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'
import { useApp } from '@/lib/context'

export default function LoginPage() {
  const { login, user } = useApp()
  const router = useRouter()
  const [email,       setEmail]       = useState('')
  const [password,    setPassword]    = useState('')
  const [showPw,      setShowPw]      = useState(false)
  const [isInstaller, setIsInstaller] = useState(false)
  const [error,       setError]       = useState('')

  if (user) { router.push('/account'); return null }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) { setError('Please enter your email.'); return }
    const role = isInstaller ? 'installer' : 'customer'
    const name = isInstaller ? 'Alex Mercer' : (email.split('@')[0] || 'User')
    login({ id: '1', name, email, role } as any)
    router.push(isInstaller ? '/installer-dashboard' : '/account')
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#F7F5F2] px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-[#E5E2DE] p-8 md:p-10">

        <h1 className="text-3xl font-bold text-[#302D2A] mb-2">Welcome Back</h1>
        <p className="text-[#9C9790] mb-8">Please enter your details to login.</p>

        {error && (
          <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-[#302D2A]">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="border border-[#D4D0CB] p-3 text-sm focus:outline-none focus:border-[#C25E28] transition-colors bg-white text-[#302D2A] rounded"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-[#302D2A]">Password</label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full border border-[#D4D0CB] p-3 pr-10 text-sm focus:outline-none focus:border-[#C25E28] transition-colors bg-white text-[#302D2A] rounded"
              />
              <button type="button" onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9C9790] hover:text-[#302D2A]">
                {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
            <div className="flex justify-between items-center pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isInstaller}
                  onChange={e => setIsInstaller(e.target.checked)}
                  className="w-4 h-4 accent-[#C25E28] rounded cursor-pointer"
                />
                <span className="text-sm text-[#6B6760]">Login as Installer</span>
              </label>
              <Link href="/forgot-password" className="text-xs font-bold text-[#C25E28] hover:underline">
                Forgot Password?
              </Link>
            </div>
          </div>

          <button type="submit"
            className="w-full py-4 bg-[#C25E28] hover:bg-[#a64e21] text-white font-bold rounded-full transition-colors shadow-lg shadow-[#C25E28]/20 uppercase tracking-wide text-sm">
            Login
          </button>

          <div className="text-center pt-4 border-t border-[#E5E2DE]">
            <p className="text-sm text-[#9C9790]">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="font-bold text-[#C25E28] hover:underline">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
