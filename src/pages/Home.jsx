import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import SectionHeading from "../components/SectionHeading";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import { generalEnquiryLink } from "../lib/enquiry";
import Box3D from "../components/Box3D"; // <-- Changed to the new 3D Box

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
      <section className="relative min-h-[65vh] md:min-h-[85vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-gradient-to-b from-[#F6F0E7] to-[#E6D8C8]">
        
        {/* 3D Floating Box */}
        <Box3D />

        {/* Text Content */}
        <div className="relative z-10 max-w-3xl mt-6 md:mt-10 pointer-events-none">
          <p className="text-chocolate tracking-[0.5em] text-[10px] md:text-xs mb-4 md:mb-6 animate-slide-up font-medium">
            LUNA MIA
          </p>
          <h1 className="font-serif text-4xl md:text-7xl text-chocolate leading-[1.2] md:leading-[1.1] animate-slide-up delay-100">
            {content?.hero_heading || "Thoughtful Gifts. Beautiful Moments."}
          </h1>
          <p className="text-espresso/80 text-sm md:text-xl mt-4 md:mt-6 max-w-xl mx-auto font-light leading-relaxed animate-slide-up delay-200 px-4">
            {content?.hero_subtext || "Curated luxury gift hampers, handcrafted with love for every celebration and everyday surprise."}
          </p>
          <div className="mt-6 md:mt-10 animate-slide-up delay-300 pointer-events-auto">
            <Link to="/shop" className="inline-block bg-chocolate text-cream px-6 py-3 md:px-10 md:py-4 rounded-full text-[11px] md:text-sm tracking-widest uppercase hover:bg-espresso hover:-translate-y-1 transition-all duration-300 shadow-xl">
              Explore Our Collection
            </Link>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      {categories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20 animate-fade-up">
          <SectionHeading eyebrow="CURATED FOR YOU" title="Shop by Category" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {categories.slice(0, 8).map((c) => <CategoryCard key={c.id} category={c} />)}
          </div>
        </section>
      )}

      {/* FEATURED */}
      {featured.length > 0 && (
        <section className="bg-beige/40 py-12 md:py-20 animate-fade-up">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <SectionHeading eyebrow="HANDPICKED" title="Featured Hampers" />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
              {featured.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* BESTSELLERS */}
      {bestsellers.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20 animate-fade-up">
          <SectionHeading eyebrow="LOVED BY MANY" title="Bestselling Hampers" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {bestsellers.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {/* CUSTOM PROMO - Full Width Banner */}
      <section className="relative min-h-[400px] md:min-h-[600px] flex items-center animate-fade-up overflow-hidden">
        {/* Background Image */}
        {content?.promo_image_url ? (
          <img 
            src={content.promo_image_url} 
            alt="Custom Gift Hamper" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-chocolate" />
        )}
        
        {/* Dark Gradient Overlay - Fades from left to right for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/95 via-espresso/70 to-transparent md:via-espresso/50" />

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full py-12 md:py-16">
          <div className="max-w-lg">
            <p className="text-champagne tracking-[0.3em] text-[10px] md:text-xs mb-3 md:mb-4 font-medium uppercase">
              Made For You
            </p>
            <h2 className="font-serif text-3xl md:text-6xl text-cream leading-[1.1]">
              {content?.promo_heading || "Create a Custom Gift Hamper"}
            </h2>
            <p className="mt-4 md:mt-6 text-cream/90 text-sm md:text-lg leading-relaxed max-w-md font-light">
              {content?.promo_text || "Personalise every detail — from the box to the message. Tell us the occasion and we'll curate something unforgettable."}
            </p>
            
            <div className="mt-6 md:mt-10 flex flex-col sm:flex-row gap-3 md:gap-4">
              <Link to="/custom" className="bg-champagne text-espresso px-6 py-3 md:px-8 md:py-3.5 rounded-full text-[11px] md:text-sm tracking-widest uppercase hover:bg-cream transition shadow-xl hover:-translate-y-1 text-center font-medium">
                Learn More
              </Link>
              <a href={generalEnquiryLink("Hi LUNA MIA! I'd like to discuss a custom hamper.")} className="border border-cream/50 text-cream px-6 py-3 md:px-8 md:py-3.5 rounded-full text-[11px] md:text-sm tracking-widest uppercase hover:bg-cream hover:text-chocolate transition text-center font-medium">
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="max-w-4xl mx-auto px-4 md:px-6 py-16 md:py-28 text-center animate-fade-up">
        <SectionHeading eyebrow="OUR STORY" title="A Little Luxury in Every Gift" />
        <p className="text-espresso/80 leading-relaxed text-base md:text-xl font-light">
          LUNA MIA was born from a love of beautiful things and thoughtful gestures. Every hamper is curated with intention — elegant packaging, premium products, and a personal touch that turns a gift into a memory.
        </p>
        <Link to="/about" className="inline-block mt-8 md:mt-10 border-b border-chocolate text-chocolate pb-1 text-xs md:text-sm tracking-widest uppercase hover:text-champagne hover:border-champagne transition-colors">
          Read Our Story
        </Link>
      </section>

      {/* GALLERY */}
      {gallery.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-16 md:pb-20 animate-fade-up">
          <SectionHeading eyebrow="@LUNAMIA" title="Follow Our Journey" />
          <div className="grid grid-cols-3 md:grid-cols-6 gap-1 md:gap-2">
            {gallery.map((g) => (
              <div key={g.id} className="aspect-square overflow-hidden rounded md:rounded-lg bg-beige group">
                <img 
                  src={g.image_url} 
                  alt="" 
                  loading="lazy" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-rose/30 border-y border-champagne/30 py-12 md:py-20 text-center px-4 md:px-6 animate-fade-up">
        <div className="max-w-xl mx-auto">
          <div className="w-12 h-px bg-champagne mx-auto mb-6"></div>
          <h2 className="font-serif text-2xl md:text-4xl text-chocolate">Have a Question?</h2>
          <p className="text-espresso/70 mt-3 md:mt-4 text-sm md:text-base font-light">We'd love to help you find the perfect gift.</p>
          <a href={generalEnquiryLink()} className="inline-block mt-6 md:mt-8 bg-chocolate text-cream px-6 py-3 md:px-8 md:py-3.5 rounded-full shadow-lg hover:-translate-y-1 transition-transform text-[11px] md:text-sm tracking-widest uppercase font-medium">
            Email Us
          </a>
        </div>
      </section>
    </>
  );
}