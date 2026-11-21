import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { productEnquiryLink } from "../lib/enquiry";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    supabase
      .from("products")
      .select("*, product_images(image_url, display_order)")
      .eq("id", id)
      .single()
      .then(({ data }) => {
        if (data) {
          data.product_images = (data.product_images || []).sort((a, b) => a.display_order - b.display_order);
          setProduct(data);
        }
      });
  }, [id]);

  if (!product) return <div className="p-16 text-center text-chocolate">Loading…</div>;

  const images = product.product_images || [];

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <Link to="/shop" className="text-xs text-champagne tracking-widest">← BACK TO SHOP</Link>
      <div className="grid md:grid-cols-2 gap-12 mt-6">
        <div>
          <div className="aspect-square bg-beige rounded-2xl overflow-hidden">
            {images[activeImg] ? (
              <img src={images[activeImg].image_url} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-espresso/30 font-serif">No image</div>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-3 mt-4 overflow-x-auto">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition ${i === activeImg ? "border-champagne" : "border-transparent opacity-70 hover:opacity-100"}`}
                >
                  <img src={img.image_url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-chocolate">{product.name}</h1>
          <p className="text-2xl text-champagne mt-2">₹{Number(product.price).toLocaleString("en-IN")}</p>
          <span className={`inline-block mt-3 text-xs px-3 py-1 rounded-full ${product.available ? "bg-champagne/20 text-chocolate" : "bg-espresso/10 text-espresso/60"}`}>
            {product.available ? "Available" : "Sold Out"}
          </span>

          {product.description && (
            <p className="mt-6 text-espresso/80 leading-relaxed">{product.description}</p>
          )}

          {product.included_items?.length > 0 && (
            <div className="mt-8">
              <h3 className="font-serif text-lg text-chocolate mb-2">What's Inside</h3>
              <ul className="space-y-1 text-sm text-espresso/80">
                {product.included_items.map((item, i) => (
                  <li key={i} className="flex gap-2"><span className="text-champagne">•</span>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {product.customisation_options && (
            <div className="mt-6">
              <h3 className="font-serif text-lg text-chocolate mb-2">Customisation</h3>
              <p className="text-sm text-espresso/80">{product.customisation_options}</p>
            </div>
          )}

          {product.packaging_info && (
            <div className="mt-6">
              <h3 className="font-serif text-lg text-chocolate mb-2">Packaging</h3>
              <p className="text-sm text-espresso/80">{product.packaging_info}</p>
            </div>
          )}

          <div className="mt-10">
            {product.available ? (
              <a href={productEnquiryLink(product)} className="btn-primary inline-block">Enquire by Email</a>
            ) : (
              <span className="inline-block bg-espresso/10 text-espresso/60 px-7 py-3 rounded-full text-sm">Currently Sold Out</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}