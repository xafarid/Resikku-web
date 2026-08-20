"use client";

import { motion } from "framer-motion";
import { FileText, Droplet, HandMetal, CheckCircle2, ArrowRight, ShoppingBag } from "lucide-react";
import { Reveal, SectionHeader, staggerContainer, staggerItem } from "@/components/reveal";

const STEPS = [
  {
    number: "01",
    icon: FileText,
    title: "Ambil 1 Lembar",
    desc: "Buka wadah saku kedap air dan ambil satu lembar sabun kertas dengan jari yang kering.",
  },
  {
    number: "02",
    icon: Droplet,
    title: "Basahi Air",
    desc: "Teteskan sedikit air bersih ke atas telapak tangan dan tempelkan lembaran sabun kertas.",
  },
  {
    number: "03",
    icon: HandMetal,
    title: "Gosok Berbusa",
    desc: "Gosok kedua telapak tangan selama 20 detik hingga menghasilkan busa lembut melimpah.",
  },
  {
    number: "04",
    icon: CheckCircle2,
    title: "Bilas Bersih",
    desc: "Bilas dengan air mengalir. 100% larut tanpa meninggalkan ampas atau residu plastik."
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section-rsk relative">
      {/* Decorative background */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, hsl(145 38% 32%) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Soft decorative blobs */}
      <div
        aria-hidden
        className="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-sage/8 blur-3xl -z-10 parallax-slow"
      />
      <div
        aria-hidden
        className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-gold/8 blur-3xl -z-10 float-slow"
      />

      <div className="container-rsk">
        <SectionHeader
          label="Praktis & Higienis"
          title={<>4 Langkah Mudah Menggunakan Sabun Kertas</>}
          subtitle="Dapatkan busa melimpah dan kebersihan higienis di mana saja tanpa repot membawa botol cair."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 md:mt-16 relative"
        >
          {/* Vertical connecting line for mobile (dotted sage) */}
          <div
            aria-hidden
            className="absolute left-[2.25rem] top-0 bottom-0 w-px border-l-2 border-dashed border-sage/20 hidden sm:hidden lg:hidden"
            style={{ left: "calc(1.5rem + 24px)" }}
          />

          <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4 lg:gap-5">
            {STEPS.map((step, idx) => (
              <motion.div
                key={step.number}
                variants={staggerItem}
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="card-rsk rounded-2xl p-2.5 sm:p-4 lg:p-6 group relative overflow-hidden"
              >
                {/* Decorative number — faded, behind content */}
                <span
                  aria-hidden
                  className="absolute -top-2 -right-1 font-heading font-extrabold text-[5rem] leading-none text-sage/[0.06] group-hover:text-sage/[0.10] transition-colors select-none"
                >
                  {step.number}
                </span>

                <div className="relative z-10">
                  {/* Step number badge (circle) */}
                  <div className="flex items-center gap-2 mb-2 sm:mb-3 lg:mb-4">
                    <span className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 rounded-full bg-gradient-to-br from-sage to-sage-dark text-cream text-[9px] sm:text-[10px] lg:text-xs font-bold flex items-center justify-center shadow-md shadow-sage/20">
                      {step.number}
                    </span>
                    {/* Mobile connecting dot */}
                    {idx < STEPS.length - 1 && (
                      <span
                        aria-hidden
                        className="sm:hidden lg:hidden flex-1 h-px border-t-2 border-dashed border-sage/20"
                      />
                    )}
                  </div>



                  <h3 className="font-heading font-bold text-[0.95rem] sm:text-base lg:text-lg text-ink mb-1.5 lg:mb-2 text-center leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs lg:text-sm text-ink-secondary leading-4 sm:leading-5 lg:leading-6 text-center">
                    {step.desc}
                  </p>

                  <div className="mt-2 lg:mt-4 flex justify-center">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 lg:px-2.5 lg:py-1 rounded-full bg-sage-soft text-sage-dark text-[8px] sm:text-[9px] lg:text-[10px] font-semibold">
                      </span>
                  </div>
                </div>

                {/* Connecting arrow for desktop */}
                {step.number !== "04" && (
                  <div
                    aria-hidden
                    className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-sage/40 to-transparent z-20"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA after steps */}
        <Reveal>
          <div className="mt-12 md:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
            <p className="text-sm text-ink-secondary text-center sm:text-left">
              Siap merasakan kepraktisan sabun kertas Resikku?
            </p>
            <a
              href="#products"
              className="btn-rsk btn-rsk-primary btn-shimmer group"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Lihat Katalog Produk</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
