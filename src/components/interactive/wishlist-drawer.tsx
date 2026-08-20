"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  X,
  ShoppingBag,
  Trash2,
  ShoppingCart,
} from "lucide-react";
import { formatPrice, type Product } from "@/lib/products";
import { useWishlist } from "@/lib/wishlist-store";
import { useCart } from "@/lib/cart-store";
import { toast } from "sonner";

interface WishlistDrawerProps {
  onQuickView?: (product: Product) => void;
}

export function WishlistDrawer({ onQuickView }: WishlistDrawerProps) {
  const {
    isWishlistOpen,
    closeWishlist,
    wishlistLines,
    remove,
    clear,
    count,
  } = useWishlist();

  const add = useCart((s) => s.add);
  const openCart = useCart((s) => s.openCart);

  const items = wishlistLines();
  const itemCount = count();

  const handleAddAllToCart = () => {
    items.forEach((p) => add(p.id, 1));
    toast.success(`${items.length} produk dipindahkan ke keranjang`, {
      description: "Lihat keranjang untuk checkout via WhatsApp",
      action: {
        label: "Lihat Keranjang",
        onClick: () => {
          closeWishlist();
          openCart();
        },
      },
    });
  };

  const handleAddOne = (p: Product) => {
    add(p.id, 1);
    toast.success(`${p.name} ditambahkan ke keranjang`, {
      action: { label: "Lihat Keranjang", onClick: openCart },
    });
  };

  return (
    <Sheet open={isWishlistOpen} onOpenChange={(o) => (o ? null : closeWishlist())}>
      <SheetContent
        side="right"
        hideCloseButton
        className="w-full sm:max-w-md p-0 gap-0 bg-cream border-sage/15 flex flex-col"
      >
        <VisuallyHidden>
          <SheetTitle>Wishlist Favorit</SheetTitle>
          <SheetDescription>
            Daftar sabun kertas Resikku yang kamu simpan untuk dibeli nanti.
          </SheetDescription>
        </VisuallyHidden>

        {/* Header */}
        <SheetHeader className="p-5 border-b border-sage/10 flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center relative">
              <Heart className="w-5 h-5 fill-red-500" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-ink">
                Wishlist Favorit
              </h3>
              <p className="text-xs text-ink-muted">{itemCount} produk disimpan</p>
            </div>
          </div>
          <button
            onClick={closeWishlist}
            aria-label="Tutup wishlist"
            className="w-9 h-9 rounded-full bg-cream-warm/60 hover:bg-sage-soft flex items-center justify-center text-ink transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </SheetHeader>

        {/* Items */}
        <div className="flex-1 overflow-y-auto scroll-rsk p-5 space-y-3">
          <AnimatePresence mode="popLayout">
            {items.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center text-center py-16"
              >
                <div className="w-20 h-20 rounded-full bg-sage-soft flex items-center justify-center text-sage mb-4">
                  <Heart className="w-9 h-9" />
                </div>
                <h4 className="font-heading font-bold text-lg text-ink mb-1">
                  Wishlist Kosong
                </h4>
                <p className="text-sm text-ink-muted mb-5 max-w-[14rem]">
                  Simpan produk favoritmu dengan menekan ikon hati di kartu produk.
                </p>
                <button
                  onClick={closeWishlist}
                  className="btn-rsk btn-rsk-primary"
                >
                  <span>Jelajahi Produk</span>
                </button>
              </motion.div>
            ) : (
              items.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50, height: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="glass-card rounded-2xl p-3 flex items-center gap-3 group"
                >
                  {/* Visual */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 relative">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-heading font-bold text-sm text-ink truncate">
                      {p.name}
                    </h4>
                    <p className="text-xs text-ink-muted truncate">{p.scent}</p>
                    <div className="mt-1 flex items-center justify-between gap-2">
                      <span className="font-heading font-bold text-sm text-sage-dark">
                        {formatPrice(p.price)}
                      </span>
                      <button
                        onClick={() => handleAddOne(p)}
                        aria-label={`Tambah ${p.name} ke keranjang`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sage-soft hover:bg-sage hover:text-cream text-sage-dark text-xs font-semibold transition-colors"
                      >
                        <ShoppingCart className="w-3 h-3" />
                        Tambah
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      remove(p.id);
                      toast(`${p.name} dihapus dari wishlist`);
                    }}
                    aria-label={`Hapus ${p.name}`}
                    className="w-8 h-8 rounded-full text-ink-muted hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-colors shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))
            )}
          </AnimatePresence>

          {items.length > 0 && (
            <button
              onClick={() => {
                clear();
                toast("Wishlist dikosongkan");
              }}
              className="text-xs text-ink-muted hover:text-red-500 transition-colors mx-auto block mt-2"
            >
              Kosongkan wishlist
            </button>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-sage/10 p-5 bg-cream-warm/30 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink-secondary">{itemCount} produk favorit</span>
              <span className="font-heading font-bold text-sage-dark">
                Total: {formatPrice(items.reduce((s, p) => s + p.price, 0))}
              </span>
            </div>
            <button
              onClick={handleAddAllToCart}
              className="btn-rsk btn-rsk-primary w-full"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Pindahkan Semua ke Keranjang</span>
            </button>
            <p className="text-[0.7rem] text-center text-ink-muted">
              Wishlist tersimpan otomatis di perangkat ini
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
