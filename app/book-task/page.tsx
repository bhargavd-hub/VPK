'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Wrench, Brush, Zap, Droplets, TreePine, Home, ChevronRight, Star } from 'lucide-react'
import { Button } from '@/components/ui/Forms'

const SKILL_GROUPS = [
  { title: 'Cleaning', icon: Brush, tasks: ['General cleaning', 'Deep cleaning', 'Oven cleaning', 'Window cleaning', 'After build cleaning'] },
  { title: 'Repairs', icon: Wrench, tasks: ['General repairs', 'Door repairs', 'Window repairs', 'Roof repairs', 'Fence repairs'] },
  { title: 'Electrical', icon: Zap, tasks: ['Socket fitting', 'Light fitting', 'Fuse board', 'Outdoor electrics', 'Smart home setup'] },
  { title: 'Plumbing', icon: Droplets, tasks: ['Tap installation', 'Radiator fitting', 'Boiler service', 'Drain unblocking', 'Bathroom installation'] },
  { title: 'Garden', icon: TreePine, tasks: ['Garden clearance', 'Lawn mowing', 'Hedge trimming', 'Decking installation', 'Fencing installation'] },
  { title: 'Building', icon: Home, tasks: ['Plastering', 'Tiling', 'Flooring', 'Painting', 'Wallpapering'] },
]

const MOCK_TASKERS = [
  { id: '1', name: 'Mike Johnson', rating: 4.9, reviews: 234, skills: ['Plumbing', 'Electrical', 'Repairs'], price: 45, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200', verified: true },
  { id: '2', name: 'Sarah Williams', rating: 4.8, reviews: 187, skills: ['Cleaning', 'Garden', 'Painting'], price: 35, image: 'https://images.unsplash.com/photo-1494790108755-2616b5b02f96?auto=format&fit=crop&w=200', verified: true },
  { id: '3', name: 'David Chen', rating: 4.7, reviews: 156, skills: ['Building', 'Flooring', 'Tiling'], price: 55, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200', verified: true },
]

export default function BookTaskPage() {
  const [selectedTask, setSelectedTask] = useState<string | null>(null)

  return (
    <div className="w-full px-4 md:px-12 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-brand-offBlack mb-2">Book a Call Out</h1>
        <p className="text-neutral-dark mb-10">Find a trusted VPK-verified professional for any home task.</p>

        {/* Skill Groups */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-6">What do you need help with?</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {SKILL_GROUPS.map(({ title, icon: Icon, tasks }) => (
              <button
                key={title}
                onClick={() => setSelectedTask(selectedTask === title ? null : title)}
                className={`p-4 border rounded-lg flex flex-col items-center gap-2 text-center transition-all ${selectedTask === title ? 'border-brand-orange bg-brand-orange/5' : 'border-neutral-lighter hover:border-brand-orange'}`}
              >
                <Icon size={28} className={selectedTask === title ? 'text-brand-orange' : 'text-brand-offBlack'} />
                <span className={`text-sm font-bold ${selectedTask === title ? 'text-brand-orange' : 'text-brand-offBlack'}`}>{title}</span>
              </button>
            ))}
          </div>

          {selectedTask && (
            <div className="mt-4 p-4 bg-neutral-lightest rounded-lg animate-fade-in">
              <p className="text-sm font-bold text-brand-offBlack mb-2">Popular {selectedTask} tasks:</p>
              <div className="flex flex-wrap gap-2">
                {SKILL_GROUPS.find(g => g.title === selectedTask)?.tasks.map(task => (
                  <Link key={task} href={`/taskers?task=${encodeURIComponent(task)}`} className="px-3 py-1.5 bg-white border border-neutral-lighter rounded-full text-sm hover:border-brand-orange hover:text-brand-orange transition-colors flex items-center gap-1">
                    {task} <ChevronRight size={12} />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Featured Taskers */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Top Rated Professionals</h2>
            <Link href="/taskers" className="text-brand-orange text-sm font-bold hover:underline flex items-center gap-1">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_TASKERS.map(tasker => (
              <div key={tasker.id} className="bg-white border border-neutral-lighter rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 bg-neutral-lightest">
                  <img src={tasker.image} alt={tasker.name} className="w-full h-full object-cover" />
                  {tasker.verified && (
                    <span className="absolute top-3 left-3 bg-brand-orange text-white text-xs font-bold px-2 py-1 rounded">VPK Verified</span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-brand-offBlack">{tasker.name}</h3>
                  <div className="flex items-center gap-1 my-1">
                    <Star size={14} className="fill-brand-orange text-brand-orange" />
                    <span className="text-sm font-bold text-brand-offBlack">{tasker.rating}</span>
                    <span className="text-sm text-neutral">({tasker.reviews} reviews)</span>
                  </div>
                  <div className="flex flex-wrap gap-1 my-2">
                    {tasker.skills.map(skill => <span key={skill} className="text-xs bg-neutral-lightest px-2 py-1 rounded font-medium">{skill}</span>)}
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-bold text-brand-offBlack">From £{tasker.price}/hr</span>
                    <Link href={`/taskers?id=${tasker.id}`}>
                      <Button size="sm">Book Now</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
