import type { ReactElement } from "react";
import { Facebook, Instagram, MapPin, Phone } from "lucide-react";
import { CONTACT, NAV_LINKS, SOCIALS } from "@/lib/content";

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.38a9.9 9.9 0 0 0 4.76 1.21c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.05-.2-.31a8.2 8.2 0 0 1-1.26-4.37c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.79.97-.14.16-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.84-.2-.48-.4-.42-.56-.43h-.47c-.16 0-.43.06-.65.31-.22.25-.85.83-.85 2.03s.87 2.35.99 2.51c.12.17 1.71 2.61 4.15 3.66.58.25 1.03.4 1.39.51.58.19 1.11.16 1.53.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}

const SOCIAL_ICONS: Record<
  string,
  (p: { className?: string }) => ReactElement
> = {
  Instagram: ({ className }) => <Instagram className={className} aria-hidden />,
  Facebook: ({ className }) => <Facebook className={className} aria-hidden />,
  WhatsApp: ({ className }) => <WhatsAppGlyph className={className} />,
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-espresso text-bone">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-32 size-[22rem] rounded-full bg-caramel/10 blur-3xl"
      />

      <div className="shell relative py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1.1fr]">
          <div>
            <a href="#home" className="flex items-center gap-2.5">
              <span className="relative grid size-10 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-caramel to-walnut text-bone shadow-[0_10px_24px_-12px_rgba(0,0,0,0.9)]">
                <span className="display-font text-sm font-semibold leading-none">
                  DF
                </span>
                <span className="absolute inset-x-1 top-0 h-px bg-white/40" />
              </span>
              <span className="display-font text-xl font-semibold tracking-[-0.01em]">
                Dipak Furnitures
              </span>
            </a>

            <p className="display-font mt-4 text-lg italic text-brass">
              Quality Furniture. Better Living.
            </p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-bone/60">
              Sofas, beds, dining sets, modular kitchens, wardrobes and office
              furniture — designed for your space, built for daily life.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {SOCIALS.map((social) => {
                const Icon = SOCIAL_ICONS[social.label];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="grid size-10 place-items-center rounded-full border border-white/15 bg-white/5 text-bone/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-brass/60 hover:bg-brass hover:text-espresso"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <nav aria-label="Footer">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.24em] text-bone/45">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-bone/70 transition-colors hover:text-brass"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.24em] text-bone/45">
              Visit Us
            </h3>
            <address className="mt-4 space-y-1 text-sm not-italic leading-relaxed text-bone/70">
              {CONTACT.address.map((line) => (
                <span key={line} className="flex items-start gap-2">
                  {line === CONTACT.address[0] && (
                    <MapPin className="mt-0.5 size-4 shrink-0 text-brass" />
                  )}
                  <span className={line === CONTACT.address[0] ? "" : "ml-6"}>
                    {line}
                  </span>
                </span>
              ))}
            </address>

            <a
              href={CONTACT.telHref}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-bone transition-colors hover:text-brass"
            >
              <Phone className="size-4 text-brass" />
              {CONTACT.phoneIntl}
            </a>

            <dl className="mt-3 space-y-1 text-sm text-bone/60">
              {CONTACT.hours.map((row) => (
                <div key={row.day} className="flex gap-2">
                  <dt className="w-20 shrink-0">{row.day}</dt>
                  <dd>{row.time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-bone/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {CONTACT.business}. All rights reserved.
          </p>
          <p className="tracking-[0.16em] uppercase">
            Made for homes that last
          </p>
        </div>
      </div>
    </footer>
  );
}
