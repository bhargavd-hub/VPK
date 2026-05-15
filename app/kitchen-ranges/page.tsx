'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Star, ChevronDown, ChevronRight } from 'lucide-react'
import { KITCHEN_RANGES } from '@/lib/constants'

const BRANDS = ['All Brands', 'VPK', 'Howdens', 'Wrens', 'Magnet']

export default function KitchenRangesPage() {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('Relevance')

  const filtered = KITCHEN_RANGES.filter(r =>
    selectedBrands.length === 0 || selectedBrands.includes(r.brand)
  )

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    )
  }

  const QUICK_FILTERS = [
    { name: 'Fitted Kitchens', image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=200' },
    { name: 'Kitchen Cabinets', image: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&w=200' },
    { name: 'Kitchen Worktops', image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=200' },
    { name: 'Kitchen Taps', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=200' },
    { name: 'Kitchen Sinks', image: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=200' },
    { name: 'Kitchen Appliances', image: 'https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?auto=format&fit=crop&w=200' },
  ]

  return (
    <div className="w-full bg-neutral-lightest min-h-screen pb-20">
      {/* Breadcrumb */}
      <div className="w-full px-4 md:px-12 py-4 bg-white border-b border-neutral-lighter">
        <div className="flex items-center gap-2 text-sm text-neutral-dark">
          <Link href="/" className="hover:text-brand-orange transition-colors">Home</Link>
          <ChevronRight size={14} className="text-neutral-light" />
          <Link href="/products?category=Kitchen+%26+Dining" className="hover:text-brand-orange transition-colors">Kitchen & Dining</Link>
          <ChevronRight size={14} className="text-neutral-light" />
          <span className="text-brand-offBlack font-bold">Fitted Kitchen Ranges</span>
        </div>
      </div>

      <div className="w-full px-4 md:px-12 py-10">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-brand-offBlack mb-3">Fitted Kitchen Ranges</h1>
          <p className="text-neutral-dark max-w-3xl">
            Explore our wide range of fitted kitchen styles, from modern slab designs to traditional shaker aesthetics.
            Find the perfect kitchen for your home and budget.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-60 flex-shrink-0 space-y-8 lg:sticky top-24 h-fit">
            <div>
              <h3 className="font-bold text-base mb-3 border-b border-neutral-lighter pb-2 text-brand-offBlack">By Brand</h3>
              <div className="space-y-2">
                {BRANDS.map(brand => {
                  const isAll = brand === 'All Brands'
                  const checked = isAll ? selectedBrands.length === 0 : selectedBrands.includes(brand)
                  return (
                    <label key={brand} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => isAll ? setSelectedBrands([]) : toggleBrand(brand)}
                        className="cursor-pointer accent-brand-orange w-4 h-4"
                      />
                      <span className={`text-sm transition-colors ${checked ? 'font-bold text-brand-orange' : 'text-neutral-dark group-hover:text-brand-orange'}`}>
                        {brand}
                      </span>
                    </label>
                  )
                })}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-base mb-3 border-b border-neutral-lighter pb-2 text-brand-offBlack">Price Range</h3>
              <div className="flex items-center gap-2 text-sm">
                <input type="number" placeholder="Min" className="w-20 border border-neutral-lighter p-2 focus:border-brand-orange outline-none text-sm" />
                <span className="text-neutral">–</span>
                <input type="number" placeholder="Max" className="w-20 border border-neutral-lighter p-2 focus:border-brand-orange outline-none text-sm" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-base mb-3 border-b border-neutral-lighter pb-2 text-brand-offBlack">Rating</h3>
              {[5, 4, 3].map(stars => (
                <div key={stars} className="flex items-center gap-2 mb-2 cursor-pointer group">
                  <input type="checkbox" className="accent-brand-orange" />
                  <div className="flex text-brand-orange">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={13} className={i < stars ? 'fill-current' : 'text-neutral-lighter fill-neutral-lighter'} />
                    ))}
                  </div>
                  <span className="text-xs text-neutral group-hover:text-brand-orange">& Up</span>
                </div>
              ))}
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Quick Category Filters */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-8">
              {QUICK_FILTERS.map(item => (
                <div key={item.name} className="border border-neutral-lighter p-1 flex items-center gap-2 bg-white hover:border-brand-orange cursor-pointer transition-colors h-14 group">
                  <div className="w-12 h-full bg-neutral-lightest flex-shrink-0 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <span className="text-[9px] font-bold text-brand-offBlack leading-tight uppercase tracking-tight pr-1 line-clamp-2">{item.name}</span>
                </div>
              ))}
            </div>

            {/* Sort / Count Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b border-neutral-lighter gap-3">
              <span className="font-bold text-brand-offBlack text-sm">{filtered.length} kitchen range{filtered.length !== 1 ? 's' : ''}</span>
              <div className="relative">
                <div className="flex items-center gap-2">
                  <span className="text-neutral text-sm">Sort by</span>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={e => setSortBy(e.target.value)}
                      className="border border-neutral-lighter px-4 py-2 text-sm focus:border-brand-orange focus:outline-none bg-white text-brand-offBlack appearance-none pr-8 cursor-pointer"
                    >
                      {['Relevance', 'Price: Low to High', 'Price: High to Low', 'Rating'].map(o => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-neutral" />
                  </div>
                </div>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filtered.map(range => (
                <div key={range.id} className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col relative group">
                  {/* Badge */}
                  {range.badge && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className={`text-white text-[10px] font-black px-3 py-1 rounded shadow-lg ${range.badge === 'NEW' ? 'bg-green-600' : 'bg-red-600'}`}>
                        {range.badge}
                      </span>
                    </div>
                  )}

                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={range.image} alt={range.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" unoptimized />
                    {/* Sample Circle */}
                    <div className="absolute bottom-4 right-6 w-14 h-14 rounded-full bg-white p-0.5 shadow-xl z-20">
                      <div className="w-full h-full rounded-full overflow-hidden border border-neutral-lighter">
                        <Image src={range.sampleImage} alt={`${range.name} sample`} width={56} height={56} className="w-full h-full object-cover" unoptimized />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h2 className="text-2xl font-bold text-brand-offBlack">{range.name}</h2>
                      <span className="text-[10px] font-black text-neutral uppercase tracking-widest bg-neutral-lightest px-2 py-1 rounded">{range.brand}</span>
                    </div>
                    <p className="text-neutral mb-2">{range.subtitle}</p>
                    {range.reviews > 0 && (
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => <Star key={i} size={13} className={i < Math.floor(range.rating) ? 'fill-brand-orange text-brand-orange' : 'text-neutral-light fill-neutral-lighter'} />)}
                        <span className="text-xs text-neutral ml-1">({range.reviews})</span>
                      </div>
                    )}
                    <p className="text-sm text-neutral-dark leading-relaxed mb-6 line-clamp-3">{range.description}</p>

                    {/* Colors */}
                    <div className="mt-auto">
                      <p className="text-[10px] font-black uppercase tracking-widest text-brand-offBlack mb-2">Also available in</p>
                      <div className="flex flex-wrap gap-2 items-center">
                        {range.colors.map((color, i) => (
                          <div key={i} className="w-7 h-7 rounded-full border border-neutral-lighter shadow-sm cursor-pointer hover:scale-110 transition-transform" style={{ backgroundColor: color }} />
                        ))}
                        {range.moreColors > 0 && (
                          <div className="w-7 h-7 rounded-full border border-neutral-lighter bg-neutral-lightest flex items-center justify-center text-[10px] font-bold text-neutral cursor-pointer">
                            +{range.moreColors}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <Link href={`/products/${range.id}`} className="absolute inset-0 z-30" aria-label={`View ${range.name}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
