import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import { MOCK_PRODUCTS, CLIENTS, PARTNERS } from '@/lib/constants'
import { TrustIconsBar } from '@/components/sections/TrustIconsBar'
import { MarqueeSection } from '@/components/sections/MarqueeSection'
import { CareersSection } from '@/components/sections/CareersSection'
import { HomeProductCard } from '@/components/ui/HomeProductCard'

/* ── Offer cards with category links ── */
const OFFERS = [
  {
    bg: 'bg-[#E0E7FF]', dark: false,
    title: '3 for 2',
    subtitle: 'on Dulux, Valspar & Lick interior paint',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80',
    imgAlt: 'Paint Cans',
    href: '/products?category=Painting+%26+Decorating',
  },
  {
    bg: 'bg-brand-offBlack', dark: true,
    title: '15% off Erbauer',
    subtitle: 'pro-quality tools, workwear & storage',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=600&q=80',
    imgAlt: 'Power Tools',
    href: '/products?category=Tools+%26+Equipment',
  },
  {
    bg: 'bg-[#DCFCE7]', dark: false,
    title: '3 for 2',
    subtitle: 'on selected gardening essentials',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80',
    imgAlt: 'Gardening',
    href: '/products?category=Garden+%26+Landscaping',
  },
]

/* ── Quick category shortcuts ── */
const CATEGORY_SHORTCUTS = [
  { label: 'Tools & Equipment',        href: '/products?category=Tools+%26+Equipment',          img: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=200' },
  { label: 'Flooring & Tiling',        href: '/products?category=Flooring+%26+Tiling',          img: 'https://images.unsplash.com/photo-1581858726768-fdff21ac91a4?auto=format&fit=crop&w=200' },
  { label: 'Kitchen & Dining',         href: '/kitchen-ranges',                                  img: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=200' },
  { label: 'Bathroom & Ensuites',      href: '/products?category=Bathroom+%26+Ensuites',        img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=200' },
  { label: 'Lighting & Electrical',    href: '/products?category=Lighting+%26+Electrical',      img: 'https://images.unsplash.com/photo-1513506003013-d3c2611e0b58?auto=format&fit=crop&w=200' },
  { label: 'Garden & Landscaping',     href: '/products?category=Garden+%26+Landscaping',       img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=200' },
  { label: 'Painting & Decorating',    href: '/products?category=Painting+%26+Decorating',      img: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200' },
  { label: 'Home Interiors & Furniture', href: '/products?category=Home+Interiors+%26+Furniture', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=200' },
]

export default function HomePage() {
  return (
    <div className="space-y-12 pb-12">
      <div>
        <TrustIconsBar />

        {/* ── Hero ── */}
        <section className="relative w-full h-[480px] md:h-[580px] flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-lightest/90 via-neutral-lightest/40 to-transparent z-10" />
          <Image
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600"
            alt="Build your dream space" fill className="object-cover" priority
          />
          <div className="w-full px-4 md:px-12 relative z-20">
            <div className="max-w-xl bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-lg">
              <h1 className="text-4xl md:text-5xl font-bold text-brand-offBlack leading-[1.1] mb-6 tracking-tight">
                Build Your <br /><span className="text-brand-orange">Dream Space</span>
              </h1>
              <p className="text-lg text-neutral-dark mb-8 font-medium">
                Everything you need for your next project, from tools to finishing touches.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/products" className="inline-flex items-center gap-2 bg-brand-orange text-white px-8 py-4 font-bold hover:bg-[#a64e21] transition-colors uppercase tracking-wide text-sm">
                  Shop Now <ChevronRight size={18} />
                </Link>
                <Link href="/kitchen-ranges" className="inline-flex items-center gap-2 border-2 border-brand-offBlack text-brand-offBlack px-6 py-4 font-bold hover:bg-brand-offBlack hover:text-white transition-colors uppercase tracking-wide text-sm">
                  Kitchen Ranges
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── Quick Category Shortcuts ── */}
      <section className="w-full px-4 md:px-12">
        <h2 className="text-2xl font-bold mb-6 border-b-2 border-brand-orange inline-block pb-2">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {CATEGORY_SHORTCUTS.map(({ label, href, img }) => (
            <Link key={label} href={href}
              className="group flex flex-col items-center gap-2 p-3 bg-white border border-[#E5E2DE] hover:border-brand-orange hover:shadow-md transition-all text-center">
              <div className="w-full aspect-square overflow-hidden bg-neutral-100">
                <Image src={img} alt={label} width={120} height={120} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" unoptimized />
              </div>
              <span className="text-[10px] font-bold text-brand-offBlack uppercase tracking-tight leading-tight group-hover:text-brand-orange transition-colors line-clamp-2">{label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Great Offers ── */}
      <section className="w-full px-4 md:px-12">
        <h2 className="text-2xl font-bold mb-6 border-b-2 border-brand-orange inline-block pb-2">Even more great offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {OFFERS.map(o => (
            <Link key={o.title} href={o.href}
              className={`relative h-[380px] ${o.bg} flex flex-col items-center pt-8 text-center overflow-hidden group block`}>
              <h3 className={`text-4xl md:text-5xl font-black mb-2 ${o.dark ? 'text-white' : 'text-brand-offBlack'}`}>{o.title}</h3>
              <p className={`text-base font-medium mb-4 ${o.dark ? 'text-gray-300' : 'text-brand-offBlack'}`}>{o.subtitle}</p>
              <div className="flex-1 flex items-end justify-center w-full pb-6 relative">
                <Image src={o.image} alt={o.imgAlt} width={300} height={250}
                  className="object-contain w-4/5 group-hover:scale-105 transition-transform duration-500" unoptimized />
              </div>
              <div className={`absolute bottom-4 right-4 text-xs font-bold flex items-center gap-1 ${o.dark ? 'text-white/70' : 'text-brand-offBlack/60'}`}>
                Shop now <ChevronRight size={12} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Marquee ── */}
      <MarqueeSection title="Featured Developers" items={CLIENTS} />
      <MarqueeSection title="Featured Vendors"    items={PARTNERS} />

      {/* ── Seasonal Inspiration ── */}
      <section className="w-full px-4 md:px-12">
        <h2 className="text-2xl font-bold mb-6 border-b-2 border-brand-orange inline-block pb-2">Seasonal inspiration</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InspirationCard
            src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=800"
            title="Prepare for Autumn"
            subtitle="Essential tasks to keep your garden thriving."
            cta="Read Guide"
            href="/products?category=Garden+%26+Landscaping"
          />
          <InspirationCard
            src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800"
            title="Cozy Indoor Lighting"
            subtitle="Transform your home atmosphere with our new range."
            cta="Shop Lighting"
            href="/products?category=Lighting+%26+Electrical"
          />
        </div>
      </section>

      {/* ── Recommended Products ── */}
      <section className="w-full px-4 md:px-12 bg-neutral-lightest py-16">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-bold border-b-2 border-brand-orange inline-block pb-2">Recommended For You</h2>
          <Link href="/products" className="text-brand-orange font-bold hover:underline flex items-center gap-1 text-sm">
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_PRODUCTS.slice(4, 8).map(p => <HomeProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* ── Community Inspiration ── */}
      <section className="w-full px-4 md:px-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Inspiration from our Community</h2>
          <p className="text-neutral-dark">See how others are transforming their homes with VPK products.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[560px]">
          <CommunityImage className="col-span-2 row-span-2" src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800" handle="@ModernLiving" href="/products?category=Home+Interiors+%26+Furniture" />
          <CommunityImage className="col-span-1 row-span-1" src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800" handle="@CozyCorner" href="/products?category=Home+Interiors+%26+Furniture" />
          <CommunityImage className="col-span-1 row-span-2" src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800" handle="@KitchenGoals" href="/kitchen-ranges" />
          <CommunityImage className="col-span-1 row-span-1" src="https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800" handle="@Shelfie" href="/products?category=Home+Interiors+%26+Furniture" />
        </div>
      </section>

      <CareersSection />
    </div>
  )
}

function InspirationCard({ src, title, subtitle, cta, href }: { src: string; title: string; subtitle: string; cta: string; href: string }) {
  return (
    <Link href={href} className="relative h-[380px] group overflow-hidden rounded-lg block">
      <Image src={src} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" unoptimized />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
        <h3 className="text-white text-3xl font-bold mb-2">{title}</h3>
        <p className="text-white/90 mb-4 text-sm">{subtitle}</p>
        <span className="inline-flex items-center gap-2 bg-brand-orange text-white px-5 py-2.5 font-bold uppercase text-xs hover:bg-[#a64e21] transition-colors w-fit">
          {cta}
        </span>
      </div>
    </Link>
  )
}

function CommunityImage({ src, handle, className, href }: { src: string; handle: string; className?: string; href: string }) {
  return (
    <Link href={href} className={`relative group overflow-hidden rounded-lg ${className} block`}>
      <Image src={src} alt={handle} fill className="object-cover" unoptimized />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-end p-4">
        <span className="text-white font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">{handle}</span>
      </div>
    </Link>
  )
}
