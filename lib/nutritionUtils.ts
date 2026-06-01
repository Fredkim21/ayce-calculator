import type { AYCEItem } from "@/lib/priceUtils";

export function getOrderCalories(
  quantities: Record<string, number>,
  items: AYCEItem[]
): number {
  return items.reduce((sum, item) => {
    return sum + (quantities[item.id] ?? 0) * item.nutrition.calories;
  }, 0);
}

export function getOrderProtein(
  quantities: Record<string, number>,
  items: AYCEItem[]
): number {
  return items.reduce((sum, item) => {
    return sum + (quantities[item.id] ?? 0) * item.nutrition.proteinG;
  }, 0);
}
