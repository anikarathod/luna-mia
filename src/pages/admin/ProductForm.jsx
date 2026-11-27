import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState([]);
  
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category_id: "",
    included_items: "",
    customisation_options: "",
    packaging_info: "",
    available: true,
    is_featured: false,
    is_bestseller: false,
  });

  const [existingImages, setExistingImages] = useState([]);
  const [newImageFiles, setNewImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    supabase.from("categories").select("id, name").then(({ data }) => {
      setCategories(data || []);
    });

    if (isEditing) {
      supabase.from("products").select("*, product_images(*)").eq("id", id).single()
        .then(({ data }) => {
          if (data) {
            setForm({
              ...data,
              included_items: (data.included_items || []).join(", "),
            });
            setExistingImages(data.product_images || []);
          }
          setLoading(false);
        });
    }
  }, [id, isEditing]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleImageSelect(e) {
    const files = Array.from(e.target.files);
    setNewImageFiles((prev) => [...prev, ...files]);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...previews]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    try {
      const productData = {
        name: form.name,
        price: Number(form.price),
        description: form.description,
        category_id: form.category_id || null,
        included_items: form.included_items.split(",").map(s => s.trim()).filter(Boolean),
        customisation_options: form.customisation_options,
        packaging_info: form.packaging_info,
        available: form.available,
        is_featured: form.is_featured,
        is_bestseller: form.is_bestseller,
      };

      let productId = id;

      if (isEditing) {
        const { error } = await supabase.from("products").update(productData).eq("id", id);
        if (error) throw error;
      } else {
        const { data, error } = await supabase.from("products").insert([productData]).select().single();
        if (error) throw error;
        if (!data) throw new Error("Could not save product. Check database permissions.");
        productId = data.id;
      }

      if (newImageFiles.length > 0) {
        for (let i = 0; i < newImageFiles.length; i++) {
          const file = newImageFiles[i];
          const fileExt = file.name.split('.').pop();
          const fileName = `${productId}-${Math.random()}.${fileExt}`;
          
          const { error: uploadError } = await supabase.storage
            .from("products")
            .upload(fileName, file);
            
          if (uploadError) throw uploadError;

          const { data: urlData } = supabase.storage.from("products").getPublicUrl(fileName);

          const { error: imgError } = await supabase.from("product_images").insert([{
            product_id: productId,
            image_url: urlData.publicUrl,
            display_order: existingImages.length + i
          }]);
          
          if (imgError) throw imgError;
        }
      }

      navigate("/admin/products");
    } catch (error) {
      alert("Error saving product: " + error.message);
    } finally {
      setSaving(false);
    }
  }

  async function removeExistingImage(imgId, url) {
    if (!window.confirm("Remove this image?")) return;
    const fileName = url.split('/').pop();
    await supabase.storage.from("products").remove([fileName]);
    await supabase.from("product_images").delete().eq("id", imgId);
    setExistingImages((prev) => prev.filter((img) => img.id !== imgId));
  }

  if (loading) return <div className="p-10 text-center">Loading form...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Link to="/admin/products" className="text-champagne text-sm mb-4 inline-block hover:text-chocolate">← Back to Products</Link>
      <h1 className="font-serif text-3xl text-chocolate mb-8">
        {isEditing ? "Edit Product" : "Add New Product"}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-soft space-y-6">
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-chocolate mb-1">Product Name</label>
            <input required name="name" value={form.name} onChange={handleChange} className="w-full border border-champagne/40 rounded-lg px-4 py-2 focus:outline-none focus:border-chocolate" />
          </div>
          <div>
            <label className="block text-sm text-chocolate mb-1">Price (₹)</label>
            <input required type="number" name="price" value={form.price} onChange={handleChange} className="w-full border border-champagne/40 rounded-lg px-4 py-2 focus:outline-none focus:border-chocolate" />
          </div>
        </div>

        <div>
          <label className="block text-sm text-chocolate mb-1">Category</label>
          <select name="category_id" value={form.category_id} onChange={handleChange} className="w-full border border-champagne/40 rounded-lg px-4 py-2 focus:outline-none focus:border-chocolate bg-white">
            <option value="">Select a category...</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm text-chocolate mb-1">Description</label>
          <textarea required name="description" value={form.description} onChange={handleChange} rows="3" className="w-full border border-champagne/40 rounded-lg px-4 py-2 focus:outline-none focus:border-chocolate"></textarea>
        </div>

        <div>
          <label className="block text-sm text-chocolate mb-1">What's Inside (comma separated)</label>
          <input name="included_items" value={form.included_items} onChange={handleChange} placeholder="e.g. Candle, Chocolates, Dried Flowers" className="w-full border border-champagne/40 rounded-lg px-4 py-2 focus:outline-none focus:border-chocolate" />
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-chocolate mb-1">Customisation Options</label>
            <textarea name="customisation_options" value={form.customisation_options} onChange={handleChange} rows="2" className="w-full border border-champagne/40 rounded-lg px-4 py-2 focus:outline-none focus:border-chocolate"></textarea>
          </div>
          <div>
            <label className="block text-sm text-chocolate mb-1">Packaging Info</label>
            <textarea name="packaging_info" value={form.packaging_info} onChange={handleChange} rows="2" className="w-full border border-champagne/40 rounded-lg px-4 py-2 focus:outline-none focus:border-chocolate"></textarea>
          </div>
        </div>

        <div className="flex gap-6 py-4 border-y border-beige">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="available" checked={form.available} onChange={handleChange} className="w-4 h-4 accent-chocolate" />
            <span className="text-sm text-chocolate">Available</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="is_featured" checked={form.is_featured} onChange={handleChange} className="w-4 h-4 accent-chocolate" />
            <span className="text-sm text-chocolate">Featured on Homepage</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="is_bestseller" checked={form.is_bestseller} onChange={handleChange} className="w-4 h-4 accent-chocolate" />
            <span className="text-sm text-chocolate">Bestseller</span>
          </label>
        </div>

        <div>
          <label className="block text-sm text-chocolate mb-2">Product Images</label>
          
          {existingImages.length > 0 && (
            <div className="flex gap-4 mb-4 flex-wrap">
              {existingImages.map(img => (
                <div key={img.id} className="relative group">
                  <img src={img.image_url} alt="" className="w-24 h-24 object-cover rounded-lg border border-beige" />
                  <button type="button" onClick={() => removeExistingImage(img.id, img.image_url)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition">✕</button>
                </div>
              ))}
            </div>
          )}

          {imagePreviews.length > 0 && (
            <div className="flex gap-4 mb-4 flex-wrap">
              {imagePreviews.map((url, i) => (
                <img key={i} src={url} alt="" className="w-24 h-24 object-cover rounded-lg border border-champagne" />
              ))}
            </div>
          )}

          <input type="file" multiple accept="image/*" onChange={handleImageSelect} className="block w-full text-sm text-espresso/60 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-beige file:text-chocolate hover:file:bg-champagne/30" />
        </div>

        <div className="pt-4 flex justify-end">
          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
            {saving ? "Saving..." : "Save Product"}
          </button>
        </div>

      </form>
    </div>
  );
}