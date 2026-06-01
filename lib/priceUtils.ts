import type { PricingMode } from "@/store/useCalculatorStore";

export interface AYCEItem {
  id: string;
  name: string;
  koreanName?: string;
  japaneseName?: string;
  tier: "top" | "high" | "mid";
  portionOz: number;
  portionGrams: number;
  pricing: {
    marketPerServing: number;
    wholesalePerServing: number;
    alaCartePerServing: number;
  };
  nutrition: { calories: number; proteinG: number; fatG: number };
  notes: string;
  image: string;
}

export function getItemPrice(item: AYCEItem, mode: PricingMode): number {
  switch (mode) {
    case "market":
      return item.pricing.marketPerServing;
    case "wholesale":
      return item.pricing.wholesalePerServing;
    case "alaCarte":
      return item.pricing.alaCartePerServing;
  }
}

export function getOrderTotal(
  quantities: Record<string, number>,
  items: AYCEItem[],
  mode: PricingMode
): number {
  return items.reduce((sum, item) => {
    const qty = quantities[item.id] ?? 0;
    return sum + qty * getItemPrice(item, mode);
  }, 0);
}
