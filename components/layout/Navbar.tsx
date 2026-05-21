'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ShoppingCart, User as UserIcon, Search, Menu, X,
  ChevronRight, ChevronDown, PenTool, Hammer, MessageCircle,
} from 'lucide-react'
import { CATEGORIES, CATEGORY_DATA } from '@/lib/constants'
import { useApp } from '@/lib/context'

/* ── VPK Logo ─────────────────────────────── */
const Logo = () => (
  <Link href="/" className="flex-shrink-0 select-none" aria-label="VPK Home">
    <div className="flex flex-col items-start leading-none">
      <span className="text-[22px] font-black tracking-tighter text-[#302D2A] leading-none">VP</span>
      <span className="text-[22px] font-black tracking-tighter text-[#302D2A] leading-none">K</span>
    </div>
  </Link>
)

/* ── Language Icon ────────────────────────── */
const LangIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
)

const LANGUAGES = [
  { code: 'EN', label: 'English'  },
  { code: 'FR', label: 'France'   },
  { code: 'DE', label: 'Germany'  },
  { code: 'IT', label: 'Italy'    },
  { code: 'ES', label: 'Spanish'  },
  { code: 'PL', label: 'Poland'   },
  { code: 'AR', label: 'Arabic'   },
]

export function Navbar() {
  const { cart } = useApp()
  const router   = useRouter()

  const [isMenuOpen,     setIsMenuOpen]     = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [searchQuery,    setSearchQuery]    = useState('')
  const [isLangOpen,     setIsLangOpen]     = useState(false)
  const [selectedLang,   setSelectedLang]   = useState('EN')

  const cartCount = cart.reduce((acc, i) => acc + i.quantity, 0)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) router.push(`/products?search=${encodeURIComponent(searchQuery)}`)
  }

  /* close mega-menu on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('#vpk-main-nav')) setActiveCategory(null)
    }
    if (activeCategory) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [activeCategory])

  /* close lang dropdown on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('#vpk-lang')) setIsLangOpen(false)
    }
    if (isLangOpen) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isLangOpen])

  return (
    <>
      {/* ═══════════════════════════════════════════
          STICKY WRAPPER
      ═══════════════════════════════════════════ */}
      <div className="sticky top-0 z-50 w-full shadow-sm">

        {/* ── Main Header ─────────────────────── */}
        <header className="bg-[#F7F5F2] border-b border-[#E5E2DE]">
          <div className="w-full px-6 md:px-10 xl:px-14">
            <div className="flex items-center h-[72px] gap-6">

              {/* ─ Mobile hamburger ─ */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="lg:hidden text-[#302D2A] p-1"
                aria-label="Open menu"
              >
                <Menu size={24} />
              </button>

              {/* ─ Logo ─ */}
              <Logo />

              {/* ─ Search bar (desktop) ─ */}
              <form
                onSubmit={handleSearch}
                className="hidden lg:flex flex-1 max-w-[520px] relative"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search products, categories, or projects..."
                  className="w-full pl-5 pr-14 py-2.5 rounded-full border border-[#D4D0CB] bg-white text-sm text-[#302D2A] placeholder:text-[#9C9790] focus:outline-none focus:border-[#C25E28] focus:ring-1 focus:ring-[#C25E28] transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-[5px] top-1/2 -translate-y-1/2 w-8 h-8 bg-[#C25E28] hover:bg-[#a64e21] rounded-full flex items-center justify-center transition-colors"
                >
                  <Search size={15} className="text-white" />
                </button>
              </form>

              {/* ─ Spacer pushes right side to edge ─ */}
              <div className="flex-1 lg:hidden" />

              {/* ─ Right-side icons + buttons ─ */}
              <div className="flex items-center gap-1 xl:gap-2">

                {/* Language */}
                <div id="vpk-lang" className="relative hidden md:block">
                  <button
                    onClick={() => setIsLangOpen(!isLangOpen)}
                    className="flex flex-col items-center gap-[3px] px-2 py-1 hover:bg-[#EEEBE8] rounded transition-colors min-w-[44px] group"
                  >
                    <LangIcon />
                    <span className="text-[9px] font-semibold text-[#302D2A] leading-none whitespace-nowrap tracking-wide">
                      {selectedLang}
                    </span>
                    <span className="text-[8px] text-[#6B6760] leading-none whitespace-nowrap">Language</span>
                  </button>
                  {isLangOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-36 bg-white border border-[#E5E2DE] shadow-xl rounded-lg overflow-hidden z-50">
                      {LANGUAGES.map(lang => (
                        <button
                          key={lang.code}
                          onClick={() => { setSelectedLang(lang.code); setIsLangOpen(false) }}
                          className={`w-full text-left px-4 py-2 text-xs transition-colors hover:bg-[#F7F5F2] ${selectedLang === lang.code ? 'font-bold text-[#C25E28]' : 'text-[#302D2A]'}`}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Build your project */}
                <NavIcon href="/build-project" label="Build your project">
                  <PenTool size={21} strokeWidth={1.8} />
                </NavIcon>

                {/* Book a call out */}
                <NavIcon href="/book-task" label="Book a call out">
                  <Hammer size={21} strokeWidth={1.8} />
                </NavIcon>

                {/* AI Assistance */}
                <NavIcon href="/chat" label="AI Assistance">
                  <MessageCircle size={21} strokeWidth={1.8} />
                </NavIcon>

                {/* Account */}
                <NavIcon href="/account" label="Account">
                  <UserIcon size={21} strokeWidth={1.8} />
                </NavIcon>

                {/* Cart */}
                <Link
                  href="/cart"
                  className="flex flex-col items-center gap-[3px] px-2 py-1 hover:bg-[#EEEBE8] rounded transition-colors relative group min-w-[44px]"
                >
                  <div className="relative">
                    <ShoppingCart size={21} strokeWidth={1.8} className="text-[#302D2A]" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 bg-[#C25E28] text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold leading-none">
                        {cartCount}
                      </span>
                    )}
                  </div>
                  <span className="text-[8px] text-[#6B6760] leading-none whitespace-nowrap hidden md:block">Cart</span>
                </Link>

                {/* Divider */}
                <div className="hidden md:block w-px h-7 bg-[#D4D0CB] mx-1" />

                {/* INQUIRE NOW */}
                <Link
                  href="/inquire"
                  className="hidden md:flex items-center h-9 px-5 bg-[#C25E28] hover:bg-[#a64e21] text-white text-[11px] font-bold rounded-full transition-colors whitespace-nowrap uppercase tracking-wide"
                >
                  Inquire Now
                </Link>

                {/* VPK PROJECTS */}
                <a
                  href="https://www.vpk.ltd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:flex items-center h-9 px-5 border-2 border-[#C25E28] text-[#C25E28] hover:bg-[#C25E28] hover:text-white text-[11px] font-bold rounded-full transition-colors whitespace-nowrap uppercase tracking-wide"
                >
                  VPK Projects
                </a>

              </div>
            </div>

            {/* ─ Mobile Search ─ */}
            <div className="pb-3 lg:hidden">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-12 py-2.5 rounded-full border border-[#D4D0CB] bg-white text-sm outline-none focus:border-[#C25E28]"
                />
                <button type="submit" className="absolute right-[5px] top-1/2 -translate-y-1/2 w-8 h-8 bg-[#C25E28] rounded-full flex items-center justify-center">
                  <Search size={14} className="text-white" />
                </button>
              </form>
            </div>
          </div>
        </header>

        {/* ── Category Nav Bar ────────────────── */}
        <nav id="vpk-main-nav" className="relative hidden lg:block bg-[#C25E28]">
          <div className="w-full px-6 md:px-10 xl:px-14">
            <ul className="flex items-stretch justify-between">
              {CATEGORIES.map(cat => (
                <li
                  key={cat}
                  className={`border-b-2 transition-colors ${activeCategory === cat ? 'border-white' : 'border-transparent'}`}
                >
                  <button
                    onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                    className="text-white text-[10px] font-bold uppercase tracking-wide py-2.5 px-1 leading-tight hover:opacity-80 focus:outline-none text-center max-w-[90px] transition-opacity"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Mega Menu ─ */}
          {activeCategory && CATEGORY_DATA[activeCategory] && (
            <div className="absolute top-full left-0 w-full bg-white border-t-2 border-[#C25E28] shadow-2xl z-50 animate-slide-down">
              <div className="w-full px-6 md:px-10 xl:px-14 py-8">
                {/* Header row */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E5E2DE]">
                  <Link
                    href={activeCategory === 'Kitchen & Dining' ? '/kitchen-ranges' : `/products?category=${encodeURIComponent(activeCategory)}`}
                    onClick={() => setActiveCategory(null)}
                    className="flex items-center gap-1.5 text-[#C25E28] font-bold text-sm hover:underline uppercase tracking-wide"
                  >
                    View All {activeCategory} <ChevronRight size={15} />
                  </Link>
                  <button onClick={() => setActiveCategory(null)} className="text-[#9C9790] hover:text-[#302D2A] transition-colors">
                    <X size={18} />
                  </button>
                </div>
                {/* Subcategory grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
                  {CATEGORY_DATA[activeCategory].subcategories.map(group => (
                    <div key={group.title}>
                      <h3 className="font-black text-[#302D2A] mb-3 text-[10px] tracking-widest uppercase border-b border-[#E5E2DE] pb-1.5">
                        {group.title}
                      </h3>
                      <ul className="space-y-1.5">
                        {group.items.map(item => (
                          <li key={item}>
                            <Link
                              href={
                                activeCategory === 'Kitchen & Dining'
                                  ? '/kitchen-ranges'
                                  : activeCategory === 'Tools & Equipment'
                                  ? `/products?category=Tools+%26+Equipment`
                                  : `/products?category=${encodeURIComponent(activeCategory)}`
                              }
                              onClick={() => setActiveCategory(null)}
                              className="text-[#6B6760] hover:text-[#C25E28] text-xs transition-colors leading-relaxed block"
                            >
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>

      {/* ── Mobile Menu Overlay ──────────────── */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-white overflow-y-auto lg:hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#E5E2DE]">
            <Logo />
            <button onClick={() => setIsMenuOpen(false)} className="p-2 text-[#302D2A]">
              <X size={24} />
            </button>
          </div>
          <div className="px-5 py-4">
            {/* Mobile Quick Actions */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <Link href="/inquire" onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center h-10 bg-[#C25E28] text-white text-xs font-bold rounded-full uppercase tracking-wide">
                Inquire Now
              </Link>
              <a href="https://www.vpk.ltd/" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center h-10 border-2 border-[#C25E28] text-[#C25E28] text-xs font-bold rounded-full uppercase tracking-wide">
                VPK Projects
              </a>
            </div>
            {/* Categories */}
            <h3 className="text-[10px] font-black uppercase tracking-widest text-[#C25E28] mb-3">Shop Categories</h3>
            <ul className="divide-y divide-[#E5E2DE]">
              {CATEGORIES.map(cat => (
                <li key={cat}>
                  <Link
                    href={cat === 'Kitchen & Dining' ? '/kitchen-ranges' : `/products?category=${encodeURIComponent(cat)}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-between py-3 text-sm font-medium text-[#302D2A] hover:text-[#C25E28]"
                  >
                    {cat} <ChevronRight size={15} className="text-[#9C9790]" />
                  </Link>
                </li>
              ))}
            </ul>
            {/* Footer links */}
            <div className="mt-6 pt-5 border-t border-[#E5E2DE] space-y-1">
              {[
                { href: '/chat',    label: 'AI Assistance'  },
                { href: '/account', label: 'My Account'     },
                { href: '/login',   label: 'Sign In'        },
                { href: '/register',label: 'Register'       },
              ].map(({ href, label }) => (
                <Link key={href} href={href} onClick={() => setIsMenuOpen(false)}
                  className="block py-2.5 text-sm font-medium text-[#302D2A] hover:text-[#C25E28]">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

/* ── Reusable icon-link ─────────────────────────── */
function NavIcon({
  href, label, children,
}: {
  href: string; label: string; children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="hidden md:flex flex-col items-center gap-[3px] px-2 py-1 hover:bg-[#EEEBE8] rounded transition-colors group min-w-[44px]"
    >
      <span className="text-[#302D2A] group-hover:text-[#C25E28] transition-colors">{children}</span>
      <span className="text-[8px] text-[#6B6760] leading-none text-center whitespace-nowrap max-w-[56px] truncate">
        {label}
      </span>
    </Link>
  )
}
