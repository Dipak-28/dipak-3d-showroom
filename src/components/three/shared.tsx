import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { Environment, Lightformer } from "@react-three/drei";

/** Soft studio lighting shared by every scene — key, cool fill and warm bounce
 *  plus a tiny procedural environment so leather/glass/metal read correctly. */
export function StudioLighting({ env = true }: { env?: boolean }) {
  return (
    <>
      <hemisphereLight args={["#fff3e2", "#c8b6a0", 0.6]} />
      <directionalLight
        position={[3.5, 5.5, 3.5]}
        intensity={1.9}
        color="#fff1de"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0008}
        shadow-camera-left={-7}
        shadow-camera-right={7}
        shadow-camera-top={7}
        shadow-camera-bottom={-7}
        shadow-camera-far={24}
      />
      <directionalLight position={[-4.5, 3, 2.5]} intensity={0.5} color="#d6e3ff" />
      <pointLight
        position={[2.6, 2.7, 1.4]}
        intensity={14}
        distance={14}
        decay={2}
        color="#ffd9a5"
      />
      {env && (
        <Environment resolution={128} frames={1}>
          <Lightformer
            intensity={1.5}
            position={[0, 3.6, 2]}
            rotation-x={Math.PI / 2}
            scale={[8, 4, 1]}
            color="#fff4e6"
          />
          <Lightformer
            intensity={0.8}
            position={[-4.5, 2, 1]}
            rotation-y={Math.PI / 2}
            scale={[6, 3, 1]}
            color="#dbe6ff"
          />
          <Lightformer
            intensity={1}
            form="ring"
            position={[3.5, 3, -2]}
            scale={2.6}
            color="#ffdcb0"
          />
        </Environment>
      )}
    </>
  );
}

export const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

export const smoothstep = (t: number) => {
  const x = clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
};


/** Observes whether a scene wrapper is on screen so off-screen canvases stop
 *  rendering (keeps two 3D scenes cheap on long pages). */
export function useOnScreen<T extends HTMLElement>(rootMargin = "120px") {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) setVisible(entry.isIntersecting);
      },
      { rootMargin, threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return { ref, visible };
}

/** Never let a WebGL hiccup blank the page — fall back to flat artwork. */
export class SceneBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { error: boolean }
> {
  state = { error: false };

  static getDerivedStateFromError() {
    return { error: true };
  }

  componentDidCatch(err: Error) {
    console.warn("[3D scene] disabled:", err.message);
  }

  render() {
    return this.state.error ? this.props.fallback : this.props.children;
  }
}
