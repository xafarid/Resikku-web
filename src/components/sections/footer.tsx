"use client";

import { useState, useEffect, useRef } from "react";
import {
  Instagram,
  MessageCircle,
  Music2,
  Send,
  Loader2,
  Truck,
  Leaf,
  ShieldCheck,
  Lock,
  Mail,
  Award,
  CheckCircle2,
} from "lucide-react";
import { ResikkuLogoMark } from "@/components/product-icon";
import { toast } from "sonner";

const FOOTER_MENU = [
  { label: "Beranda", href: "#hero" },
  { label: "Produk", href: "#products" },
  { label: "Tentang Kami", href: "#about" },
  { label: "Ulasan", href: "#testimonials" },
];

const FOOTER_INFO = [
  { label: "Cara Pakai", href: "#how-it-works" },
  { label: "FAQ", href: "#" },
  { label: "Kebijakan Privasi", href: "#" },
  { label: "Hubungi Kami", href: "#" },
];

const KEUNGGULAN = [
  { icon: Truck, text: "Gratis Ongkir min. 150K" },
  { icon: Leaf, text: "100% Organik & Natural" },
  { icon: ShieldCheck, text: "Garansi Kepuasan" },
  { icon: Lock, text: "Pembayaran Aman" },
];

const PAYMENT_METHODS = ["Bank Transfer", "COD", "QRIS"];

/* Trusted by partner logos — colored circles with initials */
const TRUSTED_PARTNERS = [
  { initials: "MBG", bg: "bg-emerald-600", desc: "MUI Besih Halal" },
  { initials: "BPOM", bg: "bg-blue-700", desc: "BPOM RI" },
  { initials: "Halal", bg: "bg-green-600", desc: "Halal Certified" },
  { initials: "Eco", bg: "bg-teal-600", desc: "EcoCert" },
  { initials: "Der", bg: "bg-rose-600", desc: "Dermatologically Tested" },
];

/* Certification badges */
const CERTIFICATIONS = [
  { label: "ISO 9001", icon: Award },
  { label: "GMP Certified", icon: CheckCircle2 },
  { label: "Cruelty-Free", icon: Leaf },
];

/* Floating leaves config */
const LEAF_POSITIONS = [
  { left: "15%", delay: 0 },
  { left: "45%", delay: 1.5 },
  { left: "75%", delay: 3 },
  { left: "90%", delay: 4.5 },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [leavesVisible, setLeavesVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  /* Scroll-triggered leaf float */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLeavesVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal");
      toast.success("Berhasil berlangganan!", {
        description:
          "Kamu akan mungkin info produk terbaru & promo eksklusif.",
      });
      setEmail("");
    } catch (err) {
      toast.error("Gagal berlangganan", {
        description: err instanceof Error ? err.message : "Coba lagi nanti.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer ref={footerRef} className="mt-auto relative bg-sage-dark text-cream pt-16 pb-8 overflow-hidden">
      {/* Animated wave at top */}
      <div aria-hidden className="absolute top-0 left-0 right-0 -translate-y-[95%]">
        <svg
          viewBox="0 0 1200 48"
          preserveAspectRatio="none"
          className="w-full h-8 md:h-12"
        >
          <path
            d="M0,24 C200,8 400,40 600,24 C800,8 1000,40 1200,24 L1200,48 L0,48 Z"
            fill="hsl(145 45% 18%)"
            className="footer-wave"
          />
        </svg>
      </div>

      {/* Top gradient border */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sage via-gold to-sage"
      />

      {/* Decorative leaves */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, hsl(145 38% 60%) 1px, transparent 0), radial-gradient(circle at 80% 70%, hsl(38 70% 60%) 1px, transparent 0)",
          backgroundSize: "40px 40px, 60px 60px",
        }}
      />

      {/* Floating leaf decorations on scroll */}
      {leavesVisible &&
        LEAF_POSITIONS.map((pos, i) => (
          <div
            key={i}
            aria-hidden
            className="absolute bottom-12 pointer-events-none"
            style={{ left: pos.left, animationDelay: `${pos.delay}s` }}
          >
            <Leaf
              className="w-5 h-5 text-sage-light/40 leaf-float-up"
              style={{ animationDelay: `${pos.delay}s` }}
            />
          </div>
        ))}

      <div className="container-rsk relative">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1.4fr] gap-8 md:gap-10 lg:items-start">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <ResikkuLogoMark className="w-9 h-9 text-gold" />
              <div className="leading-none">
                <div className="font-heading font-bold text-lg text-cream uppercase">
                  RESIKKU
                </div>
                <div className="text-[0.625rem] font-medium text-cream/60 tracking-[0.18em] uppercase">
                  Essentials
                </div>
              </div>
            </div>
            <p className="text-sm text-cream/70 leading-relaxed">
              Sabun kertas organik premium untuk kebersihan keluarga. Praktis,
              higienis, dan ramah lingkungan.
            </p>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-gold mb-4">
              Info
            </h4>
            <ul className="space-y-2.5">
              {FOOTER_INFO.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-cream/75 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Newsletter — more prominent with envelope icon */}
          <div className="lg:col-span-1 w-full lg:justify-self-end">
            <div className="w-full max-w-[24rem] rounded-2xl bg-cream/5 border border-cream/10 p-5 -m-1">
              <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-gold mb-3">
                Newsletter
              </h4>
              <p className="text-sm text-cream/70 leading-relaxed mb-3">
                Dapatkan info produk terbaru &amp; promo eksklusif langsung ke
                email kamu.
              </p>
              <form onSubmit={handleNewsletter} className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/40 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email kamu..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-full bg-cream/10 backdrop-blur-sm border border-cream/20 text-cream placeholder:text-cream/40 text-sm focus:outline-none focus:ring-2 focus:ring-gold/60 focus:border-transparent transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-rsk btn-rsk-gold disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  <span>{loading ? "Mengirim..." : "Kirim"}</span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Payment methods */}
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <span className="text-xs text-cream/50 font-medium uppercase tracking-wider">
            Pembayaran:
          </span>
          {PAYMENT_METHODS.map((method) => (
            <span
              key={method}
              className="px-3 py-1.5 rounded-full bg-cream/8 border border-cream/12 text-xs font-medium text-cream/70"
            >
              {method}
            </span>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-cream/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cream/60">
            &copy; {new Date().getFullYear()} Resikku Essentials. All rights
            reserved.
          </p>
          <p className="text-xs text-cream/50">
            Dibuat oleh @amfaarid di Kediri, Indonesia • Est. 2026
          </p>
          {/* Social media with brand-colored hover */}
          <div className="flex items-center gap-2">
            <a
              href="#"
              aria-label="Instagram"
              className="social-ig w-9 h-9 rounded-full bg-cream/10 flex items-center justify-center text-cream/80"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/6285185976414"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="social-wa w-9 h-9 rounded-full bg-cream/10 flex items-center justify-center text-cream/80"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <a
              href="#"
              aria-label="TikTok"
              className="social-tt w-9 h-9 rounded-full bg-cream/10 flex items-center justify-center text-cream/80"
            >
              <Music2 className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
