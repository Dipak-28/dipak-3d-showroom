import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  Armchair,
  CoffeeTable,
  FloorLamp,
  Plant,
  RoomShell,
  Rug,
  SelectionRing,
  SideTable,
  Sofa,
  TVUnit,
  Television,
} from "./models";
import {
  SceneBoundary,
  StudioLighting,
  clamp,
  smoothstep,
  useOnScreen,
} from "./shared";
import FurnitureArt from "../FurnitureArt";

type Vec3 = [number, number, number];

export type Piece = {
  id: string;
  title: string;
  blurb: string;
  specs: string[];
  ring: Vec3;
  radius: number;
};

export type Stop = {
  label: string;
  caption: string;
  pos: Vec3;
  target: Vec3;
  piece: string | null;
};

/** Everything a visitor can click inside the virtual room. */
export const PIECES: Piece[] = [
  {
    id: "sofa",
    title: "Premium Sofa",
    blurb:
      "A deep three-seater with pocketed foam, a hardwood frame and a soft boucle weave that holds its shape through years of everyday use.",
    specs: ["Boucle weave", "Hardwood frame", "HR foam", "Custom widths"],
    ring: [-1.6, 0, -1.9],
    radius: 1.55,
  },
  {
    id: "chair",
    title: "Accent Chair",
    blurb:
      "A compact lounge chair with a curved back, supportive seat and solid wood legs — the perfect partner to any sofa arrangement.",
    specs: ["Curved backrest", "Wood legs", "Fabric choice", "Compact footprint"],
    ring: [0.9, 0, -0.5],
    radius: 0.85,
  },
  {
    id: "table",
    title: "Coffee Table & Rug",
    blurb:
      "Solid wood top with a matte finish, a lower display shelf and metal legs — paired with a hand-tufted rug that anchors the seating area.",
    specs: ["Solid wood top", "Lower shelf", "Metal legs", "Hand-tufted rug"],
    ring: [-1.5, 0, -0.9],
    radius: 1.1,
  },
  {
    id: "tv",
    title: "TV Unit & Console",
    blurb:
      "A wall-mounted console with push-to-open drawers, concealed cable routing and a slim television panel — fits screens up to 65 inches.",
    specs: ["Up to 65 inch", "Cable channels", "Soft-close drawers", "Wall mount"],
    ring: [2.2, 0, -3.1],
    radius: 1.5,
  },
  {
    id: "decor",
    title: "Lighting & Decor",
    blurb:
      "Warm floor lighting, indoor greenery and hand-finished decor pieces that make a room feel lived-in rather than staged.",
    specs: ["Warm LED lighting", "Indoor plants", "Ceramic decor", "Styled corners"],
    ring: [-3.5, 0, -1.8],
    radius: 1.3,
  },
];

/** Scroll stops — the camera path through the room. */
export const STOPS: Stop[] = [
  {
    label: "The Whole Room",
    caption:
      "Scroll to walk through a fully staged living room — every piece is one we build in our workshop.",
    pos: [0.6, 2.9, 4.8],
    target: [0.0, 1.0, -1.6],
    piece: null,
  },
  {
    label: "The Sofa",
    caption:
      "Sink-in cushions, a hardwood frame and upholstery you can actually clean.",
    pos: [-1.7, 1.35, 0.9],
    target: [-1.6, 0.7, -2.0],
    piece: "sofa",
  },
  {
    label: "Table & Rug",
    caption:
      "Solid wood, rounded edges and a hand-tufted rug that grounds the seating area.",
    pos: [-1.2, 2.15, 1.35],
    target: [-1.5, 0.25, -0.9],
    piece: "table",
  },
  {
    label: "TV Unit",
    caption:
      "Concealed cables, soft-close drawers and storage sized to your screen.",
    pos: [1.9, 1.7, 0.5],
    target: [2.2, 1.2, -3.2],
    piece: "tv",
  },
  {
    label: "Lighting & Decor",
    caption:
      "Warm lighting, greenery and small details that turn furniture into a home.",
    pos: [-2.6, 1.75, 0.7],
    target: [-3.5, 1.1, -1.7],
    piece: "decor",
  },
  {
    label: "Made For You",
    caption:
      "Every layout, finish and dimension here can be re-drawn for your space.",
    pos: [3.3, 2.2, 4.2],
    target: [-0.6, 1.0, -1.6],
    piece: null,
  },
];

const UP = new THREE.Vector3(0, 1, 0);

/* ------------------------------- interaction ------------------------------ */

let pointerCursor = 0;

function usePointerCursor(active: boolean) {
  useEffect(() => {
    if (!active) return;
    pointerCursor += 1;
    document.body.style.cursor = "pointer";
    return () => {
      pointerCursor -= 1;
      if (pointerCursor <= 0) {
        pointerCursor = 0;
        document.body.style.cursor = "";
      }
    };
  }, [active]);
}

function Piece({
  id,
  onSelect,
  children,
}: {
  id: string;
  onSelect: (id: string | null) => void;
  children: ReactNode;
}) {
  const [hovered, setHovered] = useState(false);
  usePointerCursor(hovered);

  return (
    <group
      onClick={(e) => {
        e.stopPropagation();
        onSelect(id);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      {children}
    </group>
  );
}

/* --------------------------------- camera -------------------------------- */

function Rig({
  progress,
  drag,
}: {
  progress: { current: number };
  drag: { current: { yaw: number; pitch: number } };
}) {
  const { camera, gl, size } = useThree();
  const pos = useRef(new THREE.Vector3());
  const target = useRef(new THREE.Vector3());
  const desiredPos = useRef(new THREE.Vector3());
  const desiredTarget = useRef(new THREE.Vector3());
  const look = useRef(new THREE.Vector3());
  const off = useRef(new THREE.Vector3());

  const keys = useMemo(
    () => ({
      pos: STOPS.map((s) => new THREE.Vector3(...s.pos)),
      target: STOPS.map((s) => new THREE.Vector3(...s.target)),
    }),
    [],
  );

  /* pointer-drag look-around: horizontal pans, vertical tilts */
  useEffect(() => {
    const el = gl.domElement;
    let activeId: number | null = null;
    let startX = 0;
    let startY = 0;
    let baseYaw = 0;
    let basePitch = 0;

    const down = (e: PointerEvent) => {
      activeId = e.pointerId;
      startX = e.clientX;
      startY = e.clientY;
      baseYaw = drag.current.yaw;
      basePitch = drag.current.pitch;
      try {
        el.setPointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    };

    const move = (e: PointerEvent) => {
      if (activeId !== e.pointerId) return;
      const dx = (e.clientX - startX) / Math.max(1, size.width);
      const dy = (e.clientY - startY) / Math.max(1, size.height);
      drag.current.yaw = clamp(baseYaw + dx * 1.7, -0.7, 0.7);
      drag.current.pitch = clamp(basePitch + dy * 1.5, -0.32, 0.36);
    };

    const up = (e: PointerEvent) => {
      if (activeId !== e.pointerId) return;
      activeId = null;
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    };

    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, [gl, size.width, size.height, drag]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    const n = STOPS.length - 1;
    const raw = clamp(progress.current, 0, 1) * n;
    const i = Math.min(Math.floor(raw), n - 1);
    const e = smoothstep(raw - i);

    desiredPos.current.lerpVectors(keys.pos[i], keys.pos[i + 1], e);
    desiredTarget.current.lerpVectors(keys.target[i], keys.target[i + 1], e);

    // responsive framing: pull back on narrow viewports
    const aspect = size.width / Math.max(1, size.height);
    const widen = aspect < 0.95 ? 1.42 : aspect < 1.4 ? 1.14 : 1;
    if (widen !== 1) {
      desiredPos.current.sub(desiredTarget.current).multiplyScalar(widen).add(desiredTarget.current);
    }

    // gentle floating breath
    desiredPos.current.y += Math.sin(t * 0.55) * 0.025;

    pos.current.lerp(desiredPos.current, 1 - Math.exp(-7 * dt));
    target.current.lerp(desiredTarget.current, 1 - Math.exp(-7 * dt));

    camera.position.copy(pos.current);

    off.current.copy(target.current).sub(pos.current);
    off.current.applyAxisAngle(UP, drag.current.yaw);
    const right = off.current.clone().cross(UP).normalize();
    off.current.applyAxisAngle(right, drag.current.pitch);

    look.current.copy(pos.current).add(off.current);
    camera.lookAt(look.current);
  });

  return null;
}

/* --------------------------------- scene --------------------------------- */

function Room({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (id: string | null) => void;
}) {
  return (
    <group>
      <RoomShell backWallZ={-3.4} sideX={-4.6} />

      <Rug position={[-1.5, 0, -1.2]} w={4} h={3} color="#e8dcc6" />

      <Piece id="sofa" onSelect={onSelect}>
        <Sofa position={[-1.6, 0, -2.0]} />
      </Piece>

      <Piece id="chair" onSelect={onSelect}>
        <Armchair position={[0.9, 0, -0.5]} rotation={[0, -1.0, 0]} />
      </Piece>

      <Piece id="table" onSelect={onSelect}>
        <CoffeeTable position={[-1.5, 0, -0.9]} />
      </Piece>

      <Piece id="tv" onSelect={onSelect}>
        <group position={[2.2, 0, -3.16]}>
          <TVUnit />
          <Television position={[0, 1.45, -0.2]} />
        </group>
      </Piece>

      <Piece id="decor" onSelect={onSelect}>
        <group>
          <FloorLamp position={[-3.4, 0, -2.6]} />
          <Plant position={[-3.7, 0, -1.0]} />
          <SideTable position={[-0.1, 0, -2.35]} />
        </group>
      </Piece>

      {selected &&
        PIECES.filter((p) => p.id === selected).map((p) => (
          <SelectionRing key={p.id} position={p.ring} radius={p.radius} />
        ))}
    </group>
  );
}

function Fallback() {
  return (
    <FurnitureArt
      kind="luxury-sofa"
      tint="walnut"
      className="h-full w-full object-cover"
    />
  );
}

export default function ShowroomScene({
  progress,
  drag,
  selected,
  onSelect,
}: {
  progress: { current: number };
  drag: { current: { yaw: number; pitch: number } };
  selected: string | null;
  onSelect: (id: string | null) => void;
}) {
  const { ref, visible } = useOnScreen<HTMLDivElement>("300px");

  return (
    <div ref={ref} className="absolute inset-0">
      <SceneBoundary fallback={<Fallback />}>
        <Canvas
          shadows
          dpr={[1, 1.75]}
          frameloop={visible ? "always" : "never"}
          gl={{ antialias: true, powerPreference: "high-performance" }}
          style={{ touchAction: "pan-y" }}
          camera={{ position: [0.6, 2.9, 4.8], fov: 40, near: 0.1, far: 60 }}
          onPointerMissed={() => onSelect(null)}
        >
          <color attach="background" args={["#efe8de"]} />
          <Suspense fallback={null}>
            <StudioLighting />
            <Rig progress={progress} drag={drag} />
            <Room selected={selected} onSelect={onSelect} />
          </Suspense>
        </Canvas>
      </SceneBoundary>
    </div>
  );
}
