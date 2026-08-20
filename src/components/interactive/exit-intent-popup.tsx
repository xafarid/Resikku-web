"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Mail,
  Gift,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

const STORAGE_KEY = "resikku-exit-intent-shown";
const COOLDOWN_MS = 1000 * 60 * 60 * 24; // 24h cooldown

export function ExitIntentPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const shownRef = useRef(false);

  useEffect(() => {
    // Check if user already submitted/saw the popup recently
    try {
      const last = localStorage.getItem(STORAGE_KEY);
      if (last && Date.now() - parseInt(last, 10) < COOLDOWN_MS) {
        shownRef.current = true;
        return;
      }
    } catch {
      // localStorage unavailable
    }

    // Trigger on exit-intent: mouse leaves viewport through the top
    const handleMouseOut = (e: MouseEvent) => {
      if (shownRef.current) return;
      if (e.clientY <= 0 && !e.relatedTarget) {
        // Also require user to be on page for >3s
        setOpen(true);
        try {
          localStorage.setItem(STORAGE_KEY, String(Date.now()));
        } catch {
          // ignore
        }
        shownRef.current = true;
      }
    };

    // Fallback trigger: after 60s if no exit-intent
    const fallbackTimer = setTimeout(() => {
      if (!shownRef.current) {
        // Only trigger fallback if user has scrolled significantly (engaged)
        if (window.scrollY > 400) {
          setOpen(true);
          try {
            localStorage.setItem(STORAGE_KEY, String(Date.now()));
          } catch {
            // ignore
          }
          shownRef.current = true;
        }
      }
    }, 60000);

    // Also trigger on mobile when page becomes hidden (user switched tab)
    const handleVisibility = () => {
      if (shownRef.current) return;
      if (document.visibilityState === "hidden") {
        try {
          localStorage.setItem(STORAGE_KEY, String(Date.now()));
        } catch {
          // ignore
        }
        shownRef.current = true;
      }
    };

    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("visibilitychange", handleVisibility);
      clearTimeout(fallbackTimer);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Email tidak valid");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "exit-intent" }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("done");
        toast.success("Kode voucher dikirim ke email kamu!", {
          description: "Cek inbox (dan folder spam) untuk kode 10% off",
        });
        // Auto-close after 3s
        setTimeout(() => {
          setOpen(false);
          setStatus("idle");
          setEmail("");
        }, 3000);
      } else {
        toast.error(data.error || "Gagal subscribe");
        setStatus("idle");
      }
    } catch {
      toast.error("Gagal subscribe, coba lagi");
      setStatus("idle");
    }
  };

  const close = () => setOpen(false);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] bg-ink/60 backdrop-blur-md flex items-center justify-center p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-intent-title"
        >
          <motion.div
            initial={{ scale: 0.85, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.85, y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-lg w-full glass-heavy rounded-[2rem] overflow-hidden shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={close}
              aria-label="Tutup popup"
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-ink flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Decorative blobs */}
            <div aria-hidden className="absolute -top-20 -right-16 w-64 h-64 rounded-full bg-gold/15 blur-3xl pointer-events-none" />
            <div aria-hidden className="absolute -bottom-20 -left-16 w-64 h-64 rounded-full bg-sage/20 blur-3xl pointer-events-none" />

            {/* Sparkles decoration */}
            {Array.from({ length: 6 }).map((_, i) => (
              <Sparkles
                key={i}
                aria-hidden
                className="absolute text-gold/40 pointer-events-none"
                style={{
                  top: `${10 + i * 12}%`,
                  left: `${(i * 17) % 90}%`,
                  width: `${10 + (i % 3) * 4}px`,
                  height: `${10 + (i % 3) * 4}px`,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}

            <div className="relative z-10 grid sm:grid-cols-2">
              {/* Left: visual */}
              <div className="hidden sm:flex items-center justify-center bg-gradient-to-br from-sage to-sage-dark p-6">
                <div className="text-center text-cream">
                  <motion.div
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 mx-auto rounded-3xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-4"
                  >
                    <Gift className="w-10 h-10 text-gold-light" />
                  </motion.div>
                  <p className="font-heading font-bold text-xl mb-1">10% OFF</p>
                  <p className="text-xs text-cream/80 leading-relaxed">
                    First purchase kamu, khusus untuk pelanggan baru
                  </p>
                </div>
              </div>

              {/* Right: form */}
              <div className="p-6 sm:p-8">
                {status === "done" ? (
                  <div className="text-center py-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="w-16 h-16 mx-auto rounded-full bg-sage-soft flex items-center justify-center mb-4"
                    >
                      <CheckCircle2 className="w-9 h-9 text-sage" />
                    </motion.div>
                    <h3 className="font-heading font-bold text-xl text-ink mb-2">
                      Cek Email Kamu!
                    </h3>
                    <p className="text-sm text-ink-secondary">
                      Kode voucher 10% sudah dikirim. Selamat berbelanja!
                    </p>
                  </div>
                ) : (
                  <>
                    <span className="inline-block px-3 py-1 rounded-full bg-gold/15 text-gold-dark text-[0.65rem] font-bold uppercase tracking-wider mb-3">
                      Penawaran Eksklusif
                    </span>
                    <h3
                      id="exit-intent-title"
                      className="font-heading font-extrabold text-2xl text-ink leading-tight mb-2"
                    >
                      Tunggu! Jangan pergi dulu 🌿
                    </h3>
                    <p className="text-sm text-ink-secondary leading-relaxed mb-5">
                      Daftar newsletter & dapatkan <strong className="text-sage-dark">diskon 10%</strong> untuk pembelian pertama kamu. Plus akses awal ke promo dan produk baru.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-3">
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="email@kamu.com"
                          required
                          disabled={status === "loading"}
                          className="input-rsk w-full pl-10 pr-4 py-3 text-sm"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="btn-rsk btn-rsk-primary w-full btn-shimmer"
                      >
                        <Gift className="w-4 h-4" />
                        <span>{status === "loading" ? "Memproses..." : "Klaim 10% Off"}</span>
                      </button>
                      <button
                        type="button"
                        onClick={close}
                        className="w-full text-xs text-ink-muted hover:text-ink transition-colors py-1"
                      >
                        Tidak, terima kasih
                      </button>
                    </form>

                    <p className="mt-3 text-[0.65rem] text-center text-ink-muted leading-relaxed">
                      Dengan mendaftar, kamu menyetujui menerima email marketing dari Resikku.
                    </p>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
