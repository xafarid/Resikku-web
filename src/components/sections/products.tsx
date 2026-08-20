"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Plus, Eye, TrendingUp, X, Check, Heart } from "lucide-react";
import { Reveal, SectionHeader, staggerContainer, staggerItem } from "@/components/reveal";
import { PRODUCTS, formatPrice, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart-store";
import { useWishlist } from "@/lib/wishlist-store";
import { toast } from "sonner";

interface ProductsSectionProps {
  onQuickView: (product: Product) => void;
}

/* Fake original prices for strikethrough display */
const ORIGINAL_PRICES: Record<number, number> = {
  1: 20000, // Matcha Mint
  2: 20000, // Sweet Cherry
};

/* Sold percentages (popularity as sold indicator) */
const SOLD_PERCENT: Record<number, number> = {
  1: 95,
  2: 72,
};

/* Sold count labels */
const SOLD_LABELS: Record<number, string> = {
  1: "285 terjual",
  2: "216 terjual",
};

/* Quick add confetti particles */
function ConfettiParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        x: [-(30 + i * 10), 30 + i * 10][i % 2],
        y: -(20 + i * 8),
        color: i % 2 === 0 ? "hsl(38 70% 54%)" : "hsl(145 38% 32%)",
        size: 4 + (i % 3),
      })),
    []
  );
  return (
    <>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          animate={{ opacity: 0, x: p.x, y: p.y, scale: 0.3 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{ width: p.size, height: p.size, background: p.color }}
        />
      ))}
    </>
  );
}

/* Compare feature state */
const COMPARE_FEATURES = [
  { key: "sheets", label: "Jumlah Lembar" },
  { key: "scent", label: "Aroma" },
  { key: "categoryLabel", label: "Kategori" },
  { key: "price", label: "Harga", format: true },
];

export function ProductsSection({ onQuickView }: ProductsSectionProps) {
  const add = useCart((s) => s.add);
  const openCart = useCart((s) => s.openCart);
  const wishlistToggle = useWishlist((s) => s.toggle);
  const wishlistHas = useWishlist((s) => s.has);
  const [addingId, setAddingId] = useState<number | null>(null);
  const [compareIds, setCompareIds] = useState<number[]>([]);
  const [showCompare, setShowCompare] = useState(false);

  const handleWishlist = useCallback(
    (p: Product) => {
      const wasIn = wishlistHas(p.id);
      wishlistToggle(p.id);
      if (wasIn) {
        toast(`${p.name} dihapus dari wishlist`);
      } else {
        toast.success(`${p.name} ditambahkan ke wishlist`, {
          description: "Lihat wishlist untuk simpan produk favorit",
        });
      }
    },
    [wishlistHas, wishlistToggle]
  );

  const toggleCompare = useCallback((id: number) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) {
        toast.info("Maksimal 3 produk untuk dibandingkan");
        return prev;
      }
      return [...prev, id];
    });
  }, []);



  const handleAdd = useCallback(
    (p: Product) => {
      setAddingId(p.id);
      add(p.id, 1);
      toast.success(`${p.name} ditambahkan`, {
        description: "Lihat keranjang untuk checkout via WhatsApp",
        action: {
          label: "Lihat Keranjang",
          onClick: openCart,
        },
      });
      setTimeout(() => setAddingId(null), 600);
    },
    [add, openCart]
  );

  return (
    <section
      id="products"
      className="section-rsk relative bg-gradient-to-b from-cream via-cream-warm/40 to-cream"
    >
      <div className="container-rsk">
        <SectionHeader
          label="Katalog Pilihan"
          title={<>2 Varian Signature</>}
          subtitle="Diformulasikan dengan ekstrak minyak esensial murni untuk kelembutan, kepraktisan, dan aroma alami sepanjang hari."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={{ once: true, margin: "-80px" }}
          className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {PRODUCTS.filter((p) => !p.isBundle).map((p) => {
            const originalPrice = ORIGINAL_PRICES[p.id];
            const soldPercent = SOLD_PERCENT[p.id];
            const soldLabel = SOLD_LABELS[p.id];
            const isAdding = addingId === p.id;
            const isBestSeller = p.tag === "Best Seller";
            const isWishlisted = wishlistHas(p.id);

            return (
              <motion.article
                key={p.id}
                variants={staggerItem}
                layout
                className="card-rsk rounded-3xl p-6 group relative overflow-hidden flex flex-col"
                style={{
                  /* Accent color for gradient border on hover */
                  "--accent": p.accentColor,
                } as React.CSSProperties}
              >
                {/* Hover gradient border overlay */}
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
                  style={{
                    boxShadow: `inset 0 0 0 2px ${p.accentColor}33, inset 0 0 20px ${p.accentColor}11`,
                  }}
                />

                {/* Product visual */}
                <div className="relative h-52 rounded-2xl flex items-center justify-center mb-5 overflow-hidden group/img">
                  {/* Real product image */}
                  <img
                    src={p.image}
                    alt={`Sabun kertas ${p.name} — ${p.scent}`}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover/img:scale-110 group-hover/img:rotate-1"
                  />
                  {/* Subtle gradient overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent" />

                  {/* Tag overlay */}
                  <span
                    className="absolute top-2 left-2 px-2.5 py-1 rounded-full text-[0.625rem] font-bold text-white shadow-md backdrop-blur-sm"
                    style={{ background: p.accentColor }}
                  >
                    {p.tag}
                  </span>

                  {/* Wishlist heart toggle */}
                  <button
                    onClick={() => handleWishlist(p)}
                    aria-label={isWishlisted ? `Hapus ${p.name} dari wishlist` : `Tambah ${p.name} ke wishlist`}
                    aria-pressed={isWishlisted}
                    className="absolute top-2 right-2 w-9 h-9 rounded-full bg-white/85 backdrop-blur-sm shadow-md flex items-center justify-center transition-all hover:scale-110 hover:bg-white group/heart"
                  >
                    <motion.span
                      animate={isWishlisted ? { scale: [1, 1.3, 0.95, 1.1, 1] } : { scale: 1 }}
                      transition={{ duration: 0.45 }}
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors ${
                          isWishlisted ? "fill-red-500 text-red-500" : "text-ink-secondary group-hover/heart:text-red-500"
                        }`}
                      />
                    </motion.span>
                  </button>

                  {/* Sheets count badge */}
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-white/85 backdrop-blur-sm text-[0.625rem] font-bold text-ink shadow-sm">
                    {p.sheets} lembar
                  </span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < p.rating ? "fill-gold text-gold" : "text-ink-muted/30"
                      }`}
                    />
                  ))}
                  <span className="ml-1 text-xs text-ink-muted">({p.popularity} ulasan)</span>
                </div>

                <h3 className="font-heading font-bold text-xl text-ink mb-1">
                  {p.name}
                </h3>
                <p className="text-xs font-medium text-sage mb-2">{p.scent}</p>
                <p className="text-sm text-ink-secondary leading-7 flex-1">
                  {p.description}
                </p>

                {/* Sold progress indicator */}
                <div className="mt-3 flex items-center gap-2">
                  <div className="sold-progress flex-1">
                    <div className="sold-progress-bar" style={{ width: `${soldPercent}%` }} />
                  </div>
                  <span className="text-[0.6rem] font-medium text-ink-muted whitespace-nowrap">{soldLabel}</span>
                </div>

                {/* Price + actions */}
                <div className="mt-5 pt-5 border-t border-sage/10 flex items-center justify-between gap-2">
                  <div>
                    <div className="text-[0.625rem] text-ink-muted uppercase tracking-wider">
                      Harga
                    </div>
                    {/* Strikethrough original price */}
                    {originalPrice > p.price && (
                      <div className="text-xs text-ink-muted line-through">
                        {formatPrice(originalPrice)}
                      </div>
                    )}
                    <div className="font-heading font-bold text-lg text-sage-dark">
                      {formatPrice(p.price)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Compare toggle */}
                    <button
                      onClick={() => toggleCompare(p.id)}
                      aria-label={`Bandingkan ${p.name}`}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-105 ${
                        compareIds.includes(p.id)
                          ? "bg-sage text-cream shadow-md shadow-sage/20"
                          : "glass-light hover:glass-heavy text-sage-dark"
                      }`}
                    >
                      {compareIds.includes(p.id) ? (<Check className="w-4 h-4" />) : (<Star className="w-4 h-4" />)}
                    </button>
                    <button
                      onClick={() => onQuickView(p)}
                      aria-label={`Lihat detail ${p.name}`}
                      className="w-10 h-10 rounded-full glass-light hover:glass-heavy flex items-center justify-center text-sage-dark transition-all hover:scale-105"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleAdd(p)}
                      aria-label={`Tambah ${p.name} ke keranjang`}
                      className="btn-rsk btn-rsk-primary !p-0 !w-10 !h-10 btn-shimmer ripple-effect relative"
                    >
                      <AnimatePresence>
                        {isAdding && <ConfettiParticles />}
                      </AnimatePresence>
                      <motion.span
                        animate={isAdding ? { scale: [1, 1.3, 0.9, 1.05, 1] } : { scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center justify-center"
                      >
                        <Plus className="w-4 h-4" />
                      </motion.span>
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Compare floating bar */}
        <AnimatePresence>
          {compareIds.length >= 2 && !showCompare && (
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
            >
              <div className="glass-heavy rounded-2xl px-5 py-3 flex items-center gap-4 shadow-xl">
                <div className="flex -space-x-2">
                  {compareIds.map((id) => {
                    const p = PRODUCTS.find((x) => x.id === id);
                    if (!p) return null;
                    return (
                      <div
                        key={id}
                        className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-[0.5rem] font-bold shadow-sm"
                        style={{ background: p.accentColor }}
                      >
                        {p.name.charAt(0)}
                      </div>
                    );
                  })}
                </div>
                <span className="text-sm font-semibold text-ink">{compareIds.length} produk dipilih</span>
                <button
                  onClick={() => setShowCompare(true)}
                  className="btn-rsk btn-rsk-primary !py-2 !px-4 !text-sm"
                >
                  <Check className="w-3.5 h-3.5" />
                  Bandingkan
                </button>
                <button
                  onClick={() => setCompareIds([])}
                  className="w-8 h-8 rounded-full hover:bg-cream-warm flex items-center justify-center text-ink-muted transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Compare overlay */}
        <AnimatePresence>
          {showCompare && compareIds.length >= 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setShowCompare(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 30 }}
                onClick={(e) => e.stopPropagation()}
                className="glass-heavy rounded-3xl p-6 md:p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto scroll-rsk"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-heading font-bold text-xl text-ink">Bandingkan Produk</h3>
                  <button
                    onClick={() => setShowCompare(false)}
                    className="w-9 h-9 rounded-full hover:bg-cream-warm flex items-center justify-center text-ink-muted"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr>
                        <th className="p-3 text-left text-xs font-semibold text-ink-muted uppercase tracking-wider">Fitur</th>
                        {compareIds.map((id) => {
                          const p = PRODUCTS.find((x) => x.id === id);
                          if (!p) return null;
                          return (
                            <th key={id} className="p-3 text-center">
                              <div className="flex flex-col items-center gap-1.5">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold" style={{ background: p.accentColor }}>
                                  {p.name.charAt(0)}
                                </div>
                                <span className="font-heading font-bold text-ink text-sm">{p.name}</span>
                              </div>
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {COMPARE_FEATURES.map((feat, i) => (
                        <tr key={feat.key} className={i % 2 === 0 ? "bg-sage-soft/20" : ""}>
                          <td className="p-3 font-medium text-ink-secondary text-xs">{feat.label}</td>
                          {compareIds.map((id) => {
                            const p = PRODUCTS.find((x) => x.id === id);
                            if (!p) return null;
                            const val = p[feat.key as keyof Product];
                            const display = feat.format && typeof val === "number" ? formatPrice(val) : String(val);
                            return (
                              <td key={id} className="p-3 text-center font-medium text-ink text-sm">
                                {display}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 flex justify-center">
                  <button
                    onClick={() => { setShowCompare(false); setCompareIds([]); }}
                    className="btn-rsk btn-rsk-secondary"
                  >
                    <span>Tutup</span>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
