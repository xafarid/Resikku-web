"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { usePromoBanner } from "@/lib/promo-banner-store";

const MESSAGES = [
  "🎉 Gratis Ongkir untuk pesanan min. Rp 150.000",
  "🌿 100% Organik & Zero Waste",
  "⏰ Promo Terbatas — Beli 3 Gratis 1!",
];

export function PromoBanner() {
  const isBannerVisible = usePromoBanner((s) => s.isBannerVisible);
  const setBannerVisible = usePromoBanner((s) => s.setBannerVisible);

  const handleClose = useCallback(() => setBannerVisible(false), [setBannerVisible]);

  if (!isBannerVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-sage-dark text-cream">
      <div className="relative h-10 flex items-center justify-center overflow-hidden">
        <RotatingMessage />

        {/* Close button */}
        <button
          onClick={handleClose}
          aria-label="Tutup banner promosi"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center hover:bg-cream/15 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

/** Inner component so the interval resets on unmount */
function RotatingMessage() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={index}
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -24, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 flex items-center justify-center text-xs sm:text-sm font-medium tracking-wide whitespace-nowrap"
      >
        {MESSAGES[index]}
      </motion.span>
    </AnimatePresence>
  );
}
