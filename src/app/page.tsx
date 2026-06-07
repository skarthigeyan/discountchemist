"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { format } from "date-fns";
import {
  ChevronDown,
  Heart,
  Menu,
  Package,
  Phone,
  Search,
  ShoppingCart,
  Star,
  Truck,
  User,
} from "lucide-react";
import { useState } from "react";

const NAV_CATEGORIES = [
  { label: "Vitamins & Supplements", href: "#" },
  { label: "Beauty & Skincare", href: "#" },
  { label: "Baby & Kids", href: "#" },
  { label: "Health & Wellness", href: "#" },
  { label: "Personal Care", href: "#" },
  { label: "Weight Management", href: "#" },
  { label: "Sports Nutrition", href: "#" },
  { label: "Pharmacy", href: "#" },
];

const SALE_ITEMS = [
  {
    id: 1,
    name: "Blackmores Bio C 1000mg Tablets 62 Pack",
    brand: "Blackmores",
    originalPrice: 24.99,
    salePrice: 14.99,
    discountPct: 40,
    rating: 4.5,
    reviews: 128,
    image: null,
    badge: "40% OFF",
    expiryDate: new Date("2026-06-30"),
  },
  {
    id: 2,
    name: "Swisse Ultiboost Hair Skin Nails 100 Tablets",
    brand: "Swisse",
    originalPrice: 39.99,
    salePrice: 19.99,
    discountPct: 50,
    rating: 4.7,
    reviews: 245,
    image: null,
    badge: "50% OFF",
    expiryDate: new Date("2026-06-30"),
  },
  {
    id: 3,
    name: "Neutrogena Hydro Boost Water Gel 50g",
    brand: "Neutrogena",
    originalPrice: 34.99,
    salePrice: 22.49,
    discountPct: 36,
    rating: 4.6,
    reviews: 312,
    image: null,
    badge: "SALE",
    expiryDate: new Date("2026-06-25"),
  },
  {
    id: 4,
    name: "Elevit Pregnancy Multivitamin 100 Tablets",
    brand: "Elevit",
    originalPrice: 49.99,
    salePrice: 32.99,
    discountPct: 34,
    rating: 4.8,
    reviews: 189,
    image: null,
    badge: "34% OFF",
    expiryDate: new Date("2026-07-15"),
  },
  {
    id: 5,
    name: "Natio Rosehip Face Oil 50mL",
    brand: "Natio",
    originalPrice: 19.99,
    salePrice: 11.99,
    discountPct: 40,
    rating: 4.3,
    reviews: 87,
    image: null,
    badge: "40% OFF",
    expiryDate: new Date("2026-06-30"),
  },
  {
    id: 6,
    name: "Nature's Own Magnesium 500mg 200 Tablets",
    brand: "Nature's Own",
    originalPrice: 29.99,
    salePrice: 17.99,
    discountPct: 40,
    rating: 4.4,
    reviews: 156,
    image: null,
    badge: "40% OFF",
    expiryDate: new Date("2026-07-01"),
  },
  {
    id: 7,
    name: "Ego QV Gentle Wash 500mL",
    brand: "Ego QV",
    originalPrice: 14.99,
    salePrice: 9.49,
    discountPct: 37,
    rating: 4.6,
    reviews: 203,
    image: null,
    badge: "SALE",
    expiryDate: new Date("2026-06-28"),
  },
  {
    id: 8,
    name: "Faulding Melatonin 1mg 60 Tablets",
    brand: "Faulding",
    originalPrice: 16.99,
    salePrice: 10.99,
    discountPct: 35,
    rating: 4.2,
    reviews: 94,
    image: null,
    badge: "35% OFF",
    expiryDate: new Date("2026-07-10"),
  },
];

const HERO_BANNERS = [
  { headline: "Up to 50% Off Vitamins", sub: "Shop our biggest sale of the year on top brands", cta: "Shop Now", color: "from-green-600 to-teal-500" },
  { headline: "Beauty Deals Up to 40% Off", sub: "Premium skincare and beauty at unbeatable prices", cta: "Explore Deals", color: "from-pink-500 to-rose-400" },
  { headline: "Free Delivery Over $50", sub: "Australia-wide delivery on all pharmacy orders", cta: "Start Shopping", color: "from-blue-600 to-cyan-500" },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`h-3 w-3 ${s <= Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
        />
      ))}
    </div>
  );
}

function ProductCard({ item }: { item: (typeof SALE_ITEMS)[0] }) {
  return (
    <Card className="group relative flex flex-col overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <div className="relative bg-gray-50 h-44 flex items-center justify-center">
        <Package className="h-20 w-20 text-gray-300" />
        <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-500 text-white text-xs font-bold">
          {item.badge}
        </Badge>
        <button className="absolute top-2 right-2 p-1.5 rounded-full bg-white shadow hover:bg-pink-50 transition-colors">
          <Heart className="h-4 w-4 text-gray-400 group-hover:text-pink-500 transition-colors" />
        </button>
      </div>
      <CardContent className="flex flex-col flex-1 p-3 gap-2">
        <p className="text-[11px] font-semibold text-green-700 uppercase tracking-wide">{item.brand}</p>
        <p className="text-sm text-gray-800 font-medium leading-snug line-clamp-2">{item.name}</p>
        <div className="flex items-center gap-1 mt-auto">
          <StarRating rating={item.rating} />
          <span className="text-xs text-gray-500">({item.reviews})</span>
        </div>
        <p className="text-[11px] text-gray-400">
          Sale ends {format(item.expiryDate, "do MMM yyyy")}
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-gray-900">${item.salePrice.toFixed(2)}</span>
          <span className="text-sm line-through text-gray-400">${item.originalPrice.toFixed(2)}</span>
        </div>
        <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 text-white mt-1">
          <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}

export default function Home() {
  const [activeBanner, setActiveBanner] = useState(0);
  const banner = HERO_BANNERS[activeBanner];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Top utility bar */}
      <div className="bg-green-700 text-white text-xs py-1.5 px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><Truck className="h-3 w-3" /> Free delivery over $50</span>
          <span className="hidden sm:flex items-center gap-1"><Phone className="h-3 w-3" /> 1300 000 000</span>
        </div>
        <span className="hidden sm:block">Australia&apos;s Trusted Online Pharmacy</span>
      </div>

      {/* Main header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <div className="mt-6 flex flex-col gap-1">
                {NAV_CATEGORIES.map((cat) => (
                  <a
                    key={cat.label}
                    href={cat.href}
                    className="px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                  >
                    {cat.label}
                  </a>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <a href="/" className="flex items-center gap-2 shrink-0">
            <div className="h-9 w-9 rounded-full bg-green-600 flex items-center justify-center">
              <span className="text-white font-black text-sm">DC</span>
            </div>
            <div className="hidden sm:block">
              <p className="font-black text-green-700 text-lg leading-tight">Discount</p>
              <p className="font-black text-gray-500 text-xs leading-tight tracking-widest uppercase">Chemist</p>
            </div>
          </a>

          {/* Search */}
          <div className="flex-1 relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search for products, brands..."
              className="pl-9 pr-24 h-10 rounded-full border-gray-300 focus-visible:ring-green-500"
            />
            <Button size="sm" className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-green-600 hover:bg-green-700 px-4">
              Search
            </Button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 shrink-0">
            <Button variant="ghost" size="sm" className="hidden sm:flex flex-col h-auto py-1 gap-0.5">
              <User className="h-5 w-5" />
              <span className="text-[10px]">Account</span>
            </Button>
            <Button variant="ghost" size="sm" className="relative flex flex-col h-auto py-1 gap-0.5">
              <ShoppingCart className="h-5 w-5" />
              <span className="text-[10px]">Cart</span>
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-red-500 text-[10px]">
                3
              </Badge>
            </Button>
          </div>
        </div>

        {/* Category nav */}
        <nav className="hidden lg:block border-t border-gray-100 bg-green-700">
          <div className="max-w-7xl mx-auto px-4">
            <ul className="flex items-center gap-0">
              {NAV_CATEGORIES.map((cat) => (
                <li key={cat.label}>
                  <a
                    href={cat.href}
                    className="flex items-center gap-1 px-3 py-2.5 text-xs font-medium text-white hover:bg-green-800 transition-colors whitespace-nowrap"
                  >
                    {cat.label}
                    <ChevronDown className="h-3 w-3 opacity-60" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6 flex flex-col gap-8">
        {/* Hero banner */}
        <section className={`rounded-2xl bg-gradient-to-r ${banner.color} text-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6`}>
          <div className="flex flex-col gap-3">
            <Badge className="w-fit bg-white/20 hover:bg-white/20 text-white border-0">This Week Only</Badge>
            <h1 className="text-3xl md:text-4xl font-black leading-tight">{banner.headline}</h1>
            <p className="text-white/80 text-sm md:text-base max-w-sm">{banner.sub}</p>
            <Button className="w-fit mt-2 bg-white text-green-700 hover:bg-white/90 font-bold">
              {banner.cta}
            </Button>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="h-36 w-36 rounded-full bg-white/20 flex items-center justify-center">
              <Package className="h-20 w-20 text-white/60" />
            </div>
          </div>
        </section>

        {/* Banner tabs */}
        <div className="flex gap-2 justify-center">
          {HERO_BANNERS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveBanner(i)}
              className={`h-2 rounded-full transition-all ${i === activeBanner ? "w-8 bg-green-600" : "w-2 bg-gray-300"}`}
            />
          ))}
        </div>

        {/* Deals section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-black text-gray-800">Today&apos;s Best Deals</h2>
              <p className="text-sm text-gray-500">Massive savings on top pharmacy brands</p>
            </div>
            <Button variant="outline" size="sm" className="border-green-600 text-green-600 hover:bg-green-50">
              View All Deals
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
            {SALE_ITEMS.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* Category quick links */}
        <section>
          <h2 className="text-xl font-black text-gray-800 mb-4">Shop by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Vitamins & Supplements", icon: "💊", color: "bg-yellow-50 border-yellow-200 text-yellow-700" },
              { label: "Beauty & Skincare", icon: "✨", color: "bg-pink-50 border-pink-200 text-pink-700" },
              { label: "Baby & Kids", icon: "🍼", color: "bg-blue-50 border-blue-200 text-blue-700" },
              { label: "Sports Nutrition", icon: "💪", color: "bg-green-50 border-green-200 text-green-700" },
            ].map((cat) => (
              <a
                key={cat.label}
                href="#"
                className={`flex flex-col items-center gap-2 p-5 rounded-xl border ${cat.color} hover:shadow-md transition-shadow text-center`}
              >
                <span className="text-3xl">{cat.icon}</span>
                <span className="text-sm font-semibold">{cat.label}</span>
              </a>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 mt-8">
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center">
                <span className="text-white font-black text-xs">DC</span>
              </div>
              <span className="text-white font-bold">Discount Chemist</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Australia&apos;s trusted online pharmacy delivering health and wellness products at the best prices.
            </p>
          </div>
          {[
            { heading: "Shop", links: ["Vitamins", "Beauty", "Baby & Kids", "Sports Nutrition"] },
            { heading: "Help", links: ["Track Order", "Returns", "FAQ", "Contact Us"] },
            { heading: "Company", links: ["About Us", "Careers", "Privacy Policy", "Terms of Use"] },
          ].map((col) => (
            <div key={col.heading}>
              <h4 className="text-white font-semibold mb-3 text-sm">{col.heading}</h4>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-xs text-gray-400 hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Separator className="bg-gray-700" />
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <span>© 2026 Discount Chemist. All rights reserved.</span>
          <span>ABN 00 000 000 000 | Australian Registered Pharmacy</span>
        </div>
      </footer>
    </div>
  );
}
