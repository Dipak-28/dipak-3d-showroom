import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Phone, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroScene from "@/components/three/HeroScene";
import { CONTACT } from "@/lib/content";

const STATS = [
  { value: "12+", label: "Years of craft" },
  { value: "4,500+", label: "Homes furnished" },
  { value: "6", label: "Furniture categories" },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, -70]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#f1ebe1]"
    >
      {/* 3D living room */}
      <motion.div style={{ y: sceneY }} className="absolute inset-0">
        <HeroScene />
      </motion.div>

      {/* cinematic scrims so copy stays readable on every viewport */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(100deg,rgba(251,248,243,0.97)_0%,rgba(251,248,243,0.92)_26%,rgba(251,248,243,0.5)_46%,rgba(251,248,243,0)_66%)] md:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(251,248,243,0.94)_0%,rgba(251,248,243,0.86)_38%,rgba(251,248,243,0.42)_66%,rgba(251,248,243,0.9)_100%)] md:hidden"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background"
      />

      <div className="shell relative z-10 flex min-h-[100svh] flex-col justify-center pb-24 pt-32 md:pt-36">
        <motion.div
          style={{ y: copyY, opacity: copyOpacity }}
          className="max-w-2xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-walnut backdrop-blur"
          >
            <Star className="size-3.5 fill-caramel text-caramel" />
            Premium 3D Furniture Showroom
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="display-font mt-6 text-4xl font-semibold leading-[1.03] tracking-[-0.03em] text-foreground sm:text-5xl lg:text-6xl xl:text-[4.4rem]"
          >
            Furniture That Makes Your House{" "}
            <span className="relative inline-block">
              <span className="italic text-walnut">Feel Like</span>
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-0 -bottom-1 h-[6px] origin-left rounded-full bg-caramel/35"
              />
            </span>{" "}
            Home.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-base leading-relaxed text-taupe sm:text-lg"
          >
            Discover stylish, comfortable and durable furniture designed to
            transform your living spaces.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button
              asChild
              size="lg"
              className="group h-12 rounded-full bg-primary px-7 text-[15px] font-semibold shadow-[0_18px_40px_-24px_rgba(36,29,23,0.9)] transition-colors hover:bg-walnut"
            >
              <a href="#collection">
                Explore Collection
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 rounded-full border-border bg-card/70 px-7 text-[15px] font-semibold backdrop-blur transition hover:border-caramel/70 hover:bg-card"
            >
              <a href="#contact">Contact Us</a>
            </Button>
            <a
              href={CONTACT.telHref}
              className="ml-1 inline-flex items-center gap-2 text-sm font-semibold text-taupe transition-colors hover:text-walnut"
            >
              <Phone className="size-4" />
              {CONTACT.phoneDisplay}
            </a>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 flex max-w-lg divide-x divide-border/80 rounded-2xl border border-border/80 bg-card/60 py-4 pr-2 backdrop-blur-md"
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="flex-1 px-4 first:pl-5">
                <dt className="display-font text-2xl font-semibold text-foreground">
                  {stat.value}
                </dt>
                <dd className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.14em] text-taupe">
                  {stat.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>

      <motion.a
        href="#furniture"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-taupe transition-colors hover:text-walnut md:flex"
      >
        Scroll
        <span className="relative block h-10 w-px overflow-hidden bg-border">
          <motion.span
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-x-0 top-0 block h-1/2 bg-caramel"
          />
        </span>
      </motion.a>
    </section>
  );
}
