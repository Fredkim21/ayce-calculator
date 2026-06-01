import CalculatorLayout from "@/components/CalculatorLayout";
import data from "@/data/ayce-data.json";

export default function SushiPage() {
  return (
    <CalculatorLayout
      title="Sushi Calculator"
      subtitle="Otoro. Uni. Wagyu nigiri. Count every piece and see if the chef broke even on you."
      categories={data.sushi.categories as any}
    />
  );
}
