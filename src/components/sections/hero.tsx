"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Droplets, ShieldCheck, ArrowRight, BookOpen } from "lucide-react";

const FEATURES = [
  { icon: Sparkles, label: "100% Ramah Lingkungan" },
  { icon: Droplets, label: "Larut < 5 Detik" },
  { icon: ShieldCheck, label: "Aman Kulit Sensitif" },
];


export function Hero() {

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-x-hidden overflow-y-hidden pt-24"
    >
      {/* Video background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster=""
        >
          <source src="/videos/background_home.mp4" type="video/mp4" />
          <source src="/videos/background_home.mov" type="video/quicktime" />
        </video>
        <div className="hero-video-overlay" />
      </div>

      {/* Floating decorative blobs */}
      <motion.div
        aria-hidden
        className="absolute top-1/4 -left-32 w-72 h-72 rounded-full bg-transparent blur-[140px] opacity-0"
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-transparent blur-[160px] opacity-0 parallax-slow"
        animate={{ y: [0, 40, 0], x: [0, -25, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] rounded-full bg-white/0 blur-[180px] opacity-0"
      />

      {/* Content */}
      <div className="container-rsk relative z-10 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[min(92vw,56rem)] mx-auto glass-card rounded-[2rem] p-5 sm:p-7 md:p-9 lg:p-12 text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sage-soft/80 backdrop-blur-sm border border-sage/15 mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
            </span>
            <span className="text-xs font-bold tracking-[0.16em] uppercase text-sage-dark">
              100% Organik • Zero Waste Paper Soap
            </span>
          </motion.div>

          {/* Title */}
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ink leading-[1.1] tracking-tight">
            Cuci Tangan Praktis dalam{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-gold via-gold-dark to-gold bg-clip-text text-transparent">
                Selembar Kertas
              </span>
              <svg
                aria-hidden
                viewBox="0 0 300 12"
                className="absolute -bottom-1 left-0 w-full text-gold/40"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 8 Q 75 2 150 6 T 298 5"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 font-heading font-semibold text-base md:text-lg text-sage-dark"
          >
            MBG Friendly • Traveling • Hiking & Outdoor Activity
          </motion.h3>

          <p className="mt-3 text-sm md:text-base text-ink-secondary max-w-xl mx-auto leading-relaxed">
            Higienis di mana saja, kapan saja. Sabun kertas organik yang lembut
            di kulit dan ramah lingkungan — <span className="font-semibold text-ink">larut dalam 5 detik</span>.
          </p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center"
          >
            <a
              href="#products"
              className="btn-rsk btn-rsk-primary btn-shimmer glow-pulse group px-8 py-4 text-base shadow-xl shadow-sage/20"
            >
              <span>Cek Koleksi</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#how-it-works" className="btn-rsk btn-rsk-secondary group px-6 py-4 text-base shadow-lg shadow-sage/10">
              <BookOpen className="w-4 h-4" />
              <span>Cara Pakai</span>
            </a>
          </motion.div>

          {/* Trust badges with glass-card background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-8 glass-light rounded-2xl p-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
          >
            {FEATURES.map((feat) => (
              <div
                key={feat.label}
                className="flex items-center gap-2 text-xs md:text-sm font-medium text-ink-secondary"
              >
                <feat.icon className="w-4 h-4 text-sage" />
                <span>{feat.label}</span>
              </div>
            ))}
          </motion.div>


        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[0.625rem] font-medium tracking-[0.2em] uppercase text-ink-muted">
          Gulir untuk eksplorasi
        </span>
        <div className="scroll-line-anim" />
      </motion.div>
    </section>
  );
}
