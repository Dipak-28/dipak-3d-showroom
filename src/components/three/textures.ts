import * as THREE from "three";

/** Procedural canvas textures — keeps the showroom photoreal-ish without
 *  shipping (or downloading) large image assets. */

const cache = new Map<string, THREE.CanvasTexture>();

function canvas(size = 512) {
  const el = document.createElement("canvas");
  el.width = size;
  el.height = size;
  return { el, ctx: el.getContext("2d")! };
}

function finish(el: HTMLCanvasElement, repeat: number) {
  const tex = new THREE.CanvasTexture(el);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeat, repeat);
  tex.anisotropy = 4;
  return tex;
}

function cached(key: string, build: () => THREE.CanvasTexture) {
  let tex = cache.get(key);
  if (!tex) {
    tex = build();
    cache.set(key, tex);
  }
  return tex;
}

export type WoodKind = "oak" | "walnut";

export function woodTexture(kind: WoodKind = "oak", repeat = 1) {
  return cached(`wood-${kind}-${repeat}`, () => {
    const { el, ctx } = canvas(512);
    const base = kind === "walnut" ? "#7a4e2d" : "#c69a68";
    const dark = kind === "walnut" ? "#4d2f18" : "#8a6338";

    ctx.fillStyle = base;
    ctx.fillRect(0, 0, 512, 512);

    for (let i = 0; i < 220; i++) {
      const y = Math.random() * 512;
      const amp = 1.5 + Math.random() * 6;
      const freq = 0.006 + Math.random() * 0.014;
      const phase = Math.random() * 12;
      ctx.beginPath();
      for (let x = 0; x <= 512; x += 8) {
        const yy = y + Math.sin(x * freq + phase) * amp;
        if (x === 0) ctx.moveTo(x, yy);
        else ctx.lineTo(x, yy);
      }
      ctx.strokeStyle = `rgba(0,0,0,${(0.02 + Math.random() * 0.07).toFixed(3)})`;
      ctx.lineWidth = 0.5 + Math.random() * 2.4;
      ctx.stroke();
    }

    // subtle knot
    for (let k = 0; k < 3; k++) {
      const cx = Math.random() * 512;
      const cy = Math.random() * 512;
      for (let r = 3; r < 26; r += 4) {
        ctx.beginPath();
        ctx.ellipse(cx, cy, r, r * 0.5, Math.random() * 0.6, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,0,0,0.05)`;
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }
    }

    // plank seams
    for (let i = 1; i < 4; i++) {
      const y = (512 / 4) * i;
      ctx.fillStyle = "rgba(0,0,0,0.22)";
      ctx.fillRect(0, y, 512, 3);
      ctx.fillStyle = "rgba(255,255,255,0.07)";
      ctx.fillRect(0, y + 3, 512, 1);
    }

    ctx.fillStyle = "rgba(255,255,255,0.05)";
    ctx.fillRect(0, 0, 512, 512);

    void dark;
    return finish(el, repeat);
  });
}

export function fabricTexture(color = "#d9c7ae", repeat = 3) {
  return cached(`fabric-${color}-${repeat}`, () => {
    const { el, ctx } = canvas(256);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 256, 256);

    // woven threads
    for (let i = 0; i < 256; i += 4) {
      ctx.fillStyle = "rgba(255,255,255,0.10)";
      ctx.fillRect(i, 0, 2, 256);
      ctx.fillStyle = "rgba(0,0,0,0.06)";
      ctx.fillRect(0, i, 256, 2);
    }

    // speckle for depth
    for (let i = 0; i < 2600; i++) {
      const x = Math.random() * 256;
      const y = Math.random() * 256;
      ctx.fillStyle =
        Math.random() > 0.5 ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.10)";
      ctx.fillRect(x, y, 2, 2);
    }

    return finish(el, repeat);
  });
}

export function rugTexture(color = "#e4d6bf", repeat = 1) {
  return cached(`rug-${color}-${repeat}`, () => {
    const { el, ctx } = canvas(512);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 512, 512);

    // border
    ctx.strokeStyle = "rgba(0,0,0,0.20)";
    ctx.lineWidth = 26;
    ctx.strokeRect(26, 26, 460, 460);
    ctx.strokeStyle = "rgba(255,255,255,0.35)";
    ctx.lineWidth = 6;
    ctx.strokeRect(56, 56, 400, 400);

    // inner diamond motif
    ctx.strokeStyle = "rgba(0,0,0,0.12)";
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(256, 110);
    ctx.lineTo(402, 256);
    ctx.lineTo(256, 402);
    ctx.lineTo(110, 256);
    ctx.closePath();
    ctx.stroke();

    // pile noise
    for (let i = 0; i < 5200; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      ctx.fillStyle =
        Math.random() > 0.5 ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)";
      ctx.fillRect(x, y, 3, 3);
    }

    return finish(el, repeat);
  });
}

/** Flat noise map used as a roughness map so surfaces don't look plastic. */
export function noiseRoughness() {
  return cached("noise-rough", () => {
    const { el, ctx } = canvas(256);
    ctx.fillStyle = "#c8c8c8";
    ctx.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 6000; i++) {
      const v = 170 + Math.random() * 70;
      ctx.fillStyle = `rgb(${v},${v},${v})`;
      ctx.fillRect(Math.random() * 256, Math.random() * 256, 2, 2);
    }
    const tex = new THREE.CanvasTexture(el);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    return tex;
  });
}
