import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/content";
import { cn } from "@/lib/utils";

function Mark() {
  return (
    <span className="relative grid size-9 shrink-0 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-walnut to-espresso text-bone shadow-[0_6px_18px_-8px_rgba(43,35,28,0.9)]">
      <span className="display-font text-[13px] font-semibold leading-none">
        DF
      </span>
      <span className="absolute inset-x-1 top-0 h-px bg-white/40" />
    </span>
  );
}

const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1));

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= 140) current = id;
      }
      setActive((prev) => (prev === current ? prev : current));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ids]);

  return active;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "border-b transition-all duration-500",
          scrolled
            ? "glass border-border/70 shadow-[0_18px_50px_-38px_rgba(43,35,28,0.85)]"
            : "border-transparent bg-transparent",
        )}
      >
        <nav className="shell flex h-16 items-center justify-between gap-4 md:h-20">
          <a
            href="#home"
            className="flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-caramel/60"
          >
            <Mark />
            <span className="flex flex-col leading-none">
              <span className="display-font text-[17px] font-semibold tracking-[-0.01em] text-foreground md:text-lg">
                Dipak Furnitures
              </span>
              <span className="mt-0.5 hidden text-[10px] font-medium uppercase tracking-[0.28em] text-taupe sm:block">
                Quality Furniture. Better Living.
              </span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "text-foreground"
                        : "text-taupe hover:text-foreground",
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full border border-border bg-card/80"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <Button
              asChild
              className="hidden rounded-full bg-primary px-5 text-[13px] font-semibold tracking-wide hover:bg-walnut sm:inline-flex"
            >
              <a href="#contact">
                Visit Our Store
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              className="grid size-10 place-items-center rounded-full border border-border bg-card/80 text-foreground transition hover:border-caramel/60 hover:text-caramel lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="glass border-b border-border/70 shadow-[0_30px_60px_-40px_rgba(43,35,28,0.9)] lg:hidden"
          >
            <ul className="shell flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-3 py-3 text-base font-medium transition-colors",
                      active === link.href.slice(1)
                        ? "bg-card text-foreground"
                        : "text-taupe hover:bg-card/70 hover:text-foreground",
                    )}
                  >
                    {link.label}
                    <ArrowUpRight className="size-4 opacity-60" />
                  </a>
                </li>
              ))}
              <li className="mt-2">
                <Button
                  asChild
                  className="w-full rounded-full bg-primary py-5 text-sm font-semibold hover:bg-walnut"
                >
                  <a href="#contact" onClick={() => setOpen(false)}>
                    Visit Our Store
                  </a>
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
