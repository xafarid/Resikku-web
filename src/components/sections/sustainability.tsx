"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  TreePine,
  Recycle,
  Droplets,
  Leaf,
  Wind,
  Heart,
} from "lucide-react";
import { Reveal, SectionHeader, staggerContainer, staggerItem } from "@/components/reveal";

interface ImpactStat {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  desc: string;
  color: string;
  bgGradient: string;
}

const IMPACT_STATS: ImpactStat[] = [
  {
    icon: TreePine,
    value: 2400,
    suffix: "+",
    label: "Pohon Diselamatkan",
    desc: "Setiap pack mengurangi 1 botol plastik sekali pakai",
    color: "text-sage-dark",
    bgGradient: "from-sage-soft/80 to-sage/10",
  },
  {
    icon: Recycle,
    value: 18000,
    suffix: "+",
    label: "Botol Plastik Dihindari",
    desc: "Bahan fully biodegradable, zero microplastic residue",
    color: "text-sage-dark",
    bgGradient: "from-sage-soft/80 to-sage/10",
  },
  {
    icon: Wind,
    value: 850,
    suffix: " kg",
    label: "CO₂ Dikurangi",
    desc: "Produksi & distribusi rendah karbon dari bahan lokal",
    color: "text-gold-dark",
    bgGradient: "from-gold/10 to-gold-light/10",
  },
  {
    icon: Droplets,
    value: 12000,
    suffix: " L",
    label: "Air Dihemat",
    desc: "Sabun kertas membutuhkan 80% less water vs sabun cair",
    color: "text-sage-dark",
    bgGradient: "from-sage-soft/80 to-sage/10",
  },
];

/* Commitment pillars */
const PILLARS = [
  {
    icon: Leaf,
    title: "100% Biodegradable",
    desc: "Setiap lembar larut sempurna — tanpa microplastic, tanpa ampas, tanpa beban bagi bumi.",
  },
  {
    icon: Recycle,
    title: "Kemasan Daur Ulang",
    desc: "Wadah saku kami dibuat dari recycled kraft paper & cornstarch-based laminate.",
  },
  {
    icon: Heart,
    title: "Cruelty-Free",
    desc: "Tidak diuji pada hewan. Semua formula divalidasi via in-vitro dermatological testing.",
  },
];

/* Animated counter hook */
function useAnimatedCounter(target: number, duration = 2200) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || started.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4); // ease-out quartic
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

/* Single stat card */
function StatCard({ stat }: { stat: ImpactStat }) {
  const { count, ref } = useAnimatedCounter(stat.value);

  return (
    <motion.div
      variants={staggerItem}
      className={`card-rsk rounded-3xl p-6 md:p-8 text-center relative overflow-hidden group bg-gradient-to-br ${stat.bgGradient}`}
    >
      {/* Decorative ring behind icon */}
      <div
        aria-hidden
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full border-[3px] border-sage/[0.06] group-hover:border-sage/[0.12] transition-colors duration-500"
      />
      <div
        aria-hidden
        className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full border-[2px] border-gold/[0.06] group-hover:border-gold/[0.12] transition-colors duration-500"
      />

      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0.5, rotate: -10, opacity: 0 }}
          whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-sage to-sage-dark flex items-center justify-center text-cream shadow-lg shadow-sage/25 mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500"
        >
          <stat.icon className="w-7 h-7" strokeWidth={2} />
        </motion.div>

        {/* Counter */}
        <div ref={ref} className="font-heading font-extrabold text-4xl md:text-5xl text-ink leading-none mb-1">
          {count.toLocaleString("id-ID")}
          <span className="text-2xl md:text-3xl">{stat.suffix}</span>
        </div>

        {/* Label */}
        <h3 className="font-heading font-bold text-base md:text-lg text-ink mt-2 mb-1">
          {stat.label}
        </h3>
        <p className="text-xs text-ink-secondary leading-relaxed max-w-[16rem] mx-auto">
          {stat.desc}
        </p>
      </div>
    </motion.div>
  );
}

export function Sustainability() {
  return (
    <section id="sustainability" className="section-rsk relative overflow-hidden bg-gradient-to-b from-cream via-sage-soft/20 to-cream">
      {/* Decorative organic pattern */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 4px 6px at 50% 50%, hsl(145 38% 32%) 1px, transparent 0), radial-gradient(ellipse 3px 5px at 50% 50%, hsl(38 70% 54%) 0.8px, transparent 0)",
          backgroundSize: "48px 40px, 72px 56px",
          backgroundPosition: "0 0, 24px 28px",
        }}
      />

      {/* Floating decorative blobs */}
      <div aria-hidden className="absolute top-1/3 -left-24 w-72 h-72 rounded-full bg-sage/8 blur-3xl float-slow" />
      <div aria-hidden className="absolute bottom-1/3 -right-24 w-80 h-80 rounded-full bg-gold/6 blur-3xl parallax-slow" />

      <div className="container-rsk relative z-10">
        <SectionHeader
          label="Dampak Lingkungan"
          title={<>Jejak Hijau Kami</>}
          subtitle="Setiap lembar sabun kertas Resikku adalah langkah kecil menuju bumi yang lebih bersih. Lihat dampak positif yang kita ciptakan bersama."
        />

        {/* Impact stats grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {IMPACT_STATS.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </motion.div>

        {/* Commitment pillars */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {PILLARS.map((pillar) => (
            <motion.div
              key={pillar.title}
              variants={staggerItem}
              className="glass-card rounded-3xl p-6 md:p-8 group hover:border-sage/25 transition-all duration-400"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 shrink-0 rounded-2xl bg-gradient-to-br from-sage-soft to-sage/20 flex items-center justify-center text-sage-dark group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <pillar.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-ink mb-1.5">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-ink-secondary leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <Reveal delay={0.2}>
          <div className="mt-12 md:mt-16 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 glass-card rounded-2xl px-8 py-6 border border-sage/15">
              <div className="flex items-center gap-2">
                <TreePine className="w-5 h-5 text-sage" />
                <span className="font-heading font-bold text-ink">
                  1 Pack = 1 Langkah Hijau
                </span>
              </div>
              <div className="w-px h-6 bg-sage/15 hidden sm:block" />
              <p className="text-sm text-ink-secondary">
                Bergabunglah dengan <span className="font-semibold text-sage-dark">10.000+</span> keluarga yang sudah memilih kebersihan tanpa sampah.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
