"use client";

import { useState } from "react";
import {
  Check,
  X,
  Sparkles,
  Weight,
  Droplets,
  Trash2,
  Shield,
  Backpack,
  Coins,
  ChevronDown,
} from "lucide-react";
import { motion } from "framer-motion";
import { Reveal, SectionHeader, staggerContainer, staggerItem } from "@/components/reveal";

interface FeatureRow {
  feature: string;
  icon: React.ElementType;
  liquid: string;
  bar: string;
  resikku: string;
  resikkuBest?: boolean;
  liquidBad?: boolean;
  barBad?: boolean;
}

const FEATURES: FeatureRow[] = [
  {
    feature: "Bobot",
    icon: Weight,
    liquid: "200-300ml",
    bar: "100-150g",
    resikku: "15g (ultra ringan)",
    resikkuBest: true,
  },
  {
    feature: "Risiko Bocor",
    icon: Droplets,
    liquid: "Tinggi",
    bar: "Licin & kotor",
    resikku: "Nol risiko",
    liquidBad: true,
    barBad: true,
    resikkuBest: true,
  },
  {
    feature: "Sampah Plastik",
    icon: Trash2,
    liquid: "Botol plastik",
    bar: "Kemasan kertas",
    resikku: "Zero waste",
    liquidBad: true,
    resikkuBest: true,
  },
  {
    feature: "Kehigienisan",
    icon: Shield,
    liquid: "Umum (sabun umum)",
    bar: "Rendah",
    resikku: "Higienis (personal)",
    barBad: true,
    resikkuBest: true,
  },
  {
    feature: "Kemudahan Bawa",
    icon: Backpack,
    liquid: "Berat & repot",
    bar: "Cukup mudah",
    resikku: "Super ringan!",
    liquidBad: true,
    resikkuBest: true,
  },
];

/* Mobile expandable state */
function MobileFeatureCard({ row }: { row: FeatureRow }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div variants={staggerItem} className="glass-card rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <h4 className="font-heading font-bold text-base text-ink flex items-center gap-2">
          <row.icon className="w-4 h-4 text-sage shrink-0" />
          {row.feature}
        </h4>
        <button
          onClick={() => setExpanded(!expanded)}
          className="comparison-expand-btn"
          aria-label={expanded ? "Tutup detail" : "Lihat detail"}
        >
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-300 ${expanded ? "rotate-180" : ""
              }`}
          />
        </button>
      </div>
      {/* Always show Resikku (winner) on mobile */}
      <div className="mt-3 flex items-center justify-between text-sm pt-2 border-t border-sage/10">
        <span className="font-semibold text-sage-dark uppercase">RESIKKU</span>
        <span className="inline-flex items-center gap-1 font-bold text-sage-dark">
          {row.resikkuBest && <Check className="w-3 h-3 text-sage" />}
          {row.resikku}
        </span>
      </div>
      {/* Expandable details */}
      <div
        className={`overflow-hidden transition-all duration-300 ${expanded ? "max-h-40 mt-2 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="space-y-2 pt-2 border-t border-sage/10">
          <div className="flex items-center justify-between text-sm">
            <span className="text-ink-secondary">Sabun Cair</span>
            <span className="inline-flex items-center gap-1 font-medium text-ink-secondary">
              {row.liquidBad && <X className="w-3 h-3 text-destructive" />}
              {row.liquid}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-ink-secondary">Sabun Batangan</span>
            <span className="inline-flex items-center gap-1 font-medium text-ink-secondary">
              {row.barBad && <X className="w-3 h-3 text-destructive" />}
              {row.bar}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Comparison() {
  return (
    <section className="section-rsk relative overflow-hidden">
      {/* Decorative bg */}
      <div className="absolute inset-0 bg-sage-soft/30 -z-10" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-sage/5 blur-3xl -z-10" />

      <div className="container-rsk">
        <SectionHeader
          label="Perbandingan"
          title="Kenapa Pilih Sabun Kertas?"
          subtitle="Bandingkan sabun kertas Resikku dengan sabun cair dan batangan tradisional — dan temukan perbedaannya."
        />

        {/* Desktop table */}
        <Reveal delay={0.15}>
          <div className="mt-12 hidden md:block glass-card rounded-3xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="p-5 text-left font-heading font-bold text-ink text-base">
                    Fitur
                  </th>
                  <th className="p-5 text-center font-heading font-bold text-ink-secondary text-base">
                    Sabun Cair
                  </th>
                  <th className="p-5 text-center font-heading font-bold text-ink-secondary text-base">
                    Sabun Batangan
                  </th>
                  <th className="p-5 text-center relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-sage/10 to-sage/5" />
                    <span className="relative inline-flex items-center gap-1.5 font-heading font-bold text-sage-dark text-base sparkle-ring rounded-full px-3 py-1 uppercase">
                      <Sparkles className="w-4 h-4" />
                      RESIKKU
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {FEATURES.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={`border-t border-sage/8 last:border-b-0 ${i % 2 === 0 ? "bg-sage-soft/20" : ""
                      }`}
                  >
                    <td className="p-5 font-medium text-ink">
                      <span className="inline-flex items-center gap-2">
                        <row.icon className="w-4 h-4 text-sage/60 shrink-0" />
                        {row.feature}
                      </span>
                    </td>
                    <td className="p-5 text-center text-ink-secondary">
                      <span className="inline-flex items-center gap-1.5">
                        {row.liquidBad && (
                          <X className="w-3.5 h-3.5 text-destructive shrink-0" />
                        )}
                        {row.liquid}
                      </span>
                    </td>
                    <td className="p-5 text-center text-ink-secondary">
                      <span className="inline-flex items-center gap-1.5">
                        {row.barBad && (
                          <X className="w-3.5 h-3.5 text-destructive shrink-0" />
                        )}
                        {row.bar}
                      </span>
                    </td>
                    <td className="p-5 text-center relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-sage/8 to-sage/3" />
                      <span className="relative inline-flex items-center gap-1.5 font-semibold text-sage-dark">
                        {row.resikkuBest && (
                          <Check className="w-3.5 h-3.5 text-sage shrink-0" />
                        )}
                        {row.resikku}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* Mobile cards — with tap to expand */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-10 md:hidden space-y-4"
        >
          {FEATURES.map((row) => (
            <MobileFeatureCard key={row.feature} row={row} />
          ))}
        </motion.div>

        {/* Best choice badge */}
        <Reveal delay={0.3}>
          <div className="mt-10 flex justify-center">
            <div className="relative glass-card rounded-2xl px-8 py-5 text-center overflow-hidden border-2 border-sage/20">
              {/* Glow border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-sage/30 animate-pulse" />
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage text-cream text-xs font-bold tracking-wider uppercase mb-2">
                <Sparkles className="w-3 h-3" />
                Pilihan Terbaik
              </span>
              <p className="font-heading font-bold text-lg text-ink">
                Sabun Kertas Resikku mengungguli di semua aspek
              </p>
              <p className="text-sm text-ink-secondary mt-1">
                Lebih ringan, lebih higienis, lebih ramah lingkungan — dengan harga lebih terjangkau
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
