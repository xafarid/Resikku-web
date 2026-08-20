"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { ProductsSection } from "@/components/sections/products";
import { Bundles } from "@/components/sections/bundles";
import { About } from "@/components/sections/about";
import { Comparison } from "@/components/sections/comparison";
import { FAQ } from "@/components/sections/faq";
import { Testimonials } from "@/components/sections/testimonials";
import { Footer } from "@/components/sections/footer";
// import { AIChatButton } from "@/components/interactive/ai-chat";
import { ScrollProgress } from "@/components/interactive/scroll-progress";
import { useRecentlyViewed } from "@/lib/recently-viewed-store";
import type { Product } from "@/lib/products";

// Lazy-load modal & cart drawer (only loaded when user interacts)
const ProductModal = dynamic(
  () => import("@/components/interactive/product-modal").then((m) => m.ProductModal),
  { ssr: false }
);
const CartDrawer = dynamic(
  () => import("@/components/interactive/cart-drawer").then((m) => m.CartDrawer),
  { ssr: false }
);
const BackToTop = dynamic(
  () => import("@/components/interactive/back-to-top").then((m) => m.BackToTop),
  { ssr: false }
);
// const RecentlyViewed = dynamic(
//   () => import("@/components/interactive/recently-viewed").then((m) => m.RecentlyViewed),
//   { ssr: false }
// );
// const StickyCTA = dynamic(
//   () => import("@/components/interactive/sticky-cta").then((m) => m.StickyCTA),
//   { ssr: false }
// );

export default function Home() {
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [qty, setQty] = useState(1);
  const addView = useRecentlyViewed((s) => s.addView);

  const handleQuickView = useCallback(
    (product: Product) => {
      setModalProduct(product);
      setQty(1);
      setModalOpen(true);
      addView(product.id);
    },
    [addView]
  );

  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <ProductsSection onQuickView={handleQuickView} />
        <Bundles />
        {/* <RecentlyViewed onQuickView={handleQuickView} /> */}
        <About />
        <Comparison />
        <FAQ />
        <Testimonials />
      </main>
      <Footer />

      <ProductModal
        product={modalProduct}
        open={modalOpen}
        onOpenChange={setModalOpen}
        qty={qty}
        onQtyChange={setQty}
      />
      <CartDrawer />
      <BackToTop />
    </>
  );
}
