import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Layers,
  Maximize2,
  Palette,
  Pencil,
  Ruler,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import FurnitureArt from "@/components/FurnitureArt";
import { Reveal } from "@/components/Section";
import { CUSTOM_OPTIONS, SWATCHES, whatsappFor } from "@/lib/content";

const STEPS = [
  {
    icon: Ruler,
    title: "Your Space",
    body: "We measure your room, walls, sockets and walkways — down to the last inch.",
  },
  {
    icon: Pencil,
    title: "Your Design",
    body: "Pick the layout, style, material and colour with our designer, on paper before we cut.",
  },
  {
    icon: ArrowRight,
    title: "Your Furniture",
    body: "We build, deliver and install in your home — on a date we commit to in writing.",
  },
];

const OPTION_ICONS = [Ruler, Pencil, Layers, Palette, Maximize2];

export default function CustomFurniture() {
  const [swatchIndex, setSwatchIndex] = useState(0);
  const selected = SWATCHES[swatchIndex];

  return (
    <section
      id="custom"
      className="section-y relative overflow-hidden border-t border-border/60 bg-[linear-gradient(180deg,#f4eee4_0%,#fbf8f3_100%)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10rem] top-10 size-[26rem] rounded-full bg-caramel/10 blur-3xl"
      />

      <div className="shell relative">
        <div className="flex flex-col items-start gap-5">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-walnut backdrop-blur">
              <span className="size-1.5 rounded-full bg-caramel" />
              Custom furniture
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <h2
              aria-label="Your Space → Your Design → Your Furniture"
              className="display-font flex flex-wrap items-center gap-x-4 gap-y-2 text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-foreground sm:text-4xl lg:text-5xl"
            >
              <span>Your Space</span>
              <ArrowRight
                aria-hidden
                className="size-6 shrink-0 text-caramel sm:size-8"
                strokeWidth={2}
              />
              <span>Your Design</span>
              <ArrowRight
                aria-hidden
                className="size-6 shrink-0 text-caramel sm:size-8"
                strokeWidth={2}
              />
              <span className="italic text-walnut">Your Furniture</span>
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Nothing off the shelf. Tell us the wall, we&apos;ll design the
              piece — dimensions, design, material, colour and every inch of
              usable space.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10">
          {/* live colour preview */}
          <Reveal delay={0.08}>
            <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_40px_90px_-62px_rgba(43,35,28,0.9)]">
              <div className="relative aspect-[16/11] bg-[linear-gradient(180deg,#f8f2e8,#efe6d6)]">
                <FurnitureArt
                  kind="sofa"
                  tint="sand"
                  fabric={selected.body}
                  className="h-full w-full"
                />
                <span className="absolute left-4 top-4 rounded-full border border-white/60 bg-card/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-walnut backdrop-blur">
                  Live preview
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-caramel">
                    Colour selection
                  </p>
                  <p className="display-font mt-1 text-lg font-semibold text-foreground">
                    {selected.name} upholstery
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  {SWATCHES.map((swatch, i) => (
                    <button
                      key={swatch.name}
                      type="button"
                      aria-label={`Select ${swatch.name}`}
                      aria-pressed={i === swatchIndex}
                      onClick={() => setSwatchIndex(i)}
                      className={`relative size-9 rounded-full border-2 transition-transform duration-300 ${
                        i === swatchIndex
                          ? "scale-110 border-caramel shadow-[0_8px_20px_-10px_rgba(43,35,28,0.9)]"
                          : "border-white/80 hover:scale-105"
                      }`}
                      style={{ backgroundColor: swatch.body }}
                    >
                      {i === swatchIndex && (
                        <Check
                          className="absolute inset-0 m-auto size-4 text-white drop-shadow"
                          strokeWidth={3}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* steps + options + CTA */}
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              {STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <Reveal key={step.title} delay={0.1 + i * 0.07}>
                    <div className="group flex items-start gap-4 rounded-3xl border border-border bg-card/80 p-5 backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:border-caramel/60 hover:shadow-[0_30px_60px_-46px_rgba(43,35,28,0.9)]">
                      <div className="flex flex-col items-center gap-2">
                        <span className="display-font grid size-10 shrink-0 place-items-center rounded-2xl bg-espresso text-sm font-semibold text-bone transition-colors group-hover:bg-walnut">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {i < STEPS.length - 1 && (
                          <span className="hidden w-px flex-1 border-l border-dashed border-border sm:block" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <Icon
                            className="size-4 text-caramel"
                            strokeWidth={2}
                            aria-hidden
                          />
                          <h3 className="display-font text-lg font-semibold text-foreground">
                            {step.title}
                          </h3>
                        </div>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                          {step.body}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={0.24}>
              <ul className="flex flex-wrap gap-2">
                {CUSTOM_OPTIONS.map((option, i) => {
                  const Icon = OPTION_ICONS[i] ?? Check;
                  return (
                    <li
                      key={option}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 text-[13px] font-medium text-taupe transition-colors hover:border-caramel/60 hover:text-walnut"
                    >
                      <Icon className="size-3.5 text-caramel" aria-hidden />
                      {option}
                    </li>
                  );
                })}
              </ul>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="h-12 rounded-full bg-primary px-7 text-[15px] font-semibold hover:bg-walnut"
                >
                  <a
                    href={whatsappFor(
                      `Hi Dipak Furnitures! I'd like to design custom furniture. My preference: ${selected.name} finish.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Design Your Furniture
                    <ArrowUpRight className="size-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 rounded-full border-border bg-transparent px-7 text-[15px] font-semibold hover:border-walnut/70 hover:bg-card"
                >
                  <a href="#collection">Browse Ready Designs</a>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
