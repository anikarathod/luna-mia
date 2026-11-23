import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Enquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchEnquiries() {
    setLoading(true);
    const { data } = await supabase.from("enquiries").select("*").order("created_at", { ascending: false });
    setEnquiries(data || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchEnquiries();
  }, []);

  async function updateStatus(id, newStatus) {
    await supabase.from("enquiries").update({ status: newStatus }).eq("id", id);
    fetchEnquiries();
  }

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="font-serif text-3xl text-chocolate mb-2">Enquiries</h1>
        <p className="text-espresso/60">Messages from the Contact Us form.</p>
      </div>

      {loading ? (
        <p className="text-espresso/60">Loading...</p>
      ) : enquiries.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl shadow-soft text-center text-espresso/60">
          No enquiries yet.
        </div>
      ) : (
        <div className="space-y-4">
          {enquiries.map((e) => (
            <div key={e.id} className="bg-white p-6 rounded-2xl shadow-soft">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium text-chocolate">{e.name}</h3>
                  <p className="text-sm text-espresso/60">{e.contact} &bull; {new Date(e.created_at).toLocaleDateString()}</p>
                </div>
                <select 
                  value={e.status} 
                  onChange={(ev) => updateStatus(e.id, ev.target.value)}
                  className={`text-xs px-2 py-1 rounded-full border focus:outline-none ${e.status === 'new' ? 'bg-rose/20 text-chocolate border-rose' : 'bg-green-50 text-green-700 border-green-200'}`}
                >
                  <option value="new">New</option>
                  <option value="replied">Replied</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <p className="text-espresso/80 text-sm whitespace-pre-wrap">{e.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}