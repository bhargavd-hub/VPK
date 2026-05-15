'use client'

import React, { useState } from 'react'
import { ChevronDown, X, Upload } from 'lucide-react'
import { Button, Input } from '@/components/ui/Forms'

const CATEGORIES = [
  { name: 'Operations', roles: ['Construction Director', 'Project Director', 'Project Manager', 'Construction Manager', 'Site Manager', 'Structures Manager', 'Fit Out Manager', 'Façade Manager', 'External Works Manager', 'Technical Services Manager', 'Electrical Manager', 'Mechanical Manager', 'Construction Foreman', 'Site Engineers', 'Assistant Engineers', 'Office Manager', 'Administrators', 'Site Clerk', 'Security Manager', 'Logistics Manager'] },
  { name: 'Commercial', roles: ['Commercial Director', 'Commercial Manager', 'Quantity Surveyor', 'Assistant Quantity Surveyor', 'Procurement Manager'] },
  { name: 'Design', roles: ['Design Manager', 'Design Assistant', 'Mechanical Services Design Manager', 'Structural Design Manager', 'Temporary Works Design Manager', 'BIM Coordinator', 'Document Control', 'Environmental and Bream Manager'] },
  { name: 'Safety', roles: ['Safety Manager', 'Safety Advisor', 'Safety Admin Assistant', 'Site Safety Operative', 'Crane Supervisor', 'Appointed Person'] },
]

export function CareersSection() {
  const [openCategory, setOpenCategory] = useState<string | null>(null)
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  return (
    <section className="bg-brand-offBlack text-white py-16">
      <div className="w-full px-4 md:px-12 flex flex-col lg:flex-row gap-12">
        <div className="lg:w-1/3">
          <h2 className="text-4xl font-bold mb-4">Careers at VPK</h2>
          <p className="text-neutral-light mb-6 text-lg">
            Join our team of dedicated professionals building the future. Explore our open roles and find where you fit in.
          </p>
        </div>
        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          {CATEGORIES.map(cat => (
            <div key={cat.name} className="relative border border-neutral-dark rounded-lg bg-[#242220] flex flex-col">
              <button
                className={`w-full text-left px-6 py-4 font-bold text-lg flex justify-between items-center hover:bg-[#1a1817] transition-colors ${openCategory === cat.name ? 'rounded-t-lg' : 'rounded-lg'}`}
                onClick={() => setOpenCategory(openCategory === cat.name ? null : cat.name)}
              >
                <span>{cat.name}</span>
                <ChevronDown className={`transition-transform duration-300 flex-shrink-0 ${openCategory === cat.name ? 'rotate-180' : ''}`} />
              </button>
              {openCategory === cat.name && (
                <div className="absolute top-full left-0 right-0 z-30 bg-[#242220] border-x border-b border-neutral-dark rounded-b-lg shadow-xl px-6 pb-6 pt-2 overflow-y-auto max-h-[350px]">
                  <ul className="list-disc pl-5 space-y-2 text-neutral-light">
                    {cat.roles.map(role => (
                      <li key={role}>
                        <button onClick={() => setSelectedRole(role)} className="hover:text-brand-orange hover:underline text-left transition-colors text-sm">
                          {role}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Application Modal */}
      {selectedRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl text-brand-offBlack relative my-8">
            <button onClick={() => setSelectedRole(null)} className="absolute top-4 right-4 p-2 text-neutral-dark hover:text-brand-orange hover:bg-neutral-lightest rounded-full transition-colors z-10">
              <X size={24} />
            </button>
            <div className="p-8 md:p-10 max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold mb-2">Apply for {selectedRole}</h3>
              <p className="text-neutral mb-6">Please fill out the form below to apply for this position.</p>
              <form className="space-y-5" onSubmit={e => { e.preventDefault(); alert('Application Submitted!'); setSelectedRole(null) }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input label="First Name" required placeholder="Enter your first name" />
                  <Input label="Last Name" required placeholder="Enter your last name" />
                </div>
                <Input label="Email Address" type="email" required placeholder="Enter your email" />
                <Input label="Phone Number" type="tel" required placeholder="Enter your phone number" />
                <Input label="LinkedIn Profile (Optional)" type="url" placeholder="https://linkedin.com/in/..." />
                <div>
                  <label className="text-sm font-bold text-brand-offBlack block mb-2">Resume/CV</label>
                  <div className="border-2 border-dashed border-neutral-lighter rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-brand-orange hover:bg-brand-offWhite transition-colors">
                    <Upload className="text-neutral-light mb-3" size={28} />
                    <span className="font-bold text-brand-orange text-sm">Click to upload</span>
                    <span className="text-xs text-neutral mt-1">PDF, DOC, DOCX up to 10MB</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-brand-offBlack">Cover Letter</label>
                  <textarea rows={4} className="border border-neutral-lighter p-3 focus:outline-none focus:border-brand-orange transition-colors bg-white text-sm" placeholder="Tell us why you are a great fit..." />
                </div>
                <Button type="submit" className="w-full">Submit Application</Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
