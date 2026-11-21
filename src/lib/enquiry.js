const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || "hello@lunamia.in";

export function emailEnquiryLink({ subject, body }) {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function productEnquiryLink(product) {
  const url = `${window.location.origin}/product/${product.id}`;
  return emailEnquiryLink({
    subject: `Enquiry: ${product.name} (₹${product.price})`,
    body: `Hi LUNA MIA,\n\nI'm interested in "${product.name}" priced at ₹${product.price}.\n\nProduct link: ${url}\n\nCould you share more details about availability, customisation and delivery?\n\nThank you!`,
  });
}

export function generalEnquiryLink(message = "Hi LUNA MIA, I'd like to enquire about a gift hamper.") {
  return emailEnquiryLink({
    subject: "Gift Hamper Enquiry",
    body: `${message}\n\nThank you!`,
  });
}