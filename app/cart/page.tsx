'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Plus, Minus, X, ShoppingCart, ArrowRight } from 'lucide-react'
import { useApp } from '@/lib/context'
import { Button } from '@/components/ui/Forms'

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useApp()
  const subtotal = cart.reduce((acc, i) => acc + i.price * i.quantity, 0)
  const delivery = subtotal >= 50 ? 0 : 3.99
  const total = subtotal + delivery

  if (cart.length === 0) {
    return (
      <div className="w-full px-4 md:px-12 py-20 text-center">
        <ShoppingCart size={64} className="text-neutral-light mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-brand-offBlack mb-4">Your cart is empty</h1>
        <p className="text-neutral-dark mb-8">Looks like you haven&apos;t added anything yet.</p>
        <Link href="/products">
          <Button>Start Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full px-4 md:px-12 py-8">
      <h1 className="text-3xl font-bold text-brand-offBlack mb-8">Your Cart ({cart.length} item{cart.length > 1 ? 's' : ''})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.id} className="flex gap-4 bg-white border border-neutral-lighter p-4 hover:shadow-sm transition-shadow">
              <div className="relative w-24 h-24 bg-neutral-lightest flex-shrink-0">
                <Image src={item.image} alt={item.name} fill className="object-cover" unoptimized />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <Link href={`/products/${item.id}`} className="font-bold text-brand-offBlack hover:text-brand-orange transition-colors text-sm leading-tight">
                    {item.name}
                  </Link>
                  <button onClick={() => removeFromCart(item.id)} className="text-neutral hover:text-red-500 transition-colors ml-2">
                    <X size={18} />
                  </button>
                </div>
                <p className="text-xs text-neutral mb-3">{item.category}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-neutral-light">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1.5 hover:bg-neutral-lightest text-sm">
                      <Minus size={14} />
                    </button>
                    <span className="px-4 py-1.5 border-x border-neutral-light font-bold text-sm min-w-[40px] text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1.5 hover:bg-neutral-lightest text-sm">
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="font-bold text-brand-offBlack">£{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-neutral-lightest p-6 sticky top-24">
            <h2 className="text-xl font-bold text-brand-offBlack mb-6">Order Summary</h2>
            <div className="space-y-3 mb-4">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-neutral-dark truncate pr-2">{item.name} × {item.quantity}</span>
                  <span className="font-medium text-brand-offBlack flex-shrink-0">£{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-neutral-lighter pt-4 space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-dark">Subtotal</span>
                <span>£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-dark">Delivery</span>
                <span className={delivery === 0 ? 'text-green-600 font-bold' : ''}>
                  {delivery === 0 ? 'FREE' : `£${delivery.toFixed(2)}`}
                </span>
              </div>
              {delivery > 0 && (
                <p className="text-xs text-neutral">Add £{(50 - subtotal).toFixed(2)} more for free delivery</p>
              )}
              <div className="flex justify-between font-bold text-lg pt-2 border-t border-neutral-lighter">
                <span>Total</span>
                <span>£{total.toFixed(2)}</span>
              </div>
            </div>
            <Link href="/checkout">
              <Button className="w-full justify-between">
                Proceed to Checkout <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="/products" className="block text-center mt-4 text-sm text-brand-orange hover:underline">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
