"use client";

import { Star, Quote, BadgeCheck } from "lucide-react";
import { SectionHeader, Reveal } from "@/components/reveal";
import { getLatestTestimonials } from "@/lib/testimonials-static";

const AVATAR_COLORS = [
  "from-sage to-sage-dark",
  "from-gold to-gold-dark",
  "from-purple-500 to-purple-700",
  "from-rose-400 to-rose-600",
  "from-teal-500 to-teal-700",
  "from-amber-500 to-orange-600",
];

/* Which testimonials get "Verified Purchase" badge */
const VERIFIED_IDS = new Set([1, 3, 4, 6]);

/* Rating distribution */
const RATING_DIST = [
  { stars: 5, pct: 89 },
  { stars: 4, pct: 8 },
  { stars: 3, pct: 2 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 0 },
];

export function Testimonials() {
  // Get testimonials from static data (no database)
  const testimonials = getLatestTestimonials(12);
  // Duplicate list for seamless marquee loop
  const loop = [...testimonials, ...testimonials];

  return (
    <section
      id="testimonials"
      className="section-rsk relative overflow-hidden bg-gradient-to-b from-cream via-sage-soft/30 to-cream"
    >
      {/* Decorative blobs */}
      <div
        aria-hidden
        className="absolute top-1/4 -right-20 w-72 h-72 rounded-full bg-gold/10 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute bottom-1/4 -left-20 w-80 h-80 rounded-full bg-sage/8 blur-3xl float-slow"
      />

      {/* Organic leaf-like dot pattern */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 3px 5px at 50% 50%, hsl(145 38% 32%) 1px, transparent 0), radial-gradient(ellipse 2px 4px at 50% 50%, hsl(38 70% 54%) 0.8px, transparent 0)",
          backgroundSize: "56px 48px, 80px 72px",
          backgroundPosition: "0 0, 28px 36px",
        }}
      />

      <div className="container-rsk relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionHeader
            label="Ulasan Pelanggan"
            title={<>Apa Kata Mereka</>}
            subtitle="Ribuan keluarga sudah merasakan manfaat sabun kertas Resikku."
          />
        </div>

        {/* Star Rating Summary */}
        <Reveal delay={0.1}>
          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-10 glass-card rounded-2xl p-5 md:p-6 max-w-xl mx-auto">
            {/* Big rating */}
            <div className="text-center shrink-0">
              <div className="font-heading font-bold text-5xl text-ink leading-none">
                4.9
              </div>
              <div className="flex items-center gap-0.5 mt-1.5 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-gold text-gold"
                  />
                ))}
              </div>
              <div className="text-xs text-ink-muted mt-1">
                dari 500+ ulasan
              </div>
            </div>
            {/* Distribution bars */}
            <div className="flex-1 w-full space-y-1.5">
              {RATING_DIST.map((r) => (
                <div key={r.stars} className="flex items-center gap-2">
                  <span className="text-xs font-medium text-ink-secondary w-4 text-right">
                    {r.stars}
                  </span>
                  <Star className="w-3 h-3 fill-gold text-gold shrink-0" />
                  <div className="flex-1 h-2.5 rounded-full bg-sage-soft/60 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-gold to-gold-dark transition-all duration-700"
                      style={{ width: `${r.pct}%` }}
                    />
                  </div>
                  <span className="text-xs text-ink-muted w-8 text-right">
                    {r.pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Marquee */}
      <div className="relative mt-12 md:mt-16">
        {/* Edge fades — more prominent */}
        <div className="absolute inset-y-0 left-0 w-32 md:w-52 bg-gradient-to-r from-cream via-cream/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 md:w-52 bg-gradient-to-l from-cream via-cream/80 to-transparent z-10 pointer-events-none" />

        <div className="marquee-track">
          {loop.map((t, idx) => (
            <article
              key={`${t.id}-${idx}`}
              className="group w-[300px] md:w-[380px] shrink-0 card-rsk card-tilt rounded-3xl p-6 flex flex-col gap-4 relative overflow-hidden"
            >
              {/* Quote icon watermark */}
              <Quote
                aria-hidden
                className="absolute -top-2 -right-2 w-20 h-20 text-sage/[0.06] rotate-6 pointer-events-none select-none"
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-full bg-gradient-to-br ${AVATAR_COLORS[idx % AVATAR_COLORS.length]} flex items-center justify-center text-white font-heading font-bold text-lg shadow-md`}
                  >
                    {t.initial}
                  </div>
                  <div>
                    <div className="font-heading font-bold text-sm text-ink">
                      {t.name}
                    </div>
                    <div className="text-xs text-ink-muted">{t.role}</div>
                  </div>
                </div>
                <Quote className="w-6 h-6 text-sage/30" />
              </div>

              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i < t.rating ? "fill-gold text-gold" : "text-ink-muted/30"
                      }`}
                  />
                ))}
              </div>

              <p className="text-sm text-ink-secondary leading-7">
                {t.text}
              </p>

              {/* Verified Purchase badge */}
              {VERIFIED_IDS.has(t.id) && (
                <div className="flex items-center gap-1.5 text-xs font-semibold text-sage-dark/80">
                  <BadgeCheck className="w-4 h-4 text-sage" />
                  <span>Pembelian Terverifikasi</span>
                </div>
              )}

              {/* 3D tilt shine overlay on hover */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%)",
                }}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
