import { Link } from "react-router-dom";
import { generalEnquiryLink } from "../lib/enquiry";

export default function Footer() {
  return (
    <footer className="bg-espresso text-cream/80 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <h3 className="font-serif text-2xl tracking-[0.2em] text-cream">LUNA MIA</h3>
          <p className="mt-3 text-sm">A Little Luxury in Every Gift.</p>
        </div>
        <div>
          <h4 className="text-champagne text-sm tracking-widest mb-3">EXPLORE</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/shop" className="hover:text-champagne">Shop</Link></li>
            <li><Link to="/collections" className="hover:text-champagne">Collections</Link></li>
            <li><Link to="/custom" className="hover:text-champagne">Custom Hampers</Link></li>
            <li><Link to="/about" className="hover:text-champagne">About Us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-champagne text-sm tracking-widest mb-3">CONTACT</h4>
          <ul className="space-y-2 text-sm">
            <li><a href={generalEnquiryLink()} className="hover:text-champagne">Enquire by Email</a></li>
            <li><a href="https://instagram.com" className="hover:text-champagne">Instagram</a></li>
            <li><a href="mailto:hello@lunamia.in" className="hover:text-champagne">hello@lunamia.in</a></li>
            <li>Goa, India</li>
          </ul>
        </div>
        <div>
          <h4 className="text-champagne text-sm tracking-widest mb-3">NEWSLETTER</h4>
          <p className="text-sm mb-3">Be the first to know about new collections.</p>
          <input type="email" placeholder="Your email" className="w-full bg-transparent border border-champagne/40 rounded-full px-4 py-2 text-sm placeholder:text-cream/40 focus:outline-none focus:border-champagne" />
        </div>
      </div>
      <div className="border-t border-cream/10 py-4 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} LUNA MIA. All rights reserved.
      </div>
    </footer>
  );
}