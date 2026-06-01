import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <nav className="border-b border-[#2d2d2d] px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-bold text-[#f48c06] text-lg tracking-tight"
        >
          AYCE<span className="text-[#888] font-normal text-sm ml-1">calculator</span>
        </Link>
        <div className="flex gap-4 text-sm text-[#666]">
          <Link href="/calculator/kbbq" className="hover:text-[#888]">KBBQ</Link>
          <Link href="/calculator/hotpot" className="hover:text-[#888]">Hot Pot</Link>
          <Link href="/calculator/sushi" className="hover:text-[#888]">Sushi</Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1
          className="text-4xl font-bold text-[#f5f0eb] mb-3"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Data, Methodology & Sources
        </h1>
        <p className="text-[#888] mb-10 text-sm">
          This tool estimates the real-world value of what you eat at AYCE restaurants.
          Here&apos;s exactly where every number comes from.
        </p>

        <Section title="Market Price Sources">
          <p>
            Prices averaged from H Mart weekly ads and digital pricing, Costco unit pricing,
            Whole Foods seafood counter, and Seattle Pike Place Market City Fish posted rates.
            USDA Agricultural Marketing Service Weekly Retail Beef Feature Activity Reports
            (May 2026) used for standardized beef benchmarks — bone-in ribeye averaged
            $11.34/lb, short ribs $8.92/lb. Wagyu data from Wagyu Handbook price guide
            (February 2026) and LatestCost.com (2026). Sea urchin (uni) retail range
            $16.44–$48.86/lb from Selinawamucii.com (April 2026). All prices converted to
            per-serving using typical AYCE portion weights.
          </p>
        </Section>

        <Section title="Restaurant Cost Sources">
          <p>
            Estimated at 28–35% of retail, consistent with industry food cost ratios.
            Circle J Meat wholesale pricing guide (December 2025): high-value cuts (ribeye,
            tenderloin) $8–12/lb wholesale, middle meats (brisket, sirloin) $4–7/lb.
            National Restaurant Association benchmarks for food cost as a percentage of
            revenue.
          </p>
        </Section>

        <Section title="À La Carte Sources">
          <p>
            Menu survey of comparable restaurants in LA, NYC, Houston, and Chicago via
            Yelp and public menus (2025–2026). NYC AYCE KBBQ ranges $47–$52/person for
            high-tier sets (Time Out New York, 2025). Uni nigiri à la carte $9.25–$12.95
            per 2pc surveyed from US sushi bars.
          </p>
        </Section>

        <Section title="Nutrition Sources">
          <p>
            USDA FoodData Central SR Legacy database (fdc.nal.usda.gov). Atlantic salmon:
            142 cal / 19.8g protein per 100g. Supplemented by Cronometer and KimEcopak
            Korean BBQ Calorie Guide (March 2026). All values are estimates for typical
            AYCE portion sizes — actual servings vary by restaurant.
          </p>
        </Section>

        <Section title="Tier Price Ranges">
          <p>
            Based on survey of AYCE restaurant pricing across US metros. Mid Tier reference:
            Gogi BBQ Chicago ($27–$33/person), Bon KBBQ Houston ($29.99/person). High Tier
            reference: NYC AYCE spots ($47–$52/person, Time Out NY 2025). Top Tier: premium
            omakase-adjacent AYCE with A5 wagyu and live seafood ($65+).
          </p>
        </Section>

        <Section title="How the Three Pricing Modes Work">
          <div className="space-y-3 text-sm">
            <div className="bg-[#242424] border border-[#333] rounded-xl p-4">
              <div className="font-semibold text-[#f48c06] mb-1">Market Price</div>
              <p className="text-[#aaa]">
                The retail consumer price per serving if you were to buy the ingredient
                yourself at H Mart, Costco, or Whole Foods. Reflects the raw ingredient
                value you&apos;re receiving — no labor, no ambiance, no overhead.
              </p>
            </div>
            <div className="bg-[#242424] border border-[#333] rounded-xl p-4">
              <div className="font-semibold text-[#f48c06] mb-1">Restaurant Cost</div>
              <p className="text-[#aaa]">
                Estimated at 28–35% of retail, which aligns with NRA food cost benchmarks.
                This is roughly what the restaurant pays their supplier for the ingredient —
                not the sale price, just the food cost. It answers: &ldquo;Are you costing
                them more than a typical customer?&rdquo;
              </p>
            </div>
            <div className="bg-[#242424] border border-[#333] rounded-xl p-4">
              <div className="font-semibold text-[#f48c06] mb-1">À La Carte</div>
              <p className="text-[#aaa]">
                What this item would cost if you ordered it individually at a comparable
                restaurant. Surveys from LA, NYC, Houston, and Chicago menus (2025–2026).
                Best for answering: &ldquo;Did I get a deal vs. ordering normally?&rdquo;
              </p>
            </div>
          </div>
        </Section>

        <Section title="Disclaimer">
          <div className="bg-red-950/20 border border-red-900/30 rounded-xl p-4 text-sm text-[#aaa]">
            This tool is for fun and general estimation only. Prices fluctuate with market
            conditions, region, and season. Restaurant wholesale costs are estimates based
            on industry averages, not proprietary supplier data. Nutrition values are based
            on raw ingredient data and may differ from prepared dishes. Not financial or
            dietary advice.
          </div>
        </Section>
      </main>

      <footer className="border-t border-[#2d2d2d] px-6 py-4 text-center text-xs text-[#444]">
        Built with Next.js 14 · Data current as of May 2026
      </footer>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2
        className="text-xl font-bold text-[#f5f0eb] mb-3 pb-2 border-b border-[#2d2d2d]"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        {title}
      </h2>
      <div className="text-[#aaa] text-sm leading-relaxed">{children}</div>
    </section>
  );
}
