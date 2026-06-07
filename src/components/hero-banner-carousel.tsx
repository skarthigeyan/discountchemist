"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import { useState } from "react";

const HERO_BANNERS = [
  { headline: "Up to 50% Off Vitamins", sub: "Shop our biggest sale of the year on top brands", cta: "Shop Now", color: "from-green-600 to-teal-500" },
  { headline: "Beauty Deals Up to 40% Off", sub: "Premium skincare and beauty at unbeatable prices", cta: "Explore Deals", color: "from-pink-500 to-rose-400" },
  { headline: "Free Delivery Over $50", sub: "Australia-wide delivery on all pharmacy orders", cta: "Start Shopping", color: "from-blue-600 to-cyan-500" },
];

export function HeroBannerCarousel() {
  const [active, setActive] = useState(0);
  const banner = HERO_BANNERS[active];

  return (
    <div className="flex flex-col gap-3">
      <section className={`rounded-2xl bg-gradient-to-r ${banner.color} text-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6`}>
        <div className="flex flex-col gap-3">
          <Badge className="w-fit bg-white/20 hover:bg-white/20 text-white border-0">This Week Only</Badge>
          <h1 className="text-3xl md:text-4xl font-black leading-tight">{banner.headline}</h1>
          <p className="text-white/80 text-sm md:text-base max-w-sm">{banner.sub}</p>
          <Button className="w-fit mt-2 bg-white text-green-700 hover:bg-white/90 font-bold">
            {banner.cta}
          </Button>
        </div>
        <div className="h-36 w-36 rounded-full bg-white/20 flex items-center justify-center">
          <Package className="h-20 w-20 text-white/60" />
        </div>
      </section>

      <div className="flex gap-2 justify-center">
        {HERO_BANNERS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-2 rounded-full transition-all ${i === active ? "w-8 bg-green-600" : "w-2 bg-gray-300"}`}
          />
        ))}
      </div>
    </div>
  );
}
