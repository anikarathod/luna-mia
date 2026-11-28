import { Link } from "react-router-dom";
import { generalEnquiryLink } from "../lib/enquiry";

export default function Footer() {
  return (
    <footer className="bg-espresso text-cream/80 mt-12 md:mt-24">
      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 grid gap-10 md:grid-cols-4 text-center md:text-left">
        
        {/* Brand Section */}
        <div>
          <h3 className="font-serif text-2xl tracking-[0.2em] text-cream">LUNA MIA</h3>
          <p className="mt-3 text-sm text-cream/70">A Little Luxury in Every Gift.</p>
        </div>

        {/* Explore Links */}
        <div>
          <h4 className="text-champagne text-xs md:text-sm tracking-widest mb-4 uppercase font-medium">Explore</h4>
          <ul className="space-y-2 text-sm text-cream/70">
            <li><Link to="/shop" className="hover:text-champagne transition-colors">Shop</Link></li>
            <li><Link to="/collections" className="hover:text-champagne transition-colors">Collections</Link></li>
            <li><Link to="/custom" className="hover:text-champagne transition-colors">Custom Hampers</Link></li>
            <li><Link to="/about" className="hover:text-champagne transition-colors">About Us</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-champagne text-xs md:text-sm tracking-widest mb-4 uppercase font-medium">Contact</h4>
          <ul className="space-y-2 text-sm text-cream/70">
            <li><a href={generalEnquiryLink()} className="hover:text-champagne transition-colors">Enquire by Email</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-champagne transition-colors">Instagram</a></li>
            <li><a href="mailto:hello@lunamia.in" className="hover:text-champagne transition-colors">hello@lunamia.in</a></li>
            <li>Goa, India</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-champagne text-xs md:text-sm tracking-widest mb-4 uppercase font-medium">Newsletter</h4>
          <p className="text-sm mb-4 text-cream/70 leading-relaxed">Be the first to know about new collections.</p>
          <div className="relative max-w-xs mx-auto md:mx-0">
            <input 
              type="email" 
              placeholder="Your email" 
              className="w-full bg-transparent border border-champagne/40 rounded-full px-5 py-3 text-sm placeholder:text-cream/40 focus:outline-none focus:border-champagne transition-colors" 
            />
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-cream/10 py-6 text-center text-[10px] md:text-xs tracking-wider text-cream/40 uppercase">
        © {new Date().getFullYear()} LUNA MIA. All rights reserved.
      </div>
    </footer>
  );
}