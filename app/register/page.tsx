'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ChevronRight, ChevronDown, Eye, EyeOff, ArrowLeft,
  Check, X, PlusCircle, Wrench, Zap, Brush, ShieldCheck,
  CreditCard, Globe, Flag, Home as HomeIcon, Star,
} from 'lucide-react'
import { useApp } from '@/lib/context'
import { SKILL_GROUPS } from '@/lib/constants'

/* ─── skill icon map ─── */
const ICON_MAP: Record<string, React.ElementType> = {
  Brush, Hammer: Wrench, Box: CreditCard, Truck: HomeIcon,
}

/* ─── account types ─── */
const ACCOUNT_TYPES = [
  { id: 'normal',    title: 'Standard Account', desc: 'For regular customers shopping for personal use.' },
  { id: 'trader',    title: 'Trade Account',     desc: 'For businesses and professionals with trade benefits.' },
  { id: 'seller',    title: 'Sellers Account',   desc: 'For vendors looking to sell products on our platform.' },
  { id: 'installer', title: 'Join the team',     desc: 'For certified professionals, consultants & trade contractors.' },
]

export default function RegisterPage() {
  const { login, user } = useApp()
  const router = useRouter()

  /* global state */
  const [accountType,      setAccountType]      = useState<string | null>(null)
  const [step,             setStep]             = useState(1)
  const [error,            setError]            = useState<string | null>(null)

  /* installer form fields */
  const [firstName,        setFirstName]        = useState('')
  const [lastName,         setLastName]         = useState('')
  const [email,            setEmail]            = useState('')
  const [phone,            setPhone]            = useState('')
  const [postalCode,       setPostalCode]       = useState('')
  const [showPw,           setShowPw]           = useState(false)
  const [showCp,           setShowCp]           = useState(false)
  const [isAgreed,         setIsAgreed]         = useState(false)
  const [isSoleTrader,     setIsSoleTrader]     = useState(false)
  const [isReferralOpen,   setIsReferralOpen]   = useState(false)
  const [noPromo,          setNoPromo]          = useState(false)
  const [showConfirmPopup, setShowConfirmPopup] = useState(false)

  /* skills */
  const [selectedSkills,   setSelectedSkills]   = useState<string[]>([])
  const [expandedGroups,   setExpandedGroups]   = useState<string[]>(SKILL_GROUPS.slice(0,2).map(g => g.title))
  const [currentSkill,     setCurrentSkill]     = useState<any>(null)

  /* standard/trade/seller form */
  const [stdForm, setStdForm] = useState({ name:'', company:'', email:'', password:'', confirm:'' })

  if (user) { router.push('/account'); return null }

  const doLogin = (extra?: any) => {
    login({ id: Date.now().toString(), name: firstName || stdForm.name || 'User', email: email || stdForm.email || 'user@example.com', role: accountType === 'installer' ? 'installer' : 'customer', type: accountType, ...extra } as any)
    router.push(accountType === 'installer' ? '/installer-dashboard' : '/account')
  }

  const toggleSkill = (name: string) => setSelectedSkills(p => p.includes(name) ? p.filter(s => s !== name) : [...p, name])
  const toggleGroup = (title: string) => setExpandedGroups(p => p.includes(title) ? p.filter(t => t !== title) : [...p, title])

  /* ═══════════════ ACCOUNT TYPE SELECTION ═══════════════ */
  if (!accountType) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#F7F5F2] px-4 py-12">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-[#E5E2DE] p-8 md:p-10">
          <h1 className="text-3xl font-bold text-[#302D2A] mb-2 text-center">Create Account</h1>
          <p className="text-[#9C9790] mb-8 text-center">Select the Account Type</p>
          <div className="space-y-4">
            {ACCOUNT_TYPES.map(({ id, title, desc }) => (
              <button key={id} onClick={() => { setAccountType(id); setStep(1) }}
                className="w-full flex items-center justify-between p-4 border border-[#E5E2DE] rounded-xl hover:border-[#C25E28] hover:bg-[#C25E28]/5 transition-all group text-left">
                <div>
                  <h3 className="font-bold text-[#302D2A] group-hover:text-[#C25E28] transition-colors">{title}</h3>
                  <p className="text-sm text-[#9C9790] mt-0.5">{desc}</p>
                </div>
                <ChevronRight size={20} className="text-[#9C9790] group-hover:text-[#C25E28] flex-shrink-0 ml-3 transition-colors" />
              </button>
            ))}
          </div>
          <div className="text-center pt-6 border-t border-[#E5E2DE] mt-8">
            <p className="text-sm text-[#9C9790]">Already have an account?{' '}
              <Link href="/login" className="font-bold text-[#C25E28] hover:underline">Login</Link>
            </p>
          </div>
        </div>
      </div>
    )
  }

  /* ═══════════════ STANDARD / TRADE / SELLER ═══════════════ */
  if (accountType !== 'installer') {
    const typeLabel = ACCOUNT_TYPES.find(t => t.id === accountType)?.title ?? ''
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      if (!stdForm.email || !stdForm.password) { setError('Please fill in all required fields.'); return }
      if (stdForm.password !== stdForm.confirm) { setError('Passwords do not match.'); return }
      doLogin()
    }
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#F7F5F2] px-4 py-12">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-[#E5E2DE] p-8 md:p-10">
          <div className="flex items-center mb-8">
            <button onClick={() => setAccountType(null)} className="text-[#9C9790] hover:text-[#C25E28] transition-colors mr-4">
              <ArrowLeft size={22} />
            </button>
            <h1 className="text-2xl font-bold text-[#302D2A]">{typeLabel}</h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <SF label="Full Name"       value={stdForm.name}     onChange={v => setStdForm(f=>({...f,name:v}))}     placeholder="Enter your full name" required />
            {accountType !== 'normal' && <SF label="Company Name" value={stdForm.company} onChange={v => setStdForm(f=>({...f,company:v}))} placeholder="Enter your company name" required />}
            <SF label="Email Address"   type="email"     value={stdForm.email}    onChange={v => setStdForm(f=>({...f,email:v}))}    placeholder="Enter your email" required />
            <SF label="Password"        type="password"  value={stdForm.password} onChange={v => setStdForm(f=>({...f,password:v}))} placeholder="Create a password" required />
            <SF label="Confirm Password" type="password" value={stdForm.confirm}  onChange={v => setStdForm(f=>({...f,confirm:v}))}  placeholder="Confirm your password" required />
            {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
            <button type="submit" className="w-full py-4 bg-[#C25E28] hover:bg-[#a64e21] text-white font-bold rounded-full transition-colors shadow-lg shadow-[#C25E28]/20 uppercase tracking-wide text-sm mt-4">
              Register
            </button>
            <div className="text-center pt-4 border-t border-[#E5E2DE] mt-4">
              <p className="text-sm text-[#9C9790]">Already have an account?{' '}
                <Link href="/login" className="font-bold text-[#C25E28] hover:underline">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    )
  }

  /* ═══════════════ INSTALLER STEPS ═══════════════ */

  /* Step 1 — Basic info */
  if (step === 1) {
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setStep(2) }
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#F7F5F2] px-4 py-12">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-[#E5E2DE] p-8 md:p-10">
          <div className="flex items-center mb-8">
            <button onClick={() => setAccountType(null)} className="text-[#9C9790] hover:text-[#C25E28] mr-4"><ArrowLeft size={22} /></button>
            <h1 className="text-2xl font-bold text-[#302D2A]">Installer Account</h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <BF label="First Name" value={firstName} onChange={setFirstName} placeholder="First Name" />
              <BF label="Surname"    value={lastName}  onChange={setLastName}  placeholder="Surname" />
            </div>
            <BF label="Email" type="email" value={email} onChange={setEmail} placeholder="Email" />
            <BFPw label="Password" showPw={showPw} setShowPw={setShowPw} placeholder="Password" />
            <BFPw label="Confirm Password" showPw={showCp} setShowPw={setShowCp} placeholder="Confirm Password" />
            <button type="button" onClick={() => setIsReferralOpen(!isReferralOpen)}
              className="flex items-center justify-between w-full text-[#C25E28] font-bold py-2">
              <span>Add referral code</span>
              <ChevronRight size={18} className={`transition-transform ${isReferralOpen ? 'rotate-90' : ''}`} />
            </button>
            {isReferralOpen && <BF label="" value="" onChange={() => {}} placeholder="Enter code" />}
            <div className="space-y-4 pt-2">
              <Checkbox checked={isAgreed} onChange={setIsAgreed}>
                I agree to the <Link href="/terms" className="text-[#C25E28] hover:underline font-bold">Terms of Service</Link>.
              </Checkbox>
              <Checkbox checked={isSoleTrader} onChange={setIsSoleTrader}>
                I am a <span className="text-[#C25E28] font-bold">sole trader</span> or other business entity.
              </Checkbox>
            </div>
            <div className="pt-6 text-center space-y-5">
              <Link href="/login" className="block text-[#C25E28] font-bold text-base hover:underline">Log in to existing account</Link>
              <button type="submit" className="w-full py-5 bg-[#C25E28] hover:bg-[#a64e21] text-white font-bold rounded-full transition-colors shadow-lg text-lg">
                Create my Tasker Account
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  /* Step 2 — Phone */
  if (step === 2) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#F7F5F2] px-4 py-12">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-[#E5E2DE] p-8 md:p-10">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-[#302D2A] mb-3">Hey {firstName || 'there'}!</h1>
            <p className="text-[#9C9790] text-lg">Great to have you on board. Where should we send task notifications?</p>
          </div>
          <form onSubmit={e => { e.preventDefault(); setStep(3) }} className="space-y-10">
            <div className="flex items-end gap-3">
              <div className="flex items-center gap-2 border border-[#D4D0CB] rounded-full px-4 h-[52px] flex-shrink-0">
                <span className="text-xl">🇬🇧</span>
                <span className="font-bold text-[#302D2A]">+44</span>
                <ChevronDown size={16} className="text-[#9C9790]" />
              </div>
              <div className="flex-1 border-b border-[#D4D0CB] pb-1">
                <label className="text-xs font-bold text-[#9C9790] block">Phone number</label>
                <div className="flex items-center">
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                    placeholder="07572813039" className="text-lg py-1 focus:outline-none bg-transparent w-full text-[#302D2A]" />
                  {phone && <button type="button" onClick={() => setPhone('')}><X size={18} className="text-[#9C9790]" /></button>}
                </div>
              </div>
            </div>
            <Checkbox checked={noPromo} onChange={setNoPromo}>
              I do not want to receive promotional communications from VPK.
            </Checkbox>
            <div className="pt-16">
              <button type="submit" className="w-full py-5 bg-[#C25E28] hover:bg-[#a64e21] text-white font-bold rounded-full text-xl transition-colors shadow-lg">
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  /* Step 3 — Postal code */
  if (step === 3) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#F7F5F2] px-4 py-12">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-[#E5E2DE] p-8 md:p-10">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-[#302D2A] mb-3">Awesome!</h1>
            <p className="text-[#9C9790] text-lg">Now, tell us where you want to work.</p>
          </div>
          <form onSubmit={e => { e.preventDefault(); setStep(4) }} className="space-y-12">
            <div className="border-b border-[#D4D0CB] pb-1">
              <label className="text-xs font-bold text-[#9C9790] block">Postal Code</label>
              <input className="text-lg py-1 focus:outline-none bg-transparent w-full text-[#302D2A]" placeholder="e.g. SW1A 1AA"
                value={postalCode} onChange={e => setPostalCode(e.target.value)} />
            </div>
            <div className="pt-28">
              <button type="submit" className="w-full py-5 bg-[#C25E28] hover:bg-[#a64e21] text-white font-bold rounded-full text-xl transition-colors shadow-lg">
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  /* Step 4 — Find skills intro */
  if (step === 4) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center">
        <div className="w-full px-6 md:px-16 py-12 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 flex-1">
          {/* Illustration */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="w-64 h-64 md:w-80 md:h-80 bg-[#f5fbf9] rounded-[40px] relative flex items-center justify-center">
              <div className="w-44 h-56 bg-white border-2 border-[#4fc3a1] rounded-2xl shadow-xl relative z-10 -translate-x-4">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-3 bg-[#4fc3a1] rounded-full" />
                <div className="p-6 space-y-7 pt-10">
                  {[1,2,3].map(i => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-7 h-7 border-2 border-[#f28e2c] rounded flex items-center justify-center flex-shrink-0">
                        <Check size={14} className="text-[#f28e2c]" />
                      </div>
                      <div className="h-3 bg-[#E5E2DE] rounded flex-1" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left max-w-xl">
            <button onClick={() => setStep(3)} className="mb-10 text-[#9C9790] hover:text-[#302D2A] self-start">
              <ArrowLeft size={30} />
            </button>
            <h1 className="text-4xl md:text-5xl font-bold text-[#302D2A] mb-6 leading-tight">
              Next, let's find the right opportunities for your skills.
            </h1>
            <p className="text-[#9C9790] text-xl mb-12 leading-relaxed">
              We offer a variety of skills, but the skills you can sign up for are the ones Clients in{' '}
              <span className="text-[#C25E28] font-bold underline">{postalCode || 'London'}</span> need most.
            </p>
            <button onClick={() => setStep(5)}
              className="w-full md:w-auto px-14 py-5 bg-[#C25E28] hover:bg-[#a64e21] text-white font-bold text-xl rounded-full transition-all shadow-xl hover:scale-105 active:scale-95">
              View Skills
            </button>
          </div>
        </div>
      </div>
    )
  }

  /* Step 5 — Skills selection */
  if (step === 5) {
    return (
      <div className="min-h-screen bg-[#f9fafb] flex flex-col pb-32">
        {/* Sticky header */}
        <div className="w-full bg-white border-b border-[#E5E2DE] sticky top-0 z-30">
          <div className="w-full px-6 md:px-12 py-4 flex items-center justify-between">
            <button onClick={() => setStep(4)} className="text-[#9C9790] hover:text-[#302D2A]"><ArrowLeft size={22} /></button>
            <h1 className="text-xl font-bold text-center flex-1">View skills</h1>
            <span className="text-sm font-bold text-[#C25E28] w-24 text-right">{selectedSkills.length} selected</span>
          </div>
        </div>
        <div className="w-full px-6 md:px-12 py-10">
          <h2 className="text-3xl font-bold text-[#302D2A] mb-2">Which skills do you have?</h2>
          <p className="text-[#9C9790] text-lg mb-10">Select all that apply to see available tasks in your area.</p>
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Sidebar */}
            <div className="hidden lg:block w-64 flex-shrink-0 sticky top-24 h-fit">
              <div className="bg-white rounded-2xl shadow-sm border border-[#E5E2DE] p-5">
                <h3 className="text-xs font-bold text-[#9C9790] uppercase tracking-widest mb-5 px-2">Categories</h3>
                <nav className="space-y-1">
                  {SKILL_GROUPS.map(g => (
                    <button key={g.title} onClick={() => toggleGroup(g.title)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-base font-bold transition-all ${expandedGroups.includes(g.title) ? 'bg-[#C25E28]/10 text-[#C25E28]' : 'text-[#302D2A] hover:bg-[#F7F5F2]'}`}>
                      {g.title}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
            {/* Groups */}
            <div className="flex-1 space-y-6">
              {SKILL_GROUPS.map(group => {
                const IconComp = ICON_MAP[group.icon] || Wrench
                const expanded = expandedGroups.includes(group.title)
                return (
                  <div key={group.title} className="bg-white rounded-3xl shadow-sm border border-[#E5E2DE] overflow-hidden">
                    <button onClick={() => toggleGroup(group.title)}
                      className="w-full px-8 py-6 flex items-center justify-between hover:bg-[#F7F5F2]/50 transition-colors">
                      <div className="flex items-center gap-5">
                        <div className="text-[#302D2A] bg-[#F7F5F2] p-3 rounded-2xl"><IconComp size={28} /></div>
                        <span className="text-2xl font-bold text-[#302D2A]">{group.title}</span>
                      </div>
                      <ChevronDown size={26} className={`text-[#302D2A] transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
                    </button>
                    {expanded && (
                      <div className="px-8 pb-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                          {group.skills.map(skill => {
                            const selected = selectedSkills.includes(skill.name)
                            return (
                              <div key={skill.id} onClick={() => { setCurrentSkill(skill); setStep(6) }}
                                className={`p-6 rounded-[24px] border-2 transition-all cursor-pointer flex flex-col min-h-[200px] relative ${selected ? 'border-[#4fc3a1] bg-[#f5fbf9]' : 'border-[#E5E2DE] bg-white hover:border-[#C25E28]/30 shadow-sm'}`}>
                                <div className="pr-12">
                                  <h4 className="text-xl font-bold text-[#302D2A] mb-2 hover:text-[#C25E28]">{skill.name}</h4>
                                  <p className="text-[#9C9790] text-sm leading-relaxed mb-4">{skill.description}</p>
                                  {skill.inDemand && (
                                    <span className="inline-block bg-[#4d4d4d] text-white text-xs font-bold px-2.5 py-1 rounded tracking-wide">IN DEMAND</span>
                                  )}
                                </div>
                                <div className={`absolute right-6 top-10 transition-all duration-300 ${selected ? 'text-[#4fc3a1] scale-110' : 'text-[#D4D0CB] hover:text-[#C25E28]'}`}
                                  onClick={e => { e.stopPropagation(); toggleSkill(skill.name) }}>
                                  <PlusCircle size={36} className={selected ? 'fill-[#4fc3a1] text-white' : ''} />
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        {/* Fixed bottom bar */}
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-[#E5E2DE] shadow-2xl z-40 py-5 px-6 md:px-12 flex items-center justify-between">
          <p className="hidden md:block font-bold text-xl text-[#302D2A]">{selectedSkills.length} {selectedSkills.length === 1 ? 'skill' : 'skills'} selected</p>
          <button onClick={() => setStep(7)} className="w-full md:w-auto px-16 py-4 bg-[#C25E28] hover:bg-[#a64e21] text-white font-bold text-lg rounded-full transition-all shadow-lg">
            Continue
          </button>
        </div>
      </div>
    )
  }

  /* Step 6 — Skill detail */
  if (step === 6 && currentSkill) {
    return (
      <div className="min-h-screen bg-white pb-24">
        <div className="w-full px-6 md:px-12 py-10 md:py-16 flex flex-col gap-10">
          <h1 className="text-4xl md:text-5xl font-bold text-[#302D2A] text-center">{currentSkill.name}</h1>
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-1 space-y-10">
              <section>
                <h2 className="text-2xl font-bold text-[#302D2A] mb-6">Skills and tools clients expect</h2>
                <ul className="space-y-4 mb-8">
                  {currentSkill.expectations?.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-3"><span className="mt-2 w-1.5 h-1.5 bg-[#302D2A] rounded-full flex-shrink-0" /><p className="text-[#302D2A] text-base leading-relaxed">{item}</p></li>
                  ))}
                </ul>
                <div className="bg-[#C25E28]/5 p-8 rounded-3xl border border-[#C25E28]/10">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3">
                    {currentSkill.tools?.map((t: string, i: number) => (
                      <li key={i} className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 bg-[#302D2A] rounded-full flex-shrink-0" /><span className="text-[#302D2A]">{t}</span></li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>
            <div className="lg:w-96 space-y-8">
              <section className="p-7 bg-[#F7F5F2] rounded-3xl border border-[#E5E2DE]">
                <h2 className="text-xl font-bold text-[#302D2A] mb-5">Additional skills and tools</h2>
                <ul className="space-y-3 mb-6">
                  {currentSkill.additionalExpectations?.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 bg-[#302D2A] rounded-full flex-shrink-0" /><p className="text-[#302D2A] text-sm">{item}</p></li>
                  ))}
                </ul>
                <div className="bg-[#C25E28]/5 p-5 rounded-2xl border border-[#C25E28]/10">
                  <ul className="space-y-2">
                    {currentSkill.additionalTools?.map((t: string, i: number) => (
                      <li key={i} className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 bg-[#302D2A] rounded-full flex-shrink-0" /><span className="text-[#302D2A] font-bold text-sm">{t}</span></li>
                    ))}
                  </ul>
                </div>
              </section>
              <div className="flex flex-col gap-3 sticky top-28">
                <button onClick={() => { if (!selectedSkills.includes(currentSkill.name)) toggleSkill(currentSkill.name); setStep(5) }}
                  className="w-full py-5 bg-[#C25E28] hover:bg-[#a64e21] text-white font-bold text-xl rounded-2xl transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98]">
                  Got It
                </button>
                <button onClick={() => setStep(5)} className="w-full py-3 text-[#C25E28] font-bold text-lg hover:underline">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  /* Step 7 — Skills celebration */
  if (step === 7) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden px-6 py-16">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="absolute opacity-50 animate-bounce"
              style={{ top:`${Math.random()*100}%`, left:`${Math.random()*100}%`, width:`${Math.random()*18+8}px`, height:`${Math.random()*8+4}px`, backgroundColor:['#C25E28','#f5b169','#a64e21','#302D2A','#6B6760'][Math.floor(Math.random()*5)], transform:`rotate(${Math.random()*360}deg)`, animationDelay:`${Math.random()*2}s` }} />
          ))}
        </div>
        <div className="w-full max-w-3xl flex flex-col items-center text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-[#302D2A] mb-5">A solid choice of skills 🙌</h1>
          <p className="text-xl md:text-2xl text-[#9C9790] mb-14 max-w-xl">
            This week, Clients in <span className="font-bold underline text-[#C25E28]">{postalCode || 'London'}</span> requested...
          </p>
          <div className="w-full max-w-xl space-y-9 mb-18">
            {[{icon: Wrench, text: '3,017 IKEA Assembly jobs'},{icon: Zap, text: '598 Electrical Help jobs'},{icon: Brush, text: '1,073 Cleaning jobs'}].map(({icon: Icon, text}) => (
              <div key={text} className="flex items-center gap-7">
                <div className="bg-[#C25E28]/10 p-4 rounded-2xl text-[#C25E28] flex-shrink-0"><Icon size={36} /></div>
                <span className="text-2xl md:text-3xl font-bold text-[#302D2A]">{text}</span>
              </div>
            ))}
          </div>
          <button onClick={() => setStep(8)} className="mt-14 w-full md:w-auto px-20 py-5 bg-[#C25E28] hover:bg-[#a64e21] text-white font-bold text-xl rounded-full transition-all shadow-xl hover:scale-105 active:scale-95">
            Continue
          </button>
        </div>
      </div>
    )
  }

  /* Step 8 — Verify identity */
  if (step === 8) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center py-12 px-6">
        <div className="w-full max-w-lg">
          <div className="text-center mb-10">
            <p className="text-xl text-[#302D2A] font-medium mb-2">One last thing:</p>
            <h1 className="text-4xl md:text-5xl font-bold text-[#302D2A]">Verify your identity</h1>
          </div>
          <div className="bg-[#f8f9f8] rounded-3xl p-7 mb-10 flex items-center gap-6 shadow-sm border border-[#E5E2DE]">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md flex-shrink-0">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#302D2A] mb-1">{firstName || 'Emma'} S.</h2>
              <div className="flex items-center gap-2 mb-1">
                <Star size={18} className="text-[#C25E28] fill-[#C25E28]" />
                <span className="font-bold text-[#302D2A]">4.9 (42 reviews)</span>
              </div>
              <p className="text-[#9C9790] mb-2">82 overall jobs</p>
              <div className="flex items-center gap-2 text-[#C25E28]">
                <div className="bg-[#C25E28] text-white p-0.5 rounded-full"><Check size={12} strokeWidth={4} /></div>
                <span className="font-bold text-sm">ID Verified</span>
              </div>
            </div>
          </div>
          <p className="text-base font-medium text-[#302D2A] mb-4">This gives Clients confidence to hire Taskers like you. We'll ask you for:</p>
          <ul className="space-y-2 text-base text-[#302D2A] mb-12">
            {['DOB, and full address','A government-issued photo ID document'].map((item, i) => (
              <li key={i} className="flex items-start gap-3"><span className="mt-2 w-1.5 h-1.5 bg-[#302D2A] rounded-full flex-shrink-0" /><span>{item}</span></li>
            ))}
          </ul>
          <div className="space-y-4">
            <button onClick={() => setStep(9)} className="w-full py-5 bg-[#C25E28] hover:bg-[#a64e21] text-white font-bold text-xl rounded-full transition-all shadow-lg hover:scale-105 active:scale-95">
              Verify me now
            </button>
            <button onClick={() => doLogin()} className="w-full py-5 border-2 border-[#C25E28] text-[#C25E28] font-bold text-xl rounded-full hover:bg-[#C25E28]/5 transition-all">
              Skip for now
            </button>
          </div>
        </div>
      </div>
    )
  }

  /* Step 9 — Payment account setup */
  if (step === 9) {
    return (
      <div className="min-h-screen bg-[#F7F5F2] flex flex-col items-center py-12 px-4">
        <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl border border-[#E5E2DE] p-8 md:p-12">
          <h1 className="text-2xl font-bold text-[#302D2A] mb-4 leading-tight">Let's set up your payment account! Details should match your bank.</h1>
          <button className="text-[#C25E28] font-bold mb-10 hover:underline flex items-center gap-1">Why do we need this?</button>
          <form onSubmit={e => { e.preventDefault(); setShowConfirmPopup(true) }} className="space-y-7">
            {[{label:'First name',placeholder:'Patrik'},{label:'Last name',placeholder:'Bohdanyuk'},{label:'Street number and name',placeholder:'Street number and name'}].map(f => (
              <div key={f.label} className="border-b border-[#D4D0CB] pb-1">
                <label className="text-xs font-medium text-[#9C9790]">{f.label}</label>
                <input type="text" placeholder={f.placeholder} className="text-xl py-1 focus:outline-none bg-transparent text-[#302D2A] w-full" />
              </div>
            ))}
            <div className="border-b border-[#D4D0CB] pb-1">
              <label className="text-xs font-medium text-[#9C9790]">Date of birth</label>
              <div className="flex justify-between items-center">
                <input type="text" placeholder="Date of birth" className="text-xl py-1 focus:outline-none bg-transparent text-[#302D2A] w-full" />
                <ChevronDown size={22} className="text-[#C25E28]" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[{l:'Apt / suite',p:'Apt / suite'},{l:'City',p:'City'}].map(f => (
                <div key={f.l} className="border-b border-[#D4D0CB] pb-1">
                  <label className="text-xs font-medium text-[#9C9790]">{f.l}</label>
                  <input type="text" placeholder={f.p} className="text-xl py-1 focus:outline-none bg-transparent text-[#302D2A] w-full" />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[{l:'Zipcode',p:'Zipcode'},{l:'County',p:'County'}].map(f => (
                <div key={f.l} className="border-b border-[#D4D0CB] pb-1">
                  <label className="text-xs font-medium text-[#9C9790]">{f.l}</label>
                  <input type="text" placeholder={f.p} className="text-xl py-1 focus:outline-none bg-transparent text-[#302D2A] w-full" />
                </div>
              ))}
            </div>
            <div className="flex items-start gap-3 py-3">
              <ShieldCheck size={26} className="text-[#C25E28] flex-shrink-0 mt-0.5" />
              <p className="text-[#C25E28] font-medium leading-relaxed">Your personal information is securely stored and kept confidential.</p>
            </div>
            <button type="submit" className="w-full py-5 bg-[#C25E28] hover:bg-[#a64e21] text-white font-bold text-2xl rounded-full transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98]">
              Continue
            </button>
          </form>
        </div>
        {showConfirmPopup && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-[28px] shadow-2xl max-w-md w-full p-8 md:p-10">
              <h2 className="text-3xl font-black text-[#302D2A] text-center mb-3">Confirm your info</h2>
              <p className="text-[#9C9790] text-center mb-8 uppercase tracking-tight font-medium text-sm">Make sure your personal information is correct. For legal purposes, you will be unable to edit your legal name once it's submitted.</p>
              <div className="space-y-6 mb-8">
                {[{k:'Legal full name',v:'Patrik Bohdanyuk'},{k:'Date of birth',v:'2/8/2002'},{k:'Home address',v:'IG10 3RL, Loughton, England'}].map(({k,v}) => (
                  <div key={k}><p className="text-xs font-black text-[#9C9790] uppercase tracking-widest mb-1">{k}:</p><p className="text-xl font-bold text-[#302D2A]">{v}</p></div>
                ))}
              </div>
              <p className="font-bold text-[#302D2A] text-center mb-8 text-sm leading-snug">Once you confirm, you will be taken to a secure identity check. This will only take a few minutes.</p>
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => setShowConfirmPopup(false)} className="py-4 rounded-full font-bold border-2 border-[#C25E28] text-[#C25E28] hover:bg-[#C25E28]/5 transition-all text-lg">Edit</button>
                <button onClick={() => { setShowConfirmPopup(false); setStep(10) }} className="py-4 rounded-full font-bold bg-[#C25E28] hover:bg-[#a64e21] text-white shadow-lg transition-all text-lg">Confirm</button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  /* Step 10 — ID verification consent */
  if (step === 10) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-lg space-y-10">
          <h1 className="text-3xl font-bold text-[#302D2A] leading-tight">We need some information to help us confirm your identity.</h1>
          <div className="flex justify-center py-8">
            <div className="bg-[#004832] rounded-[40%] w-64 h-44 flex items-center justify-center relative shadow-inner overflow-hidden opacity-90">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
              <div className="flex gap-3 relative z-10">
                {[0,1].map(i => (
                  <div key={i} className={`w-20 h-14 bg-white rounded-lg shadow-lg border border-[#E5E2DE] p-2 flex flex-col gap-1 ${i === 0 ? '-rotate-6' : 'rotate-6 translate-y-2'}`}>
                    <div className="w-full h-1 bg-[#E5E2DE] rounded" />
                    <div className="w-2/3 h-1 bg-[#E5E2DE] rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-[#9C9790] leading-relaxed">By clicking the button below, you consent to Persona, our vendor, collecting and processing your biometric information to verify your identity. Your biometric information will be stored for no more than 3 years.</p>
          <button onClick={() => setStep(11)} className="w-full py-5 bg-[#C25E28] hover:bg-[#a64e21] text-white font-bold text-xl rounded-[18px] transition-all shadow-lg hover:scale-[1.02]">
            Begin verifying
          </button>
        </div>
      </div>
    )
  }

  /* Step 11 — ID country */
  if (step === 11) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-lg space-y-8">
          <h1 className="text-3xl font-bold text-[#302D2A] leading-tight">What country is your government ID from?</h1>
          <p className="text-[#9C9790] text-lg">This helps us determine the best way to verify your identity.</p>
          <div className="w-full p-4 border-2 border-[#E5E2DE] rounded-xl flex items-center justify-between cursor-pointer hover:border-[#C25E28] transition-colors">
            <span className="text-xl text-[#302D2A] font-medium">United Kingdom</span>
            <ChevronDown size={22} className="text-[#C25E28]" />
          </div>
          <button onClick={() => setStep(12)} className="w-full py-5 bg-[#C25E28] hover:bg-[#a64e21] text-white font-bold text-xl rounded-full transition-all shadow-lg hover:scale-[1.02]">
            Select
          </button>
        </div>
      </div>
    )
  }

  /* Step 12 — ID type */
  if (step === 12) {
    const ID_OPTIONS = [
      { label: 'Driver License',    icon: CreditCard },
      { label: 'Passport',          icon: Globe },
      { label: 'National ID',       icon: Flag },
      { label: 'Residency Permit',  icon: HomeIcon },
    ]
    return (
      <div className="min-h-screen bg-white flex flex-col items-center p-6 md:p-12">
        <div className="w-full max-w-lg space-y-8">
          <h1 className="text-3xl font-bold text-[#302D2A] leading-tight">Upload a photo ID</h1>
          <p className="text-[#9C9790] text-lg">We require a photo of a government ID to verify your identity.</p>
          <div className="pt-6">
            <p className="text-base font-medium text-[#302D2A] mb-4">Choose 1 of the following options</p>
            <div className="border-t border-[#E5E2DE]">
              {ID_OPTIONS.map(({ label, icon: Icon }) => (
                <button key={label} onClick={() => setStep(13)}
                  className="w-full flex items-center justify-between py-5 border-b border-[#E5E2DE] group hover:bg-[#F7F5F2] transition-colors px-2">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-[#C25E28]/10 flex items-center justify-center text-[#C25E28]"><Icon size={22} /></div>
                    <span className="text-lg font-bold text-[#302D2A]">{label}</span>
                  </div>
                  <ChevronRight size={22} className="text-[#D4D0CB] group-hover:text-[#C25E28] transition-colors" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  /* Step 13 — Almost there */
  if (step === 13) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-lg text-center space-y-10">
          <div className="flex justify-center">
            <div className="w-28 h-28 bg-[#C25E28]/10 rounded-full flex items-center justify-center text-[#C25E28] animate-pulse">
              <ShieldCheck size={56} />
            </div>
          </div>
          <h1 className="text-4xl font-black text-[#302D2A]">Almost there!</h1>
          <p className="text-[#9C9790] text-lg leading-relaxed">We're ready to verify your identity. This is the final step to activate your account and start receiving jobs.</p>
          <div className="pt-4">
            <button onClick={() => doLogin()} className="w-full py-5 bg-[#C25E28] hover:bg-[#a64e21] text-white font-bold text-2xl rounded-full transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98]">
              Verify &amp; Finish
            </button>
            <p className="mt-5 text-[#9C9790] text-sm">By clicking verify, you agree to our verification process and terms.</p>
          </div>
        </div>
      </div>
    )
  }

  return null
}

/* ─── small field helpers ─── */
function SF({ label, type='text', value, onChange, placeholder, required }: { label:string; type?:string; value:string; onChange:(v:string)=>void; placeholder?:string; required?:boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-bold text-[#302D2A]">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} required={required}
        className="border border-[#D4D0CB] p-3 text-sm focus:outline-none focus:border-[#C25E28] bg-white text-[#302D2A] rounded transition-colors" />
    </div>
  )
}
function BF({ label, type='text', value, onChange, placeholder }: { label:string; type?:string; value:string; onChange:(v:string)=>void; placeholder?:string }) {
  return (
    <div className="border-b border-[#D4D0CB] pb-1">
      {label && <label className="text-xs font-bold text-[#9C9790] block">{label}</label>}
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="text-lg py-1 focus:outline-none bg-transparent w-full text-[#302D2A]" />
    </div>
  )
}
function BFPw({ label, showPw, setShowPw, placeholder }: { label:string; showPw:boolean; setShowPw:(v:boolean)=>void; placeholder:string }) {
  return (
    <div className="border-b border-[#D4D0CB] pb-1 relative">
      <label className="text-xs font-bold text-[#9C9790] block">{label}</label>
      <input type={showPw ? 'text' : 'password'} placeholder={placeholder}
        className="text-lg py-1 focus:outline-none bg-transparent w-full pr-8 text-[#302D2A]" />
      <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-0 bottom-2 text-[#C25E28]">
        {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  )
}
function Checkbox({ checked, onChange, children }: { checked:boolean; onChange:(v:boolean)=>void; children:React.ReactNode }) {
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <div onClick={() => onChange(!checked)}
        className={`w-6 h-6 rounded flex items-center justify-center border-2 flex-shrink-0 mt-0.5 transition-all ${checked ? 'bg-[#C25E28] border-[#C25E28]' : 'border-[#D4D0CB] hover:border-[#C25E28]'}`}>
        {checked && <Check size={14} className="text-white" />}
      </div>
      <span className="text-sm text-[#302D2A] leading-tight">{children}</span>
    </label>
  )
}
