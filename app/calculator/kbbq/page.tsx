import CalculatorLayout from "@/components/CalculatorLayout";
import data from "@/data/ayce-data.json";

export default function KBBQPage() {
  return (
    <CalculatorLayout
      title="Korean BBQ Calculator"
      subtitle="Track every cut you grill. Find out if you earned your seat at the fire."
      categories={data.kbbq.categories as any}
    />
  );
}
