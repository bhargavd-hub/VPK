'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  BarChart2, Briefcase, MessageSquare, Settings, LogOut,
  TrendingUp, Star, Clock, CheckCircle, ChevronRight,
  Wrench, MapPin, DollarSign,
} from 'lucide-react'
import { useApp } from '@/lib/context'

type Tab = 'overview' | 'jobs' | 'messages' | 'settings'

const MOCK_JOBS = [
  { id: 'JOB-001', title: 'Kitchen Installation', location: 'London, SW1A', date: '2026-05-20', status: 'Pending', value: 1200 },
  { id: 'JOB-002', title: 'Bathroom Renovation', location: 'Manchester, M1', date: '2026-05-22', status: 'Confirmed', value: 850 },
  { id: 'JOB-003', title: 'Flooring Installation', location: 'Birmingham, B1', date: '2026-05-25', status: 'Completed', value: 620 },
  { id: 'JOB-004', title: 'Electrical Rewiring', location: 'London, E1', date: '2026-05-28', status: 'Pending', value: 950 },
]

const statusColors: Record<string, string> = {
  Pending: 'bg-yellow-100 text-yellow-700',
  Confirmed: 'bg-blue-100 text-blue-700',
  Completed: 'bg-green-100 text-green-700',
  Cancelled: 'bg-red-100 text-red-600',
}

export default function InstallerDashboardPage() {
  const { user, logout } = useApp()
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('overview')

  if (!user) {
    return (
      <div className="w-full px-4 md:px-12 py-20 text-center">
        <Wrench size={64} className="text-neutral-light mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-brand-offBlack mb-4">Installer Dashboard</h1>
        <p className="text-neutral-dark mb-8">Sign in to access your installer dashboard.</p>
        <Link href="/login" className="inline-flex items-center gap-2 bg-brand-orange text-white px-6 py-3 font-bold hover:bg-[#a64e21] transition-colors uppercase text-sm">
          Sign In
        </Link>
      </div>
    )
  }

  const handleLogout = () => { logout(); router.push('/') }

  const TABS = [
    { key: 'overview' as Tab, label: 'Overview', icon: BarChart2 },
    { key: 'jobs' as Tab, label: 'My Jobs', icon: Briefcase },
    { key: 'messages' as Tab, label: 'Messages', icon: MessageSquare },
    { key: 'settings' as Tab, label: 'Settings', icon: Settings },
  ]

  return (
    <div className="w-full px-4 md:px-12 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-60 flex-shrink-0">
          <div className="bg-brand-offBlack text-white p-6 mb-4 rounded-lg">
            <div className="w-14 h-14 rounded-full bg-brand-orange flex items-center justify-center text-xl font-bold mb-3">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h2 className="font-bold">{user.name}</h2>
            <p className="text-white/60 text-xs mt-0.5">VPK Verified Installer</p>
            <div className="flex items-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => <Star key={i} size={12} className={i < 4 ? 'fill-brand-orange text-brand-orange' : 'text-white/30'} />)}
              <span className="text-xs text-white/60 ml-1">4.9 (86 reviews)</span>
            </div>
          </div>
          <nav className="space-y-1">
            {TABS.map(({ key, label, icon: Icon }) => (
              <button key={key} onClick={() => setTab(key)} className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded transition-colors ${tab === key ? 'bg-brand-orange text-white' : 'text-neutral-dark hover:bg-neutral-lightest'}`}>
                <Icon size={18} /> {label}
              </button>
            ))}
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded text-red-500 hover:bg-red-50 mt-4 transition-colors">
              <LogOut size={18} /> Sign Out
            </button>
          </nav>
        </aside>

        {/* Main */}
        <div className="flex-1">
          {tab === 'overview' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Active Jobs', value: '3', icon: Briefcase, color: 'bg-blue-50 text-blue-600' },
                  { label: 'Completed', value: '47', icon: CheckCircle, color: 'bg-green-50 text-green-600' },
                  { label: 'Total Earned', value: '£12,840', icon: DollarSign, color: 'bg-brand-orange/10 text-brand-orange' },
                  { label: 'Rating', value: '4.9★', icon: Star, color: 'bg-yellow-50 text-yellow-600' },
                ].map(stat => (
                  <div key={stat.label} className="bg-white border border-neutral-lighter rounded-lg p-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${stat.color}`}>
                      <stat.icon size={20} />
                    </div>
                    <p className="text-2xl font-bold text-brand-offBlack">{stat.value}</p>
                    <p className="text-xs text-neutral">{stat.label}</p>
                  </div>
                ))}
              </div>
              {/* Recent Jobs */}
              <h3 className="font-bold text-lg mb-4">Recent Jobs</h3>
              <div className="space-y-3">
                {MOCK_JOBS.slice(0, 3).map(job => (
                  <div key={job.id} className="bg-white border border-neutral-lighter rounded-lg p-4 flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-bold text-sm text-brand-offBlack">{job.title}</p>
                      <p className="text-xs text-neutral flex items-center gap-1 mt-0.5"><MapPin size={11} />{job.location}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-bold rounded-full whitespace-nowrap ${statusColors[job.status]}`}>{job.status}</span>
                    <span className="font-bold text-sm text-brand-offBlack">£{job.value}</span>
                    <ChevronRight size={16} className="text-neutral flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'jobs' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">My Jobs</h2>
              <div className="space-y-4">
                {MOCK_JOBS.map(job => (
                  <div key={job.id} className="bg-white border border-neutral-lighter rounded-lg overflow-hidden">
                    <div className="p-5">
                      <div className="flex flex-wrap gap-3 items-start justify-between mb-3">
                        <div>
                          <p className="font-bold text-brand-offBlack">{job.title}</p>
                          <p className="text-sm text-neutral flex items-center gap-1 mt-0.5"><MapPin size={12} />{job.location}</p>
                        </div>
                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${statusColors[job.status]}`}>{job.status}</span>
                      </div>
                      <div className="flex gap-6 text-sm text-neutral-dark">
                        <span className="flex items-center gap-1"><Clock size={13} />{new Date(job.date).toLocaleDateString('en-GB')}</span>
                        <span className="flex items-center gap-1"><TrendingUp size={13} />£{job.value}</span>
                      </div>
                    </div>
                    <div className="px-5 pb-4 flex gap-2">
                      <button className="text-xs font-bold text-brand-orange hover:underline">View Details</button>
                      {job.status === 'Pending' && (
                        <button className="text-xs font-bold text-green-600 hover:underline ml-3">Accept Job</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'messages' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Messages</h2>
              <div className="space-y-3">
                {['Customer re: Kitchen Installation', 'VPK Support Team', 'New job available in your area'].map((msg, i) => (
                  <div key={i} className="bg-white border border-neutral-lighter rounded-lg p-4 flex items-center gap-4 cursor-pointer hover:shadow-sm transition-shadow">
                    <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center flex-shrink-0">
                      <MessageSquare size={18} className="text-brand-orange" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-sm text-brand-offBlack">{msg}</p>
                      <p className="text-xs text-neutral">2 hours ago</p>
                    </div>
                    {i === 0 && <span className="w-2 h-2 rounded-full bg-brand-orange flex-shrink-0" />}
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'settings' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Settings</h2>
              <div className="space-y-4">
                {['Profile & Bio', 'Skills & Certifications', 'Availability & Calendar', 'Payment Information', 'Notifications'].map(item => (
                  <div key={item} className="bg-white border border-neutral-lighter rounded-lg p-4 flex items-center justify-between cursor-pointer hover:shadow-sm transition-shadow">
                    <p className="font-bold text-sm text-brand-offBlack">{item}</p>
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
