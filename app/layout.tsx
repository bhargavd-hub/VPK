import type { Metadata } from 'next'
import './globals.css'
import { AppProvider } from '@/lib/context'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ToastNotification } from '@/components/ui/ToastNotification'

export const metadata: Metadata = {
  title: 'VPK Marketplace | Home Improvement & Building Materials',
  description: 'Everything you need for your next project — tools, building materials, kitchens, bathrooms, and more.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white">
        <AppProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <ToastNotification />
        </AppProvider>
      </body>
    </html>
  )
}
