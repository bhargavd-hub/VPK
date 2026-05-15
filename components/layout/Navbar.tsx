'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ShoppingCart, User as UserIcon, Search, Menu, X,
  ChevronRight, ChevronDown, Globe, PenTool, Hammer, MessageCircle,
} from 'lucide-react'
import { CATEGORIES, CATEGORY_DATA } from '@/lib/constants'
import { useApp } from '@/lib/context'

const LOGO = () => (
  <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M25 25L35 55H40L50 25H44L37.5 45L31 25H25Z" fill="#302D2A" />
    <path d="M60 25V55H66V43H75C80.5 43 84 39 84 34C84 29 80.5 25 75 25H60ZM66 30H74C77 30 78 31.5 78 34C78 36.5 77 38 74 38H66V30Z" fill="#302D2A" />
    <path d="M25 60V90H31V78L39 90H46L36 75L45 60H38L31 72V60H25Z" fill="#302D2A" />
  </svg>
)

const LANGUAGES = [
  { code: 'EN', label: 'English' }, { code: 'FR', label: 'France' },
  { code: 'DE', label: 'Germany' }, { code: 'IT', label: 'Italy' },
  { code: 'ES', label: 'Spanish' }, { code: 'PL', label: 'Poland' },
  { code: 'AR', label: 'Arabic' },
]

export function Navbar() {
  const { cart, wishlist } = useApp()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [selectedLang, setSelectedLang] = useState('EN')
  const router = useRouter()

  const cartCount = cart.reduce((acc, i) => acc + i.quantity, 0)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  // Close mega menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('#main-nav')) setActiveCategory(null)
    }
    if (activeCategory) document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [activeCategory])

  return (
    <>
      <div className="sticky top-0 z-50 w-full flex flex-col shadow-sm bg-white">
        {/* Main Header */}
        <header className="bg-brand-offWhite border-b border-neutral-lighter">
          <div className="w-full px-4 md:px-12 py-4 md:py-5">
            <div className="flex items-center gap-8 justify-between">
              {/* Mobile: Hamburger + Logo */}
              <div className="flex items-center gap-4 lg:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
                  {isMenuOpen ? <X /> : <Menu />}
                </button>
                <Link href="/"><LOGO /></Link>
              </div>

              {/* Desktop Logo */}
              <Link href="/" className="hidden lg:block flex-shrink-0"><LOGO /></Link>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-xl relative">
                <input
                  type="text"
                  placeholder="Search products, categories, or projects..."
                  className="w-full pl-4 pr-12 py-3 border border-neutral-light rounded-full focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none text-sm"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-brand-orange rounded-full text-white hover:bg-[#a64e21]">
                  <Search size={16} />
                </button>
              </form>

              {/* Right Actions */}
              <div className="flex items-center gap-4 ml-auto">
                {/* Language Selector */}
                <div className="relative hidden md:block">
                  <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex flex-col items-center group outline-none">
                    <div className="p-2 rounded-full group-hover:bg-neutral-lightest transition-colors w-9 h-9 flex items-center justify-center">
                      <span className="text-xs font-bold text-brand-offBlack">{selectedLang}</span>
                    </div>
                    <span className="text-[10px] text-brand-offBlack mt-0.5">Language</span>
                  </button>
                  {isLangOpen && (
                    <div className="absolute top-full right-0 mt-2 w-40 bg-white border border-neutral-lighter shadow-xl rounded-lg overflow-hidden z-50 animate-fade-in">
                      {LANGUAGES.map(lang => (
                        <button key={lang.code} className={`w-full text-left px-4 py-2 text-sm hover:bg-neutral-lightest transition-colors ${selectedLang === lang.code ? 'font-bold text-brand-orange' : 'text-brand-offBlack'}`} onClick={() => { setSelectedLang(lang.code); setIsLangOpen(false) }}>
                          {lang.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <NavIconLink href="/build-project" icon={<PenTool size={20} className="text-brand-offBlack" />} label="Build your project" />
                <NavIconLink href="/book-task" icon={<Hammer size={20} className="text-brand-offBlack" />} label="Book a call out" />
                <NavIconLink href="/chat" icon={<MessageCircle size={20} className="text-brand-offBlack" />} label="AI Assistance" />
                <NavIconLink href="/account" icon={<UserIcon size={20} className="text-brand-offBlack" />} label="Account" />

                {/* Cart */}
                <Link href="/cart" className="flex flex-col items-center group relative">
                  <div className="p-2 rounded-full group-hover:bg-neutral-lightest transition-colors relative">
                    <ShoppingCart size={20} className="text-brand-offBlack" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-brand-orange text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                        {cartCount}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-brand-offBlack mt-0.5">Cart</span>
                </Link>

                <div className="hidden md:flex items-center gap-2">
                  <Link href="/inquire" className="px-4 py-2 bg-brand-orange text-white text-xs font-bold rounded-full hover:bg-[#a64e21] transition-colors whitespace-nowrap">
                    Inquire Now
                  </Link>
                  <a href="https://www.vpk.ltd/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-brand-orange text-brand-orange text-xs font-bold rounded-full hover:bg-brand-orange hover:text-white transition-colors whitespace-nowrap">
                    VPK Projects
                  </a>
                </div>
              </div>
            </div>

            {/* Mobile Search */}
            <div className="mt-4 lg:hidden">
              <form onSubmit={handleSearch} className="relative">
                <input type="text" placeholder="Search..." className="w-full pl-4 pr-10 py-2.5 border border-neutral-light rounded-md text-sm outline-none" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral" size={18} />
              </form>
            </div>
          </div>
        </header>

        {/* Category Nav Bar */}
        <nav id="main-nav" className="relative hidden lg:block bg-brand-orange">
          <div className="w-full px-4 md:px-12">
            <ul className="flex items-stretch gap-x-6 py-0 text-white flex-wrap">
              {CATEGORIES.map(cat => (
                <li key={cat} className={`cursor-pointer transition-colors border-b-2 ${activeCategory === cat ? 'border-white' : 'border-transparent'}`}>
                  <button
                    className="text-left font-bold text-[11px] uppercase tracking-wide py-3 hover:opacity-80 focus:outline-none"
                    onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Mega Menu */}
          {activeCategory && CATEGORY_DATA[activeCategory] && (
            <div className="absolute top-full left-0 w-full bg-white border-t border-neutral-lighter shadow-xl z-50 animate-slide-down">
              <div className="w-full px-4 md:px-12 py-8">
                <div className="mb-4 pb-4 border-b border-neutral-lighter">
                  <Link
                    href={`/products?category=${encodeURIComponent(activeCategory)}`}
                    className="text-brand-orange font-bold hover:underline flex items-center gap-1 w-fit uppercase text-sm"
                    onClick={() => setActiveCategory(null)}
                  >
                    View All {activeCategory} <ChevronRight size={16} />
                  </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
                  {CATEGORY_DATA[activeCategory].subcategories.map(group => (
                    <div key={group.title}>
                      <h3 className="font-bold text-brand-offBlack mb-3 text-xs tracking-wider uppercase">{group.title}</h3>
                      <ul className="space-y-2">
                        {group.items.map(item => (
                          <li key={item}>
                            <Link
                              href={`/products?category=${encodeURIComponent(activeCategory)}`}
                              className="text-neutral-dark hover:text-brand-orange text-sm transition-colors inline-block"
                              onClick={() => setActiveCategory(null)}
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

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white lg:hidden overflow-y-auto">
          <div className="p-4 flex justify-between items-center border-b">
            <span className="font-bold text-lg">Menu</span>
            <button onClick={() => setIsMenuOpen(false)}><X /></button>
          </div>
          <div className="p-4">
            <h3 className="font-bold mb-4 text-brand-orange text-sm uppercase tracking-wide">Categories</h3>
            <ul className="space-y-3">
              {CATEGORIES.map(cat => (
                <li key={cat} className="border-b border-neutral-lightest pb-3">
                  <Link href={`/products?category=${encodeURIComponent(cat)}`} className="flex justify-between items-center font-medium" onClick={() => setIsMenuOpen(false)}>
                    {cat} <ChevronRight size={16} />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t space-y-3">
              <Link href="/chat" className="block py-2 font-bold text-brand-orange" onClick={() => setIsMenuOpen(false)}>AI Assistance</Link>
              <Link href="/account" className="block py-2 font-bold" onClick={() => setIsMenuOpen(false)}>My Account</Link>
              <Link href="/login" className="block py-2 text-neutral" onClick={() => setIsMenuOpen(false)}>Sign In / Register</Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function NavIconLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link href={href} className="flex flex-col items-center group">
      <div className="p-2 rounded-full group-hover:bg-neutral-lightest transition-colors">{icon}</div>
      <span className="text-[10px] text-brand-offBlack mt-0.5 hidden md:block whitespace-nowrap">{label}</span>
    </Link>
  )
}
