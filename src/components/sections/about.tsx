"use client";

import { motion, type Variants } from "framer-motion";
import {
  Layers,
  Leaf,
  Timer,
  Package,
  ShieldCheck,
  Baby,
  Recycle,
  Droplets,
  Award,
  BadgeCheck,
} from "lucide-react";
import { Reveal, SectionHeader, staggerContainer, staggerItem } from "@/components/reveal";

const SPECS = [
  {
    icon: Layers,
    title: "Ketebalan 0.2 mm",
    desc: "Lembaran ultra-tipis yang dirancang presisi",
  },
  {
    icon: Leaf,
    title: "100% Ekstrak Botani",
    desc: "Minyak esensial murni tanpa paraben & SLS",
  },
  {
    icon: Timer,
    title: "Daya Larut < 5 Detik",
    desc: "Langsung lumer saat terkena air tanpa gumpalan",
  },
  {
    icon: Package,
    title: "Berat 15 Gram",
    desc: "Mudah diselipkan di saku, dompet, atau pouch",
  },
];

const VALUES = [
  {
    icon: Leaf,
    title: "100% Alami",
    desc: "Ekstrak tumbuhan organik yang lembut di kulit",
  },
  {
    icon: Baby,
    title: "Hypoallergenic",
    desc: "Aman untuk kulit sensitif, anak-anak, hingga bayi",
  },
  {
    icon: Recycle,
    title: "Zero Residue",
    desc: "Larut sempurna tanpa ampas atau sampah plastik",
  },
  {
    icon: Droplets,
    title: "Anti Bocor",
    desc: "Bebas cemas dari cairan tumpah di dalam tas travel",
  },
];

/* Custom stagger variants with increasing delays for values cards */
const staggerContainerDelayed: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const staggerItemDelayed: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export function About() {
  return (
    <section id="about" className="section-rsk relative">
      <div className="container-rsk">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Specs card with animated border gradient */}
          <Reveal y={40}>
            <div className="relative">
              {/* Soft premium border animation */}
              <div className="absolute -inset-[1px] rounded-[calc(1.5rem+1px)] bg-gradient-to-r from-sage/20 via-gold/15 to-sage/20 opacity-80 blur-[1px]" />
              <motion.div
                aria-hidden
                initial={{ rotate: 0, opacity: 0.45 }}
                whileInView={{ rotate: 360, opacity: 0.8 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 24, ease: "linear", repeat: Infinity, repeatType: "loop" }}
                className="absolute -inset-[2px] rounded-[calc(1.5rem+2px)]"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0deg, hsl(145 38% 32% / 0.25) 90deg, transparent 180deg, hsl(38 70% 54% / 0.2) 270deg, transparent 360deg)",
                  filter: "blur(10px)",
                }}
              />

              <div className="glass-card rounded-3xl p-6 md:p-8 relative">
                <div className="flex items-center gap-3 mb-5">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sage text-cream text-xs font-bold tracking-wider uppercase">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Spesifikasi Premium
                  </span>
                </div>
                <h3 className="font-heading font-bold text-2xl md:text-3xl text-ink mb-6">
                  Anatomi Sabun Kertas Resikku
                </h3>

                <div className="grid sm:grid-cols-2 gap-3">
                  {SPECS.map((spec) => (
                    <div
                      key={spec.title}
                      className="flex items-start gap-3 p-3 rounded-2xl bg-cream-warm/60 hover:bg-sage-soft transition-colors"
                    >
                      <div className="w-9 h-9 shrink-0 rounded-xl bg-sage-soft text-sage-dark flex items-center justify-center">
                        <spec.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-heading font-bold text-sm text-ink leading-tight">
                          {spec.title}
                        </div>
                        <div className="text-xs text-ink-secondary mt-0.5 leading-snug">
                          {spec.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-sage to-sage-dark text-cream flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 shrink-0" />
                  <span className="text-sm font-medium leading-snug">
                    Telah Teruji Secara Dermatologis & Ramah Lingkungan
                  </span>
                </div>

                {/* Certificate badges */}
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <span className="cert-badge">
                    <BadgeCheck className="w-4 h-4 text-sage" />
                    Dermatologically Tested
                  </span>
                  <span className="cert-badge">
                    <Award className="w-4 h-4 text-gold" />
                    Sertifikasi BPOM
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right: Story + values */}
          <div>
            <Reveal>
              <span className="section-label">Filosofi Kami</span>
              <h2 className="mt-4 font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-ink tracking-tight leading-[1.15]">
                Inovasi Bersih Tanpa Sampah Plastik
              </h2>
              <p className="mt-5 text-sm md:text-base text-ink-secondary leading-relaxed">
                Resikku Essentials diciptakan untuk menjawab keresahan kita saat
                bepergian: sabun cair yang rentan bocor, sabun batangan yang
                licin &amp; kotor, serta botol plastik sekali pakai yang
                mencemari bumi.
              </p>
              <p className="mt-3 text-sm md:text-base text-ink-secondary leading-relaxed">
                Setiap lembar sabun kertas kami dibuat dengan teknologi
                enkapsulasi busa alami. Cukup selembar untuk sekali cuci tangan
                atau mandi yang segar, higienis, dan 100% biodegradable.
              </p>
            </Reveal>

            <motion.div
              variants={staggerContainerDelayed}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="mt-8 grid sm:grid-cols-2 gap-4"
            >
              {VALUES.map((v, idx) => (
                <motion.div
                  key={v.title}
                  variants={staggerItemDelayed}
                  custom={idx}
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="group p-4 rounded-2xl bg-cream-warm/50 hover:bg-sage-soft border border-sage/8 hover:border-sage/20 transition-colors"
                  style={{
                    transitionDelay: `${idx * 50}ms`,
                  }}
                >
                  <div className="w-10 h-10 rounded-xl bg-sage text-cream flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <v.icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-heading font-bold text-base text-ink mb-1">
                    {v.title}
                  </h4>
                  <p className="text-xs text-ink-secondary leading-relaxed">
                    {v.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
