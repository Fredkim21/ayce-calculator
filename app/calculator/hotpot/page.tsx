import CalculatorLayout from "@/components/CalculatorLayout";
import data from "@/data/ayce-data.json";

export default function HotPotPage() {
  return (
    <CalculatorLayout
      title="Hot Pot Calculator"
      subtitle="Every protein, mushroom, and noodle you drop in. Did the broth pay off?"
      categories={data.hotpot.categories as any}
    />
  );
}
