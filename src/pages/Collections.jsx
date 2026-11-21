import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import SectionHeading from "../components/SectionHeading";
import CategoryCard from "../components/CategoryCard";

export default function Collections() {
  const [cats, setCats] = useState([]);
  useEffect(() => {
    supabase.from("categories").select("*").order("display_order")
      .then(({ data }) => setCats(data || []));
  }, []);
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <SectionHeading eyebrow="BROWSE" title="Our Collections" subtitle="Curated for every occasion and every kind of love." />
      {cats.length === 0 ? (
        <p className="text-center text-espresso/60 py-12">Collections coming soon.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cats.map((c) => <CategoryCard key={c.id} category={c} />)}
        </div>
      )}
    </div>
  );
}