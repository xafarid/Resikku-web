// "use client";

// import { motion } from "framer-motion";
// import { Eye, ArrowRight } from "lucide-react";
// import { useRecentlyViewed } from "@/lib/recently-viewed-store";
// import { getProductById, formatPrice, type Product } from "@/lib/products";
// import { Star } from "lucide-react";

// interface RecentlyViewedProps {
//   onQuickView: (product: Product) => void;
// }

// export function RecentlyViewed({ onQuickView }: RecentlyViewedProps) {
//   const productIds = useRecentlyViewed((s) => s.productIds);

//   // Filter to only existing products and take max 4
//   const products = productIds
//     .map((id) => getProductById(id))
//     .filter((p): p is Product => p !== undefined)
//     .slice(0, 4);

//   if (products.length === 0) return null;
// }
