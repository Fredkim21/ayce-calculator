"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TierSelector from "@/components/TierSelector";
import PriceModeToggle from "@/components/PriceModeToggle";
import CategorySection from "@/components/CategorySection";
import ValueTracker from "@/components/ValueTracker";
import type { AYCEItem } from "@/lib/priceUtils";

interface Category {
  id: string;
  name: string;
  emoji: string;
  items: AYCEItem[];
}

interface Props {
  title: string;
  subtitle: string;
  categories: Category[];
}

const tabs = [
  { href: "/calculator/kbbq", label: "🥩 KBBQ" },
  { href: "/calculator/hotpot", label: "🍲 Hot Pot" },
  { href: "/calculator/sushi", label: "🍣 Sushi" },
];

export default function CalculatorLayout({ title, subtitle, categories }: Props) {
  const pathname = usePathname();
  const allItems = categories.flatMap((c) => c.items);

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Top nav */}
      <nav className="border-b border-[#2d2d2d] bg-[#1e1e1e] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
          <Link
            href="/"
            className="font-display font-bold text-[#f48c06] text-lg tracking-tight"
          >
            AYCE<span className="text-[#888] font-normal text-sm ml-1">calculator</span>
          </Link>
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  pathname === tab.href
                    ? "bg-[#e85d04] text-white"
                    : "text-[#888] hover:text-white"
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </div>
          <Link href="/about" className="text-xs text-[#555] hover:text-[#888]">
            About
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="font-display text-3xl font-bold text-[#f5f0eb] mb-1">
            {title}
          </h1>
          <p className="text-[#888] text-sm">{subtitle}</p>
        </div>

        {/* Controls */}
        <div className="mb-6 space-y-4">
          <TierSelector />
          <PriceModeToggle />
        </div>

        {/* Category nav — horizontal scroll on mobile */}
        <div className="mb-6 overflow-x-auto pb-2">
          <div className="flex gap-2 min-w-max">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2d2d2d] text-[#aaa] text-sm hover:bg-[#333] hover:text-white transition-colors"
              >
                <span>{cat.emoji}</span>
                <span>{cat.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Main grid: items + tracker */}
        <div className="flex gap-6 items-start">
          <div className="flex-1 min-w-0">
            {categories.map((category) => (
              <CategorySection key={category.id} category={category} />
            ))}
          </div>
          <ValueTracker allItems={allItems} />
        </div>
      </div>

      {/* Mobile bottom padding so tracker bar doesn't overlap content */}
      <div className="lg:hidden h-24" />
    </div>
  );
}
