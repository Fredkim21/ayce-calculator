"use client";
import { useCalculatorStore, type PricingMode } from "@/store/useCalculatorStore";

const modes: { value: PricingMode; label: string; description: string }[] = [
  { value: "market", label: "Market Price", description: "Retail (H Mart, Costco)" },
  { value: "wholesale", label: "Restaurant Cost", description: "~30% of retail" },
  { value: "alaCarte", label: "À La Carte", description: "Comparable restaurant" },
];

export default function PriceModeToggle() {
  const { pricingMode, setPricingMode } = useCalculatorStore();

  return (
    <div className="flex bg-[#242424] rounded-xl p-1 gap-1">
      {modes.map((mode) => {
        const active = pricingMode === mode.value;
        return (
          <button
            key={mode.value}
            onClick={() => setPricingMode(mode.value)}
            className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all text-center ${
              active
                ? "bg-[#e85d04] text-white shadow-md"
                : "text-[#888] hover:text-white"
            }`}
          >
            <div>{mode.label}</div>
            <div className={`text-xs mt-0.5 ${active ? "text-orange-200" : "text-[#555]"}`}>
              {mode.description}
            </div>
          </button>
        );
      })}
    </div>
  );
}
