import Link from 'next/link'
import { Clock, Truck, ShieldCheck, RefreshCw } from 'lucide-react'

export function TrustIconsBar() {
  const items = [
    { href: '/services', icon: Clock, label: 'Our Services' },
    { href: '#', icon: Truck, label: 'Free Delivery Over £50' },
    { href: '#', icon: ShieldCheck, label: 'Secure Payments' },
    { href: '#', icon: RefreshCw, label: 'Easy Returns' },
  ]
  return (
    <div className="w-full bg-neutral-lightest border-b border-neutral-lighter">
      <div className="w-full px-4 md:px-12 py-3 flex flex-wrap md:flex-nowrap justify-between items-center gap-y-3 text-xs md:text-sm md:divide-x md:divide-neutral-200">
        {items.map(({ href, icon: Icon, label }) => (
          <Link key={label} href={href} className="flex items-center gap-2 flex-1 justify-center px-2 hover:text-brand-orange transition-colors group cursor-pointer">
            <Icon size={22} className="text-brand-orange flex-shrink-0 group-hover:scale-110 transition-transform" />
            <p className="font-bold text-center">{label}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
