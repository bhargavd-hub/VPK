'use client'

import { useApp } from '@/lib/context'
import { Check } from 'lucide-react'

export function ToastNotification() {
  const { toastMessage } = useApp()
  if (!toastMessage) return null
  return (
    <div className="fixed bottom-6 right-6 z-[100] bg-brand-offBlack text-white px-5 py-3 rounded-lg shadow-xl flex items-center gap-3 animate-fade-in text-sm font-medium max-w-xs">
      <Check size={16} className="text-green-400 flex-shrink-0" />
      {toastMessage}
    </div>
  )
}
