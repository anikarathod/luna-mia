import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchProducts() {
    setLoading(true);
    const { data } = await supabase
      .from("products")
      .select("*, product_images(image_url), categories(name)")
      .order("created_at", { ascending: false });
    setProducts(data || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    await supabase.from("products").delete().eq("id", id);
    fetchProducts();
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-serif text-3xl text-chocolate">Products</h1>
          <p className="text-espresso/60">Manage your gift hamper catalogue</p>
        </div>
        <Link to="/admin/products/new" className="btn-primary">
          + Add New Product
        </Link>
      </div>

      {loading ? (
        <p className="text-espresso/60">Loading products...</p>
      ) : products.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl shadow-soft text-center">
          <p className="text-espresso/60 mb-4">No products yet.</p>
          <Link to="/admin/products/new" className="btn-outline">Add your first product</Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-beige/30 text-chocolate text-sm tracking-wider">
                <th className="p-4 font-medium">Image</th>
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-beige/50">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-cream/50 transition">
                  <td className="p-4">
                    <div className="w-12 h-12 rounded bg-beige overflow-hidden">
                      {p.product_images?.[0] && (
                        <img src={p.product_images[0].image_url} alt="" className="w-full h-full object-cover" />
                      )}
                    </div>
                  </td>
                  <td className="p-4 font-medium text-chocolate">{p.name}</td>
                  <td className="p-4 text-sm text-espresso/70">{p.categories?.name || "—"}</td>
                  <td className="p-4 text-sm text-espresso/70">₹{Number(p.price).toLocaleString("en-IN")}</td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${p.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                      {p.available ? "Available" : "Sold Out"}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-3">
                    <Link to={`/admin/products/edit/${p.id}`} className="text-champagne hover:text-chocolate text-sm font-medium">Edit</Link>
                    <button onClick={() => handleDelete(p.id)} className="text-red-400 hover:text-red-600 text-sm font-medium">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}