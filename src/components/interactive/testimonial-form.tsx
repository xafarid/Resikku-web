"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X, Loader2, MessageSquarePlus, CheckCircle2 } from "lucide-react";

interface TestimonialFormProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}

export function TestimonialForm({ open, onOpenChange }: TestimonialFormProps) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const reset = () => {
    setName("");
    setRole("");
    setRating(5);
    setText("");
    setSuccess(false);
    setError("");
  };

  const handleClose = (o: boolean) => {
    if (!o) {
      // small delay so user sees success state before close
      setTimeout(() => reset(), 200);
    }
    onOpenChange(o);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || name.trim().length < 2) {
      setError("Nama minimal 2 karakter.");
      return;
    }
    if (!text.trim() || text.trim().length < 20) {
      setError("Ulasan minimal 20 karakter.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          role: role.trim() || "Pelanggan Setia",
          rating,
          text: text.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Gagal mengirim ulasan.");
      }
      setSuccess(true);
      setTimeout(() => handleClose(false), 2200);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Terjadi kesalahan. Coba lagi."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md p-0 gap-0 bg-cream border-sage/15 overflow-hidden rounded-3xl">
        <DialogHeader className="p-6 pb-3 bg-gradient-to-br from-sage to-sage-dark text-cream relative">
          <button
            onClick={() => handleClose(false)}
            aria-label="Tutup"
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
              <MessageSquarePlus className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="font-heading font-bold text-lg">
                Bagikan Pengalamanmu
              </DialogTitle>
              <DialogDescription className="text-cream/80 text-xs mt-0.5">
                Ulasanmu membantu pelanggan lainnya mengenal Resikku
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 220, damping: 14 }}
                  className="w-16 h-16 mx-auto rounded-full bg-sage-soft text-sage flex items-center justify-center mb-4"
                >
                  <CheckCircle2 className="w-9 h-9" />
                </motion.div>
                <h3 className="font-heading font-bold text-lg text-ink mb-1">
                  Terima kasih! 🌿
                </h3>
                <p className="text-sm text-ink-secondary">
                  Ulasanmu telah diterima dan akan tampil setelah moderasi.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                {/* Name */}
                <div>
                  <label
                    htmlFor="t-name"
                    className="block text-xs font-semibold text-ink-secondary mb-1.5 uppercase tracking-wider"
                  >
                    Nama Lengkap
                  </label>
                  <input
                    id="t-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="cth. Sari Wulandari"
                    maxLength={50}
                    required
                    className="input-rsk"
                  />
                </div>

                {/* Role */}
                <div>
                  <label
                    htmlFor="t-role"
                    className="block text-xs font-semibold text-ink-secondary mb-1.5 uppercase tracking-wider"
                  >
                    Profesi / Kota <span className="text-ink-muted normal-case font-normal">(opsional)</span>
                  </label>
                  <input
                    id="t-role"
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="cth. Ibu Rumah Tangga • Jakarta"
                    maxLength={80}
                    className="input-rsk"
                  />
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-xs font-semibold text-ink-secondary mb-1.5 uppercase tracking-wider">
                    Rating
                  </label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const filled = (hoverRating || rating) >= star;
                      return (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          aria-label={`Beri ${star} bintang`}
                          className="p-1 transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-7 h-7 transition-colors ${
                              filled
                                ? "fill-gold text-gold"
                                : "text-ink-muted/30"
                            }`}
                          />
                        </button>
                      );
                    })}
                    <span className="ml-2 text-sm font-semibold text-sage-dark">
                      {rating}/5
                    </span>
                  </div>
                </div>

                {/* Text */}
                <div>
                  <label
                    htmlFor="t-text"
                    className="block text-xs font-semibold text-ink-secondary mb-1.5 uppercase tracking-wider"
                  >
                    Ulasan Kamu
                  </label>
                  <textarea
                    id="t-text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Ceritakan pengalamanmu pakai sabun kertas Resikku..."
                    rows={4}
                    maxLength={400}
                    required
                    className="w-full px-4 py-3 rounded-2xl bg-white/90 border border-sage/15 text-sm text-ink placeholder:text-ink-muted/60 focus:outline-none focus:border-sage/55 focus:ring-4 focus:ring-sage/10 focus:bg-white resize-none transition-all"
                  />
                  <div className="mt-1 text-right text-[0.6875rem] text-ink-muted">
                    {text.length}/400
                  </div>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="px-4 py-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs"
                  >
                    {error}
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-rsk btn-rsk-primary w-full btn-shimmer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Mengirim...</span>
                    </>
                  ) : (
                    <>
                      <MessageSquarePlus className="w-4 h-4" />
                      <span>Kirim Ulasan</span>
                    </>
                  )}
                </button>

                <p className="text-[0.6875rem] text-ink-muted text-center">
                  Dengan mengirim, kamu menyetujui ulasanmu ditampilkan setelah moderasi.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
