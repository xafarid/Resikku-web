"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ShoppingBag, X, Heart } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { useWishlist } from "@/lib/wishlist-store";
import { cn } from "@/lib/utils";


const NAV_LINKS = [
  { href: "#hero", label: "Beranda" },
  { href: "#how-it-works", label: "Cara Pakai" },
  { href: "#products", label: "Produk" },
  { href: "#about", label: "Keunggulan" },
  { href: "#testimonials", label: "Ulasan" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isHydrated, setIsHydrated] = useState(false);

  const totalCount = useCart((s) => s.totalCount());
  const cartBumpKey = useCart((s) => s.cartBumpKey);
  const openCart = useCart((s) => s.openCart);
  const wishlistCount = useWishlist((s) => s.count());
  const wishlistBumpKey = useWishlist((s) => s.bumpKey);
  const openWishlist = useWishlist((s) => s.openWishlist);

  useEffect(() => {
    setIsHydrated(true);
  }, []);


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV_LINKS.forEach((l) => {
      const el = document.querySelector(l.href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 z-50 transition-all duration-500",
          scrolled ? "top-2" : "top-4"
        )}
      >
        <div className="container-rsk">
          <div
            className={cn(
              "rounded-full transition-all duration-500 flex items-center justify-between gap-4 px-4 py-2.5 md:px-6 md:py-3",
              scrolled ? "glass-heavy shadow-[var(--glass-shadow-lg)]" : "glass-card"
            )}
          >
            <button
              onClick={() => handleNav("#hero")}
              className="flex items-center gap-2.5 group"
              aria-label="Resikku Essentials — Beranda"
            >
              <img
                src="/logo.svg"
                alt="Resikku Essentials"
                className="w-8 h-8 md:w-9 md:h-9 object-contain transition-transform duration-500 group-hover:rotate-12"
              />
              <div className="leading-none text-left">
                <div className="font-heading font-bold text-base md:text-lg text-ink tracking-tight uppercase">
                  RESIKKU
                </div>
                <div className="text-[0.625rem] md:text-xs font-medium text-ink-muted tracking-[0.18em] uppercase">
                  Essentials
                </div>
              </div>
            </button>

            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
                    activeSection === link.href.slice(1)
                      ? "text-sage-dark"
                      : "text-ink-secondary hover:text-sage-dark"
                  )}
                >
                  {link.label}
                  {activeSection === link.href.slice(1) && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-sage-soft"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              {/* Wishlist button */}

              <button
                onClick={openCart}
                aria-label="Buka keranjang"
                className="relative w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center glass-light hover:glass-heavy transition-all duration-300 hover:scale-105 text-sage-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
              >
                <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
                <AnimatePresence>
                  {isHydrated && totalCount > 0 && (
                    <motion.span
                      key={cartBumpKey}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                      className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-gold text-white text-[0.625rem] font-bold flex items-center justify-center shadow-md"
                    >
                      {totalCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <button
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
                className="md:hidden w-10 h-10 rounded-full flex items-center justify-center glass-light text-sage-dark"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm md:hidden"
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 md:hidden glass-heavy p-6 flex flex-col gap-2 pt-24"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  onClick={() => handleNav(link.href)}
                  className={cn(
                    "px-4 py-3 rounded-2xl text-left text-base font-medium transition-colors",
                    activeSection === link.href.slice(1)
                      ? "bg-sage text-cream"
                      : "text-ink hover:bg-sage-soft"
                  )}
                >
                  {link.label}
                </motion.button>
              ))}
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
