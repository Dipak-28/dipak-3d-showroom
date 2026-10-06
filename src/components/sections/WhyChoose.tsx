import {
  Gem,
  HeartHandshake,
  Ruler,
  Sparkles,
  Sofa,
  type LucideIcon,
} from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Section";
import { WHY_CHOOSE } from "@/lib/content";

const ICONS: Record<string, LucideIcon> = {
  gem: Gem,
  sparkles: Sparkles,
  sofa: Sofa,
  ruler: Ruler,
  handshake: HeartHandshake,
};

export default function WhyChoose() {
  return (
    <section
      id="why"
      className="section-y grain relative overflow-hidden bg-espresso text-bone"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-0 size-[28rem] rounded-full bg-caramel/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 size-[24rem] rounded-full bg-brass/10 blur-3xl"
      />

      <div className="shell relative">
        <SectionHeading
            kicker="Why choose us"
            title={
              <>
                Built to be lived on,{' '}
                <span className="italic text-brass">not just looked at</span>
              </>
            }
            description="Five promises we keep on every order — from the first measurement to the last screw."
          className="text-bone [&_h2]:text-bone [&_p]:text-bone/70 [&_span]:text-brass"
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {WHY_CHOOSE.map((item, i) => {
            const Icon = ICONS[item.icon];
            return (
              <Reveal key={item.title} delay={i * 0.07}>
                <div className="group h-full rounded-3xl border border-white/12 bg-white/[0.06] p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:border-brass/50 hover:bg-white/[0.1]">
                  <div className="grid size-12 place-items-center rounded-2xl border border-brass/30 bg-brass/15 text-brass transition-colors duration-300 group-hover:bg-brass group-hover:text-espresso">
                    <Icon className="size-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="display-font mt-5 text-lg font-semibold text-bone">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-bone/65">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
