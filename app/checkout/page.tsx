'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Check, CreditCard, Truck, ShoppingBag, ChevronRight } from 'lucide-react'
import { useApp } from '@/lib/context'
import { Button, Input } from '@/components/ui/Forms'
import { CheckoutStep } from '@/lib/types'

export default function CheckoutPage() {
  const { cart, clearCart } = useApp()
  const [step, setStep] = useState<CheckoutStep>(CheckoutStep.CART)
  const [shipping, setShipping] = useState({ fullName: '', address: '', city: '', postcode: '', phone: '' })
  const [payment, setPayment] = useState({ cardNumber: '', expiry: '', cvv: '', name: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const subtotal = cart.reduce((a, i) => a + i.price * i.quantity, 0)
  const delivery = subtotal >= 50 ? 0 : 3.99
  const total = subtotal + delivery

  const STEPS = [
    { key: CheckoutStep.CART, label: 'Cart', icon: ShoppingBag },
    { key: CheckoutStep.SHIPPING, label: 'Shipping', icon: Truck },
    { key: CheckoutStep.PAYMENT, label: 'Payment', icon: CreditCard },
    { key: CheckoutStep.CONFIRMATION, label: 'Confirmation', icon: Check },
  ]

  const validateShipping = () => {
    const e: Record<string, string> = {}
    if (!shipping.fullName) e.fullName = 'Required'
    if (!shipping.address) e.address = 'Required'
    if (!shipping.city) e.city = 'Required'
    if (!shipping.postcode) e.postcode = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const validatePayment = () => {
    const e: Record<string, string> = {}
    if (!payment.cardNumber || payment.cardNumber.replace(/\s/g, '').length < 16) e.cardNumber = 'Enter a valid card number'
    if (!payment.expiry) e.expiry = 'Required'
    if (!payment.cvv || payment.cvv.length < 3) e.cvv = 'Invalid CVV'
    if (!payment.name) e.name = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNext = () => {
    if (step === CheckoutStep.CART) setStep(CheckoutStep.SHIPPING)
    else if (step === CheckoutStep.SHIPPING && validateShipping()) setStep(CheckoutStep.PAYMENT)
    else if (step === CheckoutStep.PAYMENT && validatePayment()) { setStep(CheckoutStep.CONFIRMATION); clearCart() }
  }

  if (step === CheckoutStep.CONFIRMATION) {
    return (
      <div className="w-full px-4 md:px-12 py-16 text-center max-w-lg mx-auto">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check size={40} className="text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-brand-offBlack mb-3">Order Confirmed!</h1>
        <p className="text-neutral-dark mb-2">Thank you for your order. You will receive a confirmation email shortly.</p>
        <p className="text-brand-orange font-bold mb-8">Order #VPK-{Math.random().toString(36).slice(2,8).toUpperCase()}</p>
        <div className="flex gap-4 justify-center">
          <Link href="/account"><Button variant="secondary">View Orders</Button></Link>
          <Link href="/products"><Button>Continue Shopping</Button></Link>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full px-4 md:px-12 py-8">
      {/* Step Progress */}
      <div className="flex items-center justify-center gap-0 mb-10">
        {STEPS.map((s, i) => {
          const stepIdx = Object.values(CheckoutStep).indexOf(s.key)
          const currentIdx = Object.values(CheckoutStep).indexOf(step)
          const isDone = stepIdx < currentIdx
          const isActive = s.key === step
          return (
            <React.Fragment key={s.key}>
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${isDone ? 'bg-green-500 text-white' : isActive ? 'bg-brand-orange text-white' : 'bg-neutral-lightest text-neutral'}`}>
                  {isDone ? <Check size={18} /> : <s.icon size={18} />}
                </div>
                <span className={`text-xs mt-1 font-medium ${isActive ? 'text-brand-orange' : isDone ? 'text-green-600' : 'text-neutral'}`}>{s.label}</span>
              </div>
              {i < STEPS.length - 1 && <div className={`w-16 h-0.5 mb-4 mx-1 ${stepIdx < currentIdx ? 'bg-green-500' : 'bg-neutral-lighter'}`} />}
            </React.Fragment>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          {step === CheckoutStep.CART && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Review Your Order</h2>
              <div className="space-y-3">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4 border border-neutral-lighter p-4 rounded">
                    <div className="relative w-16 h-16 bg-neutral-lightest flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" unoptimized />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-sm text-brand-offBlack">{item.name}</p>
                      <p className="text-xs text-neutral">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-bold text-sm">£{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === CheckoutStep.SHIPPING && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>
              <div className="space-y-4">
                <Input label="Full Name" value={shipping.fullName} onChange={e => setShipping(s => ({ ...s, fullName: e.target.value }))} placeholder="John Smith" error={errors.fullName} />
                <Input label="Address Line 1" value={shipping.address} onChange={e => setShipping(s => ({ ...s, address: e.target.value }))} placeholder="123 Main Street" error={errors.address} />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="City" value={shipping.city} onChange={e => setShipping(s => ({ ...s, city: e.target.value }))} placeholder="London" error={errors.city} />
                  <Input label="Postcode" value={shipping.postcode} onChange={e => setShipping(s => ({ ...s, postcode: e.target.value }))} placeholder="SW1A 1AA" error={errors.postcode} />
                </div>
                <Input label="Phone Number" type="tel" value={shipping.phone} onChange={e => setShipping(s => ({ ...s, phone: e.target.value }))} placeholder="+44 7700 000000" />
              </div>
            </div>
          )}

          {step === CheckoutStep.PAYMENT && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Payment Details</h2>
              <div className="space-y-4">
                <Input label="Cardholder Name" value={payment.name} onChange={e => setPayment(p => ({ ...p, name: e.target.value }))} placeholder="John Smith" error={errors.name} />
                <Input label="Card Number" value={payment.cardNumber} onChange={e => { const v = e.target.value.replace(/\D/g, '').slice(0, 16); setPayment(p => ({ ...p, cardNumber: v.replace(/(.{4})/g, '$1 ').trim() })) }} placeholder="1234 5678 9012 3456" error={errors.cardNumber} />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Expiry Date" value={payment.expiry} onChange={e => setPayment(p => ({ ...p, expiry: e.target.value }))} placeholder="MM/YY" error={errors.expiry} />
                  <Input label="CVV" value={payment.cvv} onChange={e => setPayment(p => ({ ...p, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))} placeholder="123" error={errors.cvv} />
                </div>
              </div>
            </div>
          )}

          <Button className="w-full mt-8" onClick={handleNext}>
            {step === CheckoutStep.CART ? 'Continue to Shipping' : step === CheckoutStep.SHIPPING ? 'Continue to Payment' : 'Place Order'}
            <ChevronRight size={18} />
          </Button>
        </div>

        {/* Summary */}
        <div className="bg-neutral-lightest p-6 h-fit sticky top-24">
          <h3 className="font-bold text-lg mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm mb-4">
            <div className="flex justify-between"><span className="text-neutral-dark">Subtotal</span><span>£{subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-neutral-dark">Delivery</span><span className={delivery === 0 ? 'text-green-600 font-bold' : ''}>{delivery === 0 ? 'FREE' : `£${delivery.toFixed(2)}`}</span></div>
            <div className="flex justify-between font-bold text-base pt-2 border-t border-neutral-lighter"><span>Total</span><span>£{total.toFixed(2)}</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
