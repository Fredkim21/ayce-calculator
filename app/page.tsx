import Link from "next/link";

const calculators = [
  {
    href: "/calculator/kbbq",
    emoji: "🥩",
    title: "Korean BBQ",
    description:
      "A5 Wagyu, galbi, samgyeopsal. Track every cut you grill and see if you beat the AYCE price.",
    color: "from-orange-950/50 to-red-950/40",
    border: "border-orange-800/30 hover:border-orange-600/60",
    cta: "Start tracking KBBQ",
  },
  {
    href: "/calculator/hotpot",
    emoji: "🍲",
    title: "Hot Pot",
    description:
      "Live clams, wagyu slices, enoki. Everything you dip in the broth, counted.",
    color: "from-amber-950/50 to-orange-950/40",
    border: "border-amber-800/30 hover:border-amber-600/60",
    cta: "Start tracking Hot Pot",
  },
  {
    href: "/calculator/sushi",
    emoji: "🍣",
    title: "Sushi",
    description:
      "Otoro, uni, wagyu nigiri. Piece by piece, find out if the chef broke even on you.",
    color: "from-blue-950/50 to-indigo-950/40",
    border: "border-blue-800/30 hover:border-blue-600/60",
    cta: "Start tracking Sushi",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col">
      {/* Nav */}
      <nav className="border-b border-[#2d2d2d] px-6 py-4 flex items-center justify-between">
        <span className="font-bold text-[#f48c06] text-lg tracking-tight">
          AYCE<span className="text-[#888] font-normal text-sm ml-1">calculator</span>
        </span>
        <Link href="/about" className="text-sm text-[#555] hover:text-[#888]">
          About & Sources
        </Link>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="text-6xl mb-6">🔥</div>
          <h1 className="text-5xl sm:text-6xl font-bold text-[#f5f0eb] leading-tight mb-6"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Am I Eating My{" "}
            <span className="text-[#f48c06]">Money&apos;s Worth?</span>
          </h1>
          <p className="text-[#aaa] text-lg mb-4 leading-relaxed">
            You paid the AYCE price. Now find out if you actually earned it.
          </p>
          <p className="text-[#666] text-sm mb-12">
            Track every order. Compare to market price, restaurant cost, or à la carte.
            The delta tells you everything.
          </p>

          {/* Three pricing modes explained */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14 text-sm">
            {[
              { label: "Market Price", desc: "What you'd pay at H Mart / Costco" },
              { label: "Restaurant Cost", desc: "~30% of retail, what they pay" },
              { label: "À La Carte", desc: "If you ordered it off the menu" },
            ].map((m) => (
              <div
                key={m.label}
                className="flex-1 bg-[#242424] border border-[#333] rounded-xl px-4 py-3 max-w-xs mx-auto sm:mx-0"
              >
                <div className="font-semibold text-[#f48c06] mb-1">{m.label}</div>
                <div className="text-[#888]">{m.desc}</div>
              </div>
            ))}
          </div>

          {/* Calculator cards */}
          <div className="grid sm:grid-cols-3 gap-4">
            {calculators.map((calc) => (
              <Link
                key={calc.href}
                href={calc.href}
                className={`bg-linear-to-br ${calc.color} border ${calc.border} rounded-2xl p-6 text-left transition-all duration-200 hover:scale-[1.02] hover:shadow-xl group`}
              >
                <div className="text-4xl mb-3">{calc.emoji}</div>
                <h2 className="text-xl font-bold text-[#f5f0eb] mb-2"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  {calc.title}
                </h2>
                <p className="text-[#888] text-sm mb-4 leading-relaxed">
                  {calc.description}
                </p>
                <div className="text-[#f48c06] text-sm font-semibold group-hover:underline">
                  {calc.cta} →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tier explainer */}
      <section className="border-t border-[#2d2d2d] px-6 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#f5f0eb] mb-6"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Three Tiers, Priced to Match Your Spot
          </h2>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            {[
              {
                emoji: "🏆",
                label: "Top Tier",
                price: "$65+/person",
                desc: "A5 Wagyu, otoro, uni, live shellfish",
              },
              {
                emoji: "⭐",
                label: "High Tier",
                price: "$45–$65/person",
                desc: "Prime cuts, American wagyu, hamachi, scallop",
              },
              {
                emoji: "🍖",
                label: "Mid Tier",
                price: "$25–$45/person",
                desc: "Standard AYCE cuts, salmon nigiri, California rolls",
              },
            ].map((t) => (
              <div
                key={t.label}
                className="bg-[#242424] border border-[#333] rounded-xl p-4"
              >
                <div className="text-2xl mb-2">{t.emoji}</div>
                <div className="font-semibold text-[#f5f0eb]">{t.label}</div>
                <div className="text-[#f48c06] text-xs mb-2">{t.price}</div>
                <div className="text-[#888]">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-[#2d2d2d] px-6 py-4 text-center text-xs text-[#444]">
        Estimates only. Prices vary by region and season.{" "}
        <Link href="/about" className="underline hover:text-[#888]">
          Full methodology
        </Link>
      </footer>
    </div>
  );
}
