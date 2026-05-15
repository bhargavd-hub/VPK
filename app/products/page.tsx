'use client'

import React, { useState, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { ChevronDown, SlidersHorizontal, X, Search } from 'lucide-react'
import { MOCK_PRODUCTS, CATEGORIES } from '@/lib/constants'
import { ProductCard } from '@/components/ui/ProductCard'

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Best Rated' },
  { value: 'reviews', label: 'Most Reviewed' },
]

function ProductsContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category') || ''
  const searchParam = searchParams.get('search') || ''

  const [selectedCategory, setSelectedCategory] = useState(categoryParam)
  const [sortBy, setSortBy] = useState('featured')
  const [searchQuery, setSearchQuery] = useState(searchParam)
  const [showFilters, setShowFilters] = useState(false)
  const [maxPrice, setMaxPrice] = useState(10000)

  const filtered = useMemo(() => {
    let products = [...MOCK_PRODUCTS]
    if (selectedCategory) products = products.filter(p => p.category === selectedCategory)
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      products = products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      )
    }
    products = products.filter(p => p.price <= maxPrice)
    switch (sortBy) {
      case 'price-asc': return products.sort((a, b) => a.price - b.price)
      case 'price-desc': return products.sort((a, b) => b.price - a.price)
      case 'rating': return products.sort((a, b) => b.rating - a.rating)
      case 'reviews': return products.sort((a, b) => b.reviews - a.reviews)
      default: return products
    }
  }, [selectedCategory, searchQuery, sortBy, maxPrice])

  return (
    <div className="w-full px-4 md:px-12 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-brand-offBlack mb-1">{selectedCategory || 'All Products'}</h1>
        <p className="text-neutral text-sm">{filtered.length} products found</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral" size={18} />
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search products..." className="w-full pl-10 pr-4 py-3 border border-neutral-light focus:border-brand-orange focus:outline-none text-sm" />
          {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2"><X size={16} className="text-neutral" /></button>}
        </div>
        <div className="relative">
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="border border-neutral-light py-3 pl-4 pr-10 text-sm focus:border-brand-orange focus:outline-none bg-white appearance-none cursor-pointer text-brand-offBlack">
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral" size={16} />
        </div>
        <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 border border-neutral-light py-3 px-4 text-sm font-medium hover:border-brand-orange transition-colors">
          <SlidersHorizontal size={16} /> Filters
        </button>
      </div>

      <div className="flex gap-8">
        <aside className={`w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="mb-8">
            <h3 className="font-bold text-brand-offBlack mb-4 text-sm uppercase tracking-wide">Category</h3>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => setSelectedCategory('')} className={`w-full text-left text-sm py-1.5 px-3 rounded transition-colors ${!selectedCategory ? 'bg-brand-orange text-white font-bold' : 'text-neutral-dark hover:bg-neutral-lightest'}`}>All Products</button>
              </li>
              {CATEGORIES.map(cat => (
                <li key={cat}>
                  <button onClick={() => setSelectedCategory(selectedCategory === cat ? '' : cat)} className={`w-full text-left text-sm py-1.5 px-3 rounded transition-colors ${selectedCategory === cat ? 'bg-brand-orange text-white font-bold' : 'text-neutral-dark hover:bg-neutral-lightest'}`}>{cat}</button>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-8">
            <h3 className="font-bold text-brand-offBlack mb-4 text-sm uppercase tracking-wide">Max Price</h3>
            <input type="range" min={0} max={10000} step={50} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} className="w-full accent-brand-orange" />
            <div className="flex justify-between text-sm text-neutral mt-2">
              <span>£0</span>
              <span className="font-bold text-brand-orange">£{maxPrice.toLocaleString()}</span>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl font-bold text-neutral mb-2">No products found</p>
              <p className="text-neutral-dark text-sm">Try adjusting your filters or search term.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
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
    <Suspense fallback={<div className="p-12 text-center text-neutral">Loading products...</div>}>
      <ProductsContent />
    </Suspense>
  )
}
