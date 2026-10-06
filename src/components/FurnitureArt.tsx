import { useId, type ReactElement } from "react";
import { motion } from "framer-motion";
import type { ArtKind, Tint } from "@/lib/content";

/** Warm, editorial furniture illustrations — drawn in SVG so the site stays
 *  fast and never depends on external image hosts. */

const TINTS: Record<
  Tint,
  { wall: [string, string]; fabric: string; accent: string }
> = {
  sand: { wall: ["#f9f4ea", "#ebdfcc"], fabric: "#e3d3ba", accent: "#c1793f" },
  oat: { wall: ["#f6f1e7", "#eadeca"], fabric: "#d6c5a7", accent: "#7a4e2d" },
  clay: { wall: ["#faf0e9", "#f0dfd2"], fabric: "#dab9a4", accent: "#a8593a" },
  sage: { wall: ["#f2f3ed", "#e1e5d9"], fabric: "#c5ceb9", accent: "#6f7a63" },
  walnut: { wall: ["#f7f0e6", "#e8dac7"], fabric: "#8d5f3b", accent: "#c6a15b" },
  brass: { wall: ["#f9f3e8", "#ece0c9"], fabric: "#dcc89d", accent: "#c6a15b" },
};

function shade(hex: string, amt: number) {
  const n = parseInt(hex.slice(1), 16);
  const cl = (v: number) =>
    Math.round(Math.min(255, Math.max(0, v + 255 * amt)));
  const r = cl((n >> 16) & 255);
  const g = cl((n >> 8) & 255);
  const b = cl(n & 255);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

type Palette = {
  wall1: string;
  wall2: string;
  fabric: string;
  fabricDark: string;
  fabricLight: string;
  accent: string;
  wood: string;
  woodDark: string;
  cream: string;
  ink: string;
};

function palette(tint: Tint): Palette {
  const t = TINTS[tint];
  return {
    wall1: t.wall[0],
    wall2: t.wall[1],
    fabric: t.fabric,
    fabricDark: shade(t.fabric, -0.1),
    fabricLight: shade(t.fabric, 0.08),
    accent: t.accent,
    wood: "#9a6b41",
    woodDark: "#6b4527",
    cream: "#fdfaf4",
    ink: "#241d17",
  };
}

/* ---------------------------------- art ---------------------------------- */

function SofaArt({ p }: { p: Palette }) {
  return (
    <g>
      <rect x="96" y="146" width="288" height="112" rx="22" fill={p.fabric} />
      <rect
        x="96"
        y="146"
        width="288"
        height="14"
        rx="7"
        fill={p.fabricLight}
      />
      <rect x="84" y="234" width="312" height="64" rx="20" fill={p.fabricDark} />
      <rect x="96" y="242" width="92" height="40" rx="14" fill={p.fabric} />
      <rect x="194" y="242" width="92" height="40" rx="14" fill={p.fabric} />
      <rect x="292" y="242" width="92" height="40" rx="14" fill={p.fabric} />
      <rect
        x="70"
        y="200"
        width="40"
        height="98"
        rx="18"
        fill={p.fabricDark}
      />
      <rect
        x="370"
        y="200"
        width="40"
        height="98"
        rx="18"
        fill={p.fabricDark}
      />
      <rect x="70" y="200" width="40" height="12" rx="6" fill={p.fabric} />
      <rect x="370" y="200" width="40" height="12" rx="6" fill={p.fabric} />
      <g transform="rotate(-8 140 224)">
        <rect x="118" y="196" width="46" height="46" rx="12" fill={p.accent} />
      </g>
      <g transform="rotate(9 344 224)">
        <rect
          x="322"
          y="196"
          width="46"
          height="46"
          rx="12"
          fill={p.cream}
          opacity="0.9"
        />
      </g>
      <path d="M104 298h16l-4 18h-10z" fill={p.woodDark} />
      <path d="M360 298h16l-2 18h-12z" fill={p.woodDark} />
    </g>
  );
}

function LuxurySofaArt({ p }: { p: Palette }) {
  return (
    <g>
      <rect x="66" y="140" width="250" height="104" rx="20" fill={p.fabric} />
      <rect x="66" y="140" width="250" height="13" rx="6" fill={p.fabricLight} />
      <rect x="316" y="164" width="104" height="86" rx="18" fill={p.fabric} />
      <rect x="316" y="164" width="104" height="12" rx="6" fill={p.fabricLight} />
      <rect x="56" y="228" width="272" height="62" rx="20" fill={p.fabricDark} />
      <rect x="72" y="236" width="118" height="38" rx="13" fill={p.fabric} />
      <rect x="198" y="236" width="118" height="38" rx="13" fill={p.fabric} />
      <path
        d="M316 236h96a18 18 0 0 1 18 18v44a12 12 0 0 1-12 12H316z"
        fill={p.fabricDark}
      />
      <rect x="330" y="248" width="86" height="34" rx="12" fill={p.fabric} />
      <rect x="42" y="192" width="38" height="98" rx="17" fill={p.fabricDark} />
      <rect x="42" y="192" width="38" height="11" rx="5" fill={p.fabric} />
      <g transform="rotate(-7 112 214)">
        <rect x="92" y="188" width="44" height="44" rx="12" fill={p.accent} />
      </g>
      <path d="M76 290h14l-3 18H78z" fill={p.woodDark} />
      <path d="M304 290h14l-3 18h-9z" fill={p.woodDark} />
      <path d="M396 308h14l-2 8h-11z" fill={p.woodDark} />
    </g>
  );
}

function BedArt({ p }: { p: Palette }) {
  return (
    <g>
      <rect x="104" y="118" width="272" height="126" rx="26" fill={p.fabric} />
      <rect
        x="104"
        y="118"
        width="272"
        height="14"
        rx="7"
        fill={p.fabricLight}
      />
      <g opacity="0.35" stroke={p.fabricDark} strokeWidth="2">
        <line x1="172" y1="140" x2="172" y2="230" />
        <line x1="240" y1="140" x2="240" y2="230" />
        <line x1="308" y1="140" x2="308" y2="230" />
      </g>
      <rect x="76" y="236" width="328" height="46" rx="12" fill={p.cream} />
      <rect x="76" y="252" width="328" height="30" rx="10" fill={p.fabric} />
      <rect x="76" y="252" width="328" height="8" rx="4" fill={p.fabricLight} />
      <rect x="76" y="282" width="328" height="24" rx="8" fill={p.wood} />
      <rect
        x="76"
        y="282"
        width="328"
        height="7"
        rx="3"
        fill={shade(p.wood, 0.12)}
      />
      <g transform="rotate(-5 154 226)">
        <rect x="118" y="200" width="76" height="44" rx="16" fill={p.cream} />
      </g>
      <g transform="rotate(5 322 226)">
        <rect x="286" y="200" width="76" height="44" rx="16" fill={p.cream} />
      </g>
      <path d="M96 306h16l-3 14h-11z" fill={p.woodDark} />
      <path d="M368 306h16l-3 14h-11z" fill={p.woodDark} />
      <rect x="392" y="236" width="46" height="70" rx="8" fill={p.woodDark} />
      <ellipse cx="415" cy="228" rx="17" ry="14" fill={p.accent} />
    </g>
  );
}

function DiningArt({ p }: { p: Palette }) {
  return (
    <g>
      <rect x="152" y="176" width="46" height="70" rx="10" fill={p.fabric} />
      <rect x="282" y="176" width="46" height="70" rx="10" fill={p.fabric} />
      <rect x="217" y="168" width="46" height="78" rx="10" fill={p.fabricDark} />
      <path d="M96 236h288l30 22H66z" fill={p.wood} />
      <path d="M66 258h348v14H66z" fill={shade(p.wood, -0.12)} />
      <path d="M96 236h288l-10 8H104z" fill={shade(p.wood, 0.16)} />
      <path d="M110 272h20l-14 42h-14z" fill={p.woodDark} />
      <path d="M370 272h-20l14 42h14z" fill={p.woodDark} />
      <path d="M186 272h16l-6 34h-12z" fill={shade(p.woodDark, -0.05)} />
      <path d="M294 272h-16l6 34h12z" fill={shade(p.woodDark, -0.05)} />
      <rect x="58" y="244" width="42" height="62" rx="10" fill={p.fabricDark} />
      <path d="M58 244h42v10H58z" fill={p.fabric} opacity="0.8" />
      <rect
        x="380"
        y="244"
        width="42"
        height="62"
        rx="10"
        fill={p.fabricDark}
      />
      <path d="M380 244h42v10h-42z" fill={p.fabric} opacity="0.8" />
      <ellipse cx="240" cy="248" rx="34" ry="9" fill={p.cream} />
      <ellipse cx="240" cy="245" rx="34" ry="9" fill={p.accent} opacity="0.85" />
      <path
        d="M158 236c0-16 8-26 18-26s18 10 18 26"
        fill="none"
        stroke={p.woodDark}
        strokeWidth="5"
      />
    </g>
  );
}

function KitchenArt({ p }: { p: Palette }) {
  const handle = "#c9b48f";
  return (
    <g>
      <rect x="66" y="96" width="160" height="76" rx="8" fill={p.fabric} />
      <rect x="234" y="96" width="86" height="76" rx="8" fill={p.fabric} />
      <rect x="328" y="84" width="86" height="192" rx="8" fill={p.fabricDark} />
      <g stroke={shade(p.fabric, -0.16)} strokeWidth="2">
        <line x1="146" y1="100" x2="146" y2="168" />
        <line x1="277" y1="100" x2="277" y2="168" />
        <line x1="371" y1="90" x2="371" y2="270" />
      </g>
      <g stroke={handle} strokeWidth="4" strokeLinecap="round">
        <line x1="130" y1="132" x2="142" y2="132" />
        <line x1="292" y1="132" x2="304" y2="132" />
        <line x1="356" y1="150" x2="356" y2="176" />
      </g>
      <rect x="60" y="174" width="270" height="14" rx="4" fill={p.ink} />
      <rect x="60" y="188" width="270" height="88" rx="6" fill={p.cream} />
      <rect x="60" y="188" width="270" height="6" fill="#00000012" />
      <g stroke={shade(p.cream, -0.14)} strokeWidth="2">
        <line x1="60" y1="232" x2="330" y2="232" />
        <line x1="150" y1="194" x2="150" y2="276" />
        <line x1="240" y1="194" x2="240" y2="276" />
      </g>
      <g stroke={handle} strokeWidth="4" strokeLinecap="round">
        <line x1="80" y1="206" x2="130" y2="206" />
        <line x1="170" y1="206" x2="220" y2="206" />
        <line x1="80" y1="256" x2="130" y2="256" />
        <line x1="170" y1="256" x2="220" y2="256" />
      </g>
      <rect x="60" y="276" width="270" height="12" rx="4" fill={p.ink} />
      <path
        d="M262 174v-26c0-10 8-16 18-16"
        fill="none"
        stroke={handle}
        strokeWidth="6"
        strokeLinecap="round"
      />
      <ellipse cx="272" cy="172" rx="34" ry="7" fill={shade(p.cream, -0.2)} />
      <path d="M60 288h270v18H60z" fill={p.woodDark} />
      <rect x="342" y="196" width="66" height="80" rx="6" fill={p.cream} />
      <path
        d="M352 268c0-24 8-40 22-40s22 16 22 40"
        fill={p.accent}
        opacity="0.85"
      />
    </g>
  );
}

function WardrobeArt({ p }: { p: Palette }) {
  return (
    <g>
      <rect x="92" y="92" width="296" height="214" rx="10" fill={p.wood} />
      <rect
        x="92"
        y="92"
        width="296"
        height="12"
        rx="6"
        fill={shade(p.wood, 0.14)}
      />
      <rect x="104" y="112" width="132" height="182" rx="6" fill={p.fabric} />      <rect x="244" y="112" width="132" height="182" rx="6" fill="#dfe6e8" />
      <path d="M244 112h132l-132 96z" fill="#ffffff" opacity="0.55" />
      <path d="M244 208l132-96v40l-132 76z" fill="#c8d2d6" opacity="0.5" />
      <rect
        x="104"
        y="112"
        width="132"
        height="182"
        rx="6"
        fill="none"
        stroke={shade(p.wood, -0.14)}
        strokeWidth="2"
      />
      <g stroke={shade(p.wood, -0.3)} strokeWidth="4" strokeLinecap="round">
        <line x1="228" y1="180" x2="228" y2="222" />
        <line x1="252" y1="180" x2="252" y2="222" />
      </g>
      <g opacity="0.25" stroke={shade(p.fabric, -0.2)} strokeWidth="2">
        <line x1="148" y1="120" x2="148" y2="286" />
      </g>
      <rect x="92" y="294" width="296" height="14" rx="4" fill={p.woodDark} />
      <rect x="84" y="82" width="312" height="14" rx="6" fill={p.woodDark} />
    </g>
  );
}

function OfficeArt({ p }: { p: Palette }) {
  return (
    <g>
      <rect x="176" y="128" width="150" height="94" rx="8" fill={p.ink} />
      <rect
        x="184"
        y="136"
        width="134"
        height="78"
        rx="4"
        fill={shade(p.accent, 0.1)}
        opacity="0.9"
      />
      <rect x="238" y="222" width="26" height="18" fill={p.ink} />
      <rect x="212" y="240" width="78" height="8" rx="4" fill={p.ink} />
      <rect x="112" y="244" width="256" height="14" rx="5" fill={p.wood} />
      <rect
        x="112"
        y="244"
        width="256"
        height="5"
        rx="2"
        fill={shade(p.wood, 0.16)}
      />
      <rect x="120" y="258" width="16" height="52" fill={p.woodDark} />
      <rect x="344" y="258" width="16" height="52" fill={p.woodDark} />
      <rect x="286" y="258" width="66" height="52" rx="4" fill={p.fabric} />
      <g stroke={shade(p.fabric, -0.2)} strokeWidth="3" strokeLinecap="round">
        <line x1="300" y1="276" x2="338" y2="276" />
        <line x1="300" y1="294" x2="338" y2="294" />
      </g>
      <rect x="72" y="176" width="76" height="102" rx="14" fill={p.fabricDark} />
      <rect x="80" y="186" width="60" height="82" rx="10" fill={p.fabric} />
      <g opacity="0.5" stroke={shade(p.fabric, -0.25)} strokeWidth="2">
        <line x1="80" y1="204" x2="140" y2="204" />
        <line x1="80" y1="224" x2="140" y2="224" />
        <line x1="80" y1="244" x2="140" y2="244" />
      </g>
      <rect x="70" y="276" width="80" height="14" rx="6" fill={p.woodDark} />
      <path d="M78 290h14l-4 20H74z" fill={p.ink} />
      <path d="M128 290h14l4 20h-14z" fill={p.ink} />
      <path
        d="M392 250c0-22 10-34 24-34s24 12 24 34v58h-48z"
        fill={p.accent}
        opacity="0.9"
      />
      <path d="M392 308h48v10h-48z" fill={p.woodDark} />
    </g>
  );
}

function OfficeSetArt({ p }: { p: Palette }) {
  return (
    <g>
      <rect x="96" y="206" width="230" height="14" rx="5" fill={p.wood} />
      <rect
        x="96"
        y="206"
        width="230"
        height="5"
        rx="2"
        fill={shade(p.wood, 0.16)}
      />
      <rect x="104" y="220" width="14" height="86" fill={p.woodDark} />
      <rect x="304" y="220" width="14" height="86" fill={p.woodDark} />
      <rect x="232" y="220" width="86" height="86" rx="6" fill={p.fabric} />
      <g stroke={shade(p.fabric, -0.2)} strokeWidth="3" strokeLinecap="round">
        <line x1="246" y1="244" x2="304" y2="244" />
        <line x1="246" y1="268" x2="304" y2="268" />
      </g>
      <rect x="150" y="120" width="120" height="76" rx="7" fill={p.ink} />
      <rect x="157" y="127" width="106" height="62" rx="4" fill="#8fa3b5" />
      <rect x="157" y="127" width="106" height="62" rx="4" fill={p.accent} opacity="0.4" />
      <rect x="202" y="196" width="16" height="12" fill={p.ink} />
      <rect x="186" y="200" width="48" height="6" rx="3" fill={p.ink} />
      <path d="M120 150c0-26 14-42 34-42s34 16 34 42v34h-68z" fill={p.fabricDark} />
      <rect x="118" y="176" width="72" height="30" rx="12" fill={p.fabric} />
      <path d="M120 206h68v10h-68z" fill={p.woodDark} />
      <path d="M154 216v52" stroke={p.ink} strokeWidth="7" />
      <path d="M120 286h68" stroke={p.ink} strokeWidth="7" strokeLinecap="round" />
      <path d="M154 268l-30 22M154 268l30 22" stroke={p.ink} strokeWidth="6" strokeLinecap="round" />
      <circle cx="122" cy="292" r="7" fill={p.ink} />
      <circle cx="186" cy="292" r="7" fill={p.ink} />
      <path d="M360 232c0-24 12-38 28-38s28 14 28 38v76h-56z" fill={p.accent} opacity="0.85" />
      <path d="M360 308h56v10h-56z" fill={p.woodDark} />
    </g>
  );
}

function TvArt({ p }: { p: Palette }) {
  return (
    <g>
      <rect x="132" y="86" width="216" height="128" rx="8" fill={p.ink} />
      <rect x="140" y="94" width="200" height="112" rx="4" fill="#171b21" />
      <path d="M140 94h200l-200 78z" fill="#2c3a49" opacity="0.85" />
      <rect x="226" y="214" width="28" height="16" fill={p.ink} />
      <rect x="204" y="230" width="72" height="7" rx="3" fill={p.ink} />
      <rect x="96" y="248" width="288" height="62" rx="12" fill={p.wood} />
      <rect
        x="96"
        y="248"
        width="288"
        height="9"
        rx="4"
        fill={shade(p.wood, 0.16)}
      />
      <g stroke={shade(p.wood, -0.22)} strokeWidth="2">
        <line x1="192" y1="262" x2="192" y2="302" />
        <line x1="288" y1="262" x2="288" y2="302" />
      </g>
      <g fill={shade(p.wood, -0.35)}>
        <rect x="136" y="278" width="30" height="5" rx="2.5" />
        <rect x="224" y="278" width="30" height="5" rx="2.5" />
        <rect x="320" y="278" width="30" height="5" rx="2.5" />
      </g>
      <path d="M118 310h16l-4 14h-10z" fill={p.woodDark} />
      <path d="M346 310h16l-4 14h-10z" fill={p.woodDark} />
      <rect x="106" y="236" width="84" height="10" rx="5" fill={p.ink} />
      <path
        d="M330 248c0-20 8-32 20-32"
        fill="none"
        stroke={p.accent}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M324 248c-6-20 2-36 16-42"
        fill="none"
        stroke={shade(p.accent, -0.15)}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <ellipse cx="348" cy="244" rx="20" ry="6" fill={p.cream} />
    </g>
  );
}

const ART: Record<ArtKind, (props: { p: Palette }) => ReactElement> = {
  sofa: SofaArt,
  "luxury-sofa": LuxurySofaArt,
  bed: BedArt,
  dining: DiningArt,
  kitchen: KitchenArt,
  wardrobe: WardrobeArt,
  office: OfficeArt,
  "office-set": OfficeSetArt,
  tv: TvArt,
};

/* -------------------------------- wrapper -------------------------------- */

export function FurnitureArt({
  kind,
  tint,
  className,
  fabric,
}: {
  kind: ArtKind;
  tint: Tint;
  className?: string;
  /** Live upholstery override used by the custom-furniture colour picker. */
  fabric?: string;
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const base = palette(tint);
  const p: Palette = fabric
    ? {
        ...base,
        fabric,
        fabricDark: shade(fabric, -0.1),
        fabricLight: shade(fabric, 0.08),
      }
    : base;
  const Art = ART[kind];

  return (
    <motion.svg
      viewBox="0 0 480 360"
      role="img"
      aria-label={`${kind} illustration`}
      className={className}
      initial="rest"
      animate="rest"
      whileHover="hover"
    >
      <defs>
        <linearGradient id={`${uid}-wall`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.wall1} />
          <stop offset="100%" stopColor={p.wall2} />
        </linearGradient>
        <linearGradient id={`${uid}-floor`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={shade(p.wood, 0.22)} />
          <stop offset="100%" stopColor={shade(p.wood, -0.16)} />
        </linearGradient>
        <radialGradient id={`${uid}-glow`} cx="0.5" cy="0.35" r="0.75">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="480" height="360" fill={`url(#${uid}-wall)`} />
      <rect width="480" height="360" fill={`url(#${uid}-glow)`} />
      <g opacity="0.5" stroke={shade(p.wall2, -0.06)} strokeWidth="1.5">
        <line x1="40" y1="40" x2="40" y2="252" />
        <line x1="440" y1="40" x2="440" y2="252" />
        <line x1="40" y1="60" x2="440" y2="60" />
      </g>

      <rect x="0" y="244" width="480" height="10" fill={shade(p.wall2, -0.1)} />
      <rect x="0" y="252" width="480" height="108" fill={`url(#${uid}-floor)`} />
      <g stroke="#00000014" strokeWidth="1.5">
        <line x1="0" y1="276" x2="480" y2="276" />
        <line x1="0" y1="304" x2="480" y2="304" />
        <line x1="0" y1="336" x2="480" y2="336" />
      </g>
      <g stroke="#00000010" strokeWidth="1.5">
        <line x1="70" y1="252" x2="24" y2="360" />
        <line x1="190" y1="252" x2="164" y2="360" />
        <line x1="300" y1="252" x2="330" y2="360" />
        <line x1="420" y1="252" x2="464" y2="360" />
      </g>

      <motion.ellipse
        cx="240"
        cy="314"
        rx="152"
        ry="17"
        fill="#000000"
        variants={{ rest: { opacity: 0.14, scale: 1 }, hover: { opacity: 0.09, scale: 0.92 } }}
        transition={{ type: "spring", stiffness: 220, damping: 24 }}
      />

      <motion.g
        variants={{ rest: { y: 0 }, hover: { y: -9 } }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
      >
        <Art p={p} />
      </motion.g>
    </motion.svg>
  );
}

export default FurnitureArt;
