// "use client";

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ShoppingBag, ArrowRight } from "lucide-react";
// import { useCart } from "@/lib/cart-store";

// /**
//  * Sticky CTA bar that appears after user scrolls past the hero section.
//  * Shows cart count + direct "Beli Sekarang" button.
//  */
// export function StickyCTA() {
//   const [visible, setVisible] = useState(false);
//   const totalCount = useCart((s) => s.totalCount());
//   const openCart = useCart((s) => s.openCart);

//   useEffect(() => {
//     const onScroll = () => {
//       // Show after scrolling past hero (~100vh)
//       const heroHeight = window.innerHeight;
//       setVisible(window.scrollY > heroHeight * 0.9);
//     };
//     onScroll();
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   return (
//     <AnimatePresence>
//       {visible && (
//         <motion.div
//           initial={{ y: 100, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           exit={{ y: 100, opacity: 0 }}
//           transition={{ type: "spring", stiffness: 300, damping: 30 }}
//           className="fixed bottom-0 inset-x-0 z-40 md:bottom-6 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:max-w-md"
//         >
//           <div className="md:rounded-2xl bg-sage-dark/95 backdrop-blur-md border-t md:border border-sage/30 shadow-2xl shadow-sage-dark/25 px-4 py-3 md:px-5 md:py-3.5 flex items-center gap-3">
//             {/* Brand mini */}
//             <div className="flex items-center gap-2 shrink-0">
//               <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-md">
//                 <ShoppingBag className="w-4 h-4 text-white" />
//               </div>
//               <div className="hidden sm:block leading-none">
//                 <div className="font-heading font-bold text-sm text-cream">Resikku</div>
//                 <div className="text-[0.55rem] text-cream/60 uppercase tracking-wider">Essentials</div>
//               </div>
//             </div>

//             {/* Cart info */}
//             <div className="flex-1 min-w-0">
//               <div className="text-xs text-cream/70">
//                 {totalCount > 0 ? (
//                   <>
//                     <span className="font-bold text-gold">{totalCount}</span> item di keranjang
//                   </>
//                 ) : (
//                   "Sabun kertas organik premium"
//                 )}
//               </div>
//               <div className="font-heading font-bold text-sm text-cream truncate">
//                 Mulai dari Rp 25.000
//               </div>
//             </div>

//             {/* CTA button */}
//             <button
//               onClick={totalCount > 0 ? openCart : () => document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" })}
//               className="btn-rsk btn-rsk-gold shrink-0 !py-2.5 !px-4 !text-sm btn-shimmer group"
//             >
//               <span>{totalCount > 0 ? "Checkout" : "Beli Sekarang"}</span>
//               <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
//             </button>
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }
