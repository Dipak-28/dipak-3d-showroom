import {
  ArrowUpRight,
  Clock,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Section";
import { CONTACT } from "@/lib/content";

function StyledMap() {
  return (
    <svg
      viewBox="0 0 800 420"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <rect width="800" height="420" fill="#f2ece2" />
      <g fill="#e7dece">
        <rect x="36" y="30" width="210" height="130" rx="12" />
        <rect x="286" y="30" width="180" height="130" rx="12" />
        <rect x="506" y="30" width="256" height="90" rx="12" />
        <rect x="36" y="250" width="160" height="140" rx="12" />
        <rect x="240" y="270" width="230" height="120" rx="12" />
        <rect x="520" y="220" width="242" height="170" rx="12" />
        <rect x="506" y="150" width="120" height="46" rx="10" />
        <rect x="656" y="150" width="106" height="46" rx="10" />
      </g>
      <g fill="#dde4d2">
        <rect x="286" y="188" width="180" height="56" rx="14" />
      </g>
      <g stroke="#fdfbf6" strokeWidth="22" strokeLinecap="round">
        <line x1="0" y1="210" x2="800" y2="210" />
        <line x1="264" y1="0" x2="264" y2="420" />
        <line x1="492" y1="0" x2="492" y2="420" />
        <line x1="0" y1="352" x2="800" y2="352" />
      </g>
      <g stroke="#e2d9c8" strokeWidth="2" strokeDasharray="10 10">
        <line x1="0" y1="210" x2="800" y2="210" />
        <line x1="264" y1="0" x2="264" y2="420" />
      </g>
      <path
        d="M600 60c40 10 70 44 74 86"
        fill="none"
        stroke="#c9bda8"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="section-y border-t border-border/60 bg-background">
      <div className="shell">
        {/* final CTA */}
        <Reveal>
          <div className="grain relative overflow-hidden rounded-[2.25rem] bg-espresso px-6 py-14 text-bone sm:px-10 md:px-14 md:py-20">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-24 -top-24 size-[26rem] rounded-full bg-caramel/20 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-32 right-0 size-[24rem] rounded-full bg-brass/10 blur-3xl"
            />

            <div className="relative flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-brass backdrop-blur">
                  <span className="size-1.5 rounded-full bg-caramel" />
                  Visit the showroom
                </span>

                <h2 className="display-font mt-6 text-3xl font-semibold leading-[1.06] tracking-[-0.02em] sm:text-4xl lg:text-[3.25rem]">
                  Ready to Transform{" "}
                  <span className="italic text-brass">Your Space?</span>
                </h2>

                <p className="mt-4 text-base leading-relaxed text-bone/70 sm:text-lg">
                  Visit Dipak Furnitures and find furniture that fits your
                  style, comfort and space.
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
                  <span className="flex items-center gap-2 text-sm font-medium text-bone/70">
                    <span className="grid size-9 place-items-center rounded-full bg-white/10">
                      <Phone className="size-4 text-brass" />
                    </span>
                    Dipak Furnitures
                  </span>
                  <a
                    href={CONTACT.telHref}
                    className="display-font text-2xl font-semibold tracking-wide text-bone transition-colors hover:text-brass"
                  >
                    {CONTACT.phoneRaw}
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="h-12 rounded-full bg-bone px-6 text-[15px] font-semibold text-espresso transition hover:bg-brass"
                >
                  <a href={CONTACT.telHref}>
                    <Phone className="size-4" />
                    Call Now
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="h-12 rounded-full border border-white/20 bg-white/10 px-6 text-[15px] font-semibold text-bone backdrop-blur transition hover:border-brass/70 hover:bg-white/15"
                >
                  <a
                    href={CONTACT.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="size-4" />
                    WhatsApp Us
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="h-12 rounded-full border border-white/20 bg-transparent px-6 text-[15px] font-semibold text-bone transition hover:border-brass/70 hover:bg-white/10"
                >
                  <a href={CONTACT.mapsHref} target="_blank" rel="noopener noreferrer">
                    <Navigation className="size-4" />
                    Get Directions
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* details + map */}
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          <Reveal delay={0.06}>
            <div className="h-full rounded-3xl border border-border bg-card p-6">
              <span className="grid size-11 place-items-center rounded-2xl bg-caramel/12 text-caramel">
                <MapPin className="size-5" strokeWidth={1.9} />
              </span>
              <h3 className="display-font mt-4 text-lg font-semibold text-foreground">
                Store Address
              </h3>
              <address className="mt-2 space-y-0.5 text-sm not-italic leading-relaxed text-muted-foreground">
                {CONTACT.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <a
                href={CONTACT.mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-walnut transition-colors hover:text-caramel"
              >
                Get Directions
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="h-full rounded-3xl border border-border bg-card p-6">
              <span className="grid size-11 place-items-center rounded-2xl bg-sage/15 text-sage">
                <Clock className="size-5" strokeWidth={1.9} />
              </span>
              <h3 className="display-font mt-4 text-lg font-semibold text-foreground">
                Business Hours
              </h3>
              <dl className="mt-3 space-y-2 text-sm">
                {CONTACT.hours.map((row) => (
                  <div
                    key={row.day}
                    className="flex items-center justify-between gap-3 border-b border-border/70 pb-2 last:border-0 last:pb-0"
                  >
                    <dt className="text-muted-foreground">{row.day}</dt>
                    <dd className="font-semibold text-foreground">{row.time}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 rounded-xl bg-muted/70 px-3 py-2 text-xs leading-relaxed text-taupe">
                Walk-ins welcome · Free measurement visit on request
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="h-full rounded-3xl border border-border bg-card p-6">
              <span className="grid size-11 place-items-center rounded-2xl bg-walnut/12 text-walnut">
                <Phone className="size-5" strokeWidth={1.9} />
              </span>
              <h3 className="display-font mt-4 text-lg font-semibold text-foreground">
                Talk To Us
              </h3>
              <a
                href={CONTACT.telHref}
                className="display-font mt-2 block text-2xl font-semibold text-foreground transition-colors hover:text-caramel"
              >
                {CONTACT.phoneDisplay}
              </a>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Call for stock, custom orders and delivery timelines — or send
                photos of your space on WhatsApp.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  asChild
                  size="sm"
                  className="rounded-full bg-primary text-[13px] font-semibold hover:bg-walnut"
                >
                  <a href={CONTACT.telHref}>
                    <Phone className="size-3.5" />
                    Call Now
                  </a>
                </Button>
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="rounded-full border-border bg-transparent text-[13px] font-semibold hover:border-walnut/70 hover:bg-card"
                >
                  <a
                    href={CONTACT.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="size-3.5" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>

        {/* map */}
        <Reveal delay={0.1}>
          <div className="relative mt-5 h-72 overflow-hidden rounded-3xl border border-border md:h-96">
            <StyledMap />

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
              <span className="relative flex size-4 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-caramel/60" />
                <span className="relative inline-flex size-4 rounded-full border-2 border-card bg-caramel shadow-[0_6px_18px_-6px_rgba(43,35,28,0.9)]" />
              </span>
            </div>

            <div className="absolute left-1/2 top-1/2 mt-3 -translate-x-1/2 whitespace-nowrap rounded-full border border-border bg-card/90 px-4 py-2 text-xs font-semibold text-foreground shadow-lg backdrop-blur">
              Dipak Furnitures
            </div>

            <div className="absolute inset-x-3 bottom-3 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card/85 px-4 py-3 backdrop-blur sm:inset-x-5 sm:bottom-5">
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-xl bg-espresso text-bone">
                  <MapPin className="size-4" />
                </span>
                <span className="text-sm leading-tight text-muted-foreground">
                  <span className="block font-semibold text-foreground">
                    {CONTACT.business}
                  </span>
                  {CONTACT.address[1]}
                </span>
              </div>
              <Button
                asChild
                size="sm"
                className="rounded-full bg-primary text-[13px] font-semibold hover:bg-walnut"
              >
                <a href={CONTACT.mapsHref} target="_blank" rel="noopener noreferrer">
                  Open in Google Maps
                  <ArrowUpRight className="size-3.5" />
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
