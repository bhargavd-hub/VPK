'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useApp } from '@/lib/context'
import { Button, Input } from '@/components/ui/Forms'

export default function RegisterPage() {
  const { login } = useApp()
  const router = useRouter()
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirm: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.firstName) e.firstName = 'Required'
    if (!form.lastName) e.lastName = 'Required'
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.password || form.password.length < 8) e.password = 'At least 8 characters'
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    login({ id: Date.now().toString(), name: `${form.firstName} ${form.lastName}`, email: form.email })
    router.push('/account')
  }

  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-brand-offBlack mb-2">Create Account</h1>
        <p className="text-neutral-dark mb-8">Join VPK to track orders, save favourites, and more.</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <Input label="First Name" value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} placeholder="John" error={errors.firstName} />
            <Input label="Last Name" value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} placeholder="Smith" error={errors.lastName} />
          </div>
          <Input label="Email Address" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@example.com" error={errors.email} />
          <Input label="Password" type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} placeholder="At least 8 characters" error={errors.password} />
          <Input label="Confirm Password" type="password" value={form.confirm} onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))} placeholder="Repeat password" error={errors.confirm} />
          <div className="flex items-start gap-2 text-sm text-neutral-dark">
            <input type="checkbox" className="accent-brand-orange mt-0.5" required />
            <span>I agree to the <a href="#" className="text-brand-orange hover:underline">Terms & Conditions</a> and <a href="#" className="text-brand-orange hover:underline">Privacy Policy</a></span>
          </div>
          <Button type="submit" className="w-full">Create Account</Button>
        </form>
        <p className="text-center text-sm text-neutral-dark mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-brand-orange font-bold hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  )
}
