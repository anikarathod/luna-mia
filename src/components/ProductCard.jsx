import { Link } from "react-router-dom";
import { productEnquiryLink } from "../lib/enquiry";

export default function ProductCard({ product }) {
  const img = product.product_images?.[0]?.image_url;
  
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-beige/30">
      
      {/* Image Container */}
      <Link to={`/product/${product.id}`} className="block h-40 md:h-72 w-full overflow-hidden bg-[#FAF7F2] relative">
        {img ? (
          <img
            src={img}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-contain p-3 md:p-6 group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-espresso/30 font-serif text-xs md:text-sm">No image</div>
        )}
      </Link>

      {/* Content Container */}
      <div className="p-3 md:p-5 flex flex-col flex-1">
        
        {/* Title & Badge */}
        <div className="flex justify-between items-start gap-2 mb-1">
          <h3 className="font-serif text-[13px] md:text-lg text-chocolate line-clamp-2 leading-tight">
            {product.name}
          </h3>
          <span className={`text-[9px] md:text-xs px-1.5 md:px-2 py-0.5 rounded-full whitespace-nowrap mt-0.5 ${
            product.available 
              ? "bg-champagne/20 text-chocolate" 
              : "bg-espresso/10 text-espresso/60"
          }`}>
            {product.available ? "Available" : "Sold Out"}
          </span>
        </div>
        
        {/* Price */}
        <p className="text-champagne font-medium text-sm md:text-base mt-1">
          ₹{Number(product.price).toLocaleString("en-IN")}
        </p>
        
        {/* Description (Hidden on mobile to save space) */}
        <p className="text-xs md:text-sm text-espresso/60 mt-2 line-clamp-2 hidden md:block leading-relaxed">
          {product.description}
        </p>
        
        {/* Buttons (Slimmer on mobile) */}
        <div className="mt-auto pt-3 md:pt-5 flex flex-col gap-1.5 md:gap-2">
          <Link 
            to={`/product/${product.id}`} 
            className="border border-chocolate/30 text-chocolate rounded-full text-center text-[10px] md:text-xs py-1.5 md:py-2 hover:bg-chocolate hover:text-cream transition-colors"
          >
            View Details
          </Link>
          <a 
            href={productEnquiryLink(product)} 
            className="bg-chocolate text-cream rounded-full text-center text-[10px] md:text-xs py-1.5 md:py-2 hover:bg-espresso transition-colors"
          >
            Enquire by Email
          </a>
        </div>
      </div>
    </div>
  );
}