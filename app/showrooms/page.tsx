import { MapPin, Clock, Phone, Play } from 'lucide-react'

export const metadata = { title: 'Our Showrooms | VPK Marketplace' }

const SHOWROOMS = [
  {
    name: 'Central London',
    address: '123 Design Avenue\nLondon, W1D 4AB\nUnited Kingdom',
    hours: 'Mon – Fri: 9:00 AM – 6:00 PM\nSat: 10:00 AM – 5:00 PM\nSun: Closed',
    phone: '+44 20 1234 5678',
    email: 'london@vpk.com',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800',
  },
  {
    name: 'Manchester',
    address: '45 Commercial Street\nManchester, M1 2EQ\nUnited Kingdom',
    hours: 'Mon – Fri: 8:30 AM – 5:30 PM\nSat: 9:00 AM – 4:00 PM\nSun: Closed',
    phone: '+44 161 234 5678',
    email: 'manchester@vpk.com',
    image: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?auto=format&fit=crop&w=800',
  },
  {
    name: 'Birmingham',
    address: '78 Broad Street\nBirmingham, B1 2HF\nUnited Kingdom',
    hours: 'Mon – Fri: 9:00 AM – 6:00 PM\nSat: 10:00 AM – 5:00 PM\nSun: 11:00 AM – 3:00 PM',
    phone: '+44 121 234 5678',
    email: 'birmingham@vpk.com',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800',
  },
]

export default function ShowroomsPage() {
  return (
    <div className="w-full bg-neutral-lightest min-h-screen pb-24">
      {/* Hero */}
      <div className="bg-brand-offBlack text-white py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[150%] bg-brand-orange/40 blur-[120px] rounded-full" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Our Showrooms</h1>
          <p className="text-lg text-neutral-light leading-relaxed font-light mx-auto max-w-2xl">
            Visit one of our flagship showrooms and experience our extensive range of high-quality home improvement products in person.
          </p>
        </div>
      </div>

      {/* Virtual Tour */}
      <div className="w-full px-4 md:px-12 max-w-7xl mx-auto -mt-10 relative z-20 mb-16">
        <div className="bg-white rounded-3xl shadow-xl border border-neutral-lighter p-4 md:p-8">
          <div className="w-full aspect-video bg-neutral-light/50 rounded-2xl overflow-hidden relative flex flex-col items-center justify-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158857.7281066703!2d-0.2416812062534571!3d51.52877184087612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2sus!4v1714241668853!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 z-0 opacity-50 grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="z-10 bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl text-center max-w-md mx-4">
              <div className="w-16 h-16 bg-brand-orange text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Play size={28} fill="currentColor" />
              </div>
              <h3 className="text-2xl font-bold text-brand-offBlack mb-2">Virtual Tour</h3>
              <p className="text-neutral mb-6 text-sm">Explore our latest kitchen and development displays in 3D panoramic views.</p>
              <button className="bg-brand-orange text-white font-bold px-6 py-3 uppercase text-sm tracking-wide hover:bg-[#a64e21] transition-colors w-full">
                Start 3D Tour
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Showroom Locations */}
      <div className="w-full px-4 md:px-12 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-brand-offBlack mb-8 border-b-2 border-brand-orange inline-block pb-2">Find a Showroom</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SHOWROOMS.map(showroom => (
            <div key={showroom.name} className="bg-white rounded-2xl border border-neutral-lighter overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 overflow-hidden">
                <img src={showroom.image} alt={showroom.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-brand-offBlack">{showroom.name}</h3>
                <InfoRow icon={<MapPin size={18} />}>
                  {showroom.address.split('\n').map((l, i) => <p key={i}>{l}</p>)}
                </InfoRow>
                <InfoRow icon={<Clock size={18} />}>
                  {showroom.hours.split('\n').map((l, i) => <p key={i}>{l}</p>)}
                </InfoRow>
                <InfoRow icon={<Phone size={18} />}>
                  <p>{showroom.phone}</p>
                  <p className="text-brand-orange">{showroom.email}</p>
                </InfoRow>
                <button className="w-full mt-2 border border-brand-orange text-brand-orange font-bold py-2.5 uppercase text-xs tracking-wide hover:bg-brand-orange hover:text-white transition-colors">
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function InfoRow({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 text-sm text-neutral-dark">
      <span className="text-brand-orange flex-shrink-0 mt-0.5">{icon}</span>
      <div className="space-y-0.5">{children}</div>
    </div>
  )
}
