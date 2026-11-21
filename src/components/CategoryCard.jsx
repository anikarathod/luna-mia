import { Link } from "react-router-dom";

export default function CategoryCard({ category }) {
  return (
    <Link to={`/shop?category=${category.slug}`} className="group block rounded-2xl overflow-hidden bg-white shadow-soft">
      <div className="aspect-square overflow-hidden bg-beige">
        {category.image_url && (
          <img src={category.image_url} alt={category.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        )}
      </div>
      <div className="p-4 text-center">
        <h3 className="font-serif text-chocolate">{category.name}</h3>
        <p className="text-xs text-espresso/60 mt-1">{category.description}</p>
        <span className="inline-block mt-3 text-xs text-champagne tracking-widest">VIEW COLLECTION →</span>
      </div>
    </Link>
  );
}