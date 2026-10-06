import { ArrowUpRight } from "lucide-react";
import { CATEGORIES, type Tint } from "@/lib/content";
import FurnitureArt from "@/components/FurnitureArt";
import { Reveal, SectionHeading } from "@/components/Section";
import { cn } from "@/lib/utils";

const TINT_BG: Record<Tint, string> = {
  sand: "bg-[linear-gradient(180deg,#f8f2e8,#efe6d6)]",
  oat: "bg-[linear-gradient(180deg,#f5f0e6,#eae1d0)]",
  clay: "bg-[linear-gradient(180deg,#fbf1ea,#f2e2d6)]",
  sage: "bg-[linear-gradient(180deg,#f1f3ec,#e4e8dc)]",
  walnut: "bg-[linear-gradient(180deg,#f6efe5,#ebdfd0)]",
  brass: "bg-[linear-gradient(180deg,#f9f3e7,#efe5ce)]",
};

export default function Categories() {
  return (
    <section
      id="furniture"
      className="section-y relative border-t border-border/60 bg-background"
    >
      <div className="shell">
        <SectionHeading
          kicker="Browse by category"
          title={
            <>
              Six ways to furnish{" "}
              <span className="italic text-walnut">every room</span>
            </>
          }
          description="From the sofa you sink into at night to the kitchen you cook in every morning — pick a category and see what we build."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category, i) => (
            <Reveal key={category.id} delay={(i % 3) * 0.08}>
              <a
                href="#collection"
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-500 hover:-translate-y-1.5 hover:border-caramel/60 hover:shadow-[0_34px_70px_-46px_rgba(43,35,28,0.85)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel/60"
              >
                <div
                  className={cn(
                    "relative aspect-[16/11] overflow-hidden",
                    TINT_BG[category.tint],
                  )}
                >
                  <FurnitureArt
                    kind={category.art}
                    tint={category.tint}
                    className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                  <span className="absolute left-4 top-4 rounded-full border border-white/60 bg-card/75 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-walnut backdrop-blur">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-3 p-6">
                  <h3 className="display-font text-xl font-semibold tracking-[-0.01em] text-foreground sm:text-[1.35rem]">
                    {category.name}
                  </h3>
                  <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                    {category.description}
                  </p>
                  <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-walnut transition-colors group-hover:text-caramel">
                    Explore
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
