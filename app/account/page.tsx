'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  User as UserIcon, ShoppingCart, Heart, MessageSquare,
  Settings, LogOut, Star, Eye, RefreshCw, MapPin, Package,
  ChevronLeft, Paperclip, X, Check, Plus,
} from 'lucide-react'
import { useApp } from '@/lib/context'
import { MOCK_PRODUCTS, MOCK_ORDERS } from '@/lib/constants'

/* ─── Mock Data ─── */
const TICKETS = [
  { id: '#00128', subject: 'Delay in my Order Delivery', department: 'Order Issues',   lastActivity: '1 day ago',    status: 'Closed',  priority: 'Medium', order: '#30008436 — Order from Mar 14, 2026' },
  { id: '#00129', subject: 'Product Not as Described',   department: 'Product Issues', lastActivity: '3 days ago',   status: 'Open',    priority: 'High',   order: '#30008437 — Order from Apr 2, 2026'  },
  { id: '#00130', subject: 'Refund Request for Return',  department: 'Returns',        lastActivity: '5 days ago',   status: 'Pending', priority: 'Low',    order: null },
]

const TICKET_HISTORY = [
  { author: 'Support Agent',  time: '2 days ago', isStaff: true,  message: 'Thank you for contacting VPK Support. We have received your request and will investigate the delay with our logistics partner.', attachments: [] },
  { author: 'You',            time: '1 day ago',  isStaff: false, message: 'Thank you for the update. I wanted to let you know that the package arrived today, though 3 days late.', attachments: ['receipt.pdf'] },
  { author: 'Support Agent',  time: '1 day ago',  isStaff: true,  message: 'We are glad the package arrived. We sincerely apologise for the delay. We will be issuing a £5 credit to your account as compensation.', attachments: [] },
]

const NAV_TABS = [
  { id: 'profile',  label: 'My Profile',           icon: UserIcon      },
  { id: 'orders',   label: 'My Orders',             icon: ShoppingCart  },
  { id: 'wishlist', label: 'Wishlist',              icon: Heart         },
  { id: 'tickets',  label: 'My Support Tickets',   icon: MessageSquare },
  { id: 'settings', label: 'Settings',             icon: Settings      },
]

const STATUS_COLORS: Record<string, string> = {
  Processing: 'bg-yellow-100 text-yellow-700',
  Shipped:    'bg-blue-100 text-blue-700',
  Delivered:  'bg-green-100 text-green-700',
  Closed:     'bg-neutral-200 text-neutral-600',
  Cancelled:  'bg-red-100 text-red-600',
}

export default function AccountPage() {
  const { user, logout, wishlist, toggleWishlist, addToCart } = useApp()
  const router = useRouter()
  const [tab,             setTab]             = useState('profile')
  const [selectedTicket,  setSelectedTicket]  = useState<any>(null)
  const [replyMsg,        setReplyMsg]        = useState('')
  const [installOpen,     setInstallOpen]     = useState(false)
  const [installOrder,    setInstallOrder]    = useState<any>(null)
  const [installForm,     setInstallForm]     = useState({ fullName:'', date:'', time:'', address:'', instructions:'' })

  useEffect(() => { if (!user) router.push('/login') }, [user, router])
  if (!user) return null

  const wishlistProducts = MOCK_PRODUCTS.filter(p => wishlist.includes(p.id))
  const handleLogout = () => { logout(); router.push('/') }

  return (
    <div className="bg-[#F7F5F2] min-h-screen py-10">
      <div className="w-full px-4 md:px-10 xl:px-14">
        <h1 className="text-3xl font-bold text-[#302D2A] mb-8">My Account</h1>

        <div className="flex flex-col md:flex-row gap-8">

          {/* ── Sidebar ── */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-[#E5E2DE] overflow-hidden">
              {/* Avatar */}
              <div className="p-5 border-b border-[#E5E2DE] flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#C25E28] text-white flex items-center justify-center text-xl font-bold flex-shrink-0">
                  {(user as any).name?.charAt(0)?.toUpperCase() ?? 'U'}
                </div>
                <div className="overflow-hidden">
                  <p className="font-bold text-[#302D2A] truncate">{(user as any).name}</p>
                  <p className="text-xs text-[#9C9790] truncate">{(user as any).email}</p>
                </div>
              </div>
              {/* Nav */}
              <nav className="p-2">
                {NAV_TABS.map(t => (
                  <button key={t.id} onClick={() => { setTab(t.id); setSelectedTicket(null) }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${tab === t.id ? 'bg-[#C25E28] text-white' : 'text-[#6B6760] hover:bg-[#F7F5F2] hover:text-[#302D2A]'}`}>
                    <t.icon size={17} /> {t.label}
                  </button>
                ))}
                <div className="my-2 border-t border-[#E5E2DE]" />
                <button onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <LogOut size={17} /> Log Out
                </button>
              </nav>
            </div>
          </aside>

          {/* ── Main Content ── */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-xl shadow-sm border border-[#E5E2DE] p-6 md:p-8">

              {/* ─ Profile ─ */}
              {tab === 'profile' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-[#302D2A]">Personal Information</h2>
                    <button className="text-xs font-bold border border-[#D4D0CB] px-4 py-1.5 rounded-full hover:border-[#C25E28] hover:text-[#C25E28] transition-colors">
                      Edit Profile
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    {[
                      { label: 'Full Name',    value: (user as any).name },
                      { label: 'User Type',    value: (user as any).type ?? 'Standard' },
                      { label: 'Email Address',value: (user as any).email },
                      { label: 'Phone Number', value: '+44 7700 000000' },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <p className="text-[10px] text-[#9C9790] uppercase tracking-widest font-bold mb-1">{label}</p>
                        <p className="font-medium text-[#302D2A] capitalize">{value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-[#302D2A]">Shipping Address</h2>
                    <button className="text-xs font-bold border border-[#D4D0CB] px-4 py-1.5 rounded-full hover:border-[#C25E28] hover:text-[#C25E28] transition-colors">
                      Manage Addresses
                    </button>
                  </div>
                  <div className="border border-[#E5E2DE] rounded-lg p-4 bg-[#F7F5F2]/40">
                    <div className="flex items-start gap-3">
                      <MapPin size={20} className="text-[#C25E28] mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-[#6B6760]">
                        <p className="font-bold text-[#302D2A] mb-1">Home</p>
                        <p>123 Main Street, Apt 4B</p>
                        <p>London, SW1A 1AA</p>
                        <p>United Kingdom</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─ Orders ─ */}
              {tab === 'orders' && (
                <div>
                  <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <input type="text" placeholder="Search by SKU or Product Name"
                      className="flex-1 border border-[#D4D0CB] px-4 py-2.5 text-sm rounded focus:outline-none focus:border-[#C25E28]" />
                    <button className="px-6 py-2.5 bg-[#C25E28] text-white text-sm font-bold rounded hover:bg-[#a64e21] transition-colors">
                      Filter
                    </button>
                  </div>
                  <h2 className="text-2xl font-light text-[#302D2A] mb-6">My Orders</h2>

                  {MOCK_ORDERS.length > 0 ? (
                    <div className="border border-[#E5E2DE] rounded overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[860px]">
                          <thead>
                            <tr className="border-b border-[#E5E2DE] bg-[#F7F5F2]">
                              {['Product','Order #','Date','Ship To','Order Total','Status','Installation needed?','View / Reorder'].map(h => (
                                <th key={h} className="py-3.5 px-5 text-xs font-medium text-[#302D2A] whitespace-nowrap">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {MOCK_ORDERS.map((order, i) => (
                              <tr key={order.id} className={`border-b border-[#F0EDE9] ${i % 2 === 0 ? 'bg-white' : 'bg-[#F7F5F2]/40'}`}>
                                <td className="py-4 px-5">
                                  <div className="w-12 h-12 bg-[#F7F5F2] rounded overflow-hidden border border-[#E5E2DE] flex-shrink-0">
                                    <Image src={order.items[0]?.image ?? ''} alt="" width={48} height={48} className="w-full h-full object-cover" unoptimized />
                                  </div>
                                </td>
                                <td className="py-4 px-5 text-sm text-[#302D2A] whitespace-nowrap">{order.id.replace('ORD-2026-', '3000843')}</td>
                                <td className="py-4 px-5 text-sm text-[#6B6760] whitespace-nowrap">
                                  {new Date(order.date).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'2-digit'})}
                                </td>
                                <td className="py-4 px-5 text-sm text-[#6B6760]">Home</td>
                                <td className="py-4 px-5 text-sm font-medium text-[#302D2A]">£{order.total.toFixed(2)}</td>
                                <td className="py-4 px-5">
                                  <span className={`px-2.5 py-1 rounded text-xs font-bold ${STATUS_COLORS[order.status] ?? STATUS_COLORS['Processing']}`}>
                                    {order.status === 'Delivered' ? 'Closed' : order.status}
                                  </span>
                                </td>
                                <td className="py-4 px-5">
                                  <button onClick={() => { setInstallOrder(order); setInstallOpen(true) }}
                                    className="text-xs font-bold border border-[#C25E28] text-[#C25E28] px-3 py-1.5 rounded-full hover:bg-[#C25E28] hover:text-white transition-colors whitespace-nowrap">
                                    Installation needed?
                                  </button>
                                </td>
                                <td className="py-4 px-5">
                                  <div className="flex items-center justify-center gap-4">
                                    <button className="text-[#302D2A] hover:text-[#C25E28] transition-colors"><Eye size={18} /></button>
                                    <button className="text-[#302D2A] hover:text-[#C25E28] transition-colors"><RefreshCw size={18} /></button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-14 border border-[#E5E2DE] rounded">
                      <Package size={40} className="text-[#D4D0CB] mx-auto mb-4" />
                      <h3 className="font-bold text-[#302D2A] mb-2">No orders yet</h3>
                      <p className="text-sm text-[#9C9790] mb-6">When you place an order, it will appear here.</p>
                      <Link href="/products" className="px-6 py-2.5 bg-[#C25E28] text-white text-sm font-bold rounded-full hover:bg-[#a64e21] transition-colors inline-block">
                        Start Shopping
                      </Link>
                    </div>
                  )}

                  <div className="flex justify-between items-center mt-5">
                    <span className="text-sm text-[#6B6760]">{MOCK_ORDERS.length} Item(s)</span>
                    <select className="border border-[#D4D0CB] rounded px-3 py-1.5 text-sm focus:outline-none focus:border-[#C25E28] bg-white">
                      <option>10</option><option>20</option><option>50</option>
                    </select>
                  </div>
                </div>
              )}

              {/* ─ Wishlist ─ */}
              {tab === 'wishlist' && (
                <div>
                  <h2 className="text-xl font-bold text-[#302D2A] mb-6">My Wishlist</h2>
                  {wishlistProducts.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {wishlistProducts.map(p => (
                        <div key={p.id} className="bg-white border border-[#E5E2DE] flex flex-col group">
                          <Link href={`/products/${p.id}`} className="relative aspect-square bg-[#F7F5F2] overflow-hidden block">
                            <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                          </Link>
                          <div className="p-3 flex flex-col flex-1">
                            <div className="flex gap-0.5 mb-1">
                              {[...Array(5)].map((_,i) => <Star key={i} size={10} className={i < Math.floor(p.rating) ? 'fill-[#C25E28] text-[#C25E28]' : 'fill-[#E5E2DE] text-[#E5E2DE]'} />)}
                            </div>
                            <Link href={`/products/${p.id}`}>
                              <h3 className="text-xs font-bold text-[#302D2A] line-clamp-2 hover:text-[#C25E28] transition-colors mb-2">{p.name}</h3>
                            </Link>
                            <div className="mt-auto flex items-center justify-between pt-2 border-t border-[#F0EDE9]">
                              <span className="text-sm font-bold text-[#302D2A]">£{p.price.toFixed(2)}</span>
                              <button onClick={() => addToCart(p)}
                                className="flex items-center gap-1 bg-[#C25E28] text-white text-[10px] font-bold px-2.5 py-1.5 hover:bg-[#a64e21] transition-colors">
                                <Plus size={10} /> Add
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-14">
                      <Heart size={40} className="text-[#D4D0CB] mx-auto mb-4" />
                      <h3 className="font-bold text-[#302D2A] mb-2">Your wishlist is empty</h3>
                      <p className="text-sm text-[#9C9790] mb-6">Save items you love to review them later.</p>
                      <Link href="/products" className="px-6 py-2.5 bg-[#C25E28] text-white text-sm font-bold rounded-full hover:bg-[#a64e21] transition-colors inline-block">
                        Explore Products
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* ─ Support Tickets ─ */}
              {tab === 'tickets' && (
                <div>
                  {!selectedTicket ? (
                    <>
                      <h2 className="text-2xl font-light text-[#302D2A] mb-6">My Support Tickets</h2>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[600px]">
                          <thead>
                            <tr className="border-b border-[#E5E2DE]">
                              {['Subject','Request ID','Department','Last Activity','Status'].map(h => (
                                <th key={h} className="py-3 px-4 text-sm font-bold text-[#302D2A]">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {TICKETS.map((t, i) => (
                              <tr key={i} onClick={() => setSelectedTicket(t)}
                                className="border-b border-[#F0EDE9] hover:bg-[#F7F5F2] cursor-pointer transition-colors">
                                <td className="py-4 px-4 text-sm text-blue-600 hover:underline">{t.subject}</td>
                                <td className="py-4 px-4 text-sm text-[#6B6760]">{t.id}</td>
                                <td className="py-4 px-4 text-sm text-[#6B6760]">{t.department}</td>
                                <td className="py-4 px-4 text-sm text-[#6B6760]">{t.lastActivity}</td>
                                <td className="py-4 px-4">
                                  <span className={`px-2.5 py-1 rounded text-xs font-bold text-white ${t.status === 'Closed' ? 'bg-[#6B6760]' : t.status === 'Open' ? 'bg-green-500' : 'bg-yellow-500'}`}>
                                    {t.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  ) : (
                    <div>
                      <button onClick={() => setSelectedTicket(null)}
                        className="flex items-center gap-1 text-sm text-blue-600 hover:underline mb-5">
                        <ChevronLeft size={15} /> Back to Tickets
                      </button>
                      <h2 className="text-3xl font-light text-[#302D2A] mb-6">{selectedTicket.subject}</h2>

                      <div className="grid grid-cols-[120px_1fr] gap-y-3 text-sm mb-8">
                        {[
                          ['Request ID',  selectedTicket.id],
                          ['Department',  selectedTicket.department],
                          ['Priority',    selectedTicket.priority],
                        ].map(([k,v]) => (
                          <React.Fragment key={k}><div className="font-bold text-[#302D2A]">{k}</div><div className="text-[#6B6760]">{v}</div></React.Fragment>
                        ))}
                        <div className="font-bold text-[#302D2A]">Status</div>
                        <div><span className={`px-2 py-1 rounded text-xs font-bold text-white ${selectedTicket.status === 'Closed' ? 'bg-[#6B6760]' : selectedTicket.status === 'Open' ? 'bg-green-500' : 'bg-yellow-500'}`}>{selectedTicket.status}</span></div>
                        {selectedTicket.order && (
                          <React.Fragment><div className="font-bold text-[#302D2A]">Order</div><div className="text-blue-600">{selectedTicket.order}</div></React.Fragment>
                        )}
                      </div>

                      {/* Reply */}
                      <div className="mb-10">
                        <h3 className="text-lg font-light text-[#302D2A] border-b border-[#E5E2DE] pb-2 mb-4">Post a Reply</h3>
                        <label className="text-sm font-bold text-[#302D2A] block mb-2">Message <span className="text-red-500">*</span></label>
                        <textarea value={replyMsg} onChange={e => setReplyMsg(e.target.value)} rows={4} placeholder="Type your message here..."
                          className="w-full border border-[#D4D0CB] rounded p-3 text-sm focus:outline-none focus:border-[#C25E28] resize-none" />
                        <div className="flex justify-end items-center gap-4 mt-3">
                          <button className="text-[#9C9790] hover:text-[#C25E28] transition-colors"><Paperclip size={18} /></button>
                          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded text-sm font-medium transition-colors">Send</button>
                        </div>
                      </div>

                      {/* History */}
                      <div>
                        <h3 className="text-lg font-light text-[#302D2A] border-b border-[#E5E2DE] pb-2 mb-5">History</h3>
                        <div className="space-y-6">
                          {TICKET_HISTORY.map((h, i) => (
                            <div key={i}>
                              <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-3">
                                  <span className="font-bold text-sm text-[#302D2A]">{h.author}</span>
                                  <span className="text-xs text-[#9C9790]">{h.time}</span>
                                </div>
                              </div>
                              <div className={`p-4 rounded-r border-l-4 text-sm text-[#6B6760] ${h.isStaff ? 'bg-[#F7F5F2] border-blue-400' : 'bg-green-50 border-green-400'}`}>
                                {h.message}
                                {h.attachments && h.attachments.length > 0 && (
                                  <div className="flex gap-2 mt-3 pt-2 border-t border-[#E5E2DE]">
                                    {h.attachments.map((f: string, fi: number) => (
                                      <div key={fi} className="flex items-center gap-1 px-2 py-1 bg-white border border-[#E5E2DE] rounded text-xs text-blue-600 cursor-pointer hover:underline">
                                        <Paperclip size={11} /> {f}
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ─ Settings ─ */}
              {tab === 'settings' && (
                <div>
                  <h2 className="text-xl font-bold text-[#302D2A] mb-6">Account Settings</h2>
                  <div className="space-y-6">
                    <div className="pb-6 border-b border-[#E5E2DE]">
                      <h3 className="font-bold text-[#302D2A] mb-3">Password</h3>
                      <button className="border border-[#D4D0CB] px-5 py-2 rounded-full text-sm font-bold hover:border-[#C25E28] hover:text-[#C25E28] transition-colors">
                        Change Password
                      </button>
                    </div>
                    <div className="pb-6 border-b border-[#E5E2DE]">
                      <h3 className="font-bold text-[#302D2A] mb-3">Notifications</h3>
                      <div className="space-y-3">
                        {['Order updates via email','Promotional emails and newsletters','SMS notifications for delivery'].map((item, i) => (
                          <label key={item} className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" defaultChecked={i < 2} className="w-4 h-4 accent-[#C25E28] cursor-pointer" />
                            <span className="text-sm text-[#6B6760]">{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-red-600 mb-2">Danger Zone</h3>
                      <p className="text-sm text-[#9C9790] mb-3">Once you delete your account, there is no going back.</p>
                      <button className="text-sm font-bold text-red-600 hover:underline">Delete Account</button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

      {/* ── Installation Modal ── */}
      {installOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 my-8">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-bold text-[#302D2A]">Installation Request</h3>
              <button onClick={() => setInstallOpen(false)} className="text-[#9C9790] hover:text-[#302D2A] transition-colors"><X size={22} /></button>
            </div>
            <form onSubmit={e => { e.preventDefault(); setInstallOpen(false); alert('Installation request submitted!') }} className="space-y-4">
              <IField label="Full Name"     value={installForm.fullName}      onChange={v => setInstallForm(f => ({...f, fullName: v}))} />
              <div className="grid grid-cols-2 gap-4">
                <IField label="Preferred Date" type="date" value={installForm.date} onChange={v => setInstallForm(f => ({...f, date: v}))} />
                <IField label="Preferred Time" type="time" value={installForm.time} onChange={v => setInstallForm(f => ({...f, time: v}))} />
              </div>
              <IField label="Address"       value={installForm.address}       onChange={v => setInstallForm(f => ({...f, address: v}))} />
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-[#302D2A]">Special Instructions</label>
                <textarea value={installForm.instructions} onChange={e => setInstallForm(f => ({...f, instructions: e.target.value}))} rows={3}
                  className="border border-[#D4D0CB] p-3 text-sm focus:border-[#C25E28] outline-none rounded resize-none" />
              </div>
              <button type="submit" className="w-full py-3 bg-[#C25E28] hover:bg-[#a64e21] text-white font-bold rounded transition-colors mt-2">
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function IField({ label, type='text', value, onChange }: { label:string; type?:string; value:string; onChange:(v:string)=>void }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-bold text-[#302D2A]">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} required
        className="border border-[#D4D0CB] p-3 text-sm focus:border-[#C25E28] outline-none rounded bg-white" />
    </div>
  )
}
