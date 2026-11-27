import { Link } from "react-router-dom";
import { productEnquiryLink } from "../lib/enquiry";

export default function ProductCard({ product }) {
  const img = product.product_images?.[0]?.image_url;
  
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      {/* Image Container - Fixed height on mobile, aspect ratio on desktop */}
      <Link to={`/product/${product.id}`} className="block h-48 md:h-72 w-full overflow-hidden bg-beige relative">
        {img ? (
          <img
            src={img}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-espresso/30 font-serif text-sm">No image</div>
        )}
      </Link>

      {/* Content Container */}
      <div className="p-4 md:p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-2 mb-1">
          <h3 className="font-serif text-sm md:text-lg text-chocolate line-clamp-2 leading-tight">{product.name}</h3>
          <span className={`text-[10px] md:text-xs px-2 py-0.5 rounded-full whitespace-nowrap mt-0.5 ${product.available ? "bg-champagne/20 text-chocolate" : "bg-espresso/10 text-espresso/60"}`}>
            {product.available ? "Available" : "Sold Out"}
          </span>
        </div>
        
        <p className="text-champagne font-medium text-sm md:text-base mt-1">₹{Number(product.price).toLocaleString("en-IN")}</p>
        
        <p className="text-xs md:text-sm text-espresso/70 mt-2 line-clamp-2 hidden md:block">{product.description}</p>
        
        {/* Buttons */}
        <div className="mt-auto pt-4 flex flex-col gap-2">
          <Link to={`/product/${product.id}`} className="btn-outline text-center text-[11px] md:text-xs py-1.5 md:py-2">View Details</Link>
          <a href={productEnquiryLink(product)} className="btn-primary text-center text-[11px] md:text-xs py-1.5 md:py-2">Enquire by Email</a>
        </div>
      </div>
    </div>
  );
}