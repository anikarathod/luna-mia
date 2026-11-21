import { generalEnquiryLink } from "../lib/enquiry";

export default function EmailButton() {
  return (
    <a
      href={generalEnquiryLink()}
      className="fixed bottom-6 right-6 z-40 bg-chocolate text-cream w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:bg-espresso transition-all"
      aria-label="Email us"
      title="Email us"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    </a>
  );
}