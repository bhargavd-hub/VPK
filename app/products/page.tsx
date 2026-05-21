'use client'

import React, { useState, useMemo, useRef, Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import {
  ChevronDown, ChevronLeft, ChevronRight, Star,
  Check, X, Plus, Heart,
} from 'lucide-react'
import { MOCK_PRODUCTS, CATEGORIES } from '@/lib/constants'
import { useApp } from '@/lib/context'
import { Product } from '@/lib/types'

/* ─────────────────────────────────────
   Constants
───────────────────────────────────────*/
const SORT_OPTIONS = ['Relevance', 'Price: Low to High', 'Price: High to Low', 'Best Rated', 'Most Reviewed']
const BRANDS       = ['Howdens', 'Wrens', 'Magnet', 'VPK']

const FEATURE_TILES = [
  { label: 'New Arrivals', bg: '#F1EDE8', img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=300&q=80' },
  { label: 'Best Sellers', bg: '#E8EDF1', img: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=300&q=80' },
  { label: 'On Sale',      bg: '#FFF3E0', img: 'https://images.unsplash.com/photo-1563461660947-507ef49e9c47?auto=format&fit=crop&w=300&q=80' },
  { label: 'Clearance',    bg: '#F1F8E9', img: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=300&q=80' },
  { label: 'Top Rated',    bg: '#FCE4EC', img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=300&q=80' },
  { label: 'New In Tools', bg: '#E8F5E9', img: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&w=300&q=80' },
]

/* ─────────────────────────────────────
   Inline Product Card (matches design)
───────────────────────────────────────*/
function ProductCard({ product }: { product: Product }) {
  const { addToCart, wishlist, toggleWishlist } = useApp()
  const isWishlisted  = wishlist.includes(product.id)
  const idNum         = parseInt(product.id, 10) || 1
  const hasClickCollect = idNum % 2 !== 0
  const hasInStore      = idNum % 3 !== 0

  return (
    <div className="bg-white border border-[#E8E5E1] hover:shadow-md transition-shadow duration-200 flex flex-col h-full group">
      {/* Image */}
      <Link href={`/products/${product.id}`} className="relative aspect-square overflow-hidden bg-[#F7F5F2] block flex-shrink-0">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw"
          unoptimized
        />
        <button
          onClick={e => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product.id) }}
          className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-10"
        >
          <Heart size={14} className={isWishlisted ? 'fill-[#C25E28] text-[#C25E28]' : 'text-[#302D2A]'} />
        </button>
      </Link>

      {/* Body */}
      <div className="p-3 flex flex-col flex-1">
        {/* Stars */}
        <div className="flex items-center gap-1 mb-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={11}
              className={i < Math.floor(product.rating) ? 'fill-[#C25E28] text-[#C25E28]' : 'fill-[#E5E2DE] text-[#E5E2DE]'}
            />
          ))}
          <span className="text-[10px] text-[#9C9790] ml-0.5">({product.reviews})</span>
        </div>

        {/* Name */}
        <Link href={`/products/${product.id}`}>
          <h3 className="text-[13px] font-bold text-[#302D2A] leading-snug mb-1 line-clamp-2 hover:text-[#C25E28] transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-[11px] text-[#9C9790] leading-relaxed mb-2 line-clamp-2 flex-1">
          {product.description}
        </p>

        {/* Availability */}
        <div className="space-y-0.5 mb-3">
          <AvailRow ok    label="Available for Home Delivery" />
          <AvailRow ok={hasClickCollect} label={hasClickCollect ? 'Available for Click + Collect' : 'Not available for Click + Collect'} />
          <AvailRow ok={hasInStore}      label={hasInStore      ? 'Available in store'              : 'Not available in store'} />
        </div>

        {/* Price + Add */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#F0EDE9] mt-auto">
          <span className="text-[17px] font-bold text-[#302D2A]">£{product.price.toFixed(2)}</span>
          <button
            onClick={() => addToCart(product)}
            className="flex items-center gap-1 bg-[#C25E28] hover:bg-[#a64e21] text-white text-[11px] font-bold px-3 py-1.5 transition-colors flex-shrink-0"
          >
            <Plus size={12} /> Add
          </button>
        </div>
      </div>
    </div>
  )
}

function AvailRow({ ok, label }: { ok: boolean; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      {ok
        ? <Check size={10} className="text-green-600 flex-shrink-0" />
        : <X    size={10} className="text-red-400 flex-shrink-0" />
      }
      <span className={`text-[10px] leading-none ${ok ? 'text-[#6B6760]' : 'text-[#9C9790]'}`}>{label}</span>
    </div>
  )
}

/* ─────────────────────────────────────
   Main Page
───────────────────────────────────────*/
function ProductsContent() {
  const searchParams = useSearchParams()
  const catParam     = searchParams.get('category') || ''
  const searchParam  = searchParams.get('search')   || ''

  const [selectedCategory, setSelectedCategory] = useState(catParam)
  const [selectedBrands,   setSelectedBrands]   = useState<string[]>([])
  const [selectedRating,   setSelectedRating]   = useState<number | null>(null)
  const [sortBy,           setSortBy]           = useState('Relevance')
  const [sortOpen,         setSortOpen]         = useState(false)
  const [compare,          setCompare]          = useState(false)
  const [minPrice,         setMinPrice]         = useState('')
  const [maxPrice,         setMaxPrice]         = useState('')
  const [tileOffset,       setTileOffset]       = useState(0)
  const [activeDot,        setActiveDot]        = useState(0)

  const TILES_VISIBLE = 4
  const maxOffset = FEATURE_TILES.length - TILES_VISIBLE

  const handleTilePrev = () => {
    const next = Math.max(0, tileOffset - 1)
    setTileOffset(next); setActiveDot(next)
  }
  const handleTileNext = () => {
    const next = Math.min(maxOffset, tileOffset + 1)
    setTileOffset(next); setActiveDot(next)
  }

  const toggleBrand = (b: string) =>
    setSelectedBrands(p => p.includes(b) ? p.filter(x => x !== b) : [...p, b])

  const filtered = useMemo(() => {
    let list = [...MOCK_PRODUCTS]
    if (selectedCategory) list = list.filter(p => p.category === selectedCategory)
    if (searchParam)      list = list.filter(p =>
      p.name.toLowerCase().includes(searchParam.toLowerCase()) ||
      p.description.toLowerCase().includes(searchParam.toLowerCase())
    )
    if (minPrice) list = list.filter(p => p.price >= parseFloat(minPrice))
    if (maxPrice) list = list.filter(p => p.price <= parseFloat(maxPrice))
    if (selectedRating !== null) list = list.filter(p => p.rating >= selectedRating)
    switch (sortBy) {
      case 'Price: Low to High':  return list.sort((a,b) => a.price   - b.price)
      case 'Price: High to Low':  return list.sort((a,b) => b.price   - a.price)
      case 'Best Rated':          return list.sort((a,b) => b.rating  - a.rating)
      case 'Most Reviewed':       return list.sort((a,b) => b.reviews - a.reviews)
      default:                    return list
    }
  }, [selectedCategory, searchParam, minPrice, maxPrice, selectedRating, sortBy])

  const breadcrumb = selectedCategory || 'Products'

  return (
    <div className="bg-[#F7F5F2] min-h-screen">

      {/* Breadcrumb */}
      <div className="w-full px-4 md:px-10 xl:px-14 py-3 bg-white border-b border-[#E5E2DE]">
        <nav className="flex items-center gap-1.5 text-xs text-[#9C9790]">
          <Link href="/" className="hover:text-[#C25E28] transition-colors">Home</Link>
          <ChevronRight size={12} className="text-[#D4D0CB]" />
          {selectedCategory && (
            <>
              <Link href="/products" className="hover:text-[#C25E28] transition-colors">Products</Link>
              <ChevronRight size={12} className="text-[#D4D0CB]" />
            </>
          )}
          <span className="text-[#302D2A] font-semibold">{breadcrumb}</span>
        </nav>
      </div>

      <div className="w-full px-4 md:px-10 xl:px-14 py-6 flex gap-7">

        {/* ══════════ LEFT SIDEBAR ══════════ */}
        <aside className="w-52 flex-shrink-0 hidden lg:block space-y-6">

          {/* Categories */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-[#302D2A] mb-3">Categories</h3>
            <ul className="space-y-1">
              <li>
                <label className="flex items-center gap-2 cursor-pointer group py-0.5">
                  <input type="checkbox" checked={selectedCategory === ''}
                    onChange={() => setSelectedCategory('')}
                    className="w-3.5 h-3.5 accent-[#C25E28] cursor-pointer flex-shrink-0" />
                  <span className={`text-xs transition-colors ${selectedCategory === '' ? 'font-bold text-[#C25E28]' : 'text-[#6B6760] group-hover:text-[#302D2A]'}`}>
                    All Products
                  </span>
                </label>
              </li>
              {CATEGORIES.map(cat => (
                <li key={cat}>
                  <label className="flex items-center gap-2 cursor-pointer group py-0.5">
                    <input type="checkbox" checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(selectedCategory === cat ? '' : cat)}
                      className="w-3.5 h-3.5 accent-[#C25E28] cursor-pointer flex-shrink-0" />
                    <span className={`text-xs leading-tight transition-colors ${selectedCategory === cat ? 'font-bold text-[#C25E28]' : 'text-[#6B6760] group-hover:text-[#302D2A]'}`}>
                      {cat}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-[#302D2A] mb-3">Price Range</h3>
            <div className="flex items-center gap-2">
              <input type="number" placeholder="Min" value={minPrice}
                onChange={e => setMinPrice(e.target.value)}
                className="w-[68px] border border-[#D4D0CB] bg-white px-2 py-1.5 text-xs focus:border-[#C25E28] outline-none text-[#302D2A]" />
              <span className="text-[#9C9790] text-xs">-</span>
              <input type="number" placeholder="Max" value={maxPrice}
                onChange={e => setMaxPrice(e.target.value)}
                className="w-[68px] border border-[#D4D0CB] bg-white px-2 py-1.5 text-xs focus:border-[#C25E28] outline-none text-[#302D2A]" />
            </div>
          </div>

          {/* Rating */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-[#302D2A] mb-3">Rating</h3>
            <div className="space-y-1.5">
              {[5,4,3,2,1].map(stars => (
                <label key={stars} className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox"
                    checked={selectedRating === stars}
                    onChange={() => setSelectedRating(selectedRating === stars ? null : stars)}
                    className="w-3.5 h-3.5 accent-[#C25E28] cursor-pointer" />
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_,i) => (
                      <Star key={i} size={11}
                        className={i < stars ? 'fill-[#C25E28] text-[#C25E28]' : 'fill-[#E5E2DE] text-[#E5E2DE]'} />
                    ))}
                    <span className="text-[10px] text-[#9C9790] ml-1 group-hover:text-[#C25E28] transition-colors">& Up</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Sort by brands */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-[#302D2A] mb-3">Sort by brands</h3>
            <div className="space-y-1.5">
              {BRANDS.map(brand => (
                <label key={brand} className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="w-3.5 h-3.5 accent-[#C25E28] cursor-pointer" />
                  <span className={`text-xs transition-colors ${selectedBrands.includes(brand) ? 'font-bold text-[#C25E28]' : 'text-[#6B6760] group-hover:text-[#302D2A]'}`}>
                    {brand}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* ══════════ MAIN CONTENT ══════════ */}
        <div className="flex-1 min-w-0">

          {/* ── Feature Tiles Carousel ── */}
          <div className="mb-6 relative">
            <div className="overflow-hidden">
              <div
                className="flex gap-4 transition-transform duration-300"
                style={{ transform: `translateX(-${tileOffset * (100 / TILES_VISIBLE)}%)` }}
              >
                {FEATURE_TILES.map((tile, i) => (
                  <div key={i} className="flex-shrink-0 w-[calc(25%-12px)] min-w-[160px]">
                    <div
                      className="relative h-16 flex items-center gap-3 px-3 cursor-pointer hover:opacity-90 transition-opacity overflow-hidden border border-[#E5E2DE]"
                      style={{ backgroundColor: tile.bg }}
                    >
                      <div className="w-14 h-14 flex-shrink-0 overflow-hidden -ml-3">
                        <img src={tile.img} alt={tile.label} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[11px] font-bold text-[#302D2A] leading-tight">{tile.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-1">
                <button onClick={handleTilePrev} disabled={tileOffset === 0}
                  className="w-6 h-6 flex items-center justify-center border border-[#D4D0CB] bg-white hover:border-[#C25E28] disabled:opacity-30 transition-colors">
                  <ChevronLeft size={13} />
                </button>
                {/* Dots */}
                <div className="flex gap-1 mx-2">
                  {Array.from({ length: maxOffset + 1 }).map((_, i) => (
                    <button key={i} onClick={() => { setTileOffset(i); setActiveDot(i) }}
                      className={`rounded-full transition-all duration-200 ${activeDot === i ? 'w-4 h-2 bg-[#C25E28]' : 'w-2 h-2 bg-[#D4D0CB]'}`} />
                  ))}
                </div>
                <button onClick={handleTileNext} disabled={tileOffset >= maxOffset}
                  className="w-6 h-6 flex items-center justify-center border border-[#D4D0CB] bg-white hover:border-[#C25E28] disabled:opacity-30 transition-colors">
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>
          </div>

          {/* ── Toolbar ── */}
          <div className="flex items-center justify-between mb-5 pb-4 border-b border-[#E5E2DE] gap-4 flex-wrap">
            <div className="flex items-center gap-5">
              <span className="text-sm font-bold text-[#302D2A]">
                {filtered.length} product{filtered.length !== 1 ? 's' : ''}
              </span>
              {/* Compare toggle */}
              <div className="flex items-center gap-2">
                <button onClick={() => setCompare(!compare)}
                  className={`relative w-9 h-5 rounded-full transition-colors duration-200 focus:outline-none ${compare ? 'bg-[#C25E28]' : 'bg-[#D4D0CB]'}`}>
                  <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${compare ? 'translate-x-4' : 'translate-x-0.5'}`} />
                </button>
                <span className="text-sm font-bold text-[#302D2A]">Compare</span>
              </div>
            </div>

            {/* Sort By */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="text-[#9C9790] text-sm">Sort by</span>
              <div className="relative">
                <button onClick={() => setSortOpen(!sortOpen)}
                  className="border border-[#D4D0CB] bg-white px-4 py-2 min-w-[155px] flex justify-between items-center text-sm font-bold text-[#302D2A] gap-4 hover:border-[#C25E28] transition-colors focus:outline-none">
                  <span>{sortBy}</span>
                  <ChevronDown size={14} className={`transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
                </button>
                {sortOpen && (
                  <div className="absolute top-full right-0 mt-0.5 w-full bg-white border border-[#D4D0CB] shadow-xl z-50">
                    {SORT_OPTIONS.map(opt => (
                      <button key={opt} onClick={() => { setSortBy(opt); setSortOpen(false) }}
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-[#F7F5F2] hover:text-[#C25E28] transition-colors ${sortBy === opt ? 'font-bold text-[#C25E28] bg-[#F7F5F2]' : 'text-[#6B6760]'}`}>
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Product Grid ── */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-white border border-[#E5E2DE]">
              <p className="text-xl font-bold text-[#9C9790] mb-2">No products found</p>
              <p className="text-sm text-[#9C9790]">Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="w-full px-10 py-16 flex gap-8">
        <div className="w-52 hidden lg:block">
          <div className="h-4 bg-[#E5E2DE] rounded mb-4 animate-pulse" />
          {[...Array(6)].map((_,i) => <div key={i} className="h-3 bg-[#F0EDE9] rounded mb-2 animate-pulse" />)}
        </div>
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(8)].map((_,i) => <div key={i} className="aspect-square bg-[#E5E2DE] rounded animate-pulse" />)}
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  )
}
