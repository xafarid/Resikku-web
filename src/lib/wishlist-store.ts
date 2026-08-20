"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { PRODUCTS, getProductById, type Product } from "@/lib/products";

interface WishlistState {
  ids: number[];
  isWishlistOpen: boolean;
  bumpKey: number;
  // actions
  toggle: (productId: number) => void;
  remove: (productId: number) => void;
  has: (productId: number) => boolean;
  clear: () => void;
  openWishlist: () => void;
  closeWishlist: () => void;
  toggleWishlist: () => void;
  bump: () => void;
  // selectors
  count: () => number;
  wishlistLines: () => Product[];
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      isWishlistOpen: false,
      bumpKey: 0,

      toggle: (productId) => {
        const ids = get().ids;
        if (ids.includes(productId)) {
          set({ ids: ids.filter((id) => id !== productId) });
        } else {
          set({ ids: [...ids, productId] });
          get().bump();
        }
      },

      remove: (productId) =>
        set({ ids: get().ids.filter((id) => id !== productId) }),

      has: (productId) => get().ids.includes(productId),

      clear: () => set({ ids: [] }),

      openWishlist: () => set({ isWishlistOpen: true }),
      closeWishlist: () => set({ isWishlistOpen: false }),
      toggleWishlist: () => set((s) => ({ isWishlistOpen: !s.isWishlistOpen })),

      bump: () => set((s) => ({ bumpKey: s.bumpKey + 1 })),

      count: () => get().ids.length,

      wishlistLines: () =>
        get()
          .ids.map((id) => getProductById(id))
          .filter((p): p is Product => Boolean(p)),
    }),
    {
      name: "resikku-wishlist",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ ids: s.ids }),
    }
  )
);

export { PRODUCTS };
