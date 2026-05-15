import Image from 'next/image'

interface MarqueeSectionProps {
  title: string
  items: { name: string; logo: string }[]
}

export function MarqueeSection({ title, items }: MarqueeSectionProps) {
  const repeated = [...items, ...items, ...items, ...items]
  return (
    <section className="w-full px-4 md:px-12 overflow-hidden py-8">
      <h2 className="text-2xl font-bold mb-8 border-b-2 border-brand-orange inline-block pb-2">{title}</h2>
      <div className="relative w-full overflow-hidden">
        <div className="flex gap-12 animate-marquee w-max">
          {repeated.map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-2 min-w-[120px] group cursor-pointer">
              <div className="w-36 h-16 rounded-lg bg-white border border-neutral-lighter flex items-center justify-center overflow-hidden group-hover:border-brand-orange transition-colors duration-300 shadow-sm group-hover:shadow-md">
                <Image src={item.logo} alt={item.name} width={160} height={80} className="object-contain p-2" unoptimized />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
