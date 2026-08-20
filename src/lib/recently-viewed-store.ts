"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface RecentlyViewedState {
  productIds: number[];
  addView: (productId: number) => void;
  clear: () => void;
}

const MAX_ITEMS = 6;

export const useRecentlyViewed = create<RecentlyViewedState>()(
  persist(
    (set, get) => ({
      productIds: [],

      addView: (productId) => {
        const current = get().productIds.filter((id) => id !== productId);
        set({ productIds: [productId, ...current].slice(0, MAX_ITEMS) });
      },

      clear: () => set({ productIds: [] }),
    }),
    {
      name: "resikku-recently-viewed",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ productIds: s.productIds }),
    }
  )
);
