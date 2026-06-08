import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { HeroBannerCarousel } from "@/components/hero-banner-carousel";
import { NavCategoryBar } from "@/components/nav-category-bar";
import { NAV_CATEGORIES } from "@/data/nav-categories";
import { getSaleProducts, type SaleProduct } from "@/data/products";
import {
  Heart,
  Menu,
  Package,
  Phone,
  Search,
  ShoppingCart,
  Truck,
  User,
} from "lucide-react";


function discountBadge(price: string, compareAtPrice: string | null): string {
  if (!compareAtPrice) return "SALE";
  const pct = Math.round((1 - parseFloat(price) / parseFloat(compareAtPrice)) * 100);
  return `${pct}% OFF`;
}

function ProductCard({ item }: { item: SaleProduct }) {
  const badge = discountBadge(item.price, item.compareAtPrice);

  return (
    <Card className="group relative flex flex-col overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <div className="relative bg-gray-50 h-44 flex items-center justify-center">
        <Package className="h-20 w-20 text-gray-300" />
        <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-500 text-white text-xs font-bold">
          {badge}
        </Badge>
        <button className="absolute top-2 right-2 p-1.5 rounded-full bg-white shadow hover:bg-pink-50 transition-colors">
          <Heart className="h-4 w-4 text-gray-400 group-hover:text-pink-500 transition-colors" />
        </button>
      </div>
      <CardContent className="flex flex-col flex-1 p-3 gap-2">
        {item.categoryName && (
          <p className="text-[11px] font-semibold text-green-700 uppercase tracking-wide">{item.categoryName}</p>
        )}
        <p className="text-sm text-gray-800 font-medium leading-snug line-clamp-2">{item.name}</p>
        <div className="flex items-baseline gap-2 mt-auto">
          <span className="text-lg font-bold text-gray-900">${parseFloat(item.price).toFixed(2)}</span>
          {item.compareAtPrice && (
            <span className="text-sm line-through text-gray-400">${parseFloat(item.compareAtPrice).toFixed(2)}</span>
          )}
        </div>
        <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 text-white mt-1">
          <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}

export default async function Home() {
  const saleProducts = await getSaleProducts();

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
                    href="#"
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

        <NavCategoryBar />
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6 flex flex-col gap-8">
        <HeroBannerCarousel />

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
          {saleProducts.length === 0 ? (
            <p className="text-sm text-gray-500">No deals available right now. Check back soon.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
              {saleProducts.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </div>
          )}
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
