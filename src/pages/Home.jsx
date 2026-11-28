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
      <section className="relative min-h-[65vh] md:min-h-[85vh] flex items-center justify-center text-center px-4 overflow-hidden">
        
        {/* Animated Background Image */}
        {content?.hero_image_url ? (
          <img 
            src={content.hero_image_url} 
            alt="Luxury Hampers" 
            className="absolute inset-0 w-full h-full object-cover animate-ken-burns" 
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-beige via-rose/40 to-champagne/30 animate-ken-burns" />
        )}
        
        {/* Soft radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(48,37,31,0.8)_0%,rgba(48,37,31,0.3)_80%)]" />
        
        {/* Content with tighter mobile padding */}
        <div className="relative z-10 max-w-3xl mt-6 md:mt-10 px-6">
          <p className="text-champagne tracking-[0.4em] text-[10px] md:text-xs mb-4 md:mb-6 animate-slide-up font-medium">
            LUNA MIA
          </p>
          <h1 className="font-serif text-3xl md:text-7xl text-cream leading-[1.15] md:leading-[1.1] animate-slide-up delay-100">
            {content?.hero_heading || "Thoughtful Gifts. Beautiful Moments."}
          </h1>
          <p className="text-cream/90 text-sm md:text-xl mt-4 md:mt-6 max-w-sm md:max-w-xl mx-auto font-light leading-relaxed animate-slide-up delay-200">
            {content?.hero_subtext || "Curated luxury gift hampers, handcrafted with love for every celebration and everyday surprise."}
          </p>
          <div className="mt-8 md:mt-10 animate-slide-up delay-300">
            <Link to="/shop" className="group inline-block bg-champagne text-espresso px-6 py-3 md:px-10 md:py-4 rounded-full text-[11px] md:text-sm tracking-widest uppercase hover:bg-cream transition-all duration-300 shadow-xl hover:-translate-y-1 font-medium">
              Explore Our Collection
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
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

      {/* MARQUEE STRIP */}
      <div className="bg-chocolate py-4 overflow-hidden border-y border-champagne/30">
        <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite]">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-6 px-4 text-champagne text-[10px] md:text-xs tracking-[0.3em] uppercase font-medium">
              <span>Handcrafted with Love</span>
              <span className="text-cream/30 text-lg">✦</span>
              <span>Premium Quality</span>
              <span className="text-cream/30 text-lg">✦</span>
              <span>Perfect for Every Occasion</span>
              <span className="text-cream/30 text-lg">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* CUSTOM PROMO - Full Width Banner */}
      <section className="relative min-h-[400px] md:min-h-[600px] flex items-center animate-fade-up overflow-hidden">
        {content?.promo_image_url ? (
          <img 
            src={content.promo_image_url} 
            alt="Custom Gift Hamper" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-chocolate" />
        )}
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/95 via-espresso/70 to-transparent md:via-espresso/50" />

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
            
            {/* FIXED BUTTONS ALIGNMENT */}
            <div className="mt-6 md:mt-10 flex flex-col sm:flex-row gap-3 md:gap-4">
              <Link to="/custom" className="bg-champagne text-espresso px-6 py-3 md:px-8 md:py-3.5 rounded-full text-[11px] md:text-sm tracking-widest uppercase hover:bg-cream transition shadow-lg hover:-translate-y-1 text-center font-medium inline-block w-full sm:w-auto">
                Learn More
              </Link>
              <a href={generalEnquiryLink("Hi LUNA MIA! I'd like to discuss a custom hamper.")} className="border border-cream/50 text-cream px-6 py-3 md:px-8 md:py-3.5 rounded-full text-[11px] md:text-sm tracking-widest uppercase hover:bg-cream hover:text-chocolate transition text-center font-medium inline-block w-full sm:w-auto">
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BRAND STORY - Editorial Layout */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-28 animate-fade-up">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
          
          {/* Arch Images - Side by Side */}
          <div className="w-full md:w-1/2 flex gap-3 md:gap-6 justify-center">
            <img 
              src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop" 
              alt="Luxury Hampers" 
              className="w-1/2 rounded-t-full rounded-b-2xl object-cover aspect-[3/4] shadow-lg"
            />
            <img 
              src="https://images.unsplash.com/photo-1607344645866-009c320c5ab8?q=80&w=600&auto=format&fit=crop" 
              alt="Details" 
              className="w-1/2 rounded-t-full rounded-b-2xl object-cover aspect-[3/4] mt-8 shadow-lg"
            />
          </div>
          
          {/* Text */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <p className="text-champagne tracking-[0.3em] text-[10px] md:text-xs mb-3 font-medium uppercase">Our Story</p>
            <h2 className="font-serif text-3xl md:text-5xl text-chocolate leading-[1.2] mb-6">
              A Little Luxury in <br className="hidden md:block"/> Every Gift
            </h2>
            <p className="text-espresso/70 leading-relaxed text-sm md:text-base font-light mb-8">
              LUNA MIA was born from a love of beautiful things and thoughtful gestures. Every hamper is curated with intention — elegant packaging, premium products, and a personal touch that turns a gift into a memory.
            </p>
            <Link to="/about" className="inline-block border-b border-chocolate text-chocolate pb-1 text-xs md:text-sm tracking-widest uppercase hover:text-champagne hover:border-champagne transition-colors">
              Read Our Story
            </Link>
          </div>
        </div>
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