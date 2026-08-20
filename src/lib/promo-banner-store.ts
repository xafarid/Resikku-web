"use client";

import { create } from "zustand";

interface PromoBannerState {
  isBannerVisible: boolean;
  setBannerVisible: (visible: boolean) => void;
}

export const usePromoBanner = create<PromoBannerState>((set) => ({
  isBannerVisible: true,
  setBannerVisible: (visible) => set({ isBannerVisible: visible }),
}));
