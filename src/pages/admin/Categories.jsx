import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  async function fetchCategories() {
    setLoading(true);
    const { data } = await supabase.from("categories").select("*").order("display_order");
    setCategories(data || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    setSaving(true);

    try {
      let imageUrl = "";
      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `cat-${Math.random()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage.from("categories").upload(fileName, file);
        if (uploadError) throw uploadError;
        const { data } = supabase.storage.from("categories").getPublicUrl(fileName);
        imageUrl = data.publicUrl;
      }

      // Generate slug from name (e.g. "Birthday Hampers" -> "birthday-hampers")
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

      const { error } = await supabase.from("categories").insert([{
        name,
        slug,
        description,
        image_url: imageUrl,
        display_order: categories.length,
      }]);

      if (error) throw error;
      
      setName("");
      setDescription("");
      setFile(null);
      fetchCategories();
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id, url) {
    if (!window.confirm("Delete this category?")) return;
    if (url) {
      const fileName = url.split('/').pop();
      await supabase.storage.from("categories").remove([fileName]);
    }
    await supabase.from("categories").delete().eq("id", id);
    fetchCategories();
  }

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="font-serif text-3xl text-chocolate mb-2">Categories</h1>
        <p className="text-espresso/60">Manage the collections shown on your homepage.</p>
      </div>

      {/* Add Form */}
      <form onSubmit={handleAdd} className="bg-white p-6 rounded-2xl shadow-soft flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm text-chocolate mb-1">Category Name</label>
          <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Birthday Hampers" className="w-full border border-champagne/40 rounded-lg px-4 py-2 focus:outline-none focus:border-chocolate" />
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm text-chocolate mb-1">Short Description</label>
          <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g. Curated for celebrations" className="w-full border border-champagne/40 rounded-lg px-4 py-2 focus:outline-none focus:border-chocolate" />
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm text-chocolate mb-1">Image</label>
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} className="block w-full text-sm text-espresso/60 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-beige file:text-chocolate hover:file:bg-champagne/30" />
        </div>
        <button type="submit" disabled={saving} className="btn-primary whitespace-nowrap h-[42px] disabled:opacity-50">
          {saving ? "Adding..." : "+ Add Category"}
        </button>
      </form>

      {/* List */}
      {loading ? (
        <p className="text-espresso/60">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((c) => (
            <div key={c.id} className="bg-white rounded-2xl shadow-soft overflow-hidden relative group">
              <div className="aspect-square bg-beige">
                {c.image_url && <img src={c.image_url} alt="" className="w-full h-full object-cover" />}
              </div>
              <div className="p-4 text-center">
                <h3 className="font-serif text-chocolate">{c.name}</h3>
                <button onClick={() => handleDelete(c.id, c.image_url)} className="text-red-400 text-xs mt-2 hover:text-red-600">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}