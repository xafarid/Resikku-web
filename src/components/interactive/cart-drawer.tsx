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
  Trash2,
  Minus,
  Plus,
  ShoppingBag,
  MessageCircle,
  Truck,
  ShieldCheck,
  X,
} from "lucide-react";
import { ProductIconSvg } from "@/components/product-icon";
import { formatPrice } from "@/lib/products";
import { useCart } from "@/lib/cart-store";
import { toast } from "sonner";

export function CartDrawer() {
  const {
    isCartOpen,
    closeCart,
    items,
    remove,
    updateQty,
    subtotal,
    totalCount,
    cartLines,
    freeShippingThreshold,
    clear,
  } = useCart();

  const lines = cartLines();
  const total = subtotal();
  const count = totalCount();
  const remaining = Math.max(0, freeShippingThreshold - total);
  const progress = Math.min(100, (total / freeShippingThreshold) * 100);

  // Build WhatsApp message
  const buildWhatsAppUrl = () => {
    if (lines.length === 0) return "#";
    const phone = "6285185976414";
    let msg = "Halo Resikku! Saya ingin pesan:\n\n";
    lines.forEach((line, idx) => {
      msg += `${idx + 1}. ${line.product.name} — ${line.quantity}x ${formatPrice(
        line.product.price
      )} = ${formatPrice(line.product.price * line.quantity)}\n`;
    });
    msg += `\n*Total: ${formatPrice(total)}*\n\nMohon info pembayaran & pengiriman. Terima kasih!`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  };

  const handleCheckout = () => {
    if (lines.length === 0) {
      toast.error("Keranjang masih kosong");
      return;
    }
    const checkoutUrl = buildWhatsAppUrl();
    toast.success("Mengarahkan ke WhatsApp...", {
      description: "Hubungi kami untuk konfirmasi pesanan",
    });
    // Direct redirect to WhatsApp (no server-side order creation)
    window.open(checkoutUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={(o) => (o ? null : closeCart())}>
      <SheetContent
        side="right"
        hideCloseButton
        className="w-full sm:max-w-md p-0 gap-0 bg-cream border-sage/15 flex flex-col"
      >
        <VisuallyHidden>
          <SheetTitle>Keranjang Belanja</SheetTitle>
          <SheetDescription>
            Keranjang berisi produk sabun kertas Resikku yang dipilih.
          </SheetDescription>
        </VisuallyHidden>

        {/* Header */}
        <SheetHeader className="p-5 border-b border-sage/10 flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sage-soft text-sage-dark flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-ink">
                Keranjang Belanja
              </h3>
              <p className="text-xs text-ink-muted">{count} produk</p>
            </div>
          </div>
          <button
            onClick={closeCart}
            aria-label="Tutup keranjang"
            className="w-9 h-9 rounded-full bg-cream-warm/60 hover:bg-sage-soft flex items-center justify-center text-ink transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </SheetHeader>

        {/* Free shipping bar */}
        <div className="px-5 py-4 bg-sage-soft/40 border-b border-sage/10">
          <div className="flex items-center gap-2 text-xs text-sage-dark mb-2">
            <Truck className="w-4 h-4 shrink-0" />
            {remaining > 0 ? (
              <span>
                Beli <strong>{formatPrice(remaining)}</strong> lagi untuk{" "}
                <strong>Gratis Ongkir!</strong>
              </span>
            ) : (
              <span className="font-bold">
                Selamat! Kamu mendapat Gratis Ongkir
              </span>
            )}
          </div>
          <div className="h-2 rounded-full bg-cream/60 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-sage to-gold rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
          </div>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto scroll-rsk p-5 space-y-3">
          <AnimatePresence mode="popLayout">
            {lines.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center text-center py-16"
              >
                <div className="w-20 h-20 rounded-full bg-sage-soft flex items-center justify-center text-sage mb-4">
                  <ShoppingBag className="w-9 h-9" />
                </div>
                <h4 className="font-heading font-bold text-lg text-ink mb-1">
                  Keranjang Kosong
                </h4>
                <p className="text-sm text-ink-muted mb-5 max-w-[14rem]">
                  Yuk, tambah produk sabun kertas favoritmu!
                </p>
                <button
                  onClick={closeCart}
                  className="btn-rsk btn-rsk-primary"
                >
                  <span>Mulai Belanja</span>
                </button>
              </motion.div>
            ) : (
              lines.map((line) => (
                <motion.div
                  key={line.product.id}
                  layout
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50, height: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="glass-card rounded-2xl p-3 flex items-center gap-3"
                >
                  {/* Visual */}
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: line.product.gradient }}
                  >
                    <ProductIconSvg
                      name={line.product.icon}
                      className="w-8 h-8 text-white"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-heading font-bold text-sm text-ink truncate">
                      {line.product.name}
                    </h4>
                    <p className="text-xs text-ink-muted truncate">
                      {line.product.scent}
                    </p>
                    <div className="mt-1 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQty(line.product.id, -1)}
                          aria-label="Kurangi"
                          className="w-6 h-6 rounded-full bg-cream-warm hover:bg-sage-soft text-sage-dark flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold text-sm text-ink min-w-[1.25rem] text-center">
                          {line.quantity}
                        </span>
                        <button
                          onClick={() => updateQty(line.product.id, 1)}
                          aria-label="Tambah"
                          className="w-6 h-6 rounded-full bg-cream-warm hover:bg-sage-soft text-sage-dark flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-heading font-bold text-sm text-sage-dark">
                        {formatPrice(line.product.price * line.quantity)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      remove(line.product.id);
                      toast(`${line.product.name} dihapus`, {
                        action: {
                          label: "Batal",
                          onClick: () => useCart.getState().add(line.product.id, line.quantity),
                        },
                      });
                    }}
                    aria-label={`Hapus ${line.product.name}`}
                    className="w-8 h-8 rounded-full text-ink-muted hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-colors shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))
            )}
          </AnimatePresence>

          {lines.length > 0 && (
            <button
              onClick={() => {
                clear();
                toast("Keranjang dikosongkan");
              }}
              className="text-xs text-ink-muted hover:text-red-500 transition-colors mx-auto block mt-2"
            >
              Kosongkan keranjang
            </button>
          )}
        </div>

        {/* Footer */}
        {lines.length > 0 && (
          <div className="border-t border-sage/10 p-5 bg-cream-warm/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-ink-secondary">Subtotal Belanja</span>
              <span className="font-heading font-extrabold text-xl text-ink">
                {formatPrice(total)}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              className="btn-rsk btn-rsk-primary w-full"
              style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}
            >
              <MessageCircle className="w-4 h-4" />
              <span>Pesan Cepat via WhatsApp</span>
            </button>

            <div className="flex items-center justify-center gap-1.5 text-xs text-ink-muted">
              <ShieldCheck className="w-3.5 h-3.5 text-sage" />
              <span>Bebas biaya admin • Konsultasi via WhatsApp</span>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
