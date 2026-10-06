import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  Armchair,
  CoffeeTable,
  FloorLamp,
  Plant,
  RoomShell,
  Rug,
  SideTable,
  Sofa,
} from "./models";
import { SceneBoundary, StudioLighting, useOnScreen } from "./shared";
import FurnitureArt from "../FurnitureArt";

/** Living-room vignette behind the hero copy — slowly turns with scroll and
 *  drifts with the pointer for a cinematic, weightless feel. */
function HeroRoom() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const scroll = Math.min(
      1,
      Math.max(0, window.scrollY / Math.max(1, window.innerHeight * 0.9)),
    );
    if (!group.current) return;
    group.current.rotation.y = -0.18 + scroll * 0.5 + Math.sin(t * 0.26) * 0.035;
    group.current.rotation.x = Math.sin(t * 0.19) * 0.008;
    group.current.position.y = Math.sin(t * 0.6) * 0.01;
  });

  return (
    <group ref={group} position={[0.25, 0, -0.15]}>
      <Rug position={[-0.1, 0, 0.55]} w={3.6} h={2.6} color="#e8dcc6" />
      <Sofa position={[-0.2, 0, -1.1]} />
      <CoffeeTable position={[-0.1, 0, 0.35]} />
      <Armchair position={[1.75, 0, 0.2]} rotation={[0, -0.8, 0]} />
      <SideTable position={[1.15, 0, -1.05]} />
      <Plant position={[-2.35, 0, -1.45]} />
      <FloorLamp position={[-1.95, 0, -0.75]} />
    </group>
  );
}

function HeroRig() {
  const { camera, pointer, size } = useThree();
  const look = useRef(new THREE.Vector3(0.2, 0.92, -0.7));

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const aspect = size.width / Math.max(1, size.height);
    const narrow = aspect < 1;
    const baseZ = narrow ? 7.6 : aspect < 1.5 ? 6.1 : 5.1;
    const baseY = narrow ? 2.0 : 1.6;
    const lookY = narrow ? 1.05 : 0.92;

    const dt = Math.min(delta, 0.05);
    const desiredX =
      pointer.x * (narrow ? 0.35 : 0.6) + Math.sin(t * 0.23) * 0.1;
    const desiredY = baseY + pointer.y * 0.16 + Math.sin(t * 0.3) * 0.045;

    camera.position.set(
      THREE.MathUtils.damp(camera.position.x, desiredX, 3, dt),
      THREE.MathUtils.damp(camera.position.y, desiredY, 3, dt),
      THREE.MathUtils.damp(camera.position.z, baseZ, 2.6, dt),
    );
    camera.lookAt(look.current.set(0.2, lookY, -0.7));
  });

  return null;
}

export default function HeroScene() {
  const { ref, visible } = useOnScreen<HTMLDivElement>();

  return (
    <div ref={ref} className="absolute inset-0">
      <SceneBoundary
        fallback={
          <FurnitureArt
            kind="sofa"
            tint="sand"
            className="h-full w-full object-cover"
          />
        }
      >
        <Canvas
          shadows
          dpr={[1, 1.75]}
          frameloop={visible ? "always" : "never"}
          gl={{ antialias: true, powerPreference: "high-performance" }}
          style={{ touchAction: "pan-y" }}
          camera={{ position: [0, 1.6, 5.1], fov: 34, near: 0.1, far: 60 }}
        >
          <color attach="background" args={["#f1ebe1"]} />
          <fog attach="fog" args={["#f1ebe1", 12, 26]} />
          <Suspense fallback={null}>
            <StudioLighting />
            <HeroRig />
            <group>
              <RoomShell backWallZ={-2.5} sideX={-4.2} />
              <HeroRoom />
            </group>
          </Suspense>
        </Canvas>
      </SceneBoundary>
    </div>
  );
}
