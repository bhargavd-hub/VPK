'use client'

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  Star, Heart, Check, X, ChevronRight, Plus,
  Truck, ShieldCheck, RefreshCw,
} from 'lucide-react'
import { MOCK_PRODUCTS } from '@/lib/constants'
import { useApp } from '@/lib/context'
import { Product } from '@/lib/types'

/* ─── helpers ─── */
const originalPrice = (price: number) =>
  (price * 1.2).toFixed(2)

/* colour variant thumbnails — use product image + 3 alternate tones */
function colorVariants(product: Product) {
  return [
    { label: 'Black',  image: product.image },
    { label: 'White',  image: `https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&w=200&q=70` },
    { label: 'Chrome', image: `https://images.unsplash.com/photo-1507473888900-52ea50812599?auto=format&fit=crop&w=200&q=70` },
    { label: 'Brass',  image: `https://images.unsplash.com/photo-1513506003013-d3c2611e0b58?auto=format&fit=crop&w=200&q=70` },
  ]
}

const SIZES = ['Small', 'Medium', 'Large', 'Extra large']

const TABS = [
  { key: 'description',  label: 'Description'       },
  { key: 'specs',        label: 'Specifications'     },
  { key: 'shipping',     label: 'Shipping & Returns' },
  { key: 'reviews',      label: 'Review and Rating'  },
  { key: 'attachment',   label: 'Attachment'         },
]

/* ─── inline "You May Also Like" card ─── */
function MiniProductCard({ product }: { product: Product }) {
  const { addToCart, wishlist, toggleWishlist } = useApp()
  const isWishlisted   = wishlist.includes(product.id)
  const idNum          = parseInt(product.id, 10) || 1
  const hasClickCollect = idNum % 2 !== 0
  const hasInStore      = idNum % 3 !== 0

  return (
    <div className="bg-white border border-[#E8E5E1] flex flex-col flex-shrink-0 w-[200px] hover:shadow-md transition-shadow group">
      {/* Image */}
      <Link href={`/products/${product.id}`} className="relative w-full aspect-square bg-[#F7F5F2] overflow-hidden block flex-shrink-0">
        <Image src={product.image} alt={product.name} fill
          className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized
          sizes="200px" />
        <button onClick={e => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product.id) }}
          className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-10">
          <Heart size={12} className={isWishlisted ? 'fill-[#C25E28] text-[#C25E28]' : 'text-[#302D2A]'} />
        </button>
      </Link>
      {/* Body */}
      <div className="p-3 flex flex-col flex-1">
        <div className="flex items-center gap-0.5 mb-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={10}
              className={i < Math.floor(product.rating) ? 'fill-[#C25E28] text-[#C25E28]' : 'fill-[#E5E2DE] text-[#E5E2DE]'} />
          ))}
          <span className="text-[9px] text-[#9C9790] ml-0.5">({product.reviews})</span>
        </div>
        <Link href={`/products/${product.id}`}>
          <h3 className="text-[12px] font-bold text-[#302D2A] leading-snug mb-1 line-clamp-2 hover:text-[#C25E28] transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-[10px] text-[#9C9790] leading-relaxed mb-2 line-clamp-2 flex-1">{product.description}</p>
        {/* Availability */}
        <div className="space-y-0.5 mb-2">
          <AvailRow ok label="Available for Home Delivery" />
          <AvailRow ok={hasClickCollect} label={hasClickCollect ? 'Available for Click + Collect' : 'Not available for Click + Collect'} />
          <AvailRow ok={hasInStore}      label={hasInStore      ? 'Available in stores'            : 'Not available in stores'} />
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-[#F0EDE9] mt-auto">
          <span className="text-[14px] font-bold text-[#302D2A]">£{product.price.toFixed(2)}</span>
          <button onClick={() => addToCart(product)}
            className="flex items-center gap-1 bg-[#C25E28] hover:bg-[#a64e21] text-white text-[10px] font-bold px-2.5 py-1.5 transition-colors">
            <Plus size={10} /> Add
          </button>
        </div>
      </div>
    </div>
  )
}

function AvailRow({ ok, label }: { ok: boolean; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      {ok ? <Check size={9} className="text-green-600 flex-shrink-0" />
           : <X    size={9} className="text-red-400 flex-shrink-0" />}
      <span className={`text-[9px] leading-none ${ok ? 'text-[#6B6760]' : 'text-[#9C9790]'}`}>{label}</span>
    </div>
  )
}

/* ═══════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════ */
export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { addToCart, wishlist, toggleWishlist } = useApp()

  const product = MOCK_PRODUCTS.find(p => p.id === id)

  const [activeImage,  setActiveImage]  = useState(0)
  const [activeColor,  setActiveColor]  = useState(1)   /* White selected by default */
  const [activeSize,   setActiveSize]   = useState<string | null>(null)
  const [qty,          setQty]          = useState('1')
  const [activeTab,    setActiveTab]    = useState('description')

  if (!product) {
    return (
      <div className="text-center py-24 px-4">
        <h1 className="text-2xl font-bold mb-4 text-[#302D2A]">Product not found</h1>
        <Link href="/products" className="text-[#C25E28] hover:underline">← Back to products</Link>
      </div>
    )
  }

  const isWishlisted = wishlist.includes(product.id)
  const colors       = colorVariants(product)
  const origPrice    = originalPrice(product.price)

  /* gallery thumbnails — main image + 3 extra */
  const galleryImages = [
    product.image,
    'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1507473888900-52ea50812599?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1513506003013-d3c2611e0b58?auto=format&fit=crop&w=600&q=80',
  ]

  /* "You May Also Like" — 6 products from same category + rest */
  const sameCat = MOCK_PRODUCTS.filter(p => p.category === product.category && p.id !== product.id)
  const others  = MOCK_PRODUCTS.filter(p => p.category !== product.category && p.id !== product.id)
  const suggestions = [...sameCat, ...others].slice(0, 6)

  const handleAddToCart = () => {
    addToCart(product, Math.max(1, parseInt(qty) || 1))
  }

  return (
    <div className="bg-white">

      {/* ── Breadcrumb ── */}
      <div className="w-full px-4 md:px-10 xl:px-14 py-3 border-b border-[#E5E2DE]">
        <nav className="flex items-center gap-1.5 text-xs text-[#9C9790]">
          <Link href="/" className="hover:text-[#C25E28] transition-colors">Home</Link>
          <ChevronRight size={12} className="text-[#D4D0CB]" />
          <Link
            href={`/products?category=${encodeURIComponent(product.category)}`}
            className="hover:text-[#C25E28] transition-colors"
          >
            {product.category}
          </Link>
          <ChevronRight size={12} className="text-[#D4D0CB]" />
          <span className="text-[#302D2A] font-semibold truncate max-w-[220px]">{product.name}</span>
        </nav>
      </div>

      {/* ── Main Product Area ── */}
      <div className="w-full px-4 md:px-10 xl:px-14 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">

          {/* ── Left: Image Gallery ── */}
          <div>
            {/* Main image */}
            <div className="relative aspect-square bg-[#F7F5F2] overflow-hidden mb-3">
              <Image
                key={activeImage}
                src={galleryImages[activeImage]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
                unoptimized
                priority
              />
              {/* NEW ARRIVAL badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-[#C25E28] text-white text-[10px] font-black px-3 py-1.5 uppercase tracking-widest shadow">
                  New Arrival
                </span>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2">
              {galleryImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`aspect-square overflow-hidden border-2 transition-all ${activeImage === i ? 'border-[#C25E28]' : 'border-[#E5E2DE] hover:border-[#C25E28]/50'}`}
                >
                  <Image src={img} alt={`${product.name} view ${i+1}`} width={120} height={120}
                    className="w-full h-full object-cover" unoptimized />
                </button>
              ))}
            </div>
          </div>

          {/* ── Right: Product Info ── */}
          <div>

            {/* Rating row */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => {
                  const filled = i < Math.floor(product.rating)
                  const half   = !filled && i < product.rating
                  return (
                    <Star key={i} size={17}
                      className={filled || half ? 'fill-[#C25E28] text-[#C25E28]' : 'fill-[#E5E2DE] text-[#E5E2DE]'} />
                  )
                })}
              </div>
              <span className="text-sm text-[#6B6760]">{product.reviews} Verified Reviews</span>
            </div>

            {/* Name */}
            <h1 className="text-3xl md:text-4xl font-bold text-[#302D2A] leading-tight mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-3xl font-bold text-[#C25E28]">£{product.price.toFixed(2)}</span>
              <span className="text-lg text-[#9C9790] line-through">£{origPrice}</span>
            </div>
            <p className="text-xs text-[#9C9790] mb-4">Sold &amp; shipped by <span className="font-bold text-[#302D2A]">VPK</span></p>

            {/* Short description */}
            <p className="text-sm text-[#6B6760] leading-relaxed mb-6">{product.description}</p>

            {/* Color selection */}
            <div className="mb-5">
              <p className="text-sm font-bold text-[#302D2A] mb-2">
                Color selection: <span className="font-normal text-[#6B6760]">{colors[activeColor].label}</span>
              </p>
              <div className="flex gap-2">
                {colors.map((c, i) => (
                  <button key={i} onClick={() => setActiveColor(i)}
                    className={`w-14 h-14 overflow-hidden border-2 transition-all ${activeColor === i ? 'border-[#C25E28] shadow-sm' : 'border-[#E5E2DE] hover:border-[#C25E28]/40'}`}>
                    <Image src={c.image} alt={c.label} width={56} height={56} className="w-full h-full object-cover" unoptimized />
                  </button>
                ))}
              </div>
            </div>

            {/* Measurement / Size */}
            <div className="mb-6">
              <p className="text-sm font-bold text-[#302D2A] mb-2">
                Measurement: <span className="font-normal text-[#6B6760]">{activeSize ?? 'None'}</span>
              </p>
              <div className="flex gap-2 flex-wrap">
                {SIZES.map(size => (
                  <button key={size} onClick={() => setActiveSize(activeSize === size ? null : size)}
                    className={`px-4 py-2 border text-sm font-medium transition-all ${activeSize === size ? 'border-[#C25E28] text-[#C25E28] bg-[#C25E28]/5 font-bold' : 'border-[#D4D0CB] text-[#6B6760] hover:border-[#C25E28] hover:text-[#C25E28]'}`}>
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-4">
              <p className="text-sm font-bold text-[#302D2A] mb-2">Quantity</p>
              <input
                type="number"
                min={1}
                value={qty}
                onChange={e => setQty(e.target.value)}
                className="w-24 border border-[#D4D0CB] px-4 py-2.5 text-sm text-[#302D2A] focus:border-[#C25E28] focus:outline-none"
              />
            </div>

            {/* ADD TO CART + Wishlist */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#C25E28] hover:bg-[#a64e21] text-white font-bold py-4 text-sm uppercase tracking-widest transition-colors"
              >
                Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className="w-14 border-2 border-[#D4D0CB] hover:border-[#C25E28] flex items-center justify-center transition-colors flex-shrink-0"
              >
                <Heart size={20} className={isWishlisted ? 'fill-[#C25E28] text-[#C25E28]' : 'text-[#302D2A]'} />
              </button>
            </div>

            {/* Trust row */}
            <div className="flex gap-5 border-t border-[#F0EDE9] pt-5">
              {[
                { icon: Truck,       text: 'Free Delivery over £50' },
                { icon: ShieldCheck, text: 'Secure Checkout' },
                { icon: RefreshCw,   text: 'Easy Returns' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-xs text-[#6B6760]">
                  <Icon size={16} className="text-[#C25E28] flex-shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="w-full px-4 md:px-10 xl:px-14 border-t border-[#E5E2DE]">
        {/* Tab bar */}
        <div className="flex overflow-x-auto border-b border-[#E5E2DE]">
          {TABS.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`flex-shrink-0 px-6 py-4 text-xs font-bold uppercase tracking-widest border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.key ? 'border-[#C25E28] text-[#C25E28]' : 'border-transparent text-[#9C9790] hover:text-[#302D2A]'}`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="py-8 max-w-3xl">

          {activeTab === 'description' && (
            <div>
              <h2 className="text-xl font-bold text-[#302D2A] mb-4">Product Description</h2>
              <p className="text-sm text-[#6B6760] leading-relaxed mb-5">
                Enhance your living space with the {product.name}. Designed with both aesthetics and functionality in mind, this piece blends seamlessly into modern and traditional interiors alike. Crafted from high-quality materials, it promises durability and style that lasts.
              </p>
              <ul className="space-y-2">
                {product.features.map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-[#6B6760]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#302D2A] flex-shrink-0 mt-2" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'specs' && (
            <div>
              <h2 className="text-xl font-bold text-[#302D2A] mb-4">Specifications</h2>
              <table className="w-full text-sm">
                <tbody className="divide-y divide-[#F0EDE9]">
                  {[
                    ['Category',     product.category],
                    ['Rating',       `${product.rating} / 5`],
                    ['Reviews',      product.reviews.toString()],
                    ['Price',        `£${product.price.toFixed(2)}`],
                    ['Availability', 'In Stock'],
                    ['Shipping',     'Standard & Express'],
                  ].map(([k, v]) => (
                    <tr key={k}>
                      <td className="py-3 pr-8 font-bold text-[#302D2A] w-40">{k}</td>
                      <td className="py-3 text-[#6B6760]">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-[#302D2A] mb-4">Shipping &amp; Returns</h2>
              {[
                { title: 'Standard Delivery (3–5 working days)', body: 'Free on orders over £50. £3.99 on orders under £50.' },
                { title: 'Express Delivery (next working day)',   body: '£9.99. Order before 3pm Mon–Fri.' },
                { title: 'Click & Collect',                      body: 'Free. Available at selected stores. Ready within 2 hours.' },
                { title: 'Returns',                              body: 'Return within 30 days for a full refund. Item must be unused in original packaging.' },
              ].map(({ title, body }) => (
                <div key={title}>
                  <p className="font-bold text-sm text-[#302D2A] mb-1">{title}</p>
                  <p className="text-sm text-[#6B6760]">{body}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <h2 className="text-xl font-bold text-[#302D2A] mb-6">Customer Reviews</h2>
              <div className="space-y-5">
                {[
                  { initials: 'JD', name: 'John D.',   stars: 5, text: 'Excellent product, exactly as described. Fast delivery too!' },
                  { initials: 'SM', name: 'Sarah M.',  stars: 4, text: 'Good quality. Would recommend to others.' },
                  { initials: 'RK', name: 'Robert K.', stars: 5, text: 'Perfect for my project. Very pleased with the purchase.' },
                ].map(r => (
                  <div key={r.name} className="border border-[#E5E2DE] p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-full bg-[#C25E28] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {r.initials}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-[#302D2A]">{r.name}</p>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={11} className={i < r.stars ? 'fill-[#C25E28] text-[#C25E28]' : 'fill-[#E5E2DE] text-[#E5E2DE]'} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-[#6B6760] leading-relaxed">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'attachment' && (
            <div>
              <h2 className="text-xl font-bold text-[#302D2A] mb-4">Attachments</h2>
              <div className="space-y-3">
                {['Product Data Sheet.pdf', 'Installation Guide.pdf', 'Guarantee Card.pdf'].map(f => (
                  <div key={f} className="flex items-center gap-3 p-3 border border-[#E5E2DE] hover:border-[#C25E28] transition-colors cursor-pointer group">
                    <div className="w-8 h-8 bg-red-50 flex items-center justify-center text-red-500 text-[9px] font-black flex-shrink-0">PDF</div>
                    <span className="text-sm font-medium text-[#302D2A] group-hover:text-[#C25E28] transition-colors">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ── You May Also Like ── */}
      <div className="w-full px-4 md:px-10 xl:px-14 py-10 border-t border-[#E5E2DE] bg-[#F7F5F2]">
        <h2 className="text-2xl font-bold text-[#302D2A] mb-6">You May Also Like</h2>
        <div className="flex gap-4 overflow-x-auto pb-3 -mx-1 px-1 scrollbar-thin">
          {suggestions.map(p => <MiniProductCard key={p.id} product={p} />)}
        </div>
      </div>

    </div>
  )
}
