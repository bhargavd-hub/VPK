# VPK Marketplace — Next.js 15 + Tailwind CSS 3.4

A full-featured home improvement e-commerce platform, converted from Vite/React to **Next.js 15 App Router** with **Tailwind CSS 3.4**.

> **Note:** Next.js 16 has not been released yet. This project uses **Next.js 15.3.x**, the latest stable version with App Router architecture.

---

## Features

- 🛍️ Product catalogue with search, filter, and sort
- 🛒 Cart with quantity controls and local persistence
- 💳 Multi-step checkout (Cart → Shipping → Payment → Confirmation)
- 👤 User account with profile, orders, wishlist, and settings
- 🤖 AI Chat Assistant powered by Gemini 1.5 Flash
- 🍳 Kitchen Ranges showcase with brand filters
- 🔨 Book a Tradesperson with verified professional cards
- 🏗️ Project Builder / Inquiry form
- 📍 Showrooms page with embedded map
- ⚙️ Installer Dashboard (for logged-in tradespeople)
- 🎨 Fully responsive, accessible UI

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15.3 (App Router) |
| Styling | Tailwind CSS 3.4 |
| Language | TypeScript |
| State | React Context + localStorage |
| AI | Gemini 1.5 Flash via Route Handler |
| Icons | lucide-react |

## Project Structure

```
vpk-marketplace/
├── app/                    # App Router pages & API routes
│   ├── layout.tsx          # Root layout (Navbar, Footer, Context)
│   ├── page.tsx            # Home page
│   ├── products/           # Product list + [id] detail
│   ├── cart/               # Shopping cart
│   ├── checkout/           # Multi-step checkout
│   ├── account/            # User account tabs
│   ├── chat/               # AI assistant
│   ├── kitchen-ranges/     # Kitchen range catalogue
│   ├── book-task/          # Book a tradesperson
│   ├── build-project/      # Project inquiry
│   ├── inquire/            # General enquiry
│   ├── services/           # Services overview
│   ├── showrooms/          # Showroom locator
│   ├── installer-dashboard/# Installer portal
│   ├── login/              # Sign in
│   ├── register/           # Create account
│   ├── forgot-password/    # Password reset
│   └── api/chat/route.ts   # Gemini AI API handler
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── ui/                 # Button, Input, ProductCard, Toast
│   └── sections/           # MarqueeSection, TrustIconsBar, CareersSection
└── lib/
    ├── constants.ts        # All mock data
    ├── types.ts            # TypeScript interfaces
    └── context.tsx         # Cart / wishlist / user state
```

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment (optional — for AI chat)
```bash
cp .env.local.example .env.local
# Then edit .env.local and add your GEMINI_API_KEY
```
Get a free Gemini API key at https://aistudio.google.com/app/apikey

### 3. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production
```bash
npm run build
npm start
```

## Pages & Routes

| Route | Page |
|---|---|
| `/` | Home |
| `/products` | Product list |
| `/products/[id]` | Product detail |
| `/cart` | Shopping cart |
| `/checkout` | Checkout wizard |
| `/account` | User account |
| `/chat` | AI assistant |
| `/kitchen-ranges` | Kitchen catalogue |
| `/book-task` | Book a tradesperson |
| `/build-project` | Project inquiry |
| `/inquire` | General enquiry |
| `/services` | Services overview |
| `/showrooms` | Showroom locations |
| `/installer-dashboard` | Installer portal |
| `/login` | Sign in |
| `/register` | Create account |
| `/forgot-password` | Password reset |
| `/api/chat` | POST: Gemini AI route |

## Brand Colours

| Name | Hex |
|---|---|
| brand-orange | `#C25E28` |
| brand-offBlack | `#302D2A` |
| brand-offWhite | `#F7F5F2` |

## Demo Credentials

Any email address and any password will log you in (mock authentication for demo purposes).
