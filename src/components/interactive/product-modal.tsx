"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { motion } from "framer-motion";
import { Star, Minus, Plus, ShoppingBag, CheckCircle2 } from "lucide-react";
import { ProductIconSvg } from "@/components/product-icon";
import { formatPrice, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart-store";
import { toast } from "sonner";

interface ProductModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  qty: number;
  onQtyChange: (qty: number) => void;
}

export function ProductModal({
  product,
  open,
  onOpenChange,
  qty,
  onQtyChange,
}: ProductModalProps) {
  const add = useCart((s) => s.add);
  const openCart = useCart((s) => s.openCart);

  if (!product) return null;

  const handleAdd = () => {
    add(product.id, qty);
    toast.success(`${product.name} (${qty}x) ditambahkan`, {
      description: "Lihat keranjang untuk checkout",
      action: {
        label: "Lihat Keranjang",
        onClick: () => {
          onOpenChange(false);
          openCart();
        },
      },
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden gap-0 rounded-3xl border-sage/15">
        <VisuallyHidden>
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>{product.fullDescription}</DialogDescription>
        </VisuallyHidden>

        <div className="grid md:grid-cols-2">
          {/* Visual */}
          <div
            className="relative h-64 md:h-auto flex items-center justify-center overflow-hidden"
          >
            {/* Real product image */}
            <img
              src={product.image}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent" />

            <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm text-xs font-bold text-ink shadow-sm z-10">
              {product.tag}
            </span>
          </div>

          {/* Body */}
          <div className="p-6 md:p-8 flex flex-col">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-sage mb-2">
              {product.categoryLabel}
            </p>
            <h3 className="font-heading font-bold text-2xl md:text-3xl text-ink leading-tight mb-2">
              {product.name}
            </h3>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < product.rating ? "fill-gold text-gold" : "text-ink-muted/30"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-ink-muted">
                ({product.popularity} ulasan)
              </span>
            </div>

            <p className="text-sm text-ink-secondary leading-relaxed mb-5">
              {product.fullDescription}
            </p>

            {/* Quick facts */}
            <div className="grid grid-cols-2 gap-2 mb-5">
              <div className="px-3 py-2 rounded-xl bg-cream-warm/60">
                <div className="text-[0.625rem] uppercase tracking-wider text-ink-muted">
                  Aroma
                </div>
                <div className="text-sm font-semibold text-ink">
                  {product.scent}
                </div>
              </div>
              <div className="px-3 py-2 rounded-xl bg-cream-warm/60">
                <div className="text-[0.625rem] uppercase tracking-wider text-ink-muted">
                  Isi
                </div>
                <div className="text-sm font-semibold text-ink">
                  {product.sheets} lembar
                </div>
              </div>
            </div>

            {/* Price + quantity */}
            <div className="mt-auto pt-4 border-t border-sage/10">
              <div className="flex items-end justify-between mb-4">
                <div>
                  <div className="text-[0.625rem] uppercase tracking-wider text-ink-muted">
                    Harga
                  </div>
                  <div className="font-heading font-extrabold text-2xl text-sage-dark">
                    {formatPrice(product.price)}
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-3 px-2 py-1.5 rounded-full bg-cream-warm/60">
                  <button
                    onClick={() => onQtyChange(Math.max(1, qty - 1))}
                    aria-label="Kurangi"
                    className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-sage-dark hover:bg-sage-soft transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-heading font-bold text-base text-ink min-w-[1.5rem] text-center">
                    {qty}
                  </span>
                  <button
                    onClick={() => onQtyChange(Math.min(99, qty + 1))}
                    aria-label="Tambah"
                    className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-sage-dark hover:bg-sage-soft transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAdd}
                className="btn-rsk btn-rsk-primary w-full"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Tambah ke Keranjang</span>
              </button>

              <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-ink-muted">
                <CheckCircle2 className="w-3.5 h-3.5 text-sage" />
                <span>Stok tersedia • Gratis ongkir min. Rp 150.000</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
