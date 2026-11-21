import { useState } from "react";
import { Link } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/collections", label: "Collections" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur border-b border-champagne/30">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="hidden md:flex gap-8">
          {links.slice(0, 2).map((l) => (
            <Link key={l.to} to={l.to} className="text-sm text-chocolate hover:text-champagne transition">{l.label}</Link>
          ))}
        </div>
        <Link to="/" className="font-serif text-2xl md:text-3xl tracking-[0.2em] text-chocolate">LUNA MIA</Link>
        <div className="hidden md:flex gap-8">
          {links.slice(2).map((l) => (
            <Link key={l.to} to={l.to} className="text-sm text-chocolate hover:text-champagne transition">{l.label}</Link>
          ))}
        </div>
        <button className="md:hidden text-chocolate text-2xl" onClick={() => setOpen(!open)} aria-label="Menu">☰</button>
      </nav>
      {open && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-3 bg-cream border-b border-champagne/30 absolute w-full">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="text-chocolate">{l.label}</Link>
          ))}
        </div>
      )}
    </header>
  );
}