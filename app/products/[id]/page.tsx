'use client'

import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Star, Heart, Plus, Minus, Check, ArrowLeft, Truck, ShieldCheck, RefreshCw, ChevronRight } from 'lucide-react'
import { MOCK_PRODUCTS } from '@/lib/constants'
import { useApp } from '@/lib/context'
import { ProductCard } from '@/components/ui/ProductCard'
import { Button } from '@/components/ui/Forms'

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { addToCart, wishlist, toggleWishlist } = useApp()
  const [qty, setQty] = useState(1)
  const [activeTab, setActiveTab] = useState<'details' | 'delivery' | 'reviews'>('details')

  const product = MOCK_PRODUCTS.find(p => p.id === id)
  if (!product) {
    return (
      <div className="text-center py-24">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link href="/products" className="text-brand-orange hover:underline">← Back to products</Link>
      </div>
    )
  }

  const related = MOCK_PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
  const isWishlisted = wishlist.includes(product.id)
  const isClickCollect = parseInt(product.id) % 2 !== 0
  const isInStore = parseInt(product.id) % 3 !== 0

  const handleAddToCart = () => {
    addToCart(product, qty)
  }

  return (
    <div className="w-full px-4 md:px-12 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-neutral mb-8">
        <Link href="/" className="hover:text-brand-orange">Home</Link>
        <ChevronRight size={14} />
        <Link href="/products" className="hover:text-brand-orange">Products</Link>
        <ChevronRight size={14} />
        <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-brand-orange">{product.category}</Link>
        <ChevronRight size={14} />
        <span className="text-brand-offBlack font-medium truncate max-w-[200px]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Image */}
        <div className="relative aspect-square bg-neutral-lightest rounded-lg overflow-hidden">
          <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" unoptimized />
          <button
            onClick={() => toggleWishlist(product.id)}
            className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
          >
            <Heart size={20} className={isWishlisted ? 'fill-brand-orange text-brand-orange' : 'text-brand-offBlack'} />
          </button>
        </div>

        {/* Details */}
        <div>
          {product.brand && <p className="text-sm text-neutral font-medium mb-2 uppercase tracking-wide">{product.brand}</p>}
          <h1 className="text-3xl font-bold text-brand-offBlack mb-3 leading-tight">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className={i < Math.floor(product.rating) ? 'fill-brand-orange text-brand-orange' : 'text-neutral-light'} />
              ))}
            </div>
            <span className="text-sm text-neutral">{product.rating} ({product.reviews} reviews)</span>
          </div>

          <p className="text-4xl font-bold text-brand-offBlack mb-6">£{product.price.toFixed(2)}</p>

          <p className="text-neutral-dark mb-6 leading-relaxed">{product.description}</p>

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-neutral-light">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 hover:bg-neutral-lightest transition-colors">
                <Minus size={16} />
              </button>
              <span className="px-6 py-3 font-bold border-x border-neutral-light min-w-[60px] text-center">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-4 py-3 hover:bg-neutral-lightest transition-colors">
                <Plus size={16} />
              </button>
            </div>
            <Button className="flex-1" onClick={handleAddToCart}>Add to Cart</Button>
          </div>

          {/* Availability */}
          <div className="bg-neutral-lightest p-4 rounded-lg mb-6 space-y-2">
            <AvailRow available label="Available for Home Delivery" />
            <AvailRow available={isClickCollect} label={isClickCollect ? 'Available for Click + Collect' : 'Not available for Click + Collect'} />
            <AvailRow available={isInStore} label={isInStore ? 'Available in stores' : 'Not available in stores'} />
          </div>

          {/* Trust Icons */}
          <div className="grid grid-cols-3 gap-3 border-t border-neutral-lighter pt-6">
            {[{ icon: Truck, text: 'Free Delivery over £50' }, { icon: ShieldCheck, text: 'Secure Checkout' }, { icon: RefreshCw, text: 'Easy Returns' }].map(({ icon: Icon, text }) => (
              <div key={text} className="flex flex-col items-center gap-2 text-center">
                <Icon size={22} className="text-brand-orange" />
                <span className="text-xs text-neutral-dark">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-16">
        <div className="flex gap-0 border-b border-neutral-lighter mb-6">
          {(['details', 'delivery', 'reviews'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-bold uppercase tracking-wide border-b-2 transition-colors ${activeTab === tab ? 'border-brand-orange text-brand-orange' : 'border-transparent text-neutral hover:text-brand-offBlack'}`}
            >
              {tab === 'details' ? 'Product Details' : tab === 'delivery' ? 'Delivery & Returns' : 'Reviews'}
            </button>
          ))}
        </div>
        {activeTab === 'details' && (
          <div>
            <h3 className="font-bold text-lg mb-4">Key Features</h3>
            <ul className="space-y-2">
              {product.features.map(f => (
                <li key={f} className="flex items-start gap-3 text-neutral-dark">
                  <Check size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}
        {activeTab === 'delivery' && (
          <div className="space-y-4 text-neutral-dark text-sm">
            <p><strong className="text-brand-offBlack">Standard Delivery (3–5 working days):</strong> Free on orders over £50. £3.99 for orders under £50.</p>
            <p><strong className="text-brand-offBlack">Express Delivery (next working day):</strong> £9.99. Order before 3pm.</p>
            <p><strong className="text-brand-offBlack">Click & Collect:</strong> Available at selected stores. Free of charge.</p>
            <p><strong className="text-brand-offBlack">Returns:</strong> Return within 30 days of delivery for a full refund. Item must be unused in original packaging.</p>
          </div>
        )}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border border-neutral-lighter p-5 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center text-sm font-bold">
                    {['JD', 'SM', 'RK'][i]}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{['John D.', 'Sarah M.', 'Robert K.'][i]}</p>
                    <div className="flex">
                      {[...Array(5)].map((_, j) => <Star key={j} size={12} className={j < [5, 4, 5][i] ? 'fill-brand-orange text-brand-orange' : 'text-neutral-light'} />)}
                    </div>
                  </div>
                </div>
                <p className="text-neutral-dark text-sm">
                  {['Excellent product, exactly as described. Fast delivery too!', 'Good quality. Would recommend to others.', 'Perfect for my project. Very pleased with the purchase.'][i]}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6 border-b-2 border-brand-orange inline-block pb-2">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  )
}

function AvailRow({ available, label }: { available: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      {available ? <Check size={14} className="text-green-600 flex-shrink-0" /> : <span className="w-3.5 h-3.5 rounded-full bg-red-400 flex-shrink-0" />}
      <span className="text-brand-offBlack">{label}</span>
    </div>
  )
}
