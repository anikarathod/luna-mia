import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import SectionHeading from "../components/SectionHeading";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import { generalEnquiryLink } from "../lib/enquiry";

export default function Home() {
  const [content, setContent] = useState(null);
  const [categories, setCategories] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [bestsellers, setBestsellers] = useState([]);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    (async () => {
      const { data: hc } = await supabase.from("homepage_content").select("*").eq("id", 1).maybeSingle();
      setContent(hc);
      const { data: cats } = await supabase.from("categories").select("*").order("display_order");
      setCategories(cats || []);
      const { data: feat } = await supabase.from("products").select("*, product_images(image_url)").eq("is_featured", true).limit(4);
      setFeatured(feat || []);
      const { data: best } = await supabase.from("products").select("*, product_images(image_url)").eq("is_bestseller", true).limit(4);
      setBestsellers(best || []);
      const { data: gal } = await supabase.from("gallery_images").select("*").order("display_order").limit(6);
      setGallery(gal || []);
    })();
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[80vh] flex items-center justify-center text-center px-4">
        {content?.hero_image_url ? (
          <img src={content.hero_image_url} alt="" className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-beige via-rose/40 to-champagne/30" />
        )}
        <div className="absolute inset-0 bg-espresso/40" />
        <div className="relative z-10 max-w-2xl">
          <p className="text-champagne tracking-[0.4em] text-xs mb-4">LUNA MIA</p>
          <h1 className="font-serif text-4xl md:text-6xl text-cream leading-tight">
            {content?.hero_heading || "Thoughtful Gifts. Beautiful Moments."}
          </h1>
          <p className="text-cream/90 mt-6 max-w-lg mx-auto">
            {content?.hero_subtext || "Curated luxury gift hampers, handcrafted with love for every celebration and everyday surprise."}
          </p>
          <Link to="/shop" className="inline-block mt-8 bg-champagne text-espresso px-8 py-3 rounded-full text-sm tracking-wide hover:bg-cream transition">
            Explore Our Collection
          </Link>
        </div>
      </section>

      {/* CATEGORIES */}
      {categories.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-20">
          <SectionHeading eyebrow="CURATED FOR YOU" title="Shop by Category" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.slice(0, 8).map((c) => <CategoryCard key={c.id} category={c} />)}
          </div>
        </section>
      )}

      {/* FEATURED */}
      {featured.length > 0 && (
        <section className="bg-beige/40 py-20">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeading eyebrow="HANDPICKED" title="Featured Hampers" />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {featured.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* BESTSELLERS */}
      {bestsellers.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-20">
          <SectionHeading eyebrow="LOVED BY MANY" title="Bestselling Hampers" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {/* CUSTOM PROMO */}
      <section className="bg-chocolate text-cream py-20">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-champagne tracking-[0.3em] text-xs mb-3">MADE FOR YOU</p>
            <h2 className="font-serif text-3xl md:text-4xl">
              {content?.promo_heading || "Create a Custom Gift Hamper"}
            </h2>
            <p className="mt-4 text-cream/80">
              {content?.promo_text || "Personalise every detail — from the box to the message. Tell us the occasion and we'll curate something unforgettable."}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/custom" className="bg-champagne text-espresso px-7 py-3 rounded-full text-sm hover:bg-cream transition">Learn More</Link>
              <a href={generalEnquiryLink("Hi LUNA MIA! I'd like to discuss a custom hamper.")} className="border border-cream text-cream px-7 py-3 rounded-full text-sm hover:bg-cream hover:text-chocolate transition">Email Us</a>
            </div>
          </div>
          {content?.promo_image_url && (
            <img src={content.promo_image_url} alt="" className="rounded-2xl w-full object-cover aspect-square" />
          )}
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <SectionHeading eyebrow="OUR STORY" title="A Little Luxury in Every Gift" />
        <p className="text-espresso/80 leading-relaxed">
          LUNA MIA was born from a love of beautiful things and thoughtful gestures. Every hamper is curated with intention — elegant packaging, premium products, and a personal touch that turns a gift into a memory.
        </p>
        <Link to="/about" className="inline-block mt-8 btn-outline">Read Our Story</Link>
      </section>

      {/* GALLERY */}
      {gallery.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-20">
          <SectionHeading eyebrow="@LUNAMIA" title="Follow Our Journey" />
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {gallery.map((g) => (
              <div key={g.id} className="aspect-square overflow-hidden rounded-lg bg-beige">
                <img src={g.image_url} alt="" loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-rose/30 py-16 text-center px-6">
        <h2 className="font-serif text-3xl text-chocolate">Have a Question?</h2>
        <p className="text-espresso/70 mt-3">We'd love to help you find the perfect gift.</p>
        <a href={generalEnquiryLink()} className="inline-block mt-6 btn-primary">Email Us</a>
      </section>
    </>
  );
}