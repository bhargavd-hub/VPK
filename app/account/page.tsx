'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { User, Package, Heart, Settings, LogOut, Star, ChevronRight, MapPin } from 'lucide-react'
import { useApp } from '@/lib/context'
import { MOCK_ORDERS, MOCK_PRODUCTS } from '@/lib/constants'
import { Button } from '@/components/ui/Forms'

type Tab = 'profile' | 'orders' | 'wishlist' | 'settings'

export default function AccountPage() {
  const { user, logout, wishlist, addToCart } = useApp()
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('profile')

  if (!user) {
    return (
      <div className="w-full px-4 md:px-12 py-20 text-center">
        <User size={64} className="text-neutral-light mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-brand-offBlack mb-4">Sign in to your account</h1>
        <p className="text-neutral-dark mb-8">Access your orders, wishlist, and account settings.</p>
        <div className="flex gap-4 justify-center">
          <Link href="/login"><Button>Sign In</Button></Link>
          <Link href="/register"><Button variant="secondary">Create Account</Button></Link>
        </div>
      </div>
    )
  }

  const handleLogout = () => { logout(); router.push('/') }
  const wishlistProducts = MOCK_PRODUCTS.filter(p => wishlist.includes(p.id))

  const TABS = [
    { key: 'profile' as Tab, label: 'My Profile', icon: User },
    { key: 'orders' as Tab, label: 'My Orders', icon: Package },
    { key: 'wishlist' as Tab, label: 'Wishlist', icon: Heart },
    { key: 'settings' as Tab, label: 'Settings', icon: Settings },
  ]

  const statusColors: Record<string, string> = {
    Processing: 'bg-yellow-100 text-yellow-700',
    Shipped: 'bg-blue-100 text-blue-700',
    Delivered: 'bg-green-100 text-green-700',
    Cancelled: 'bg-red-100 text-red-600',
  }

  return (
    <div className="w-full px-4 md:px-12 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-brand-offBlack text-white p-6 mb-4 rounded-lg">
            <div className="w-16 h-16 rounded-full bg-brand-orange flex items-center justify-center text-2xl font-bold mb-3">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h2 className="font-bold text-lg">{user.name}</h2>
            <p className="text-white/70 text-sm">{user.email}</p>
          </div>
          <nav className="space-y-1">
            {TABS.map(({ key, label, icon: Icon }) => (
              <button key={key} onClick={() => setTab(key)} className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded transition-colors ${tab === key ? 'bg-brand-orange text-white' : 'text-neutral-dark hover:bg-neutral-lightest'}`}>
                <Icon size={18} /> {label}
              </button>
            ))}
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded transition-colors text-red-500 hover:bg-red-50 mt-4">
              <LogOut size={18} /> Sign Out
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {tab === 'profile' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">My Profile</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoCard label="Full Name" value={user.name} />
                <InfoCard label="Email Address" value={user.email} />
                <InfoCard label="Phone" value="Not set" />
                <InfoCard label="Member Since" value="May 2026" />
              </div>
              <div className="mt-8">
                <h3 className="font-bold mb-4">Saved Addresses</h3>
                <div className="border border-dashed border-neutral-lighter rounded-lg p-6 text-center">
                  <MapPin size={28} className="text-neutral-light mx-auto mb-2" />
                  <p className="text-neutral text-sm">No saved addresses yet.</p>
                  <button className="text-brand-orange text-sm font-bold mt-2 hover:underline">+ Add Address</button>
                </div>
              </div>
            </div>
          )}

          {tab === 'orders' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">My Orders</h2>
              {MOCK_ORDERS.length === 0 ? (
                <p className="text-neutral">No orders yet.</p>
              ) : (
                <div className="space-y-4">
                  {MOCK_ORDERS.map(order => (
                    <div key={order.id} className="border border-neutral-lighter rounded-lg overflow-hidden">
                      <div className="flex flex-wrap gap-4 items-center justify-between bg-neutral-lightest px-5 py-3">
                        <div>
                          <p className="font-bold text-sm text-brand-offBlack">{order.id}</p>
                          <p className="text-xs text-neutral">{new Date(order.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        </div>
                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${statusColors[order.status]}`}>{order.status}</span>
                        <p className="font-bold text-brand-offBlack">£{order.total.toFixed(2)}</p>
                      </div>
                      <div className="p-5">
                        <div className="flex gap-3 flex-wrap">
                          {order.items.map(item => (
                            <div key={item.id} className="relative w-14 h-14 bg-neutral-lightest rounded overflow-hidden flex-shrink-0">
                              <Image src={item.image} alt={item.name} fill className="object-cover" unoptimized />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === 'wishlist' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>
              {wishlistProducts.length === 0 ? (
                <div className="text-center py-12">
                  <Heart size={48} className="text-neutral-light mx-auto mb-4" />
                  <p className="text-neutral mb-4">No items in your wishlist yet.</p>
                  <Link href="/products"><Button variant="secondary" size="sm">Browse Products</Button></Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistProducts.map(product => (
                    <div key={product.id} className="border border-neutral-lighter rounded-lg overflow-hidden">
                      <div className="relative aspect-video bg-neutral-lightest">
                        <Image src={product.image} alt={product.name} fill className="object-cover" unoptimized />
                      </div>
                      <div className="p-4">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => <Star key={i} size={12} className={i < Math.floor(product.rating) ? 'fill-brand-orange text-brand-orange' : 'text-neutral-light'} />)}
                        </div>
                        <h3 className="font-bold text-sm mt-1 line-clamp-2">{product.name}</h3>
                        <p className="text-brand-orange font-bold mt-1">£{product.price.toFixed(2)}</p>
                        <Button className="w-full mt-3" size="sm" onClick={() => addToCart(product)}>Add to Cart</Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === 'settings' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
              <div className="space-y-4">
                {[
                  { label: 'Change Password', desc: 'Update your account password' },
                  { label: 'Email Notifications', desc: 'Manage your email preferences' },
                  { label: 'Privacy Settings', desc: 'Control your data and privacy' },
                  { label: 'Delete Account', desc: 'Permanently delete your account', danger: true },
                ].map(item => (
                  <div key={item.label} className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:shadow-sm transition-shadow ${item.danger ? 'border-red-200 hover:border-red-300' : 'border-neutral-lighter'}`}>
                    <div>
                      <p className={`font-bold text-sm ${item.danger ? 'text-red-500' : 'text-brand-offBlack'}`}>{item.label}</p>
                      <p className="text-xs text-neutral">{item.desc}</p>
                    </div>
                    <ChevronRight size={18} className="text-neutral" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-neutral-lighter p-4 rounded-lg">
      <p className="text-xs text-neutral uppercase tracking-wide mb-1">{label}</p>
      <p className="font-bold text-brand-offBlack">{value}</p>
    </div>
  )
}
