import { useRef, useMemo, type ReactNode } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { M } from "./materials";

/* Shared geometry helpers -------------------------------------------------- */

type Vec3 = [number, number, number];

export type ModelProps = {
  position?: Vec3;
  rotation?: Vec3;
  scale?: number | Vec3;
  visible?: boolean;
  children?: ReactNode;
  onClick?: (e: ThreeEvent<MouseEvent>) => void;
  onDoubleClick?: (e: ThreeEvent<MouseEvent>) => void;
  onPointerOver?: (e: ThreeEvent<PointerEvent>) => void;
  onPointerOut?: (e: ThreeEvent<PointerEvent>) => void;
};

function RB({
  args,
  radius = 0.05,
  mat,
  position,
  rotation,
}: {
  args: Vec3;
  radius?: number;
  mat: THREE.Material;
  position?: Vec3;
  rotation?: Vec3;
}) {
  const r = Math.min(radius, Math.min(...args) * 0.45);
  return (
    <RoundedBox
      args={args}
      radius={r}
      smoothness={3}
      position={position}
      rotation={rotation}
      castShadow
      receiveShadow
      material={mat}
    />
  );
}

function Cylinder({
  args,
  mat,
  position,
  rotation,
}: {
  args: ConstructorParameters<typeof THREE.CylinderGeometry>;
  mat: THREE.Material;
  position?: Vec3;
  rotation?: Vec3;
}) {
  return (
    <mesh
      position={position}
      rotation={rotation}
      castShadow
      receiveShadow
      material={mat}
    >
      <cylinderGeometry args={args} />
    </mesh>
  );
}

function roundedRectShape(w: number, h: number, r: number) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

/* ------------------------------- furniture -------------------------------- */

export function Sofa({
  color = "#d9c7ae",
  accent = "#c1793f",
  leather = false,
  ...props
}: ModelProps & { color?: string; accent?: string; leather?: boolean }) {
  const body = leather ? M.leather(color) : M.fabric(color);
  const dark = leather ? M.leather(color) : M.fabric(color);
  const cushion = leather ? M.leather(color) : M.fabric(color);
  const pillow = leather ? M.leather(accent) : M.fabric(accent);
  const leg = M.metal("#3a332c", 0.4);

  return (
    <group {...props}>
      <RB args={[2.3, 0.3, 0.98]} radius={0.07} mat={dark} position={[0, 0.29, 0]} />
      <RB
        args={[2.3, 0.62, 0.24]}
        radius={0.09}
        mat={dark}
        position={[0, 0.76, -0.38]}
      />
      {[-0.73, 0, 0.73].map((x) => (
        <RB
          key={`s${x}`}
          args={[0.7, 0.19, 0.86]}
          radius={0.075}
          mat={cushion}
          position={[x, 0.53, 0.03]}
        />
      ))}
      {[-0.73, 0, 0.73].map((x) => (
        <RB
          key={`b${x}`}
          args={[0.7, 0.46, 0.2]}
          radius={0.08}
          mat={cushion}
          position={[x, 0.8, -0.24]}
          rotation={[-0.14, 0, 0]}
        />
      ))}
      {[-1.05, 1.05].map((x) => (
        <group key={`a${x}`}>
          <RB
            args={[0.2, 0.46, 0.98]}
            radius={0.09}
            mat={body}
            position={[x, 0.66, 0]}
          />
        </group>
      ))}
      <RB
        args={[0.4, 0.4, 0.14]}
        radius={0.06}
        mat={pillow}
        position={[-0.66, 0.76, -0.1]}
        rotation={[-0.18, 0, 0.22]}
      />
      <RB
        args={[0.4, 0.4, 0.14]}
        radius={0.06}
        mat={pillow}
        position={[0.66, 0.76, -0.1]}
        rotation={[-0.18, 0, -0.22]}
      />
      {[
        [-1.0, 0.07, 0.38],
        [1.0, 0.07, 0.38],
        [-1.0, 0.07, -0.38],
        [1.0, 0.07, -0.38],
      ].map((p, i) => (
        <Cylinder
          key={i}
          args={[0.03, 0.045, 0.14, 10]}
          mat={leg}
          position={p as Vec3}
        />
      ))}
    </group>
  );
}

export function Armchair({
  color = "#c9b295",
  accent = "#7a4e2d",
  ...props
}: ModelProps & { color?: string; accent?: string }) {
  const body = M.fabric(color);
  const leg = M.metal("#3a332c", 0.4);
  return (
    <group {...props}>
      <RB args={[1.0, 0.28, 0.92]} radius={0.07} mat={body} position={[0, 0.3, 0]} />
      <RB
        args={[1.0, 0.6, 0.22]}
        radius={0.09}
        mat={body}
        position={[0, 0.72, -0.35]}
      />
      <RB
        args={[0.8, 0.18, 0.8]}
        radius={0.07}
        mat={body}
        position={[0, 0.52, 0.04]}
      />
      <RB
        args={[0.8, 0.42, 0.18]}
        radius={0.07}
        mat={body}
        position={[0, 0.74, -0.22]}
        rotation={[-0.14, 0, 0]}
      />
      {[-0.46, 0.46].map((x) => (
        <RB
          key={x}
          args={[0.18, 0.4, 0.92]}
          radius={0.08}
          mat={body}
          position={[x, 0.62, 0]}
        />
      ))}
      <RB
        args={[0.34, 0.34, 0.12]}
        radius={0.05}
        mat={M.fabric(accent)}
        position={[0.1, 0.7, -0.14]}
        rotation={[-0.2, 0, -0.18]}
      />
      {[
        [-0.4, 0.07, 0.34],
        [0.4, 0.07, 0.34],
        [-0.4, 0.07, -0.34],
        [0.4, 0.07, -0.34],
      ].map((p, i) => (
        <Cylinder
          key={i}
          args={[0.028, 0.04, 0.14, 10]}
          mat={leg}
          position={p as Vec3}
        />
      ))}
    </group>
  );
}

export function CoffeeTable(props: ModelProps) {
  const top = M.wood("oak", 1);
  const shelf = M.wood("walnut", 1);
  const leg = M.metal("#2f2b27", 0.35);
  return (
    <group {...props}>
      <RB args={[1.3, 0.07, 0.68]} radius={0.03} mat={top} position={[0, 0.42, 0]} />
      <RB args={[1.06, 0.04, 0.52]} radius={0.02} mat={shelf} position={[0, 0.16, 0]} />
      {[
        [-0.56, 0.21, 0.26],
        [0.56, 0.21, 0.26],
        [-0.56, 0.21, -0.26],
        [0.56, 0.21, -0.26],
      ].map((p, i) => (
        <Cylinder
          key={i}
          args={[0.022, 0.022, 0.42, 10]}
          mat={leg}
          position={p as Vec3}
        />
      ))}
      {/* styling: books, bowl, vase */}
      <RB args={[0.34, 0.035, 0.24]} radius={0.01} mat={M.fabric("#b65f3d")} position={[-0.3, 0.475, 0.02]} />
      <RB args={[0.3, 0.03, 0.22]} radius={0.01} mat={M.fabric("#3f4a3a")} position={[-0.3, 0.507, 0.03]} rotation={[0, 0.16, 0]} />
      <mesh position={[0.3, 0.49, -0.02]} scale={[1, 0.4, 1]} castShadow material={M.ceramic("#efe6d8")}>
        <sphereGeometry args={[0.11, 24, 16]} />
      </mesh>
      <group position={[0.05, 0.46, 0.14]}>
        <Cylinder args={[0.045, 0.06, 0.16, 16]} mat={M.ceramic("#c9803f")} position={[0, 0.08, 0]} />
        <Cylinder args={[0.02, 0.035, 0.06, 12]} mat={M.ceramic("#c9803f")} position={[0, 0.19, 0]} />
      </group>
    </group>
  );
}

export function Rug({
  color = "#e6d8c0",
  w = 3.4,
  h = 2.4,
  ...props
}: ModelProps & { color?: string; w?: number; h?: number }) {
  const geo = useMemo(() => new THREE.ShapeGeometry(roundedRectShape(w, h, 0.3)), [w, h]);
  const edge = useMemo(
    () => new THREE.ShapeGeometry(roundedRectShape(w + 0.14, h + 0.14, 0.34)),
    [w, h],
  );
  return (
    <group {...props}>
      <mesh geometry={edge} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.006, 0]} receiveShadow>
        <meshStandardMaterial color="#c9b294" roughness={0.98} />
      </mesh>
      <mesh geometry={geo} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, 0]} receiveShadow material={M.rug(color)} />
    </group>
  );
}

export function TVUnit(props: ModelProps) {
  const body = M.wood("walnut", 1);
  const door = M.fabric("#e8ded0");
  const leg = M.metal("#2f2b27", 0.3);
  return (
    <group {...props}>
      <RB args={[2.1, 0.44, 0.42]} radius={0.03} mat={body} position={[0, 0.4, 0]} />
      {[-0.68, 0, 0.68].map((x) => (
        <RB
          key={x}
          args={[0.62, 0.32, 0.03]}
          radius={0.015}
          mat={door}
          position={[x, 0.4, 0.215]}
        />
      ))}
      {[-0.68, 0.68].map((x) => (
        <Cylinder
          key={x}
          args={[0.012, 0.012, 0.16, 8]}
          mat={M.metal("#c6a15b", 0.3)}
          position={[x, 0.4, 0.245]}
          rotation={[0, 0, Math.PI / 2]}
        />
      ))}
      {[
        [-0.9, 0.085, 0.14],
        [0.9, 0.085, 0.14],
        [-0.9, 0.085, -0.14],
        [0.9, 0.085, -0.14],
      ].map((p, i) => (
        <Cylinder
          key={i}
          args={[0.026, 0.038, 0.17, 10]}
          mat={leg}
          position={p as Vec3}
        />
      ))}
      {/* console styling */}
      <group position={[-0.78, 0.62, 0]}>
        <Cylinder args={[0.05, 0.07, 0.2, 16]} mat={M.ceramic("#b65f3d")} position={[0, 0.1, 0]} />
        <mesh castShadow position={[0, 0.26, 0]} material={M.leaf()}>
          <sphereGeometry args={[0.09, 16, 12]} />
        </mesh>
      </group>
      <RB args={[0.3, 0.03, 0.2]} radius={0.01} mat={M.fabric("#3f4a3a")} position={[0.7, 0.635, 0.02]} />
      <RB args={[0.26, 0.028, 0.18]} radius={0.01} mat={M.fabric("#c1793f")} position={[0.7, 0.664, 0.03]} rotation={[0, -0.12, 0]} />
      <RB args={[0.86, 0.06, 0.09]} radius={0.03} mat={M.metal("#26221e", 0.5)} position={[0, 0.645, 0.08]} />
    </group>
  );
}

export function Television(props: ModelProps) {
  return (
    <group {...props}>
      <RB args={[1.7, 1.0, 0.05]} radius={0.02} mat={M.metal("#1a1714", 0.5)} />
      <mesh position={[0, 0, 0.031]} material={M.screen()}>
        <planeGeometry args={[1.6, 0.9]} />
      </mesh>
    </group>
  );
}

export function FloorLamp(props: ModelProps) {
  const metal = M.metal("#2f2b27", 0.3);
  return (
    <group {...props}>
      <Cylinder args={[0.17, 0.19, 0.04, 24]} mat={metal} position={[0, 0.02, 0]} />
      <Cylinder args={[0.018, 0.018, 1.5, 12]} mat={metal} position={[0, 0.77, 0]} />
      <Cylinder args={[0.19, 0.27, 0.3, 24, 1, true]} mat={M.shade()} position={[0, 1.55, 0]} />
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.07, 16, 12]} />
        <meshBasicMaterial color="#ffe0b0" />
      </mesh>
      <pointLight position={[0, 1.45, 0]} intensity={4.5} distance={7} decay={2} color="#ffd9a5" />
    </group>
  );
}

export function Plant(props: ModelProps) {
  return (
    <group {...props}>
      <Cylinder args={[0.2, 0.15, 0.34, 20]} mat={M.ceramic("#a8593a")} position={[0, 0.17, 0]} />
      <Cylinder args={[0.18, 0.18, 0.03, 20]} mat={M.ceramic("#3b2f26")} position={[0, 0.34, 0]} />
      <mesh castShadow position={[0, 0.6, 0]} material={M.leaf()}>
        <sphereGeometry args={[0.26, 18, 14]} />
      </mesh>
      <mesh castShadow position={[0.18, 0.8, -0.05]} scale={0.75} material={M.leaf()}>
        <sphereGeometry args={[0.24, 18, 14]} />
      </mesh>
      <mesh castShadow position={[-0.16, 0.76, 0.08]} scale={0.7} material={M.leaf()}>
        <sphereGeometry args={[0.22, 18, 14]} />
      </mesh>
      <mesh castShadow position={[0.02, 0.96, 0.03]} scale={0.55} material={M.leaf()}>
        <sphereGeometry args={[0.22, 18, 14]} />
      </mesh>
    </group>
  );
}

export function SideTable(props: ModelProps) {
  return (
    <group {...props}>
      <Cylinder args={[0.26, 0.26, 0.05, 28]} mat={M.wood("oak", 1)} position={[0, 0.52, 0]} />
      <Cylinder args={[0.03, 0.03, 0.5, 12]} mat={M.metal("#c6a15b", 0.3)} position={[0, 0.26, 0]} />
      <Cylinder args={[0.16, 0.18, 0.03, 24]} mat={M.metal("#c6a15b", 0.35)} position={[0, 0.015, 0]} />
      <mesh castShadow position={[0, 0.58, 0]} material={M.ceramic("#efe6d8")}>
        <sphereGeometry args={[0.07, 18, 14]} />
      </mesh>
    </group>
  );
}

export function Frame({
  w = 0.6,
  h = 0.8,
  ...props
}: ModelProps & { w?: number; h?: number }) {
  return (
    <group {...props}>
      <RB args={[w, h, 0.04]} radius={0.01} mat={M.wood("walnut", 1)} />
      <mesh position={[0, 0, 0.025]} castShadow>
        <planeGeometry args={[w - 0.1, h - 0.1]} />
        <meshStandardMaterial color="#e8dcc8" roughness={0.9} />
      </mesh>
      <mesh position={[-0.08, 0.06, 0.028]} rotation={[0, 0, 0.5]}>
        <planeGeometry args={[w * 0.34, h * 0.5]} />
        <meshStandardMaterial color="#c1793f" roughness={0.85} />
      </mesh>
    </group>
  );
}

/** Room shell: floor, walls, skirting and slat panelling. */
export function RoomShell({
  backWallZ = -3.4,
  sideX = -4.6,
  width = 14,
}: {
  backWallZ?: number;
  sideX?: number;
  width?: number;
}) {
  const slats = useMemo(() => {
    const arr: number[] = [];
    for (let x = -3.6; x <= 0.4; x += 0.19) arr.push(x);
    return arr;
  }, []);

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0.6]} receiveShadow material={M.floor()}>
        <planeGeometry args={[width, 13]} />
      </mesh>

      <mesh position={[0, 1.7, backWallZ]} receiveShadow material={M.wall()}>
        <planeGeometry args={[width, 3.4]} />
      </mesh>

      <mesh
        position={[sideX, 1.7, 0.6]}
        rotation={[0, Math.PI / 2, 0]}
        receiveShadow
        material={M.wallAccent()}
      >
        <planeGeometry args={[13, 3.4]} />
      </mesh>

      {/* skirting */}
      <RB
        args={[width, 0.1, 0.05]}
        radius={0.01}
        mat={M.ceramic("#f6f1e8")}
        position={[0, 0.05, backWallZ + 0.03]}
      />
      <RB
        args={[13, 0.1, 0.05]}
        radius={0.01}
        mat={M.ceramic("#f6f1e8")}
        position={[sideX + 0.03, 0.05, 0.6]}
        rotation={[0, Math.PI / 2, 0]}
      />

      {/* slat panelling behind the sofa */}
      {slats.map((x) => (
        <RB
          key={x}
          args={[0.07, 2.3, 0.04]}
          radius={0.012}
          mat={M.wood("walnut", 1)}
          position={[x, 1.2, backWallZ + 0.04]}
        />
      ))}

      <Frame w={0.55} h={0.75} position={[0.9, 2.35, backWallZ + 0.04]} />
      <Frame w={0.7} h={0.5} position={[3.5, 2.45, backWallZ + 0.04]} />
      <Frame
        w={0.6}
        h={0.85}
        position={[sideX + 0.05, 1.85, -1.4]}
        rotation={[0, Math.PI / 2, 0]}
      />
    </group>
  );
}

/** Animated floor marker for the selected showroom piece. */
export function SelectionRing({
  position,
  radius = 1.1,
}: {
  position: Vec3;
  radius?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.42 + Math.sin(t * 3) * 0.16;
    ref.current.scale.setScalar(1 + Math.sin(t * 2) * 0.018);
  });
  return (
    <mesh ref={ref} position={[position[0], 0.02, position[2]]} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius * 0.86, radius, 72]} />
      <meshBasicMaterial color="#c1793f" transparent opacity={0.5} side={THREE.DoubleSide} />
    </mesh>
  );
}
