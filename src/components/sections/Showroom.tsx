import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Hand, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ShowroomScene, { PIECES, STOPS } from "@/components/three/ShowroomScene";
import { SectionHeading } from "@/components/Section";
import { whatsappFor } from "@/lib/content";
import { cn } from "@/lib/utils";

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

export default function Showroom() {
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const drag = useRef({ yaw: 0, pitch: 0 });
  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const el = trackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = Math.max(1, el.offsetHeight - window.innerHeight);
      const p = clamp(-rect.top / total, 0, 1);
      progress.current = p;

      if (fillRef.current) {
        fillRef.current.style.transform = `scaleX(${p})`;
      }

      const index = Math.round(p * (STOPS.length - 1));
      setStep((prev) => (prev === index ? prev : index));
      const hasStarted = p > 0.015;
      setStarted((prev) => (prev === hasStarted ? prev : hasStarted));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const jumpTo = (index: number) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const total = Math.max(1, el.offsetHeight - window.innerHeight);
    const top =
      window.scrollY + rect.top + (index / (STOPS.length - 1)) * total;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const piece = PIECES.find((p) => p.id === selected) ?? null;

  return (
    <section
      id="showroom"
      className="relative border-t border-border/60 bg-background"
    >
      <div className="shell pb-8 pt-20 md:pb-10 md:pt-28">
        <SectionHeading
          kicker="Interactive 3D showroom"
          title={
            <>
              Explore Our Furniture{" "}
              <span className="italic text-walnut">in 3D</span>
            </>
          }
          description="Scroll to move the camera through a fully staged room. Drag to look around and click any piece to see how it's built."
        />
      </div>

      <div
        ref={trackRef}
        className="relative"
        style={{ height: `${STOPS.length * 80}vh` }}
      >
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden border-y border-border bg-[#efe8de]">
          <ShowroomScene
            progress={progress}
            drag={drag}
            selected={selected}
            onSelect={setSelected}
          />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_100%_at_50%_0%,transparent_50%,rgba(43,35,28,0.3)_100%)]"
          />

          {/* current stop caption */}
          <div className="pointer-events-none absolute left-4 top-[5.5rem] w-[19rem] max-w-[calc(100vw-2rem)] md:left-8 md:top-28 md:w-[22rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="glass pointer-events-auto rounded-3xl border border-border/70 p-4 shadow-[0_30px_60px_-42px_rgba(43,35,28,0.9)] md:p-5"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-caramel">
                  Stop {step + 1} / {STOPS.length}
                </span>
                <h3 className="display-font mt-1.5 text-xl font-semibold text-foreground md:text-2xl">
                  {STOPS[step].label}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-taupe md:text-sm">
                  {STOPS[step].caption}
                </p>
                {STOPS[step].piece && (
                  <button
                    type="button"
                    onClick={() => setSelected(STOPS[step].piece)}
                    className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-card/80 px-3 py-1.5 text-xs font-semibold text-walnut transition hover:border-caramel/70 hover:text-caramel"
                  >
                    Piece details
                    <ArrowUpRight className="size-3.5" />
                  </button>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* stop rail */}
          <div className="absolute right-4 top-1/2 hidden -translate-y-1/2 flex-col items-end gap-4 md:right-8 md:flex">
            {STOPS.map((stop, i) => (
              <button
                key={stop.label}
                type="button"
                onClick={() => jumpTo(i)}
                aria-label={`Go to ${stop.label}`}
                className="group flex items-center gap-3"
              >
                <span
                  className={cn(
                    "text-[11px] font-semibold uppercase tracking-[0.16em] transition-opacity",
                    i === step
                      ? "text-foreground opacity-100"
                      : "text-taupe opacity-0 group-hover:opacity-100",
                  )}
                >
                  {stop.label}
                </span>
                <span
                  className={cn(
                    "h-px transition-all duration-300",
                    i === step
                      ? "w-9 bg-caramel"
                      : "w-4 bg-border group-hover:w-7 group-hover:bg-walnut",
                  )}
                />
                <span
                  className={cn(
                    "size-2.5 rounded-full ring-4 ring-background/0 transition-all",
                    i === step
                      ? "scale-110 bg-caramel"
                      : "bg-border group-hover:bg-walnut",
                  )}
                />
              </button>
            ))}
          </div>

          {/* bottom-left: selection panel or drag hint */}
          <div className="pointer-events-none absolute bottom-16 left-4 right-4 md:bottom-8 md:left-8 md:right-8">
            <AnimatePresence mode="wait">
              {piece ? (
                <motion.div
                  key="piece"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 18 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="glass pointer-events-auto w-full max-w-md rounded-3xl border border-border/70 p-5 shadow-[0_36px_70px_-44px_rgba(43,35,28,0.95)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-caramel">
                        Selected piece
                      </span>
                      <h4 className="display-font mt-1 text-xl font-semibold text-foreground">
                        {piece.title}
                      </h4>
                    </div>
                    <button
                      type="button"
                      aria-label="Close details"
                      onClick={() => setSelected(null)}
                      className="grid size-8 shrink-0 place-items-center rounded-full border border-border bg-card/80 text-taupe transition hover:border-caramel/70 hover:text-caramel"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                  <p className="mt-2 text-[13px] leading-relaxed text-taupe">
                    {piece.blurb}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {piece.specs.map((spec) => (
                      <li
                        key={spec}
                        className="rounded-full border border-border bg-card/70 px-2.5 py-1 text-[11px] font-medium text-taupe"
                      >
                        {spec}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button
                      asChild
                      size="sm"
                      className="rounded-full bg-primary text-[13px] font-semibold hover:bg-walnut"
                    >
                      <a
                        href={whatsappFor(
                          `Hi Dipak Furnitures! I saw the ${piece.title} in your 3D showroom and I'd like a quote.`,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Enquire Now
                        <ArrowUpRight className="size-3.5" />
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="rounded-full border-border bg-transparent text-[13px] font-semibold hover:border-walnut/70 hover:bg-card"
                    >
                      <a href="#collection">See Collection</a>
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="hint"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="pointer-events-none flex w-fit items-center gap-2 rounded-full border border-border/70 bg-card/75 px-4 py-2.5 text-xs font-semibold text-taupe backdrop-blur"
                >
                  <Hand className="size-4 text-caramel" />
                  Drag to look around · tap any furniture for details
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* bottom-right controls */}
          <div className="absolute bottom-5 right-4 hidden flex-col items-end gap-3 md:bottom-8 md:right-8 md:flex">
            <AnimatePresence>
              {started && (
                <motion.button
                  key="reset"
                  type="button"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={() => {
                    drag.current.yaw = 0;
                    drag.current.pitch = 0;
                  }}
                  className="flex items-center gap-2 rounded-full border border-border/70 bg-card/80 px-4 py-2.5 text-xs font-semibold text-taupe backdrop-blur transition hover:border-caramel/70 hover:text-caramel"
                >
                  <RotateCcw className="size-3.5" />
                  Reset view
                </motion.button>
              )}
            </AnimatePresence>

            <div className="flex items-center gap-2 rounded-full border border-border/70 bg-card/80 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-taupe backdrop-blur">
              <span className="relative block h-1.5 w-24 overflow-hidden rounded-full bg-border">
                <span
                  ref={fillRef}
                  className="absolute inset-0 origin-left scale-x-0 rounded-full bg-caramel"
                />
              </span>
              Room tour
            </div>
          </div>

          {/* mobile progress dots */}
          <div className="absolute bottom-5 right-4 flex items-center gap-1.5 md:hidden">
            {STOPS.map((stop, i) => (
              <button
                key={stop.label}
                type="button"
                aria-label={`Go to ${stop.label}`}
                onClick={() => jumpTo(i)}
                className={cn(
                  "rounded-full transition-all duration-300",
                  i === step
                    ? "h-2 w-6 bg-caramel"
                    : "h-2 w-2 bg-border backdrop-blur",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
