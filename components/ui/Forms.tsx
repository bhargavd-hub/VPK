import React from 'react'
import { clsx } from 'clsx'

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', size = 'md', className = '', ...props }, ref) => {
    const base = 'font-bold transition-all duration-200 tracking-wide uppercase flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
    const sizes = { sm: 'px-4 py-2 text-xs', md: 'px-6 py-3 text-sm', lg: 'px-8 py-4 text-base' }
    const variants = {
      primary: 'bg-brand-orange text-white hover:bg-[#a64e21] border border-transparent',
      secondary: 'bg-transparent border border-brand-offBlack text-brand-offBlack hover:bg-brand-offBlack hover:text-white',
      ghost: 'bg-transparent text-brand-offBlack hover:bg-neutral-lightest',
      outline: 'border border-neutral-light text-brand-offBlack hover:border-brand-offBlack',
    }
    return (
      <button ref={ref} className={clsx(base, sizes[size], variants[variant], className)} {...props}>
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

// --- Input ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => (
    <div className={clsx('flex flex-col gap-1 w-full', className)}>
      {label && <label className="text-sm font-bold text-brand-offBlack">{label}</label>}
      <input
        ref={ref}
        className={clsx(
          'border p-3 text-base focus:outline-none focus:border-brand-orange transition-colors bg-white text-brand-offBlack',
          error ? 'border-red-500' : 'border-neutral-light'
        )}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
)
Input.displayName = 'Input'

// --- Select ---
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: { value: string; label: string }[]
}

export function Select({ label, options, className = '', ...props }: SelectProps) {
  return (
    <div className={clsx('flex flex-col gap-1 w-full', className)}>
      {label && <label className="text-sm font-bold text-brand-offBlack">{label}</label>}
      <select className="border border-neutral-light p-3 text-base focus:outline-none focus:border-brand-orange bg-white text-brand-offBlack" {...props}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  )
}

// --- Badge ---
export function Badge({ children, variant = 'orange' }: { children: React.ReactNode; variant?: 'orange' | 'green' | 'gray' }) {
  const variants = {
    orange: 'bg-brand-orange text-white',
    green: 'bg-green-600 text-white',
    gray: 'bg-neutral-light text-brand-offBlack',
  }
  return (
    <span className={clsx('px-2 py-0.5 text-xs font-bold uppercase tracking-wide rounded', variants[variant])}>
      {children}
    </span>
  )
}
