"use client";
import { useCalculatorStore, type ActiveTier } from "@/store/useCalculatorStore";

const tiers: { value: ActiveTier; label: string; emoji: string; price: string }[] = [
  { value: "top", label: "Top Tier", emoji: "🏆", price: "$65+/person" },
  { value: "high", label: "High Tier", emoji: "⭐", price: "$45–$65/person" },
  { value: "mid", label: "Mid Tier", emoji: "🍖", price: "$25–$45/person" },
];

export default function TierSelector() {
  const { activeTier, setTier } = useCalculatorStore();

  return (
    <div className="flex gap-2 flex-wrap">
      {tiers.map((tier) => {
        const active = activeTier === tier.value;
        return (
          <button
            key={tier.value}
            onClick={() => setTier(tier.value)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border ${
              active
                ? "bg-[#e85d04] border-[#e85d04] text-white shadow-lg shadow-orange-900/40"
                : "bg-[#2d2d2d] border-[#3a3a3a] text-[#aaa] hover:border-[#e85d04] hover:text-white"
            }`}
          >
            <span>{tier.emoji}</span>
            <span>{tier.label}</span>
            <span
              className={`text-xs ${active ? "text-orange-200" : "text-[#666]"}`}
            >
              {tier.price}
            </span>
          </button>
        );
      })}
    </div>
  );
}
