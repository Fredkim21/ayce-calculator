"use client";
import Image from "next/image";
import { useCalculatorStore } from "@/store/useCalculatorStore";
import { getItemPrice, type AYCEItem } from "@/lib/priceUtils";

const tierStyles = {
  top: {
    badge: "bg-amber-400/20 text-amber-300 border border-amber-400/30",
    label: "TOP",
  },
  high: {
    badge: "bg-blue-400/20 text-blue-300 border border-blue-400/30",
    label: "HIGH",
  },
  mid: {
    badge: "bg-stone-400/20 text-stone-300 border border-stone-400/30",
    label: "MID",
  },
};

export default function ItemCard({ item }: { item: AYCEItem }) {
  const { quantities, pricingMode, increment, decrement } = useCalculatorStore();
  const qty = quantities[item.id] ?? 0;
  const price = getItemPrice(item, pricingMode);
  const tier = tierStyles[item.tier];
  const subtitle = item.koreanName ?? (item as any).japaneseName;
  const seed = item.id.split("").reduce((h, c, i) => h + c.charCodeAt(0) * (i + 7), 0);
  const imageUrl = `https://loremflickr.com/400/300/${encodeURIComponent(item.image)}?lock=${seed}`;

  return (
    <div
      className={`bg-[#242424] border rounded-xl overflow-hidden flex flex-col transition-all duration-200 ${
        qty > 0
          ? "border-[#e85d04]/60 shadow-lg shadow-orange-950/30"
          : "border-[#333]"
      }`}
    >
      {/* Food photo */}
      <div className="relative w-full h-[140px] bg-[#1a1a1a] overflow-hidden">
        <Image
          src={imageUrl}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          loading="lazy"
          unoptimized
        />
        <span
          className={`absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${tier.badge}`}
        >
          {tier.label}
        </span>
        {qty > 0 && (
          <div className="absolute top-2 left-2 bg-[#e85d04] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
            {qty}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col gap-2 flex-1">
        <div>
          <div className="font-semibold text-sm leading-tight text-[#f5f0eb]">
            {item.name}
          </div>
          {subtitle && (
            <div className="text-xs text-[#888] mt-0.5">{subtitle}</div>
          )}
        </div>

        <div className="flex items-center gap-1 flex-wrap">
          <span className="text-xs bg-[#1a1a1a] text-[#aaa] px-2 py-0.5 rounded-full border border-[#333]">
            {item.nutrition.calories} cal
          </span>
          <span className="text-xs bg-[#1a1a1a] text-[#aaa] px-2 py-0.5 rounded-full border border-[#333]">
            {item.nutrition.proteinG}g protein
          </span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-1">
          <span className="text-[#f48c06] font-bold text-sm">
            ${price.toFixed(2)}
            <span className="text-[#666] font-normal text-xs">/serving</span>
          </span>

          {/* Stepper */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => decrement(item.id)}
              disabled={qty === 0}
              className="w-7 h-7 rounded-full bg-[#333] text-white text-lg leading-none flex items-center justify-center hover:bg-[#e85d04] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              −
            </button>
            <span className="w-5 text-center text-sm font-semibold">{qty}</span>
            <button
              onClick={() => increment(item.id)}
              className="w-7 h-7 rounded-full bg-[#e85d04] text-white text-lg leading-none flex items-center justify-center hover:bg-[#f48c06] transition-colors"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
