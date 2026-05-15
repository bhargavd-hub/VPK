'use client'

import { MessageCircle, Upload, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { Button, Input } from '@/components/ui/Forms'

export default function InquirePage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="w-full px-4 md:px-12 py-20 text-center max-w-md mx-auto">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} className="text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-brand-offBlack mb-3">Enquiry Received!</h1>
        <p className="text-neutral-dark mb-6">Our team will get back to you within 1 business day.</p>
        <Button onClick={() => setSubmitted(false)} variant="secondary">Send Another</Button>
      </div>
    )
  }

  return (
    <div className="w-full px-4 md:px-12 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full bg-brand-orange/10 flex items-center justify-center mx-auto mb-4">
            <MessageCircle size={28} className="text-brand-orange" />
          </div>
          <h1 className="text-3xl font-bold text-brand-offBlack mb-3">Inquire Now</h1>
          <p className="text-neutral-dark">Get in touch with the VPK team for pricing, availability, bulk orders, or bespoke solutions.</p>
        </div>

        <form onSubmit={e => { e.preventDefault(); setSubmitted(true) }} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input label="Full Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="John Smith" required />
            <Input label="Email Address" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@company.com" required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input label="Phone Number" type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+44 7700 000000" />
            <Input label="Company (Optional)" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} placeholder="Your company name" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-brand-offBlack">Subject</label>
            <select className="border border-neutral-light p-3 text-sm focus:border-brand-orange focus:outline-none bg-white" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} required>
              <option value="">Select a subject...</option>
              {['Product Enquiry', 'Bulk / Trade Order', 'Installation Quote', 'Partnership / Wholesale', 'Returns & Refunds', 'Other'].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-brand-offBlack">Message</label>
            <textarea rows={6} className="border border-neutral-light p-3 text-sm focus:border-brand-orange focus:outline-none bg-white resize-none" placeholder="Please provide as much detail as possible..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required />
          </div>
          <div>
            <label className="text-sm font-bold text-brand-offBlack block mb-2">Attachments (Optional)</label>
            <div className="border-2 border-dashed border-neutral-lighter rounded-lg p-6 flex flex-col items-center text-center cursor-pointer hover:border-brand-orange hover:bg-brand-offWhite transition-colors">
              <Upload className="text-neutral-light mb-2" size={24} />
              <span className="font-bold text-brand-orange text-sm">Click to upload</span>
              <span className="text-xs text-neutral mt-1">PDF, JPG, PNG up to 10MB</span>
            </div>
          </div>
          <Button type="submit" className="w-full text-base py-4">Send Enquiry</Button>
        </form>
      </div>
    </div>
  )
}
