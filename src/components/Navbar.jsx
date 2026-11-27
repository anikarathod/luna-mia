import { useState } from "react";
import { Link } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/collections", label: "Collections" },
  { to: "/custom", label: "Custom Hampers" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur border-b border-champagne/30 relative">
      <nav className="max-w-7xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-chocolate p-2 -ml-2" 
          onClick={() => setOpen(!open)} 
          aria-label="Menu"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        {/* Desktop Links (Left) */}
        <div className="hidden md:flex gap-8 w-1/3">
          {links.slice(0, 3).map((l) => (
            <Link key={l.to} to={l.to} className="text-sm text-chocolate hover:text-champagne transition">{l.label}</Link>
          ))}
        </div>

        {/* Logo (Center) */}
        <Link to="/" className="font-serif text-xl md:text-3xl tracking-[0.2em] text-chocolate text-center flex-1 md:flex-none">
          LUNA MIA
        </Link>

        {/* Desktop Links (Right) */}
        <div className="hidden md:flex gap-8 w-1/3 justify-end">
          {links.slice(3).map((l) => (
            <Link key={l.to} to={l.to} className="text-sm text-chocolate hover:text-champagne transition">{l.label}</Link>
          ))}
        </div>

        {/* Empty div to balance the mobile flexbox */}
        <div className="w-8 md:hidden"></div>
      </nav>

      {/* Mobile Menu Overlay */}
      {open && (
        <div className="md:hidden absolute top-full left-0 w-full bg-cream border-b border-champagne/30 shadow-xl">
          <div className="flex flex-col px-6 py-4 gap-4">
            {links.map((l) => (
              <Link 
                key={l.to} 
                to={l.to} 
                onClick={() => setOpen(false)} 
                className="text-chocolate font-medium py-2 border-b border-beige/50 last:border-0"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}