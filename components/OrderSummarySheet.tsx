"use client";
import { useState } from "react";
import { useCalculatorStore } from "@/store/useCalculatorStore";
import { getItemPrice, type AYCEItem } from "@/lib/priceUtils";

interface Props {
  allItems: AYCEItem[];
}

export default function OrderSummarySheet({ allItems }: Props) {
  const [open, setOpen] = useState(false);
  const { quantities, pricingMode, reset } = useCalculatorStore();

  const orderedItems = allItems
    .filter((item) => (quantities[item.id] ?? 0) > 0)
    .map((item) => ({
      item,
      qty: quantities[item.id],
      subtotal: quantities[item.id] * getItemPrice(item, pricingMode),
    }));

  const total = orderedItems.reduce((s, r) => s + r.subtotal, 0);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="text-sm underline text-[#f48c06] hover:text-[#e85d04] transition-colors whitespace-nowrap"
      >
        View Order ({orderedItems.length})
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* Sheet */}
      <div className="relative bg-[#1e1e1e] border border-[#333] rounded-t-2xl sm:rounded-2xl w-full max-w-lg max-h-[80vh] flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-[#333]">
          <h3 className="font-display text-lg font-bold text-[#f5f0eb]">
            Your Order
          </h3>
          <button
            onClick={() => setOpen(false)}
            className="text-[#888] hover:text-white text-xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-5 py-3 space-y-2">
          {orderedItems.length === 0 ? (
            <p className="text-[#888] text-sm py-6 text-center">
              Nothing ordered yet.
            </p>
          ) : (
            orderedItems.map(({ item, qty, subtotal }) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-2 border-b border-[#2a2a2a]"
              >
                <div>
                  <div className="text-sm text-[#f5f0eb]">{item.name}</div>
                  <div className="text-xs text-[#666]">× {qty}</div>
                </div>
                <div className="text-sm font-semibold text-[#f48c06]">
                  ${subtotal.toFixed(2)}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="px-5 py-4 border-t border-[#333] flex items-center justify-between gap-3">
          <div>
            <div className="text-[#888] text-xs">Total value</div>
            <div className="text-xl font-bold text-[#f48c06]">
              ${total.toFixed(2)}
            </div>
          </div>
          <button
            onClick={() => {
              reset();
              setOpen(false);
            }}
            className="px-4 py-2 rounded-lg bg-[#333] text-[#aaa] text-sm hover:bg-red-900/40 hover:text-red-300 transition-colors"
          >
            Reset All
          </button>
        </div>
      </div>
    </div>
  );
}
