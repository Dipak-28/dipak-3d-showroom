import { renderToString } from "react-dom/server";
import Landing from "./src/pages/Landing";

const html = renderToString(<Landing />);

const mustContain = [
  "Dipak Furnitures",
  "Furniture That Makes Your House",
  "Discover stylish, comfortable and durable furniture",
  "Explore Collection",
  "Contact Us",
  "Visit Our Store",
  "Sofas",
  "Beds",
  "Dining Tables",
  "Modular Kitchens",
  "Wardrobes",
  "Office Furniture",
  "Modern Sofa",
  "Luxury Sofa Set",
  "King Size Bed",
  "Modular Kitchen",
  "Premium Wardrobe",
  "TV Unit",
  "View Details",
  "Enquire Now",
  "Explore Our Furniture",
  "Quality Materials",
  "Modern Designs",
  "Comfort First",
  "Custom Solutions",
  "Trusted Service",
  "Built Around Quality",
  "Know More About Us",
  "Your Space",
  "Your Design",
  "Your Furniture",
  "Design Your Furniture",
  "Excellent quality and beautiful designs",
  "Ready to Transform",
  "Visit Dipak Furnitures and find furniture",
  "Call Now",
  "WhatsApp Us",
  "Get Directions",
  "9826627031",
  "Quality Furniture. Better Living.",
  'href="#collection"',
  'href="tel:+919826627031"',
  'href="https://wa.me/919826627031',
  'id="home"',
  'id="furniture"',
  'id="collection"',
  'id="showroom"',
  'id="about"',
  'id="contact"',
];

const missing = mustContain.filter((needle) => !html.includes(needle));
console.log("rendered bytes:", html.length);
if (missing.length) {
  console.log("MISSING:", missing);
  process.exit(1);
}
console.log("all landing content checks passed");
