"use client";
import { create } from "zustand";

export type PricingMode = "market" | "wholesale" | "alaCarte";
export type ActiveTier = "top" | "high" | "mid";
export type ActiveTab = "kbbq" | "hotpot" | "sushi";

interface CalculatorStore {
  quantities: Record<string, number>;
  pricingMode: PricingMode;
  activeTier: ActiveTier;
  buffetPrice: number;
  activeTab: ActiveTab;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  reset: () => void;
  setBuffetPrice: (price: number) => void;
  setPricingMode: (mode: PricingMode) => void;
  setTier: (tier: ActiveTier) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const useCalculatorStore = create<CalculatorStore>((set) => ({
  quantities: {},
  pricingMode: "market",
  activeTier: "mid",
  buffetPrice: 45,
  activeTab: "kbbq",

  increment: (id) =>
    set((state) => ({
      quantities: { ...state.quantities, [id]: (state.quantities[id] ?? 0) + 1 },
    })),

  decrement: (id) =>
    set((state) => {
      const current = state.quantities[id] ?? 0;
      if (current <= 0) return state;
      const next = { ...state.quantities, [id]: current - 1 };
      if (next[id] === 0) delete next[id];
      return { quantities: next };
    }),

  reset: () => set({ quantities: {} }),

  setBuffetPrice: (price) => set({ buffetPrice: price }),

  setPricingMode: (mode) => set({ pricingMode: mode }),

  setTier: (tier) => set({ activeTier: tier }),

  setActiveTab: (tab) => set({ activeTab: tab }),
}));
