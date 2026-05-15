'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronRight, Star } from 'lucide-react'

/* ─── Data ─── */
const KITCHEN_RANGES = [
  {
    id: 'halesworth',
    name: 'Halesworth',
    brand: 'Howdens',
    subtitle: 'Antique Rose Kitchen',
    image: 'https://www.howdens.com/-/media/howdens/assets/clh_asset_products/clh_asset_levela_108418/clh_asset_levelb_25522207/clh_asset_levelc_25541472/clh_asset_leveld_25670692/ass_25669912/ass_25669912_16_9.jpg?w=740&hash=B586E0DC7DB050C5606D6278F4F13A10',
    sampleImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYAiC6vM3v1ahGXrAvccIUFtn5YdUGqGvcTA&s',
    rating: 5, reviews: 50,
    description: 'A modern take on a traditional aesthetic, our Halesworth collection has a slim border for a sleek, five-piece design, and its 19mm thick fronts ensure a sturdy frame.',
    colors: ['#E5E1DA', '#607274', '#B2B2B2', '#31363F', '#222831', '#D6DAC8', '#9CA986'],
    moreColors: 5, topBadge: null,
  },
  {
    id: 'clerkenwell',
    name: 'Clerkenwell',
    brand: 'VPK',
    subtitle: 'Natural Oak Kitchen',
    image: 'https://ik.imagekit.io/4erco1shm/VPK/1.avif',
    sampleImage: 'https://ik.imagekit.io/4erco1shm/VPK/VPK%20logo.png',
    rating: 0, reviews: 0,
    description: 'The timber tone of Clerkenwell Natural Oak adds a traditional touch to a contemporary kitchen, while the 19mm thick doors and j pull handle offer a sleek appearance.',
    colors: ['#C4A484'],
    moreColors: 0, topBadge: null,
  },
  {
    id: 'greenwich-gloss',
    name: 'Greenwich Gloss',
    brand: 'Howdens',
    subtitle: 'Slate Grey Kitchen',
    image: 'https://ik.imagekit.io/4erco1shm/VPK/3.avif',
    sampleImage: 'https://ik.imagekit.io/4erco1shm/VPK/VPK%20logo.png',
    rating: 5, reviews: 41,
    description: 'Greenwich Gloss has a reflective finish and simple slab design that is easy to accommodate in any home, while the 16mm-thick front makes it affordable too.',
    colors: ['#E5E1DA', '#F0EBE3', '#9CA986', '#D2C1B0', '#B2B2B2'],
    moreColors: 0, topBadge: 'BEST ON BUDGET',
  },
  {
    id: 'frome',
    name: 'Frome',
    brand: 'Magnet',
    subtitle: 'Mist Kitchen',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    sampleImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=200&q=80',
    rating: 0, reviews: 0,
    description: 'With a narrow frame, shallow centre panel, and smooth finish, Frome has a modern, shaker design and pared-back look. These fronts can be mix-and-matched with other colours and textures, while a 19mm-thickness ensures they are a long-lasting choice.',
    colors: ['#9CA986', '#E5E1DA', '#B2B2B2', '#D2C1B0', '#F5F5F5', '#31363F'],
    moreColors: 1, topBadge: 'NEW',
  },
]

const QUICK_FILTERS = [
  { name: 'Fitted Kitchens',    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=200' },
  { name: 'Kitchen Cabinets',   image: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&w=200' },
  { name: 'Kitchen Worktops',   image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=200' },
  { name: 'Kitchen Taps',       image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=200' },
  { name: 'Kitchen Sinks',      image: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=200' },
  { name: 'Kitchen Appliances', image: 'https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?auto=format&fit=crop&w=200' },
]

/* ─── VPK Logo SVG ─── */
const VPKLogo = () => (
  <svg width="30" height="30" viewBox="0 0 100 100" fill="none">
    <path d="M20 22L30 52H35L45 22H39L32.5 42L26 22H20Z" fill="#302D2A"/>
    <path d="M55 22V52H61V40H70C75.5 40 79 36 79 31C79 26 75.5 22 70 22H55ZM61 27H69C72 27 73 28.5 73 31C73 33.5 72 35 69 35H61V27Z" fill="#302D2A"/>
    <path d="M20 57V87H26V75L34 87H41L31 72L40 57H33L26 69V57H20Z" fill="#302D2A"/>
  </svg>
)

/* ─── Brand circle badge (bottom-right of image) ─── */
function BrandBadge({ brand, sampleImage }: { brand: string; sampleImage: string }) {
  if (brand === 'Howdens') {
    return (
      <div className="absolute bottom-4 right-6 w-14 h-14 rounded-full bg-red-600 shadow-xl z-20 border-2 border-white flex flex-col items-center justify-center">
        <span className="text-white font-black text-[8px] tracking-wider leading-tight text-center">
          H<br/><span className="text-[6px] tracking-widest">OWDENS</span>
        </span>
      </div>
    )
  }
  if (brand === 'VPK') {
    return (
      <div className="absolute bottom-4 right-6 w-14 h-14 rounded-full bg-white shadow-xl z-20 border border-neutral-200 flex items-center justify-center">
        <VPKLogo />
      </div>
    )
  }
  // Magnet / other: thumbnail circle
  return (
    <div className="absolute bottom-4 right-6 w-14 h-14 rounded-full bg-white p-0.5 shadow-xl z-20 border border-neutral-200">
      <div className="w-full h-full rounded-full overflow-hidden">
        <img src={sampleImage} alt="sample" className="w-full h-full object-cover" />
      </div>
    </div>
  )
}

export default function KitchenRangesPage() {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [sortBy, setSortBy]     = useState('Relevance')
  const [sortOpen, setSortOpen] = useState(false)
  const [compare, setCompare]   = useState(false)

  const toggleBrand = (b: string) =>
    setSelectedBrands(p => p.includes(b) ? p.filter(x => x !== b) : [...p, b])

  const filtered = KITCHEN_RANGES.filter(r =>
    selectedBrands.length === 0 || selectedBrands.includes(r.brand)
  )

  return (
    <div className="w-full bg-[#F7F5F2] min-h-screen">

      {/* Breadcrumb */}
      <div className="w-full px-4 md:px-12 py-4 bg-white border-b border-neutral-200">
        <nav className="flex items-center gap-1.5 text-sm text-neutral-500">
          <Link href="/" className="hover:text-[#C25E28]">Home</Link>
          <ChevronRight size={13} className="text-neutral-300"/>
          <Link href="/products?category=Kitchen+%26+Dining" className="hover:text-[#C25E28]">Kitchen & Dining</Link>
          <ChevronRight size={13} className="text-neutral-300"/>
          <span className="text-[#302D2A] font-semibold">Fitted Kitchen Ranges</span>
        </nav>
      </div>

      <div className="w-full px-4 md:px-12 py-10">

        {/* Page header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-[#302D2A] mb-3">Fitted Kitchen Ranges</h1>
          <p className="text-neutral-500 text-sm max-w-xl leading-relaxed">
            Explore our wide range of fitted kitchen styles, from modern slab designs to traditional shaker aesthetics. Find the perfect kitchen for your home and budget.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* ────────── Sidebar ────────── */}
          <aside className="w-full lg:w-52 flex-shrink-0 space-y-7 lg:sticky top-24 h-fit">

            {/* By Brand */}
            <div>
              <h3 className="font-bold text-sm text-[#302D2A] mb-3">By Brand</h3>
              <div className="space-y-2.5">
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <input type="checkbox" checked={selectedBrands.length === 0}
                    onChange={() => setSelectedBrands([])}
                    className="w-4 h-4 accent-[#C25E28] cursor-pointer"/>
                  <span className={`text-sm transition-colors ${selectedBrands.length === 0 ? 'font-bold text-[#C25E28]' : 'text-neutral-600 group-hover:text-[#C25E28]'}`}>
                    All Brands
                  </span>
                </label>
                {['VPK','Howdens','Wrens','Magnet'].map(b => (
                  <label key={b} className="flex items-center gap-2.5 cursor-pointer group">
                    <input type="checkbox" checked={selectedBrands.includes(b)}
                      onChange={() => toggleBrand(b)}
                      className="w-4 h-4 accent-[#C25E28] cursor-pointer"/>
                    <span className={`text-sm transition-colors ${selectedBrands.includes(b) ? 'font-bold text-[#C25E28]' : 'text-neutral-600 group-hover:text-[#C25E28]'}`}>
                      {b}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-bold text-sm text-[#302D2A] mb-3">Price Range</h3>
              <div className="flex items-center gap-2">
                <input type="number" placeholder="Min"
                  className="w-[68px] border border-neutral-200 p-2 text-sm focus:border-[#C25E28] outline-none bg-white"/>
                <span className="text-neutral-400">-</span>
                <input type="number" placeholder="Max"
                  className="w-[68px] border border-neutral-200 p-2 text-sm focus:border-[#C25E28] outline-none bg-white"/>
              </div>
            </div>

            {/* Rating */}
            <div>
              <h3 className="font-bold text-sm text-[#302D2A] mb-3">Rating</h3>
              <div className="space-y-2">
                {[5,4,3,2,1].map(stars => (
                  <label key={stars} className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 accent-[#C25E28] cursor-pointer"/>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_,i) => (
                        <Star key={i} size={13} className={i < stars ? 'fill-[#C25E28] text-[#C25E28]' : 'fill-neutral-200 text-neutral-200'}/>
                      ))}
                      <span className="text-xs text-neutral-500 group-hover:text-[#C25E28] ml-1 transition-colors">& Up</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* ────────── Main ────────── */}
          <div className="flex-1 min-w-0">

            {/* Quick category filter strip */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-8">
              {QUICK_FILTERS.map(item => (
                <div key={item.name}
                  className="border border-neutral-200 bg-white flex items-center gap-2 p-1 hover:border-[#C25E28] cursor-pointer transition-colors group h-14">
                  <div className="w-12 h-full bg-neutral-100 flex-shrink-0 overflow-hidden">
                    <img src={item.image} alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                  </div>
                  <span className="text-[9px] font-bold text-[#302D2A] leading-tight uppercase tracking-tight pr-1 line-clamp-2">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-7 pb-5 border-b border-neutral-200 gap-4">
              <div className="flex items-center gap-6">
                <span className="font-bold text-[#302D2A] text-sm">
                  {filtered.length} kitchen range{filtered.length !== 1 ? 's' : ''}
                </span>
                {/* iOS-style toggle */}
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => setCompare(!compare)}
                    aria-label="Toggle compare"
                    className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C25E28] ${compare ? 'bg-[#C25E28]' : 'bg-neutral-300'}`}>
                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${compare ? 'translate-x-6' : 'translate-x-1'}`}/>
                  </button>
                  <span className="text-sm font-bold text-[#302D2A]">Compare</span>
                </div>
              </div>

              {/* Sort dropdown */}
              <div className="flex items-center gap-3 self-end sm:self-auto">
                <span className="text-neutral-500 text-sm">Sort by</span>
                <div className="relative">
                  <button
                    onClick={() => setSortOpen(!sortOpen)}
                    className="border border-neutral-200 bg-white px-4 py-2 min-w-[160px] flex justify-between items-center hover:border-[#C25E28] transition-colors text-sm font-bold text-[#302D2A] gap-6 focus:outline-none">
                    <span>{sortBy}</span>
                    <ChevronDown size={14} className={`transition-transform duration-200 ${sortOpen ? 'rotate-180' : ''}`}/>
                  </button>
                  {sortOpen && (
                    <div className="absolute top-full right-0 mt-0.5 w-full bg-white border border-neutral-200 shadow-xl z-50">
                      {['Relevance','Price: Low to High','Price: High to Low','Rating'].map(opt => (
                        <button key={opt}
                          onClick={() => { setSortBy(opt); setSortOpen(false) }}
                          className={`w-full text-left px-4 py-2.5 text-sm hover:bg-neutral-50 hover:text-[#C25E28] transition-colors ${sortBy === opt ? 'font-bold text-[#C25E28] bg-neutral-50' : 'text-neutral-600'}`}>
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ── Kitchen Range Grid ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filtered.map(range => (
                <Link key={range.id} href={`/kitchen-ranges/${range.id}`}
                  className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col relative group">

                  {/* Top badge: BEST ON BUDGET or NEW */}
                  {range.topBadge === 'NEW' && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="bg-green-600 text-white text-[10px] font-black px-4 py-1 rounded uppercase tracking-widest shadow">
                        New
                      </span>
                    </div>
                  )}
                  {range.topBadge === 'BEST ON BUDGET' && (
                    <div className="absolute top-4 right-4 z-10">
                      <div className="bg-red-600 text-white text-[9px] font-black px-2.5 py-1.5 rounded-full shadow-lg flex flex-col items-center leading-tight text-center">
                        <span>BEST</span><span>ON</span><span>BUDGET</span>
                      </div>
                    </div>
                  )}

                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                    <img
                      src={range.image}
                      alt={range.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <BrandBadge brand={range.brand} sampleImage={range.sampleImage}/>
                  </div>

                  {/* Content */}
                  <div className="p-7 pt-8 flex flex-col flex-1">
                    {/* Name + brand tag */}
                    <div className="flex justify-between items-start mb-1">
                      <h2 className="text-[28px] font-bold text-[#302D2A] leading-tight">{range.name}</h2>
                      <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest bg-neutral-100 px-2.5 py-1 rounded self-start mt-2 flex-shrink-0 ml-2">
                        {range.brand.toUpperCase()}
                      </span>
                    </div>

                    <p className="text-neutral-400 mb-4">{range.subtitle}</p>

                    {/* Stars */}
                    {range.reviews > 0 && (
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_,i) => (
                          <Star key={i} size={14} className={i < Math.floor(range.rating) ? 'fill-[#C25E28] text-[#C25E28]' : 'fill-neutral-200 text-neutral-200'}/>
                        ))}
                        <span className="text-xs text-neutral-400 ml-1">({range.reviews})</span>
                      </div>
                    )}

                    <p className="text-sm text-neutral-500 leading-relaxed mb-8 line-clamp-3">
                      {range.description}
                    </p>

                    {/* Colour swatches */}
                    <div className="mt-auto">
                      <p className="text-[9px] font-black uppercase tracking-widest text-[#302D2A] mb-3">
                        Also available in
                      </p>
                      <div className="flex flex-wrap gap-2 items-center">
                        {range.colors.map((color, i) => (
                          <div key={i}
                            className="w-8 h-8 rounded-full border border-neutral-200 shadow-sm cursor-pointer hover:scale-110 transition-transform"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                        {range.moreColors > 0 && (
                          <div className="w-8 h-8 rounded-full border border-neutral-200 bg-neutral-100 flex items-center justify-center text-[10px] font-bold text-neutral-500 cursor-pointer hover:bg-neutral-200 transition-colors">
                            +{range.moreColors}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                </Link>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
