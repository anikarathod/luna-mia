import SectionHeading from "../components/SectionHeading";
import { generalEnquiryLink } from "../lib/enquiry";

const sizes = [
  { name: "Petite", price: "₹899+", items: "3–4 curated items, ribbon, personalised card" },
  { name: "Signature", price: "₹1,899+", items: "5–7 items, premium box, ribbon, dried florals, custom card" },
  { name: "Luxe", price: "₹3,499+", items: "8–10 luxury items, keepsake box, premium wrapping, handwritten note" },
];

const options = [
  { title: "Choose Your Items", body: "Pick from candles, chocolates, jewellery, crochet flowers, self-care products, and more." },
  { title: "Personalise the Card", body: "Add a heartfelt message, names, or a date — hand-lettered for that extra touch." },
  { title: "Ribbon & Packaging", body: "Choose ribbon colours and wrapping style to match the occasion and the recipient." },
  { title: "Occasion Curation", body: "Tell us the occasion and we'll style the hamper to fit the mood — romantic, elegant, playful." },
];

export default function CustomHampers() {
  return (
    <div>
      <section className="bg-chocolate text-cream py-20 text-center px-6">
        <p className="text-champagne tracking-[0.4em] text-xs mb-3">MADE FOR YOU</p>
        <h1 className="font-serif text-4xl md:text-5xl">Create Your Dream Gift Box</h1>
        <p className="mt-4 max-w-xl mx-auto text-cream/80">
          Every detail considered. Every gift personal. Tell us the occasion and we'll curate something truly memorable.
        </p>
        <a href={generalEnquiryLink("Hi LUNA MIA! I'd like to create a custom hamper.")} className="inline-block mt-8 bg-champagne text-espresso px-8 py-3 rounded-full text-sm hover:bg-cream transition">
          Start Your Custom Hamper
        </a>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <SectionHeading eyebrow="CHOOSE YOUR SIZE" title="Hamper Sizes" />
        <div className="grid md:grid-cols-3 gap-6">
          {sizes.map((s) => (
            <div key={s.name} className="bg-white rounded-2xl p-8 shadow-soft text-center">
              <h3 className="font-serif text-2xl text-chocolate">{s.name}</h3>
              <p className="text-champagne mt-1">{s.price}</p>
              <div className="gold-line" />
              <p className="text-sm text-espresso/70">{s.items}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-beige/40 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading eyebrow="PERSONALISATION" title="What You Can Customise" />
          <div className="grid md:grid-cols-2 gap-6">
            {options.map((o) => (
              <div key={o.title} className="bg-white rounded-2xl p-6 shadow-soft">
                <h3 className="font-serif text-lg text-chocolate">{o.title}</h3>
                <p className="text-sm text-espresso/70 mt-2">{o.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <SectionHeading eyebrow="LET'S TALK" title="Ready to Create Something Special?" />
        <p className="text-espresso/80">
          Tell us the occasion, the recipient, and a little about what they love. We'll respond within 24 hours with a curated proposal.
        </p>
        <a href={generalEnquiryLink("Hi LUNA MIA! I'd like to create a custom hamper. Here's what I have in mind:")} className="inline-block mt-8 btn-primary">
          Email Us to Discuss
        </a>
      </section>
    </div>
  );
}