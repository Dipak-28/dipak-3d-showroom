import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import FurnitureArt from "@/components/FurnitureArt";
import { Reveal } from "@/components/Section";

const HIGHLIGHTS = [
  "In-house carpentry, polishing and upholstery",
  "Termite-proof and moisture-resistant materials",
  "Free measurement and layout visit at your home",
  "Installation handled by our own trained team",
];

const STATS = [
  { value: "12+", label: "Years crafting furniture" },
  { value: "4,500+", label: "Homes delivered to" },
  { value: "4.9/5", label: "Average customer rating" },
];

export default function About() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="about" className="section-y border-t border-border/60 bg-background">
      <div className="shell grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* visual */}
        <div className="relative">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_40px_90px_-60px_rgba(43,35,28,0.9)]">
              <FurnitureArt kind="bed" tint="oat" className="h-full w-full" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-card via-card/70 to-transparent p-5 sm:p-6">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-caramel">
                    Since 2013
                  </p>
                  <p className="display-font mt-1 text-lg font-semibold text-foreground">
                    Crafted in our own workshop
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="glass absolute -right-3 top-6 hidden -rotate-2 rounded-2xl border border-border/70 px-4 py-3 shadow-[0_24px_50px_-34px_rgba(43,35,28,0.9)] sm:block">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-taupe">
                Solid wood
              </p>
              <div className="mt-2 flex gap-1.5">
                {["#7a4e2d", "#c69a68", "#e3d3ba", "#6f7a63"].map((c) => (
                  <span
                    key={c}
                    className="size-6 rounded-full border border-white/70 shadow-sm"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="absolute -bottom-6 left-4 hidden -rotate-1 rounded-2xl border border-border bg-espresso px-5 py-4 text-bone shadow-[0_28px_60px_-34px_rgba(43,35,28,0.95)] sm:block">
              <p className="display-font text-2xl font-semibold">4,500+</p>
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-bone/60">
                Homes furnished
              </p>
            </div>
          </Reveal>
        </div>

        {/* copy */}
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-walnut backdrop-blur">
              <span className="size-1.5 rounded-full bg-caramel" />
              About us
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="display-font mt-5 text-3xl font-semibold leading-[1.08] tracking-[-0.02em] text-foreground sm:text-4xl lg:text-[2.75rem]">
              Built Around Quality,{" "}
              <span className="italic text-walnut">Designed Around You.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Dipak Furnitures brings together quality craftsmanship, modern
              designs and comfortable furniture to help customers create
              beautiful and functional spaces.
            </p>
          </Reveal>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                key="about-more"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-6">
                  <ul className="grid gap-2.5">
                    {HIGHLIGHTS.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm leading-relaxed text-taupe"
                      >
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-caramel/15 text-caramel">
                          <Check className="size-3" strokeWidth={3} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <dl className="mt-6 grid grid-cols-3 gap-3">
                    {STATS.map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-2xl border border-border bg-card px-3 py-3.5 text-center"
                      >
                        <dt className="display-font text-xl font-semibold text-foreground">
                          {stat.value}
                        </dt>
                        <dd className="mt-1 text-[10px] font-medium uppercase tracking-[0.12em] text-taupe">
                          {stat.label}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                onClick={() => setExpanded((v) => !v)}
                className="group h-12 rounded-full bg-primary px-6 text-[15px] font-semibold hover:bg-walnut"
              >
                {expanded ? "Show Less" : "Know More About Us"}
                <ChevronDown
                  className={`size-4 transition-transform duration-300 ${
                    expanded ? "rotate-180" : ""
                  }`}
                />
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-12 rounded-full border-border bg-transparent px-6 text-[15px] font-semibold hover:border-walnut/70 hover:bg-card"
              >
                <a href="#contact">
                  Visit the Store
                  <ArrowUpRight className="size-4" />
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
