"use client";
import { useCalculatorStore, type ActiveTier } from "@/store/useCalculatorStore";
import ItemCard from "@/components/ItemCard";
import type { AYCEItem } from "@/lib/priceUtils";

interface Category {
  id: string;
  name: string;
  emoji: string;
  items: AYCEItem[];
}

const tierOrder = { top: 0, high: 1, mid: 2 };

function tierIncludes(activeTier: ActiveTier, itemTier: AYCEItem["tier"]): boolean {
  return tierOrder[itemTier] >= tierOrder[activeTier];
}

export default function CategorySection({ category }: { category: Category }) {
  const { activeTier } = useCalculatorStore();
  const visibleItems = category.items.filter((item) =>
    tierIncludes(activeTier, item.tier)
  );

  if (visibleItems.length === 0) return null;

  return (
    <section id={category.id} className="mb-8">
      <h2 className="text-lg font-bold text-[#f5f0eb] mb-4 flex items-center gap-2">
        <span>{category.emoji}</span>
        <span>{category.name}</span>
        <span className="text-[#555] text-sm font-normal">
          ({visibleItems.length} items)
        </span>
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {visibleItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
