"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Product } from "@/lib/products";
import { PRODUCTS, getProductById } from "@/lib/products";

export interface CartItem {
  id: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  cartBumpKey: number;
  // actions
  add: (productId: number, qty?: number) => void;
  addBundle: (productIds: number[]) => void;
  remove: (productId: number) => void;
  updateQty: (productId: number, delta: number) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  bump: () => void;
  // selectors (computed in components via hooks)
  totalCount: () => number;
  subtotal: () => number;
  cartLines: () => Array<{ product: Product; quantity: number }>;
  freeShippingThreshold: number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      cartBumpKey: 0,
      freeShippingThreshold: 150_000,

      add: (productId, qty = 1) => {
        const items = get().items;
        const existing = items.find((i) => i.id === productId);
        if (existing) {
          set({
            items: items.map((i) =>
              i.id === productId ? { ...i, quantity: i.quantity + qty } : i
            ),
          });
        } else {
          set({ items: [...items, { id: productId, quantity: qty }] });
        }
        get().bump();
      },

      addBundle: (productIds) => {
        const items = get().items;
        const next = [...items];
        for (const id of productIds) {
          const existing = next.find((i) => i.id === id);
          if (existing) {
            existing.quantity += 1;
          } else {
            next.push({ id, quantity: 1 });
          }
        }
        set({ items: next });
        get().bump();
      },

      remove: (productId) =>
        set({ items: get().items.filter((i) => i.id !== productId) }),

      updateQty: (productId, delta) => {
        const items = get().items;
        const next = items
          .map((i) =>
            i.id === productId ? { ...i, quantity: i.quantity + delta } : i
          )
          .filter((i) => i.quantity > 0);
        set({ items: next });
      },

      clear: () => set({ items: [] }),

      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleCart: () => set((s) => ({ isCartOpen: !s.isCartOpen })),

      bump: () => set((s) => ({ cartBumpKey: s.cartBumpKey + 1 })),

      totalCount: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),

      subtotal: () =>
        get().items.reduce((sum, i) => {
          const p = getProductById(i.id);
          return sum + (p ? p.price * i.quantity : 0);
        }, 0),

      cartLines: () =>
        get()
          .items.map((i) => {
            const product = getProductById(i.id);
            return product ? { product, quantity: i.quantity } : null;
          })
          .filter((x): x is { product: Product; quantity: number } => x !== null),
    }),
    {
      name: "resikku-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ items: s.items }),
    }
  )
);

export { PRODUCTS };
