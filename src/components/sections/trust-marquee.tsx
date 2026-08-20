"use client";

import { Leaf, Award, ShieldCheck, Recycle, Rabbit, Droplet, Star, BadgeCheck } from "lucide-react";

const BADGES = [
  { icon: Leaf, label: "100% Organik", sub: "Ekstrak Botani Murni" },
  { icon: Recycle, label: "Zero Waste", sub: "Biodegradable Penuh" },
  { icon: ShieldCheck, label: "BPOM Certified", sub: "Teruji Dermatologis" },
  { icon: Rabbit, label: "Cruelty-Free", sub: "Bebas Uji Hewan" },
  { icon: Droplet, label: "Bebas SLS", sub: "Bebas Paraben" },
  { icon: Award, label: "ISO 9001", sub: "Kualitas Premium" },
  { icon: BadgeCheck, label: "Halal MUI", sub: "Sertifikasi Resmi" },
  { icon: Star, label: "4.9/5 Rating", sub: "500+ Ulasan" },
];

export function TrustMarquee() {
  // Duplicate list for seamless marquee loop
  const items = [...BADGES, ...BADGES];

  return (
    <section
      aria-label="Sertifikasi & Kepercayaan"
      className="relative py-6 md:py-8 overflow-hidden border-y border-sage/10 bg-gradient-to-r from-cream via-sage-soft/30 to-cream"
    >
      {/* Edge fade overlays */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-24 md:w-40 z-10 pointer-events-none bg-gradient-to-r from-cream to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 w-24 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-cream to-transparent"
      />

      <div className="relative flex overflow-hidden">
        <div className="flex shrink-0 items-center gap-3 md:gap-5 animate-marquee-rsk whitespace-nowrap">
          {items.map((b, i) => (
            <div
              key={`${b.label}-${i}`}
              className="inline-flex items-center gap-2.5 px-4 md:px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-sm border border-sage/10 shadow-sm shrink-0"
            >
              <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-sage-soft to-sage/10 flex items-center justify-center text-sage-dark shrink-0">
                <b.icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </span>
              <div className="leading-none text-left">
                <div className="font-heading font-bold text-xs md:text-sm text-ink whitespace-nowrap">
                  {b.label}
                </div>
                <div className="text-[0.6rem] md:text-[0.65rem] text-ink-muted whitespace-nowrap mt-0.5">
                  {b.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Duplicate track for seamless loop */}
        <div
          aria-hidden
          className="flex shrink-0 items-center gap-3 md:gap-5 animate-marquee-rsk whitespace-nowrap"
        >
          {items.map((b, i) => (
            <div
              key={`dup-${b.label}-${i}`}
              className="inline-flex items-center gap-2.5 px-4 md:px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-sm border border-sage/10 shadow-sm shrink-0"
            >
              <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-sage-soft to-sage/10 flex items-center justify-center text-sage-dark shrink-0">
                <b.icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </span>
              <div className="leading-none text-left">
                <div className="font-heading font-bold text-xs md:text-sm text-ink whitespace-nowrap">
                  {b.label}
                </div>
                <div className="text-[0.6rem] md:text-[0.65rem] text-ink-muted whitespace-nowrap mt-0.5">
                  {b.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
