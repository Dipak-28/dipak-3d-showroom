import * as THREE from "three";
import { fabricTexture, rugTexture, woodTexture, type WoodKind } from "./textures";

/** Cached, shared materials — one GPU upload per unique surface. */

const cache = new Map<string, THREE.Material>();

function once<T extends THREE.Material>(key: string, build: () => T): T {
  const hit = cache.get(key);
  if (hit) return hit as T;
  const mat = build();
  cache.set(key, mat);
  return mat;
}

export const M = {
  wood(kind: WoodKind = "oak", repeat = 1) {
    return once(`wood-${kind}-${repeat}`, () =>
      new THREE.MeshStandardMaterial({
        map: woodTexture(kind, repeat),
        roughness: kind === "walnut" ? 0.62 : 0.5,
        metalness: 0.03,
      }),
    );
  },

  floor() {
    return once("floor", () =>
      new THREE.MeshStandardMaterial({
        map: woodTexture("walnut", 5),
        roughness: 0.72,
        metalness: 0.02,
      }),
    );
  },

  wall() {
    return once("wall", () =>
      new THREE.MeshStandardMaterial({ color: "#efe8de", roughness: 0.96 }),
    );
  },

  wallAccent() {
    return once("wall-accent", () =>
      new THREE.MeshStandardMaterial({ color: "#e3d8c8", roughness: 0.95 }),
    );
  },

  fabric(color: string) {
    return once(`fabric-${color}`, () =>
      new THREE.MeshPhysicalMaterial({
        map: fabricTexture(color, 3),
        roughness: 0.95,
        metalness: 0,
        sheen: 1,
        sheenRoughness: 0.65,
        sheenColor: new THREE.Color("#ffffff"),
      }),
    );
  },

  leather(color: string) {
    return once(`leather-${color}`, () =>
      new THREE.MeshPhysicalMaterial({
        color,
        roughness: 0.58,
        metalness: 0.02,
        clearcoat: 0.25,
        clearcoatRoughness: 0.7,
      }),
    );
  },

  rug(color: string) {
    return once(`rug-${color}`, () =>
      new THREE.MeshStandardMaterial({
        map: rugTexture(color, 1),
        roughness: 0.98,
        metalness: 0,
      }),
    );
  },

  metal(color: string, roughness = 0.32) {
    return once(`metal-${color}-${roughness}`, () =>
      new THREE.MeshStandardMaterial({
        color,
        metalness: 0.92,
        roughness,
      }),
    );
  },

  ceramic(color: string) {
    return once(`ceramic-${color}`, () =>
      new THREE.MeshStandardMaterial({
        color,
        roughness: 0.34,
        metalness: 0.04,
      }),
    );
  },

  screen() {
    return once("screen", () =>
      new THREE.MeshStandardMaterial({
        color: "#12141a",
        roughness: 0.22,
        metalness: 0.3,
        emissive: new THREE.Color("#1d2b3d"),
        emissiveIntensity: 0.55,
      }),
    );
  },

  shade() {
    return once("shade", () =>
      new THREE.MeshStandardMaterial({
        color: "#f7ecd6",
        roughness: 0.85,
        side: THREE.DoubleSide,
        emissive: new THREE.Color("#ffd9a0"),
        emissiveIntensity: 0.45,
      }),
    );
  },

  leaf() {
    return once("leaf", () =>
      new THREE.MeshStandardMaterial({
        color: "#5f7350",
        roughness: 0.88,
        side: THREE.DoubleSide,
      }),
    );
  },

  glass() {
    return once("glass", () =>
      new THREE.MeshPhysicalMaterial({
        color: "#e9f2f4",
        roughness: 0.08,
        metalness: 0,
        transparent: true,
        opacity: 0.35,
      }),
    );
  },
};
