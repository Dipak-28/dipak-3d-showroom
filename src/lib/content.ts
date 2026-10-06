export type ArtKind =
  | "sofa"
  | "luxury-sofa"
  | "bed"
  | "dining"
  | "kitchen"
  | "wardrobe"
  | "office"
  | "tv"
  | "office-set";

export type Tint = "sand" | "oat" | "clay" | "sage" | "walnut" | "brass";

export type Category = {
  id: string;
  name: string;
  description: string;
  art: ArtKind;
  tint: Tint;
};

export type Product = {
  id: string;
  name: string;
  blurb: string;
  details: string;
  category: string;
  art: ArtKind;
  tint: Tint;
  badge?: string;
  specs: string[];
};

export const CONTACT = {
  business: "Dipak Furnitures",
  tagline: "Quality Furniture. Better Living.",
  phoneRaw: "9826627031",
  phoneDisplay: "98266 27031",
  phoneIntl: "+91 98266 27031",
  telHref: "tel:+919826627031",
  whatsappHref:
    "https://wa.me/919826627031?text=" +
    encodeURIComponent(
      "Hello Dipak Furnitures! I'd like to know more about your collection.",
    ),
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=Dipak%20Furnitures",
  address: [
    "Dipak Furnitures, Shop No. 12",
    "Main Market Road, Your City",
    "Madhya Pradesh — 486001",
  ],
  hours: [
    { day: "Mon — Sat", time: "10:00 AM — 8:30 PM" },
    { day: "Sunday", time: "11:00 AM — 7:00 PM" },
  ],
};

/** Prefilled WhatsApp deep link for enquiries. */
export function whatsappFor(message: string) {
  return `${CONTACT.whatsappHref.split("?")[0]}?text=${encodeURIComponent(message)}`;
}

/** Social profiles — swap the first two URLs for the real accounts. */
export const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "Facebook", href: "https://www.facebook.com/" },
  { label: "WhatsApp", href: CONTACT.whatsappHref },
];

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Furniture", href: "#furniture" },
  { label: "Collections", href: "#collection" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const CATEGORIES: Category[] = [
  {
    id: "sofas",
    name: "Sofas",
    description:
      "Curved, L-shaped and recliner sofas built for long, comfortable evenings.",
    art: "sofa",
    tint: "sand",
  },
  {
    id: "beds",
    name: "Beds",
    description:
      "Solid wood and engineered beds with plush headboards and optional storage.",
    art: "bed",
    tint: "oat",
  },
  {
    id: "dining",
    name: "Dining Tables",
    description:
      "4 to 8 seater dining sets in walnut, oak, glass and matte veneer finishes.",
    art: "dining",
    tint: "clay",
  },
  {
    id: "kitchens",
    name: "Modular Kitchens",
    description:
      "Smart storage, soft-close hardware and finishes that survive real cooking.",
    art: "kitchen",
    tint: "sage",
  },
  {
    id: "wardrobes",
    name: "Wardrobes",
    description:
      "Sliding and hinged wardrobes tailored to your wall, wardrobe count and budget.",
    art: "wardrobe",
    tint: "walnut",
  },
  {
    id: "office",
    name: "Office Furniture",
    description:
      "Ergonomic chairs, work desks and storage for productive workspaces.",
    art: "office",
    tint: "brass",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "modern-sofa",
    name: "Modern Sofa",
    blurb: "Three-seater in soft boucle with solid wood legs.",
    details:
      "A clean three-seater with high-resilience foam, a kiln-dried hardwood frame and removable boucle covers. Built for daily family use without losing its shape.",
    category: "Sofas",
    art: "sofa",
    tint: "sand",
    badge: "Bestseller",
    specs: ["Boucle fabric", "Hardwood frame", "3 seater", "Custom colours"],
  },
  {
    id: "luxury-sofa-set",
    name: "Luxury Sofa Set",
    blurb: "Five-seater L-shape with feather-firm cushions and leatherette finish.",
    details:
      "Our flagship L-shaped set with pocket-sprung seats, stain-resistant leatherette and a modular configuration that adapts to your living room layout.",
    category: "Sofas",
    art: "luxury-sofa",
    tint: "walnut",
    badge: "Premium",
    specs: ["5 seater L-shape", "Leatherette", "Pocket springs", "Modular"],
  },
  {
    id: "king-size-bed",
    name: "King Size Bed",
    blurb: "Padded headboard with hydraulic storage and solid wood base.",
    details:
      "A quiet, sturdy king bed with a tufted headboard, gas-lift hydraulic storage and a matte veneer finish that resists scratches and moisture.",
    category: "Beds",
    art: "bed",
    tint: "oat",
    specs: ["King size", "Hydraulic storage", "Tufted headboard", "Veneer"],
  },
  {
    id: "modern-dining-table",
    name: "Modern Dining Table",
    blurb: "Six-seater walnut dining table with a matte glass top.",
    details:
      "A six-seater with a solid wood apron, tapered legs and 10mm toughened glass top. Seats a family of six comfortably, eight when needed.",
    category: "Dining Tables",
    art: "dining",
    tint: "clay",
    specs: ["6 seater", "Toughened glass", "Walnut finish", "Easy-clean"],
  },
  {
    id: "modular-kitchen",
    name: "Modular Kitchen",
    blurb: "L-shaped or parallel kitchen with soft-close hardware.",
    details:
      "BWP marine-grade carcass, tandem box drawers, soft-close hinges and a quartz or acrylic counter. Designed around how you actually cook.",
    category: "Modular Kitchens",
    art: "kitchen",
    tint: "sage",
    badge: "Customisable",
    specs: ["Marine ply", "Tandem boxes", "Soft-close", "Quartz counter"],
  },
  {
    id: "premium-wardrobe",
    name: "Premium Wardrobe",
    blurb: "Sliding wardrobe with mirror, drawers and organizer inserts.",
    details:
      "Floor-to-ceiling sliding wardrobe with mirror panels, dedicated locker space, trouser rods and soft-close drawers — sized to your wall.",
    category: "Wardrobes",
    art: "wardrobe",
    tint: "walnut",
    specs: ["Sliding doors", "Mirror panel", "Drawer set", "Made to measure"],
  },
  {
    id: "tv-unit",
    name: "TV Unit",
    blurb: "Wall-mounted console with concealed cable management.",
    details:
      "A floating TV console with push-to-open drawers, ventilated back panel and hidden cable channels. Fits televisions up to 65 inches.",
    category: "Living Room",
    art: "tv",
    tint: "brass",
    specs: ["Up to 65 inch", "Floating mount", "Cable channels", "Soft-close"],
  },
  {
    id: "office-chair-table",
    name: "Office Chair & Table",
    blurb: "Ergonomic mesh chair with height-adjustable work desk.",
    details:
      "A breathable mesh chair with 4-way adjustable lumbar support, PU wheels and a wide desk with cable tray — ready for long work days.",
    category: "Office Furniture",
    art: "office-set",
    tint: "sage",
    specs: ["4-way lumbar", "Mesh back", "Height adjustable", "5-year warranty"],
  },
];

export const WHY_CHOOSE = [
  {
    icon: "gem" as const,
    title: "Quality Materials",
    body: "Furniture built with durable and reliable materials.",
  },
  {
    icon: "sparkles" as const,
    title: "Modern Designs",
    body: "Contemporary designs for modern homes.",
  },
  {
    icon: "sofa" as const,
    title: "Comfort First",
    body: "Furniture designed for everyday comfort.",
  },
  {
    icon: "ruler" as const,
    title: "Custom Solutions",
    body: "Furniture solutions tailored to your space.",
  },
  {
    icon: "handshake" as const,
    title: "Trusted Service",
    body: "Friendly service from selection to delivery.",
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "Excellent quality and beautiful designs. The furniture completely transformed our living room.",
    name: "Happy Customer",
    role: "3BHK Homeowner",
    rating: 5,
  },
  {
    quote:
      "They measured our kitchen, suggested better storage and delivered exactly on the promised date. Feels premium.",
    name: "Anita Sharma",
    role: "Modular Kitchen",
    rating: 5,
  },
  {
    quote:
      "We furnished an entire office — chairs, desks and storage. Comfort is great and the team was genuinely helpful.",
    name: "Rahul Verma",
    role: "Office Manager",
    rating: 5,
  },
  {
    quote:
      "The custom wardrobe fits our awkward wall perfectly. Nothing was forced, everything was designed around our space.",
    name: "Priya & Karan",
    role: "Homeowners",
    rating: 5,
  },
];

export const CUSTOM_OPTIONS = [
  "Custom dimensions",
  "Custom designs",
  "Material selection",
  "Color selection",
  "Space optimization",
];

export const SWATCHES = [
  { name: "Walnut", body: "#7a4e2d", accent: "#c1793f" },
  { name: "Oatmeal", body: "#d8c7ab", accent: "#a8593a" },
  { name: "Olive", body: "#6f7a63", accent: "#c6a15b" },
  { name: "Espresso", body: "#2b231c", accent: "#c6a15b" },
];
