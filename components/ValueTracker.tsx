"use client";
import { useCalculatorStore } from "@/store/useCalculatorStore";
import { getOrderTotal, type AYCEItem } from "@/lib/priceUtils";
import { getOrderCalories, getOrderProtein } from "@/lib/nutritionUtils";
import OrderSummarySheet from "@/components/OrderSummarySheet";

interface Props {
  allItems: AYCEItem[];
}

export default function ValueTracker({ allItems }: Props) {
  const { quantities, pricingMode, buffetPrice, setBuffetPrice, reset } =
    useCalculatorStore();

  const total = getOrderTotal(quantities, allItems, pricingMode);
  const delta = total - buffetPrice;
  const deltaPercent = buffetPrice > 0 ? (delta / buffetPrice) * 100 : 0;
  const isAhead = delta >= 0;
  const calories = getOrderCalories(quantities, allItems);
  const protein = getOrderProtein(quantities, allItems);

  const modeLabel =
    pricingMode === "market"
      ? "Market"
      : pricingMode === "wholesale"
      ? "Restaurant Cost"
      : "À La Carte";

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col gap-4 sticky top-6 w-72 shrink-0">
        <TrackerCard
          total={total}
          delta={delta}
          deltaPercent={deltaPercent}
          isAhead={isAhead}
          calories={calories}
          protein={protein}
          buffetPrice={buffetPrice}
          setBuffetPrice={setBuffetPrice}
          modeLabel={modeLabel}
          allItems={allItems}
          reset={reset}
        />
      </aside>

      {/* Mobile sticky bottom bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#1e1e1e] border-t border-[#333] px-4 py-3 shadow-2xl">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div>
              <div className="text-xs text-[#888]">Value ({modeLabel})</div>
              <div className="text-lg font-bold text-[#f48c06]">
                ${total.toFixed(2)}
              </div>
            </div>
            <div className="w-px h-8 bg-[#333]" />
            <div>
              <div className="text-xs text-[#888]">vs. Buffet</div>
              <div
                className={`text-lg font-bold ${
                  isAhead ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {isAhead ? "+" : ""}${delta.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <OrderSummarySheet allItems={allItems} />
            <button
              onClick={reset}
              className="text-sm text-[#666] hover:text-red-400 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function TrackerCard({
  total,
  delta,
  deltaPercent,
  isAhead,
  calories,
  protein,
  buffetPrice,
  setBuffetPrice,
  modeLabel,
  allItems,
  reset,
}: {
  total: number;
  delta: number;
  deltaPercent: number;
  isAhead: boolean;
  calories: number;
  protein: number;
  buffetPrice: number;
  setBuffetPrice: (n: number) => void;
  modeLabel: string;
  allItems: AYCEItem[];
  reset: () => void;
}) {
  return (
    <div className="bg-[#242424] border border-[#333] rounded-2xl p-5 flex flex-col gap-5">
      <div>
        <div className="text-xs text-[#888] font-medium uppercase tracking-wider mb-1">
          Buffet Price Paid
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#888] text-lg">$</span>
          <input
            type="number"
            value={buffetPrice}
            onChange={(e) => setBuffetPrice(Number(e.target.value))}
            className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg px-3 py-2 text-lg font-bold text-white w-full focus:outline-none focus:border-[#e85d04] transition-colors"
            min={0}
            step={1}
          />
        </div>
      </div>

      <div className="border-t border-[#333] pt-4">
        <div className="text-xs text-[#888] mb-1">
          Estimated Value ({modeLabel})
        </div>
        <div className="text-3xl font-bold text-[#f48c06] font-display">
          ${total.toFixed(2)}
        </div>
      </div>

      {/* Delta — the money moment */}
      <div
        className={`rounded-xl p-4 text-center border ${
          isAhead
            ? "bg-emerald-950/40 border-emerald-600/30"
            : "bg-red-950/40 border-red-600/30"
        }`}
      >
        <div className="text-xs font-medium uppercase tracking-wider mb-1 text-[#888]">
          {isAhead ? "You're ahead" : "You're behind"}
        </div>
        <div
          className={`text-5xl font-bold font-display ${
            isAhead ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {isAhead ? "+" : ""}${Math.abs(delta).toFixed(2)}
        </div>
        <div
          className={`text-sm mt-1 ${
            isAhead ? "text-emerald-600" : "text-red-600"
          }`}
        >
          {isAhead ? "+" : ""}
          {deltaPercent.toFixed(1)}% vs. what you paid
        </div>
      </div>

      <div className="flex gap-3">
        <div className="flex-1 bg-[#1a1a1a] rounded-xl p-3 text-center border border-[#333]">
          <div className="text-xs text-[#888] mb-1">Calories</div>
          <div className="text-lg font-bold text-white">{calories.toLocaleString()}</div>
        </div>
        <div className="flex-1 bg-[#1a1a1a] rounded-xl p-3 text-center border border-[#333]">
          <div className="text-xs text-[#888] mb-1">Protein</div>
          <div className="text-lg font-bold text-white">{protein}g</div>
        </div>
      </div>

      <div className="flex gap-2">
        <OrderSummarySheet allItems={allItems} />
        <button
          onClick={reset}
          className="flex-1 text-sm py-2 rounded-lg bg-[#1a1a1a] border border-[#333] text-[#888] hover:text-red-400 hover:border-red-800 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
