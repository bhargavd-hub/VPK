import Link from 'next/link'
import { Store, Hammer, Phone, User, ArrowRight } from 'lucide-react'

export const metadata = { title: 'Our Services | VPK Marketplace' }

const SERVICES = [
  {
    href: '/products',
    icon: Store,
    title: 'Marketplace',
    desc: 'Our Marketplace is a curated platform dedicated to everything related to home and project development. From interior design to construction essentials, it\'s a space where anyone can buy & only trusted, certified businesses & brands can sell.',
    cta: 'Explore Marketplace',
  },
  {
    href: '/build-project',
    icon: Hammer,
    title: 'Build Your Project',
    desc: 'Use our guide to explore all that we offer, from planning any size project—whether a large development or personal project. By adding a brief description of your needs, we\'ll return to you with an estimated price, all in one place.',
    cta: 'Start Your Project',
  },
  {
    href: '/book-task',
    icon: Phone,
    title: 'Book a Call Out',
    desc: 'Connect quickly with skilled tradespeople for your task. Simply choose the trade you need, and you\'ll see a list of available professionals in your area, along with their hourly rates or request a quotation, so you can book with ease.',
    cta: 'Book a Call',
  },
  {
    href: '/register',
    icon: User,
    title: 'Join The Team',
    desc: 'Join the Team service invites skilled professionals from the development industry to subscribe to our platform, connecting them with exclusive job opportunities and a steady stream of work.',
    cta: 'View Open Positions',
  },
]

export default function ServicesPage() {
  return (
    <div className="w-full bg-neutral-lightest min-h-screen pb-24">
      {/* Hero */}
      <div className="bg-brand-offBlack text-white py-24 md:py-32 px-4 md:px-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[150%] bg-brand-orange/40 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[120%] bg-white/10 blur-[100px] rounded-full" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">Our Services</h1>
          <p className="text-lg md:text-xl text-neutral-light leading-relaxed font-light mx-auto max-w-3xl">
            At the core of our business is a fully integrated platform built on{' '}
            <span className="text-brand-orange font-medium">trust</span>,{' '}
            <span className="text-brand-orange font-medium">quality</span>, and{' '}
            <span className="text-brand-orange font-medium">versatility</span>.{' '}
            We support every kind of project—whether it&apos;s large developments or individual items and services.
          </p>
        </div>
      </div>

      {/* Service Cards */}
      <div className="w-full px-4 md:px-12 max-w-7xl mx-auto -mt-16 md:-mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {SERVICES.map(({ href, icon: Icon, title, desc, cta }) => (
            <Link
              key={title}
              href={href}
              className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl border border-neutral-lighter hover:border-brand-orange/30 transition-all duration-500 p-8 md:p-12 flex flex-col items-start hover:-translate-y-2 overflow-hidden relative"
            >
              {/* Background Icon */}
              <div className="absolute -right-12 -top-12 text-brand-orange/5 group-hover:text-brand-orange/10 group-hover:scale-110 transition-all duration-700 transform rotate-12 pointer-events-none">
                <Icon size={240} strokeWidth={1} />
              </div>
              <div className="w-16 h-16 rounded-2xl bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-brand-orange group-hover:text-white transition-all duration-300 relative z-10 shadow-sm">
                <Icon size={28} strokeWidth={2} />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-brand-orange mb-5 relative z-10 tracking-tight">{title}</h2>
              <p className="text-brand-offBlack/80 leading-relaxed text-base md:text-lg flex-grow relative z-10">{desc}</p>
              <div className="mt-10 font-bold text-brand-offBlack group-hover:text-brand-orange flex items-center gap-3 transition-colors relative z-10 text-lg">
                {cta} <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
