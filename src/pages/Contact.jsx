import { useState } from "react";
import { supabase } from "../lib/supabase";
import SectionHeading from "../components/SectionHeading";
import { generalEnquiryLink } from "../lib/enquiry";

export default function Contact() {
  const [form, setForm] = useState({ name: "", contact: "", message: "" });
  const [status, setStatus] = useState({ type: "", msg: "" });
  const [sending, setSending] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    setStatus({ type: "", msg: "" });
    const { error } = await supabase.from("enquiries").insert([form]);
    setSending(false);
    if (error) {
      setStatus({ type: "error", msg: "Something went wrong. Please email us directly instead." });
    } else {
      setStatus({ type: "success", msg: "Thank you! We'll be in touch within 24 hours." });
      setForm({ name: "", contact: "", message: "" });
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <SectionHeading eyebrow="GET IN TOUCH" title="Contact Us" subtitle="Questions, custom requests, or just want to say hello? We'd love to hear from you." />

      <div className="grid md:grid-cols-2 gap-10">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-soft">
          <label className="block text-sm text-chocolate mb-1">Your Name</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-champagne/40 rounded-full px-4 py-2 mb-4 text-sm focus:outline-none focus:border-chocolate"
          />

          <label className="block text-sm text-chocolate mb-1">Email or Phone</label>
          <input
            required
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
            className="w-full border border-champagne/40 rounded-full px-4 py-2 mb-4 text-sm focus:outline-none focus:border-chocolate"
          />

          <label className="block text-sm text-chocolate mb-1">Your Message</label>
          <textarea
            required
            rows="5"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full border border-champagne/40 rounded-2xl px-4 py-3 mb-4 text-sm focus:outline-none focus:border-chocolate"
          />

          <button disabled={sending} className="btn-primary w-full disabled:opacity-50">
            {sending ? "Sending…" : "Send Enquiry"}
          </button>

          {status.msg && (
            <p className={`mt-4 text-sm text-center ${status.type === "success" ? "text-green-700" : "text-red-600"}`}>
              {status.msg}
            </p>
          )}
        </form>

        <div className="space-y-6">
          <div className="bg-cream border border-champagne/30 rounded-2xl p-6">
            <h3 className="font-serif text-xl text-chocolate mb-2">Prefer Email?</h3>
            <p className="text-sm text-espresso/70 mb-4">Send us an enquiry with your details and we'll reply within 24 hours.</p>
            <a href={generalEnquiryLink()} className="btn-outline inline-block">Email Us</a>
          </div>

          <div className="bg-cream border border-champagne/30 rounded-2xl p-6">
            <h3 className="font-serif text-xl text-chocolate mb-2">Find Us</h3>
            <ul className="text-sm text-espresso/80 space-y-1">
              <li>📧 hello@lunamia.in</li>
              <li>📷 @lunamia on Instagram</li>
              <li>📍 Goa, India</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}