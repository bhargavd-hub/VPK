import Link from 'next/link'
import { Globe, Facebook, Twitter, Youtube, Instagram } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-brand-offBlack text-white pt-12 pb-8 border-t-[6px] border-neutral-lightest">
      <div className="w-full px-4 md:px-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 border-b border-white/20 pb-12">
        <FooterCol title="Business" links={['VPK corporate', 'Careers', 'Media centre', 'Responsible business', 'Business services', 'Affiliate program', 'Modern slavery act']} />
        <FooterCol title="Services" links={['View all our services', 'Join VPK club', 'VPK finance', 'VPK bulk delivery', 'Become a VPK approved installer']} />
        <FooterCol title="Products" links={['Green star', 'Our own brands', 'Product information', 'Product recalls & safety notices', 'Health & safety data sheets', 'Promotional terms & conditions', 'VPK Marketplace']} />
        <FooterCol title="Help & Support" links={['Support and contact us', 'Home delivery', 'Click + Collect', 'Returns & refunds', 'Brochures', 'Store finder', 'Sitemap']} />
        <FooterCol title="Partner Sites" links={['Rubbish clearance', 'Made to measure blinds', 'BOXT boilers', 'BOXT air conditioning', 'VPK app', 'Become a VPK verified seller']} />
      </div>
      <div className="w-full px-4 md:px-12 mt-6 flex flex-col md:flex-row justify-between items-center gap-6 text-white text-xs font-medium">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span>&copy; VPK 2026</span>
          <span className="hidden md:inline text-white/40">|</span>
          <a href="#" className="hover:underline">Terms & conditions</a>
          <span className="hidden md:inline text-white/40">|</span>
          <a href="#" className="hover:underline">Privacy policy</a>
          <span className="hidden md:inline text-white/40">|</span>
          <a href="#" className="hover:underline">Contact us</a>
          <span className="hidden md:inline text-white/40">|</span>
          <a href="#" className="hover:underline flex items-center gap-1"><Globe size={12} /> Change country</a>
        </div>
        <div className="flex items-center gap-3">
          <SocialIcon href="#" icon={<Facebook size={18} />} />
          <SocialIcon href="#" icon={<Twitter size={18} />} />
          <SocialIcon href="#" icon={<Youtube size={18} />} />
          <SocialIcon href="#" icon={<Instagram size={18} />} />
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="font-bold mb-4 text-sm text-white">{title}</h4>
      <ul className="space-y-3 text-white/80 text-sm">
        {links.map(link => (
          <li key={link}><a href="#" className="hover:text-white hover:underline transition-colors">{link}</a></li>
        ))}
      </ul>
    </div>
  )
}

function SocialIcon({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a href={href} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors text-white">
      {icon}
    </a>
  )
}
