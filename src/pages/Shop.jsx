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
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20 min-h-[70vh]">
      <SectionHeading eyebrow="THE COLLECTION" title="Our Gift Hampers" />
      
      {/* Elegant Category Filters */}
      <div className="flex flex-wrap gap-2 justify-center mb-10 md:mb-14">
        <button
          onClick={() => setParams({})}
          className={`px-5 py-2 rounded-full text-[11px] md:text-xs tracking-wider uppercase transition-all duration-300 border ${
            !activeCat 
              ? "bg-chocolate text-cream border-chocolate shadow-md" 
              : "border-chocolate/20 text-chocolate hover:bg-chocolate/5"
          }`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setParams({ category: c.slug })}
            className={`px-5 py-2 rounded-full text-[11px] md:text-xs tracking-wider uppercase transition-all duration-300 border ${
              activeCat === c.slug 
                ? "bg-chocolate text-cream border-chocolate shadow-md" 
                : "border-chocolate/20 text-chocolate hover:bg-chocolate/5"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-20">
          <p className="text-champagne font-serif text-2xl animate-pulse">Curating collection...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-soft">
          <p className="text-espresso/60 font-serif text-xl mb-4">No hampers in this collection yet.</p>
          <button onClick={() => setParams({})} className="btn-outline">View All Hampers</button>
        </div>
      ) : (
        /* 2 cols on mobile, 3 on tablet, 4 on large desktop */
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
          
          {/* Placeholder Card so grid doesn't look empty while you add products */}
          <div className="bg-cream/40 border border-champagne/30 rounded-2xl flex flex-col items-center justify-center p-6 text-center h-full min-h-[300px] md:min-h-[400px]">
            <span className="text-champagne text-3xl mb-3">✦</span>
            <p className="font-serif text-chocolate text-lg">More Hampers</p>
            <p className="text-xs text-espresso/50 mt-1 uppercase tracking-widest">Coming Soon</p>
          </div>
        </div>
      )}
    </div>
  );
}