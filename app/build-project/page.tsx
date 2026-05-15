'use client'

import React, { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle2, Hammer, PenTool, Upload } from 'lucide-react'
import { Button, Input } from '@/components/ui/Forms'

const SERVICES = ['Kitchen Installation', 'Bathroom Installation', 'Flooring', 'Painting & Decorating', 'Electrical', 'Plumbing', 'Garden & Landscaping', 'General Building', 'Other']

function InquiryContent() {
  const searchParams = useSearchParams()
  const mode = searchParams.get('mode') || 'build'
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', service: '', budget: '', timeline: '', description: '' })
  const [submitted, setSubmitted] = useState(false)
  const isBuild = mode === 'build'

  if (submitted) {
    return (
      <div className="w-full px-4 md:px-12 py-20 text-center max-w-md mx-auto">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} className="text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-brand-offBlack mb-3">Request Submitted!</h1>
        <p className="text-neutral-dark mb-6">Our team will review your project and get back to you within 24 hours.</p>
        <Button onClick={() => setSubmitted(false)} variant="secondary">Submit Another Request</Button>
      </div>
    )
  }

  return (
    <div className="w-full px-4 md:px-12 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full bg-brand-orange/10 flex items-center justify-center mx-auto mb-4">
            {isBuild ? <PenTool size={28} className="text-brand-orange" /> : <Hammer size={28} className="text-brand-orange" />}
          </div>
          <h1 className="text-3xl font-bold text-brand-offBlack mb-3">
            {isBuild ? 'Build Your Project' : 'Inquire Now'}
          </h1>
          <p className="text-neutral-dark">
            {isBuild
              ? 'Tell us about your project and our experts will help you plan and source everything you need.'
              : 'Get in touch with our team for pricing, availability, or bespoke solutions.'}
          </p>
        </div>

        <form onSubmit={e => { e.preventDefault(); setSubmitted(true) }} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input label="Full Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="John Smith" required />
            <Input label="Email Address" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@example.com" required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input label="Phone Number" type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+44 7700 000000" />
            <Input label="Project Address" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} placeholder="London, SW1A 1AA" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-brand-offBlack">Service Required</label>
            <select className="border border-neutral-light p-3 text-sm focus:border-brand-orange focus:outline-none bg-white" value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))} required>
              <option value="">Select a service...</option>
              {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-brand-offBlack">Estimated Budget</label>
              <select className="border border-neutral-light p-3 text-sm focus:border-brand-orange focus:outline-none bg-white" value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}>
                <option value="">Select range...</option>
                {['Under £1,000', '£1,000 – £5,000', '£5,000 – £20,000', '£20,000 – £50,000', '£50,000+'].map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-brand-offBlack">Timeline</label>
              <select className="border border-neutral-light p-3 text-sm focus:border-brand-orange focus:outline-none bg-white" value={form.timeline} onChange={e => setForm(f => ({ ...f, timeline: e.target.value }))}>
                <option value="">Select timeline...</option>
                {['ASAP', 'Within 1 month', '1–3 months', '3–6 months', '6+ months'].map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-brand-offBlack">Project Description</label>
            <textarea rows={5} className="border border-neutral-light p-3 text-sm focus:border-brand-orange focus:outline-none bg-white resize-none" placeholder="Describe your project in detail..." value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
          </div>
          <div>
            <label className="text-sm font-bold text-brand-offBlack block mb-2">Attachments (Optional)</label>
            <div className="border-2 border-dashed border-neutral-lighter rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-brand-orange hover:bg-brand-offWhite transition-colors">
              <Upload className="text-neutral-light mb-3" size={28} />
              <span className="font-bold text-brand-orange text-sm">Click to upload</span>
              <span className="text-xs text-neutral mt-1">Plans, photos, or documents (PDF, JPG, PNG up to 10MB)</span>
            </div>
          </div>
          <Button type="submit" className="w-full text-base py-4">Submit Request</Button>
        </form>
      </div>
    </div>
  )
}

export default function InquiryPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-neutral">Loading...</div>}>
      <InquiryContent />
    </Suspense>
  )
}
