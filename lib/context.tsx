'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { Product, CartItem, User } from './types'

interface AppContextType {
  cart: CartItem[]
  wishlist: string[]
  user: User | null
  toastMessage: string
  addToCart: (product: Product, qty?: number) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, qty: number) => void
  clearCart: () => void
  toggleWishlist: (id: string) => void
  login: (user: User) => void
  logout: () => void
  setToastMessage: (msg: string) => void
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<string[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [toastMessage, setToastMessageState] = useState('')

  // Persist cart to localStorage
  useEffect(() => {
    const saved = localStorage.getItem('vpk-cart')
    if (saved) setCart(JSON.parse(saved))
    const savedWishlist = localStorage.getItem('vpk-wishlist')
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist))
    const savedUser = localStorage.getItem('vpk-user')
    if (savedUser) setUser(JSON.parse(savedUser))
  }, [])

  useEffect(() => {
    localStorage.setItem('vpk-cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('vpk-wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  const addToCart = useCallback((product: Product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + qty } : i)
      }
      return [...prev, { ...product, quantity: qty }]
    })
    setToastMessageState(`"${product.name}" added to cart!`)
    setTimeout(() => setToastMessageState(''), 3000)
  }, [])

  const removeFromCart = useCallback((id: string) => {
    setCart(prev => prev.filter(i => i.id !== id))
  }, [])

  const updateQuantity = useCallback((id: string, qty: number) => {
    if (qty < 1) {
      setCart(prev => prev.filter(i => i.id !== id))
    } else {
      setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i))
    }
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const toggleWishlist = useCallback((id: string) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }, [])

  const login = useCallback((u: User) => {
    setUser(u)
    localStorage.setItem('vpk-user', JSON.stringify(u))
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('vpk-user')
  }, [])

  const setToastMessage = useCallback((msg: string) => {
    setToastMessageState(msg)
    if (msg) setTimeout(() => setToastMessageState(''), 3000)
  }, [])

  return (
    <AppContext.Provider value={{
      cart, wishlist, user, toastMessage,
      addToCart, removeFromCart, updateQuantity, clearCart,
      toggleWishlist, login, logout, setToastMessage,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
