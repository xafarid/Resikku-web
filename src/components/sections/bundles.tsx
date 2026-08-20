"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Sparkles, Timer } from "lucide-react";
import {
  Reveal,
  SectionHeader,
  staggerContainer,
  staggerItem,
} from "@/components/reveal";
import { formatPrice, getProductById } from "@/lib/products";
import { useCart } from "@/lib/cart-store";
import { toast } from "sonner";

interface BundleItem {
  id: number;
}

interface Bundle {
  productId: number;
  name: string;
  icon: string;
  description: string;
  items: BundleItem[];
  normalPrice: number;
  bundlePrice: number;
  savings: number;
  savingsPercent: number;
  badge: string;
  isPopular?: boolean;
}

const BUNDLES: Bundle[] = [
  {
    productId: 3,
    name: "Duo Varian",
    icon: "🌿",
    description: "Dapatkan dua varian produk Resikku dalam satu paket hemat.",
    items: [{ id: 1 }, { id: 2 }], // Matcha Mint + Sweet Cherry
    normalPrice: 40_000,
    bundlePrice: 25_000,
    savings: 15_000,
    savingsPercent: 38,
    badge: "Hemat Rp 15.000",
    isPopular: true,
  },
];

/* Confetti particles positions for popular bundle */
const CONFETTI_PARTICLES = [
  { top: "-8%", left: "10%", color: "bg-gold", delay: 0, size: "w-1.5 h-1.5" },
  { top: "-5%", left: "85%", color: "bg-sage-light", delay: 0.8, size: "w-2 h-2" },
  { top: "-10%", left: "50%", color: "bg-gold-dark", delay: 1.6, size: "w-1 h-1" },
  { top: "-6%", left: "30%", color: "bg-sage", delay: 2.2, size: "w-1.5 h-1.5" },
  { top: "-8%", left: "70%", color: "bg-gold", delay: 0.4, size: "w-1 h-1" },
  { top: "-12%", left: "20%", color: "bg-amber-400", delay: 1.2, size: "w-2 h-1" },
  { top: "-7%", left: "60%", color: "bg-emerald-400", delay: 2.8, size: "w-1.5 h-1.5" },
];

/* Countdown target: 7 days from now */
function getCountdownTarget() {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  d.setHours(23, 59, 59, 999);
  return d;
}

const COUNTDOWN_TARGET = getCountdownTarget().getTime();

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, COUNTDOWN_TARGET - Date.now());
      setTimeLeft({
        days: Math.floor(diff / 86_400_000),
        hours: Math.floor((diff % 86_400_000) / 3_600_000),
        minutes: Math.floor((diff % 3_600_000) / 60_000),
        seconds: Math.floor((diff % 60_000) / 1_000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return timeLeft;
}

export function Bundles() {
  const add = useCart((s) => s.add);
  const openCart = useCart((s) => s.openCart);
  const [addingId, setAddingId] = useState<number | null>(null);
  const countdown = useCountdown();

  const handleAddBundle = async (bundle: Bundle) => {
    setAddingId(bundle.productId);
    add(bundle.productId, 1);
    toast.success(`${bundle.name} ditambahkan!`, {
      description: "Semua varian paket sudah masuk keranjang",
      action: {
        label: "Lihat Keranjang",
        onClick: openCart,
      },
    });
    // Brief loading state
    setTimeout(() => setAddingId(null), 800);
  };

  return (
    <section
      id="bundles"
      className="section-rsk relative bg-gradient-to-b from-cream-warm/40 via-sage-soft/30 to-cream overflow-hidden"
    >
      {/* Decorative background */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 25%, hsl(38 70% 54%) 1.5px, transparent 0), radial-gradient(circle at 75% 75%, hsl(145 38% 32%) 1px, transparent 0)",
          backgroundSize: "48px 48px, 64px 64px",
        }}
      />

      <div className="container-rsk relative">
        <SectionHeader
          label="Bundle & Save"
          title={<>Paket Hemat</>}
          subtitle="Semakin banyak beli, semakin hemat! Nikmati penawaran eksklusif untuk setiap paket."
        />

        {/* Countdown Timer */}
        <Reveal delay={0.1}>
          <div className="mt-6 flex flex-col items-center gap-2">
            <div className="flex items-center gap-1.5 text-sm text-ink-secondary">
              <Timer className="w-4 h-4 text-gold-dark" />
              <span className="font-semibold">Promo berakhir dalam</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-center">
                <span className="countdown-digit">{countdown.days}</span>
                <span className="text-[0.625rem] text-ink-muted mt-0.5">hari</span>
              </div>
              <span className="font-heading font-bold text-ink-muted text-lg">:</span>
              <div className="flex flex-col items-center">
                <span className="countdown-digit">{countdown.hours}</span>
                <span className="text-[0.625rem] text-ink-muted mt-0.5">jam</span>
              </div>
              <span className="font-heading font-bold text-ink-muted text-lg">:</span>
              <div className="flex flex-col items-center">
                <span className="countdown-digit">{countdown.minutes}</span>
                <span className="text-[0.625rem] text-ink-muted mt-0.5">menit</span>
              </div>
              <span className="font-heading font-bold text-ink-muted text-lg">:</span>
              <div className="flex flex-col items-center">
                <span className="countdown-digit">{countdown.seconds}</span>
                <span className="text-[0.625rem] text-ink-muted mt-0.5">detik</span>
              </div>
            </div>
          </div>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-10 md:mt-14 grid grid-cols-1 gap-6 lg:gap-8 max-w-4xl mx-auto"
        >
          {BUNDLES.map((bundle) => (
            <motion.div key={bundle.name} variants={staggerItem}>
              <div
                className={`card-rsk rounded-3xl p-6 flex flex-col h-full relative overflow-hidden ${
                  bundle.isPopular
                    ? "ring-2 ring-gold/60 shadow-lg shadow-gold/15"
                    : ""
                }`}
              >
                {/* Save % circular badge */}
                <div className="save-badge">
                  <span className="text-[0.65rem] font-bold leading-none">HEMAT</span>
                  <span className="text-sm font-bold leading-none">{bundle.savingsPercent}%</span>
                </div>

                {/* Popular glow effect + Most Popular floating badge */}
                {bundle.isPopular && (
                  <>
                    <div
                      aria-hidden
                      className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-gold/20 via-transparent to-gold/10 blur-sm -z-10"
                    />
                    <div className="absolute top-0 right-0 z-10">
                      <span className="badge-bounce-anim inline-flex items-center gap-1 px-3 py-1.5 rounded-bl-2xl rounded-tr-2xl bg-gradient-to-r from-gold to-gold-dark text-white text-xs font-bold shadow-md">
                        <Sparkles className="w-3 h-3" />
                        PALING POPULER
                      </span>
                    </div>
                    {/* Confetti/sparkle particles */}
                    {CONFETTI_PARTICLES.map((p, i) => (
                      <div
                        key={i}
                        aria-hidden
                        className={`confetti-particle ${p.color} ${p.size}`}
                        style={{
                          top: p.top,
                          left: p.left,
                          animationDelay: `${p.delay}s`,
                        }}
                      />
                    ))}
                  </>
                )}

                {/* Product visual */}
                <div className="relative -mx-6 -mt-6 mb-5 h-56 overflow-hidden bg-cream-warm">
                  <img
                    src="/images/Matcha-Mint.jpeg"
                    alt="Matcha Mint"
                    className="absolute inset-y-0 left-0 h-full w-1/2 object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <img
                    src="/images/Sweet-Cheerry.jpeg"
                    alt="Sweet Cherry"
                    className="absolute inset-y-0 right-0 h-full w-1/2 object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-3">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
                        Bundle eksklusif
                      </span>
                      <h3 className="font-heading text-2xl font-bold text-white">
                        {bundle.name}
                      </h3>
                    </div>
                    <span className="text-2xl" role="img" aria-hidden>
                      {bundle.icon}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-ink-secondary leading-relaxed mb-4">
                  {bundle.description}
                </p>

                {/* Product list */}
                <div className="space-y-2 mb-5">
                  {bundle.items.map((item) => {
                    const product = getProductById(item.id);
                    if (!product) return null;
                    return (
                      <div
                        key={item.id}
                        className="px-3 py-2 rounded-xl bg-sage-soft/50"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="min-w-0">
                          <div className="text-sm font-semibold text-ink truncate">
                            {product.name}
                          </div>
                          <div className="text-xs text-ink-muted">
                            {product.scent}
                          </div>
                          </div>
                          <div className="text-xs font-medium text-ink-muted shrink-0">
                            {formatPrice(product.price)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pricing */}
                <div className="mt-auto pt-5 border-t border-sage/10">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-sm text-ink-muted line-through">
                      {formatPrice(bundle.normalPrice)}
                    </span>
                    <span className="font-heading font-bold text-2xl text-sage-dark">
                      {formatPrice(bundle.bundlePrice)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                        bundle.isPopular
                          ? "bg-gold/20 text-gold-dark"
                          : "bg-sage-soft text-sage-dark"
                      }`}
                    >
                      {bundle.isPopular && (
                        <Sparkles className="w-3 h-3" />
                      )}
                      {bundle.badge}
                    </span>
                  </div>

                  {/* Add to cart button with loading state */}
                  <button
                    onClick={() => handleAddBundle(bundle)}
                                    disabled={addingId === bundle.productId}
                    className={`w-full btn-rsk btn-shimmer disabled:opacity-70 disabled:cursor-not-allowed ${
                                      addingId === bundle.productId ? "btn-loading-shimmer" : ""
                    } ${
                      bundle.isPopular
                        ? "btn-rsk-gold"
                        : "btn-rsk-primary"
                    }`}
                  >
                    {addingId === bundle.productId ? (
                      <>
                        <ShoppingCart className="w-4 h-4 animate-pulse" />
                        <span>Menambahkan...</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        <span>Tambah Paket</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
