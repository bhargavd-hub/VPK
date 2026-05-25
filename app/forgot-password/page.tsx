'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Mail } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email,     setEmail]     = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-[#F7F5F2] px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-[#E5E2DE] p-8 md:p-10">

        <h1 className="text-3xl font-bold text-[#302D2A] mb-2">Forgot Password</h1>
        <p className="text-[#9C9790] mb-8">
          Enter your registered email address to receive a reset link.
        </p>

        {submitted ? (
          /* ── Success state ── */
          <div className="bg-green-50 border border-green-200 rounded-lg p-5 animate-fade-in">
            <p className="font-bold text-green-700 mb-1">Check your email</p>
            <p className="text-sm text-green-600">
              You will receive a forgot password link on registered email.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 w-full py-4 bg-[#C25E28] hover:bg-[#a64e21] text-white font-bold rounded-full transition-colors uppercase tracking-wide text-sm shadow-lg shadow-[#C25E28]/20"
            >
              Back to Forgot Password
            </button>
          </div>
        ) : (
          /* ── Form ── */
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-[#302D2A]">
                Registered Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="border border-[#D4D0CB] p-3 text-sm focus:outline-none focus:border-[#C25E28] transition-colors bg-white text-[#302D2A] rounded"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#C25E28] hover:bg-[#a64e21] text-white font-bold rounded-full transition-colors uppercase tracking-wide text-sm shadow-lg shadow-[#C25E28]/20"
            >
              Send
            </button>

            <div className="text-center pt-2">
              <Link href="/login" className="text-sm font-bold text-[#C25E28] hover:underline">
                Back to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
