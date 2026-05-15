'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ChevronRight, ChevronDown, Check, Play, Star, Calendar } from 'lucide-react'

/* ─────────────────────────────────────
   DATA — each colour has its own image
───────────────────────────────────────*/
const RANGES: Record<string, {
  id: string; name: string; brand: string
  badge: string | null; topBadge: string | null
  description: string; longDesc: string
  galleryImages: string[]
  colors: { label: string; hex: string; image: string }[]
}> = {
  halesworth: {
    id: 'halesworth', name: 'Halesworth', brand: 'Howdens',
    badge: 'BEST BUDGET', topBadge: 'NEW',
    description: 'A modern take on a traditional aesthetic, our Halesworth collection has a slim border for a sleek, five-piece design, and its 19mm thick fronts ensure a sturdy frame.',
    longDesc: 'The on-trend tone, simple slab style, and matt finish give this cupboard a contemporary look, making it a great choice for those inspired by modern interiors. Furniture options include drawer and base units, which come in a selection of widths to make it easy to create a custom fit.',
    galleryImages: [
      'https://www.howdens.com/-/media/howdens/assets/clh_asset_products/clh_asset_levela_108418/clh_asset_levelb_25522207/clh_asset_levelc_25541472/clh_asset_leveld_25670692/ass_25669912/ass_25669912_16_9.jpg?w=740',
      'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?auto=format&fit=crop&w=400',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=400',
      'https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&w=400',
    ],
    colors: [
      { label: 'White',      hex: '#F5F5F5', image: 'https://www.howdens.com/-/media/howdens/assets/clh_asset_products/clh_asset_levela_108418/clh_asset_levelb_25522207/clh_asset_levelc_25541472/clh_asset_leveld_25670692/ass_25669912/ass_25669912_16_9.jpg?w=1400' },
      { label: 'Porcelain',  hex: '#EDE8E3', image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1400' },
      { label: 'Reed Green', hex: '#607274', image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1400' },
      { label: 'Sandstone',  hex: '#C4A882', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1400' },
      { label: 'Dove Grey',  hex: '#B0ADA8', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1400' },
      { label: 'Slate Grey', hex: '#6E6C68', image: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?auto=format&fit=crop&w=1400' },
    ],
  },
  clerkenwell: {
    id: 'clerkenwell', name: 'Clerkenwell', brand: 'VPK',
    badge: null, topBadge: null,
    description: 'The timber tone of Clerkenwell Natural Oak adds a traditional touch to a contemporary kitchen, while the 19mm thick doors and j pull handle offer a sleek appearance.',
    longDesc: 'Clerkenwell is perfect for those who want to bring natural warmth into their home. The oak grain effect is beautifully realistic, and the clean lines of the J-pull handle keep things modern.',
    galleryImages: [
      'https://ik.imagekit.io/4erco1shm/VPK/1.avif',
      'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=400',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=400',
    ],
    colors: [
      { label: 'Natural Oak', hex: '#C4A484', image: 'https://ik.imagekit.io/4erco1shm/VPK/1.avif' },
    ],
  },
  'greenwich-gloss': {
    id: 'greenwich-gloss', name: 'Greenwich Gloss', brand: 'Howdens',
    badge: 'BEST BUDGET', topBadge: null,
    description: 'Greenwich Gloss has a reflective finish and simple slab design that is easy to accommodate in any home, while the 16mm-thick front makes it affordable too.',
    longDesc: 'A stunning high-gloss kitchen that reflects light beautifully. The slab door design is timeless and works equally well in open-plan spaces and compact kitchens.',
    galleryImages: [
      'https://ik.imagekit.io/4erco1shm/VPK/3.avif',
      'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=400',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=400',
    ],
    colors: [
      { label: 'Cream',      hex: '#E5E1DA', image: 'https://ik.imagekit.io/4erco1shm/VPK/3.avif' },
      { label: 'Off White',  hex: '#F0EBE3', image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1400' },
      { label: 'Sage',       hex: '#9CA986', image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1400' },
      { label: 'Taupe',      hex: '#D2C1B0', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1400' },
      { label: 'Light Grey', hex: '#B2B2B2', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1400' },
    ],
  },
  frome: {
    id: 'frome', name: 'Frome', brand: 'Magnet',
    badge: null, topBadge: 'NEW',
    description: 'With a narrow frame, shallow centre panel, and smooth finish, Frome has a modern, shaker design and pared-back look.',
    longDesc: 'These fronts can be mix-and-matched with other colours and textures, while a 19mm-thickness ensures they are a long-lasting choice.',
    galleryImages: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?auto=format&fit=crop&w=400',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=400',
    ],
    colors: [
      { label: 'Sage',   hex: '#9CA986', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1400' },
      { label: 'Cream',  hex: '#E5E1DA', image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1400' },
      { label: 'Grey',   hex: '#B2B2B2', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400' },
      { label: 'Taupe',  hex: '#D2C1B0', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1400' },
      { label: 'White',  hex: '#F5F5F5', image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1400' },
      { label: 'Slate',  hex: '#31363F', image: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?auto=format&fit=crop&w=1400' },
    ],
  },
}

const ACCORDIONS = [
  { id: 'specs',        title: 'Specifications',                content: 'Door thickness: 19mm | Door style: Slab | Finish: Matt | Material: MFC | Edge banding: 1mm ABS | Cabinet height: 720mm | Cabinet depth: 570mm | Hinges: Soft-close | Guarantee: 25 years' },
  { id: 'measurements', title: 'Product Measurements',          content: 'Base units: 300mm, 400mm, 500mm, 600mm, 800mm, 1000mm widths. Wall units: 300mm – 600mm. Tower units: 600mm × 2100mm. All dimensions approximate.' },
  { id: 'guarantees',   title: 'Guarantees & Accreditations',   content: 'All Howdens kitchens come with a 25-year cabinet guarantee and 5-year door guarantee. FSC certified, Which? accredited, ISO 9001 quality management certified.' },
  { id: 'documents',    title: 'Documents',                     content: 'Product data sheet (PDF), Installation guide (PDF), Care & maintenance guide (PDF), Guarantee registration form (PDF).' },
]

export default function KitchenRangeDetailPage() {
  const { id } = useParams<{ id: string }>()
  const range = RANGES[id as string] ?? RANGES['halesworth']

  const [finish, setFinish]               = useState<'GLOSS' | 'MATT'>('MATT')
  const [selectedColor, setSelectedColor] = useState(0)
  const [heroBg, setHeroBg]               = useState(range.colors[0].image)
  const [fading, setFading]               = useState(false)
  const [openAccordion, setOpenAccordion] = useState<string | null>(null)
  const [styleOpen, setStyleOpen]         = useState(false)
  const [layoutOpen, setLayoutOpen]       = useState(false)

  /* swap hero image with a fade transition */
  const handleColorChange = (idx: number) => {
    if (idx === selectedColor) return
    setFading(true)
    setTimeout(() => {
      setSelectedColor(idx)
      setHeroBg(range.colors[idx].image)
      setFading(false)
    }, 220)
  }

  /* reset when range changes (navigating between ranges) */
  useEffect(() => {
    setSelectedColor(0)
    setHeroBg(range.colors[0].image)
  }, [id])

  return (
    <div className="w-full bg-white">

      {/* ── Breadcrumb ── */}
      <div className="w-full px-4 md:px-12 py-3 bg-white border-b border-neutral-200">
        <nav className="flex items-center gap-1.5 text-xs text-neutral-500 uppercase tracking-wide">
          <Link href="/" className="hover:text-[#C25E28] transition-colors">Home</Link>
          <ChevronRight size={11} className="text-neutral-300" />
          <Link href="/kitchen-ranges" className="hover:text-[#C25E28] transition-colors">Kitchens</Link>
          <ChevronRight size={11} className="text-neutral-300" />
          <span className="text-[#302D2A] font-bold">Fitted Kitchen Ranges</span>
        </nav>
      </div>

      {/* ── Hero Banner ── */}
      <div className="relative w-full h-[340px] md:h-[420px] lg:h-[500px] overflow-hidden bg-neutral-900">
        {/* Crossfade layer */}
        <img
          key={heroBg}
          src={heroBg}
          alt={range.name}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${fading ? 'opacity-0' : 'opacity-100'}`}
        />
        {/* Dark gradient */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

        {/* Bottom-left: Change Style + Gallery Layout */}
        <div className="absolute bottom-5 left-4 md:left-8 flex items-center gap-3 z-10">
          <div className="relative">
            <button onClick={() => { setStyleOpen(!styleOpen); setLayoutOpen(false) }}
              className="flex items-center gap-2 bg-white/90 backdrop-blur-sm text-[#302D2A] text-xs font-bold px-4 py-2 hover:bg-white transition-colors shadow-sm">
              Change Style <ChevronDown size={13} className={`transition-transform ${styleOpen ? 'rotate-180' : ''}`} />
            </button>
            {styleOpen && (
              <div className="absolute bottom-full mb-1 left-0 bg-white shadow-xl border border-neutral-200 min-w-[160px] z-30">
                {['Slab', 'Shaker', 'Traditional', 'Handleless'].map(s => (
                  <button key={s} onClick={() => setStyleOpen(false)}
                    className="w-full text-left px-4 py-2.5 text-xs text-neutral-700 hover:bg-neutral-50 hover:text-[#C25E28] transition-colors">
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="relative">
            <button onClick={() => { setLayoutOpen(!layoutOpen); setStyleOpen(false) }}
              className="flex items-center gap-2 bg-white/90 backdrop-blur-sm text-[#302D2A] text-xs font-bold px-4 py-2 hover:bg-white transition-colors shadow-sm">
              Gallery Layout <ChevronDown size={13} className={`transition-transform ${layoutOpen ? 'rotate-180' : ''}`} />
            </button>
            {layoutOpen && (
              <div className="absolute bottom-full mb-1 left-0 bg-white shadow-xl border border-neutral-200 min-w-[160px] z-30">
                {['Single Image', 'Grid View', 'Panoramic', 'Room Set'].map(l => (
                  <button key={l} onClick={() => setLayoutOpen(false)}
                    className="w-full text-left px-4 py-2.5 text-xs text-neutral-700 hover:bg-neutral-50 hover:text-[#C25E28] transition-colors">
                    {l}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Centre-bottom: GLOSS / MATT toggle */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10">
          <div className="flex items-center gap-0 bg-black/40 backdrop-blur-sm rounded-full px-1 py-1 shadow-lg">
            <button onClick={() => setFinish('GLOSS')}
              className={`flex items-center gap-2 px-5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${finish === 'GLOSS' ? 'bg-white text-[#302D2A] shadow-sm' : 'text-white/80 hover:text-white'}`}>
              GLOSS
              {finish === 'GLOSS' && <span className="w-2 h-2 rounded-full bg-green-500 shadow" />}
            </button>
            <button onClick={() => setFinish('MATT')}
              className={`flex items-center gap-2 px-5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${finish === 'MATT' ? 'bg-white text-[#302D2A] shadow-sm' : 'text-white/80 hover:text-white'}`}>
              MATT
              {finish === 'MATT' && <span className="w-2 h-2 rounded-full bg-green-500 shadow" />}
            </button>
          </div>
        </div>

        {/* Bottom-right: Book Appointment */}
        <div className="absolute bottom-5 right-4 md:right-8 z-10">
          <Link href="/build-project"
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-5 py-2.5 transition-colors shadow-lg uppercase tracking-wide">
            <Calendar size={14} />
            Book a Design Appointment
          </Link>
        </div>
      </div>

      {/* ── Colour Swatch Row ── */}
      <div className="w-full bg-white border-b border-neutral-200 py-6">
        <div className="flex items-end justify-center gap-5 md:gap-8 flex-wrap px-4">
          {range.colors.map((color, i) => (
            <button key={i} onClick={() => handleColorChange(i)}
              className="flex flex-col items-center gap-2 group focus:outline-none">
              {/* Circle */}
              <div className={`relative w-12 h-12 rounded-full transition-all duration-200 ${selectedColor === i ? 'ring-2 ring-[#C25E28] ring-offset-2 scale-110' : 'hover:ring-2 hover:ring-neutral-300 hover:ring-offset-1'}`}
                style={{ backgroundColor: color.hex }}>
                {selectedColor === i && (
                  /* Tick line in center, matching screenshot */
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-px h-4 bg-[#C25E28]/60 rounded-full" />
                  </span>
                )}
              </div>
              {/* Label */}
              <span className={`text-xs font-medium transition-colors ${selectedColor === i ? 'text-[#C25E28] font-bold' : 'text-neutral-500 group-hover:text-[#302D2A]'}`}>
                {color.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Gallery + Product Info ── */}
      <div className="w-full px-4 md:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* Left — Gallery */}
          <div>
            <h2 className="font-bold text-[#302D2A] text-lg mb-4">
              {range.name} {range.colors[selectedColor]?.label ?? ''} Gallery
            </h2>
            <div className={`aspect-[4/3] bg-neutral-100 overflow-hidden mb-3 transition-opacity duration-300 ${fading ? 'opacity-50' : 'opacity-100'}`}>
              <img src={range.galleryImages[0]} alt={range.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex gap-2 flex-wrap">
              {range.galleryImages.slice(0, 3).map((img, i) => (
                <div key={i} className="w-[76px] h-[58px] bg-neutral-100 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity border border-neutral-200 hover:border-[#C25E28]">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="w-[76px] h-[58px] bg-neutral-800 flex items-center justify-center cursor-pointer hover:bg-neutral-700 transition-colors border border-neutral-700">
                <Play size={16} className="text-white" fill="white" />
              </div>
              <button className="w-[76px] h-[58px] bg-neutral-100 border border-neutral-200 flex flex-col items-center justify-center cursor-pointer hover:bg-neutral-50 hover:border-[#C25E28] transition-all text-[10px] font-black text-[#302D2A]">
                +5 More
              </button>
            </div>
          </div>

          {/* Right — Product Info */}
          <div>
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h1 className="text-4xl font-bold text-[#302D2A]">{range.name}</h1>
                  {range.topBadge === 'NEW' && (
                    <span className="bg-red-600 text-white text-[9px] font-black px-3 py-1 rounded uppercase tracking-widest self-start mt-2">NEW</span>
                  )}
                </div>
                <p className="text-2xl font-semibold text-[#302D2A]">
                  {range.colors[selectedColor]?.label ?? ''}
                </p>
              </div>
              {range.badge === 'BEST BUDGET' && (
                <div className="w-14 h-14 rounded-full bg-[#C25E28] flex flex-col items-center justify-center text-white text-center flex-shrink-0 shadow-md ml-3">
                  <span className="text-[7px] font-black leading-tight uppercase">BEST</span>
                  <span className="text-[7px] font-black leading-tight uppercase">ON</span>
                  <span className="text-[7px] font-black leading-tight uppercase">BUDGET</span>
                </div>
              )}
            </div>

            <div className="mt-4 mb-6 space-y-4">
              <p className="text-sm text-[#302D2A] leading-relaxed font-medium">{range.description}</p>
              <p className="text-sm text-neutral-500 leading-relaxed">{range.longDesc}</p>
            </div>

            {/* Accordions */}
            <div className="border-t border-neutral-200">
              {ACCORDIONS.map(acc => (
                <div key={acc.id} className="border-b border-neutral-200">
                  <button onClick={() => setOpenAccordion(openAccordion === acc.id ? null : acc.id)}
                    className="w-full flex items-center justify-between py-4 text-left text-sm font-medium text-[#302D2A] hover:text-[#C25E28] transition-colors group">
                    <span>{acc.title}</span>
                    <ChevronRight size={16} className={`text-neutral-400 group-hover:text-[#C25E28] transition-transform flex-shrink-0 ${openAccordion === acc.id ? 'rotate-90' : ''}`} />
                  </button>
                  {openAccordion === acc.id && (
                    <div className="pb-5 text-sm text-neutral-500 leading-relaxed animate-fade-in">{acc.content}</div>
                  )}
                </div>
              ))}
            </div>

            {/* Related ranges */}
            <div className="mt-8 pt-6 border-t border-neutral-200">
              <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">Other Kitchen Ranges</p>
              <div className="flex gap-3 flex-wrap">
                {Object.values(RANGES).filter(r => r.id !== range.id).map(r => (
                  <Link key={r.id} href={`/kitchen-ranges/${r.id}`}
                    className="flex items-center gap-2 px-3 py-2 border border-neutral-200 hover:border-[#C25E28] hover:text-[#C25E28] text-xs font-bold text-[#302D2A] transition-colors rounded">
                    <div className="w-5 h-5 rounded-full flex-shrink-0 border border-neutral-300" style={{ backgroundColor: r.colors[0]?.hex ?? '#ccc' }} />
                    {r.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── What's Next? ── */}
      <section className="w-full bg-[#302D2A] text-white py-16 px-4 md:px-12">
        <h2 className="text-3xl font-bold text-center mb-12">What&apos;s next?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Step 1 */}
          <div className="bg-white text-[#302D2A] p-8 flex flex-col items-center text-center relative pt-10">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center absolute -top-6 left-1/2 -translate-x-1/2 shadow-lg">
              <Check size={22} className="text-white" strokeWidth={3} />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-4 mt-2">Inspire</p>
            <h3 className="text-xl font-bold mb-6 leading-tight">Interested in this kitchen?</h3>
            <Link href="/kitchen-ranges" className="text-sm text-[#C25E28] hover:underline font-medium mt-auto">
              View all of our fitted kitchens
            </Link>
          </div>
          {/* Step 2 */}
          <div className="bg-white text-[#302D2A] p-8 flex flex-col items-center text-center relative pt-10">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center absolute -top-6 left-1/2 -translate-x-1/2 shadow-lg border-4 border-[#302D2A]">
              <span className="text-white font-black text-lg">2</span>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-4 mt-2">Design & Plan</p>
            <h3 className="text-xl font-bold mb-5 leading-tight">Inquire for Design</h3>
            <ul className="space-y-2 mb-8 text-left w-full text-sm">
              {['Tell us your needs and ideas', "We'll measure up and create a 3D plan", "Refine your design until you're happy"].map(item => (
                <li key={item} className="flex items-start gap-2.5">
                  <Check size={14} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-neutral-600">{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/build-project"
              className="w-full bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-6 py-3 uppercase tracking-widest transition-colors text-center mt-auto block">
              Inquire for Design
            </Link>
          </div>
          {/* Step 3 */}
          <div className="bg-white text-[#302D2A] p-8 flex flex-col items-center text-center relative pt-10">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center absolute -top-6 left-1/2 -translate-x-1/2 shadow-lg border-4 border-[#302D2A]">
              <span className="text-white font-black text-lg">3</span>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-4 mt-2">Order & Fit</p>
            <h3 className="text-xl font-bold mb-5 leading-tight">Need help with the next steps?</h3>
            <p className="text-sm text-neutral-500 leading-relaxed">You can discuss this with the depot team during your appointment.</p>
          </div>
        </div>
      </section>

      {/* ── Award Winning Kitchens ── */}
      <section className="w-full bg-[#242220] text-white py-16 px-4 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-5">Award Winning Kitchens</h2>
          <p className="text-neutral-400 text-center text-sm leading-relaxed max-w-2xl mx-auto mb-14">
            We&apos;re an award-winning kitchen manufacturer and we&apos;re proud to have achieved the Which? Best Buy on rigid, flat-pack and handleless cabinets for the last three years.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Which? */}
            <div className="flex flex-col items-center text-center">
              <div className="relative w-24 h-24 mb-5">
                <div className="absolute inset-0 rounded-full border-8 border-red-600" />
                <div className="absolute inset-2 rounded-full bg-white flex flex-col items-center justify-center">
                  <p className="text-red-600 text-[7px] font-black uppercase">JUNE 2025</p>
                  <p className="text-[#302D2A] text-[8px] font-black uppercase">WHICH?</p>
                  <p className="text-red-600 text-[8px] font-black uppercase">BEST BUY</p>
                  <p className="text-[#302D2A] text-[5px] font-black uppercase tracking-tight">KITCHEN CABINETS</p>
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2">Which? Best Buy</h3>
              <p className="text-neutral-400 text-xs leading-relaxed">In Which?&apos;s customer survey of best kitchen suppliers, Howdens achieved a joint top score.</p>
            </div>
            {/* 9% */}
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 mb-5 bg-[#C25E28] flex flex-col items-center justify-center rounded-sm">
                <p className="text-white text-[7px] font-bold uppercase tracking-wide text-center mb-0.5">TRADE ADD VALUE</p>
                <p className="text-white text-3xl font-black leading-none">9%</p>
                <p className="text-white/80 text-[6px] uppercase tracking-wide text-center mt-0.5">ADDED TO YOUR HOME</p>
              </div>
              <h3 className="font-bold text-lg mb-2">The Trade Add Value to Your Home</h3>
              <p className="text-neutral-400 text-xs leading-relaxed">Over two-thirds of property experts agree using a tradesperson adds on average 9% to your home value.</p>
            </div>
            {/* Trustpilot */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-5 flex flex-col items-center gap-2">
                <div className="flex items-center gap-1.5 mb-1">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#00B67A"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  <span className="text-green-400 font-black text-lg tracking-tight">Trustpilot</span>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_,i) => (
                    <div key={i} className="w-8 h-8 bg-green-500 flex items-center justify-center">
                      <Star size={16} className="fill-white text-white" />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-neutral-400">TrustScore 4.7 | 76,000+ reviews</p>
              </div>
              <h3 className="font-bold text-lg mb-2">Rated &apos;Excellent&apos; on Trustpilot</h3>
              <p className="text-neutral-400 text-xs leading-relaxed">With 76,000+ reviews, we&apos;re rated 4.7 out of 5. Customers praise our design, service and overall experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Disclaimer ── */}
      <section className="w-full bg-white py-10 px-4 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h4 className="font-bold text-sm text-[#302D2A] mb-3">Disclaimer</h4>
          <p className="text-xs text-neutral-400 leading-relaxed">
            YouGov online survey respondents in the property industry. Value increase percentages are based on those respondents&apos; opinion only. This is applicable to the UK property market only and does not constitute legal or professional advice. Howdens does not accept any responsibility for any loss or liability which may arise from reliance on this information.
          </p>
        </div>
      </section>

    </div>
  )
}
