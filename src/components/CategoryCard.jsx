import { Link } from "react-router-dom";

export default function CategoryCard({ category }) {
  return (
    <Link to={`/shop?category=${category.slug}`} className="group block rounded-2xl overflow-hidden bg-white shadow-soft hover:shadow-lg transition-all duration-300">
      <div className="aspect-square overflow-hidden bg-beige">
        {category.image_url && (
          <img src={category.image_url} alt={category.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        )}
      </div>
      <div className="p-3 md:p-4 text-center border-t border-beige/50">
        <h3 className="font-serif text-sm md:text-base text-chocolate truncate">{category.name}</h3>
        <p className="text-[10px] md:text-xs text-espresso/60 mt-1 truncate">{category.description}</p>
      </div>
    </Link>
  );
}