import SectionHeading from "../components/SectionHeading";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div>
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <p className="text-champagne tracking-[0.4em] text-xs mb-3">OUR STORY</p>
        <h1 className="font-serif text-4xl md:text-5xl text-chocolate">A Little Luxury in Every Gift</h1>
        <div className="gold-line" />
        <p className="text-espresso/80 leading-relaxed mt-4">
          LUNA MIA is a premium gifting brand based in Goa, India. We curate beautifully designed gift hampers for birthdays, anniversaries, celebrations, and all the little moments that deserve something special.
        </p>
      </section>

      <section className="bg-beige/40 py-20">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="font-serif text-xl text-chocolate">Thoughtfully Curated</h3>
            <p className="text-sm text-espresso/70 mt-2">Every item is handpicked — no filler, only things we'd love to receive ourselves.</p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-chocolate">Beautifully Packaged</h3>
            <p className="text-sm text-espresso/70 mt-2">Luxury boxes, tissue paper, ribbon — the unboxing is as special as the gift.</p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-chocolate">Personally Made</h3>
            <p className="text-sm text-espresso/70 mt-2">Each hamper is assembled by hand, with a handwritten card if you'd like one.</p>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <SectionHeading eyebrow="OUR PROMISE" title="Every Gift Tells a Story" />
        <p className="text-espresso/80 leading-relaxed">
          We believe gifting should feel personal — not transactional. Whether it's a small thank-you or a grand celebration, we put the same care into every order.
        </p>
        <Link to="/shop" className="inline-block mt-8 btn-primary">Explore Our Hampers</Link>
      </section>
    </div>
  );
}