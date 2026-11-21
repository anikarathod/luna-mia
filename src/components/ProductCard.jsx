import { Link } from "react-router-dom";
import { productEnquiryLink } from "../lib/enquiry";

export default function ProductCard({ product }) {
  const img = product.product_images?.[0]?.image_url;
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-lg transition-shadow">
      <Link to={`/product/${product.id}`} className="block aspect-[4/5] overflow-hidden bg-beige">
        {img && (
          <img src={img} alt={product.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        )}
      </Link>
      <div className="p-5">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-serif text-lg text-chocolate">{product.name}</h3>
          <span className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${product.available ? "bg-champagne/20 text-chocolate" : "bg-espresso/10 text-espresso/60"}`}>
            {product.available ? "Available" : "Sold Out"}
          </span>
        </div>
        <p className="text-champagne font-medium mt-1">₹{Number(product.price).toLocaleString("en-IN")}</p>
        <p className="text-sm text-espresso/70 mt-2 line-clamp-2">{product.description}</p>
        <div className="mt-4 flex flex-col gap-2">
          <Link to={`/product/${product.id}`} className="btn-outline text-center text-xs py-2">View Details</Link>
          <a href={productEnquiryLink(product)} className="btn-primary text-center text-xs py-2">Enquire by Email</a>
        </div>
      </div>
    </div>
  );
}