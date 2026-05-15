export interface Product {
  id: string
  name: string
  price: number
  category: string
  rating: number
  reviews: number
  image: string
  description: string
  features: string[]
  brand?: string
  subtitle?: string
  sampleImage?: string
  colors?: string[]
  moreColors?: number
  badge?: string | null
}

export interface CartItem extends Product {
  quantity: number
}

export interface User {
  id: string
  name: string
  email: string
}

export interface SubcategoryGroup {
  title: string
  items: string[]
}

export interface CategoryData {
  id: string
  title: string
  image: string
  subcategories: SubcategoryGroup[]
}

export interface Order {
  id: string
  date: string
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'
  total: number
  items: CartItem[]
  shippingAddress: string
}

export enum CheckoutStep {
  CART = 'CART',
  SHIPPING = 'SHIPPING',
  PAYMENT = 'PAYMENT',
  CONFIRMATION = 'CONFIRMATION',
}

export interface Message {
  id: string
  role: 'user' | 'model'
  content: string
}
