export default function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-12">
      {eyebrow && <p className="text-champagne tracking-[0.3em] text-xs mb-3">{eyebrow}</p>}
      <h2 className="font-serif text-3xl md:text-4xl text-chocolate">{title}</h2>
      <div className="gold-line" />
      {subtitle && <p className="text-espresso/70 mt-2">{subtitle}</p>}
    </div>
  );
}