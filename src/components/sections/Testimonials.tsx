import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Section";
import { TESTIMONIALS } from "@/lib/content";

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="section-y border-t border-border/60 bg-[linear-gradient(180deg,#f6f0e7,#fbf8f3)]"
    >
      <div className="shell">
        <SectionHeading
          kicker="Customer stories"
          title={
            <>
              Homes that feel{" "}
              <span className="italic text-walnut">finished</span>
            </>
          }
          description="A few words from families and offices we have furnished."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {TESTIMONIALS.map((item, i) => (
            <Reveal key={item.name} delay={i * 0.08}>
              <motion.figure
                initial={{ rotateX: 0, rotateY: 0 }}
                whileHover={{
                  rotateX: -5,
                  rotateY: 5,
                  y: -8,
                  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                }}
                style={{ transformPerspective: 1000 }}
                className="group relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-3xl border border-border bg-card/80 p-6 shadow-[0_16px_44px_-36px_rgba(43,35,28,0.8)] backdrop-blur transition-colors duration-500 hover:border-caramel/60"
              >
                <span
                  aria-hidden
                  className="display-font absolute -right-1 -top-5 select-none text-[7rem] leading-none text-caramel/10 transition-colors duration-500 group-hover:text-caramel/20"
                >
                  &ldquo;
                </span>

                <div className="relative">
                  <div className="flex gap-1">
                    {Array.from({ length: item.rating }).map((_, s) => (
                      <Star
                        key={s}
                        className="size-4 fill-caramel text-caramel"
                      />
                    ))}
                  </div>
                  <blockquote className="display-font mt-4 text-[1.05rem] leading-relaxed text-foreground">
                    {item.quote}
                  </blockquote>
                </div>

                <figcaption className="relative flex items-center gap-3 border-t border-border pt-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-walnut to-espresso text-xs font-bold text-bone">
                    {item.name
                      .split(/\s+/)
                      .filter((word) => word.length > 1)
                      .map((word) => word[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                  <span className="flex flex-col">
                    <cite className="text-sm font-semibold not-italic text-foreground">
                      {item.name}
                    </cite>
                    <span className="text-xs text-taupe">{item.role}</span>
                  </span>
                </figcaption>
              </motion.figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
