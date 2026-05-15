'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Heart, Star, Plus, Check } from 'lucide-react'
import { Product } from '@/lib/types'
import { useApp } from '@/lib/context'

export function HomeProductCard({ product }: { product: Product }) {
  const { addToCart, wishlist, toggleWishlist } = useApp()
  const isWishlisted = wishlist.includes(product.id)

  return (
    <Link href={`/products/${product.id}`} className="group flex flex-col h-full bg-white border border-neutral-lighter hover:shadow-lg transition-shadow duration-300">
      <div className="relative aspect-square overflow-hidden bg-neutral-lightest">
        <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, 25vw" unoptimized />
        <button
          className="absolute top-2 right-2 p-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-10"
          onClick={e => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product.id) }}
        >
          <Heart size={16} className={isWishlisted ? 'fill-brand-orange text-brand-orange' : 'text-brand-offBlack'} />
        </button>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center mb-1.5">
          {[...Array(5)].map((_, i) => <Star key={i} size={12} className={i < Math.floor(product.rating) ? 'fill-brand-orange text-brand-orange' : 'text-neutral-light'} />)}
          <span className="text-xs text-neutral ml-1">({product.reviews})</span>
        </div>
        <h3 className="font-bold text-brand-offBlack text-base leading-tight mb-2 group-hover:text-brand-orange transition-colors line-clamp-2">{product.name}</h3>
        <p className="text-sm text-neutral mb-3 line-clamp-2">{product.description}</p>
        <div className="mb-2 flex items-center gap-1.5 text-xs">
          <Check size={12} className="text-green-600" />
          <span>Available for Home Delivery</span>
        </div>
        <div className="mt-auto flex items-center justify-between gap-3 pt-3 border-t border-neutral-lightest">
          <span className="text-xl font-bold text-brand-offBlack">£{product.price.toFixed(2)}</span>
          <button onClick={e => { e.preventDefault(); e.stopPropagation(); addToCart(product) }} className="bg-brand-orange text-white px-4 py-2 text-xs font-bold hover:bg-[#a64e21] transition-colors flex items-center gap-1 rounded">
            <Plus size={14} /> Add
          </button>
        </div>
      </div>
    </Link>
  )
}
