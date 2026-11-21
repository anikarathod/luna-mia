import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import ProductCard from "../components/ProductCard";
import SectionHeading from "../components/SectionHeading";

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const activeCat = params.get("category") || "";

  useEffect(() => {
    supabase.from("categories").select("*").order("display_order")
      .then(({ data }) => setCategories(data || []));
  }, []);

  useEffect(() => {
    setLoading(true);
    supabase
      .from("products")
      .select("*, product_images(image_url), categories(slug)")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        let filtered = data || [];
        if (activeCat) filtered = filtered.filter((p) => p.categories?.slug === activeCat);
        setProducts(filtered);
        setLoading(false);
      });
  }, [activeCat]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <SectionHeading eyebrow="THE COLLECTION" title="Our Gift Hampers" />
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        <button
          onClick={() => setParams({})}
          className={`px-4 py-2 rounded-full text-xs border transition ${!activeCat ? "bg-chocolate text-cream border-chocolate" : "border-chocolate/40 text-chocolate hover:bg-chocolate/5"}`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setParams({ category: c.slug })}
            className={`px-4 py-2 rounded-full text-xs border transition ${activeCat === c.slug ? "bg-chocolate text-cream border-chocolate" : "border-chocolate/40 text-chocolate hover:bg-chocolate/5"}`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-center text-espresso/60">Loading…</p>
      ) : products.length === 0 ? (
        <p className="text-center text-espresso/60 py-20">No hampers in this collection yet.</p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}