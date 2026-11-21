import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function HomepageManager() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    hero_heading: "",
    hero_subtext: "",
    hero_image_url: "",
    promo_heading: "",
    promo_text: "",
    promo_image_url: "",
  });

  const [heroFile, setHeroFile] = useState(null);
  const [promoFile, setPromoFile] = useState(null);

  useEffect(() => {
    async function fetchContent() {
      const { data, error } = await supabase
        .from("homepage_content")
        .select("*")
        .eq("id", 1)
        .maybeSingle();

      if (data) {
        setForm({
          hero_heading: data.hero_heading || "",
          hero_subtext: data.hero_subtext || "",
          hero_image_url: data.hero_image_url || "",
          promo_heading: data.promo_heading || "",
          promo_text: data.promo_text || "",
          promo_image_url: data.promo_image_url || "",
        });
      }
      setLoading(false);
    }
    fetchContent();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function uploadImage(file, bucketName) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const { error } = await supabase.storage.from(bucketName).upload(fileName, file);
    if (error) throw error;
    const { data } = supabase.storage.from(bucketName).getPublicUrl(fileName);
    return data.publicUrl;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      let updatedHeroUrl = form.hero_image_url;
      let updatedPromoUrl = form.promo_image_url;

      // Upload new hero image if selected
      if (heroFile) {
        updatedHeroUrl = await uploadImage(heroFile, "homepage");
      }

      // Upload new promo image if selected
      if (promoFile) {
        updatedPromoUrl = await uploadImage(promoFile, "homepage");
      }

      // Save to database
      const { error } = await supabase.from("homepage_content").upsert({
        id: 1,
        hero_heading: form.hero_heading,
        hero_subtext: form.hero_subtext,
        hero_image_url: updatedHeroUrl,
        promo_heading: form.promo_heading,
        promo_text: form.promo_text,
        promo_image_url: updatedPromoUrl,
      });

      if (error) throw error;

      setForm((prev) => ({
        ...prev,
        hero_image_url: updatedHeroUrl,
        promo_image_url: updatedPromoUrl,
      }));
      setHeroFile(null);
      setPromoFile(null);
      setMessage("Homepage updated successfully!");
    } catch (error) {
      setMessage("Error: " + error.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="p-8 text-center text-espresso/60">Loading homepage settings...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-chocolate">Homepage Manager</h1>
        <p className="text-espresso/60">Update the hero banner and promotional sections.</p>
      </div>

      {message && (
        <div className={`p-4 mb-6 rounded-lg text-sm ${message.includes("Error") ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* HERO SECTION */}
        <div className="bg-white p-6 rounded-2xl shadow-soft space-y-4">
          <h2 className="font-serif text-xl text-chocolate border-b border-beige pb-2">Hero Section</h2>
          
          <div>
            <label className="block text-sm text-chocolate mb-1">Hero Heading</label>
            <input name="hero_heading" value={form.hero_heading} onChange={handleChange} placeholder="Thoughtful Gifts. Beautiful Moments." className="w-full border border-champagne/40 rounded-lg px-4 py-2 focus:outline-none focus:border-chocolate" />
          </div>

          <div>
            <label className="block text-sm text-chocolate mb-1">Hero Subtext</label>
            <textarea name="hero_subtext" value={form.hero_subtext} onChange={handleChange} rows="2" placeholder="Curated luxury gift hampers..." className="w-full border border-champagne/40 rounded-lg px-4 py-2 focus:outline-none focus:border-chocolate"></textarea>
          </div>

          <div>
            <label className="block text-sm text-chocolate mb-1">Hero Background Image</label>
            {form.hero_image_url && (
              <img src={form.hero_image_url} alt="Hero" className="h-32 object-cover rounded-lg mb-3 border border-beige" />
            )}
            <input type="file" accept="image/*" onChange={(e) => setHeroFile(e.target.files[0])} className="block w-full text-sm text-espresso/60 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-beige file:text-chocolate hover:file:bg-champagne/30" />
            <p className="text-xs text-espresso/50 mt-1">Recommended size: 1920x1080px or larger.</p>
          </div>
        </div>

        {/* PROMO SECTION */}
        <div className="bg-white p-6 rounded-2xl shadow-soft space-y-4">
          <h2 className="font-serif text-xl text-chocolate border-b border-beige pb-2">Custom Hamper Promo Section</h2>
          
          <div>
            <label className="block text-sm text-chocolate mb-1">Promo Heading</label>
            <input name="promo_heading" value={form.promo_heading} onChange={handleChange} placeholder="Create a Custom Gift Hamper" className="w-full border border-champagne/40 rounded-lg px-4 py-2 focus:outline-none focus:border-chocolate" />
          </div>

          <div>
            <label className="block text-sm text-chocolate mb-1">Promo Text</label>
            <textarea name="promo_text" value={form.promo_text} onChange={handleChange} rows="2" placeholder="Personalise every detail..." className="w-full border border-champagne/40 rounded-lg px-4 py-2 focus:outline-none focus:border-chocolate"></textarea>
          </div>

          <div>
            <label className="block text-sm text-chocolate mb-1">Promo Image (Right side)</label>
            {form.promo_image_url && (
              <img src={form.promo_image_url} alt="Promo" className="h-32 object-cover rounded-lg mb-3 border border-beige" />
            )}
            <input type="file" accept="image/*" onChange={(e) => setPromoFile(e.target.files[0])} className="block w-full text-sm text-espresso/60 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-beige file:text-chocolate hover:file:bg-champagne/30" />
             <p className="text-xs text-espresso/50 mt-1">Recommended size: 800x800px (Square).</p>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

      </form>
    </div>
  );
}