import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  async function fetchImages() {
    setLoading(true);
    const { data } = await supabase.from("gallery_images").select("*").order("display_order");
    setImages(data || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchImages();
  }, []);

  async function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `gallery-${Math.random()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage.from("gallery").upload(fileName, file);
      if (uploadError) throw uploadError;
      
      const { data } = supabase.storage.from("gallery").getPublicUrl(fileName);
      
      await supabase.from("gallery_images").insert([{
        image_url: data.publicUrl,
        display_order: images.length,
      }]);
      
      fetchImages();
    } catch (error) {
      alert("Error uploading: " + error.message);
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id, url) {
    if (!window.confirm("Delete this image?")) return;
    const fileName = url.split('/').pop();
    await supabase.storage.from("gallery").remove([fileName]);
    await supabase.from("gallery_images").delete().eq("id", id);
    fetchImages();
  }

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-serif text-3xl text-chocolate mb-2">Gallery</h1>
          <p className="text-espresso/60">Images for the Instagram section on the homepage.</p>
        </div>
        
        <label className="btn-primary cursor-pointer">
          {uploading ? "Uploading..." : "+ Upload Image"}
          <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
        </label>
      </div>

      {loading ? (
        <p className="text-espresso/60">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img) => (
            <div key={img.id} className="aspect-square bg-beige rounded-lg overflow-hidden relative group">
              <img src={img.image_url} alt="" className="w-full h-full object-cover" />
              <button onClick={() => handleDelete(img.id, img.image_url)} className="absolute inset-0 bg-espresso/60 text-cream flex items-center justify-center opacity-0 group-hover:opacity-100 transition font-medium">
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}