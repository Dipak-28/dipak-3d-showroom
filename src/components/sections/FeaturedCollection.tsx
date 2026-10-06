import { useRef, useState, type PointerEvent } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Phone, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FurnitureArt from "@/components/FurnitureArt";
import { Reveal, SectionHeading } from "@/components/Section";
import { CONTACT, PRODUCTS, whatsappFor, type Product, type Tint } from "@/lib/content";
import { cn } from "@/lib/utils";

const TINT_BG: Record<Tint, string> = {
  sand: "bg-[linear-gradient(180deg,#f8f2e8,#efe6d6)]",
  oat: "bg-[linear-gradient(180deg,#f5f0e6,#eae1d0)]",
  clay: "bg-[linear-gradient(180deg,#fbf1ea,#f2e2d6)]",
  sage: "bg-[linear-gradient(180deg,#f1f3ec,#e4e8dc)]",
  walnut: "bg-[linear-gradient(180deg,#f6efe5,#ebdfd0)]",
  brass: "bg-[linear-gradient(180deg,#f9f3e7,#efe5ce)]",
};

function ProductCard({
  product,
  onDetails,
}: {
  product: Product;
  onDetails: (product: Product) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [7, -7]), {
    stiffness: 170,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-9, 9]), {
    stiffness: 170,
    damping: 20,
  });

  const onMove = (e: PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    px.set((e.clientX - rect.left) / Math.max(1, rect.width));
    py.set((e.clientY - rect.top) / Math.max(1, rect.height));
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.article
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-[0_10px_40px_-32px_rgba(43,35,28,0.7)] transition-colors duration-500 hover:border-caramel/60"
    >
      <div className={cn("relative aspect-[4/3] overflow-hidden", TINT_BG[product.tint])}>
        <FurnitureArt
          kind={product.art}
          tint={product.tint}
          className="h-full w-full"
        />
        <span className="absolute left-4 top-4 rounded-full border border-white/60 bg-card/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-walnut backdrop-blur">
          {product.category}
        </span>
        {product.badge && (
          <span className="absolute right-4 top-4 rounded-full bg-espresso px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-bone">
            {product.badge}
          </span>
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card/80 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="display-font text-lg font-semibold tracking-[-0.01em] text-foreground">
          {product.name}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {product.blurb}
        </p>

        <ul className="mt-1 flex flex-wrap gap-1.5">
          {product.specs.slice(0, 3).map((spec) => (
            <li
              key={spec}
              className="rounded-full border border-border bg-muted/70 px-2.5 py-1 text-[11px] font-medium text-taupe"
            >
              {spec}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex gap-2 pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDetails(product)}
            className="flex-1 rounded-full border-border bg-transparent text-[13px] font-semibold transition hover:border-walnut/70 hover:bg-card"
          >
            View Details
          </Button>
          <Button
            asChild
            size="sm"
            className="flex-1 rounded-full bg-primary text-[13px] font-semibold hover:bg-walnut"
          >
            <a
              href={whatsappFor(
                `Hi Dipak Furnitures! I'd like to enquire about the ${product.name}.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Enquire Now
              <ArrowUpRight className="size-3.5" />
            </a>
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

export default function FeaturedCollection() {
  const [active, setActive] = useState<Product | null>(null);

  return (
    <section
      id="collection"
      className="section-y relative border-t border-border/60 bg-[linear-gradient(180deg,#f7f2e9_0%,#fbf8f3_60%,#fbf8f3_100%)]"
    >
      <div className="shell">
        <SectionHeading
          kicker="Featured collection"
          title={
            <>
              The pieces people <span className="italic text-walnut">take home</span>
            </>
          }
          description="Eight showroom favourites — every one available in your size, finish and fabric."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((product, i) => (
            <Reveal key={product.id} delay={(i % 4) * 0.07}>
              <ProductCard product={product} onDetails={setActive} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col items-center gap-4 rounded-3xl border border-border bg-card/70 px-6 py-8 text-center backdrop-blur sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="display-font text-xl font-semibold text-foreground">
                Can&apos;t find your size?
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Every model here is made to measure — tell us your dimensions.
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                asChild
                variant="outline"
                className="rounded-full border-border bg-transparent hover:border-walnut/70 hover:bg-card"
              >
                <a href="#custom">Design Your Furniture</a>
              </Button>
              <Button
                asChild
                className="rounded-full bg-primary hover:bg-walnut"
              >
                <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer">
                  Chat With Us
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>

      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-w-3xl gap-0 overflow-hidden border-border bg-card p-0 shadow-[0_40px_90px_-50px_rgba(43,35,28,0.9)]">
          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="grid md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
              >
                <div
                  className={cn(
                    "relative hidden min-h-full md:block",
                    TINT_BG[active.tint],
                  )}
                >
                  <FurnitureArt
                    kind={active.art}
                    tint={active.tint}
                    className="h-full w-full"
                  />
                </div>

                <div className="flex flex-col gap-4 p-6 sm:p-8">
                  <DialogHeader className="text-left">
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-caramel">
                      {active.category}
                    </span>
                    <DialogTitle className="display-font text-2xl font-semibold text-foreground sm:text-3xl">
                      {active.name}
                    </DialogTitle>
                    <DialogDescription className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {active.details}
                    </DialogDescription>
                  </DialogHeader>

                  <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {active.specs.map((spec) => (
                      <li
                        key={spec}
                        className="flex items-center gap-2 rounded-xl border border-border bg-muted/60 px-3 py-2 text-[13px] font-medium text-taupe"
                      >
                        <Ruler className="size-3.5 shrink-0 text-caramel" />
                        {spec}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-2 flex flex-wrap gap-2">
                    <Button
                      asChild
                      className="rounded-full bg-primary font-semibold hover:bg-walnut"
                    >
                      <a
                        href={whatsappFor(
                          `Hi Dipak Furnitures! I'd like to enquire about the ${active.name}.`,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Enquire on WhatsApp
                        <ArrowUpRight className="size-4" />
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="rounded-full border-border bg-transparent font-semibold hover:border-walnut/70 hover:bg-card"
                    >
                      <a href={CONTACT.telHref}>
                        <Phone className="size-4" />
                        Call {CONTACT.phoneDisplay}
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </section>
  );
}
