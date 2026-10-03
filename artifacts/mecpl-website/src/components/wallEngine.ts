import type { Award, CategoryMeta } from "@/data/awardsData";

export const DEG = 180 / Math.PI;
export const norm = (a: number) => ((((a % 360) + 540) % 360) - 180);
export const mod360 = (a: number) => ((a % 360) + 360) % 360;
const easeIO = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

export type Col = { type: "divider"; cat: number } | { type: "awards"; cat: number; items: Award[] };
export interface Arc { from: number; to: number; center: number }
export interface Geo {
  rows: number; w: number; h: number; gap: number; pitch: number; N: number; step: number;
  R: number; c: number; content: number; stageH: number; cols: Col[]; arcs: Arc[]; key: string;
}

export function buildGeo(width: number, vh: number, cats: CategoryMeta[], all: Award[]): Geo {
  let rows = 3, w = 208, h = 232, gap = 16, cf = 0.35;
  if (width < 768) { rows = 2; w = 150; h = 196; gap = 12; cf = 0.25; }
  else if (width < 1024) { w = 168; h = 200; gap = 12; cf = 0.3; }
  else if (width < 1280) { w = 188; h = 216; gap = 14; }
  const base = rows * h + (rows - 1) * gap;
  if (width >= 768 && base + 96 > vh - 220) {
    const s = clamp((vh - 220 - 96) / base, 0.8, 1);
    w = Math.round(w * s); h = Math.round(h * s); gap = Math.round(gap * s);
  }
  const pitch = w + gap;
  const cols: Col[] = [];
  const arcs: Arc[] = [];
  cats.forEach((cat, ci) => {
    const items = all.filter((a) => a.category === cat.key);
    const k0 = cols.length;
    cols.push({ type: "divider", cat: ci });
    const n = Math.ceil(items.length / rows);
    for (let i = 0; i < n; i++) cols.push({ type: "awards", cat: ci, items: items.slice(i * rows, (i + 1) * rows) });
    arcs.push({ from: k0, to: k0 + 1 + n, center: (k0 + 1 + k0 + n) / 2 });
  });
  const N = cols.length;
  const step = 360 / N;
  const R = (N * pitch) / (2 * Math.PI);
  const content = rows * h + (rows - 1) * gap;
  arcs.forEach((a) => (a.center *= step));
  return { rows, w, h, gap, pitch, N, step, R, c: R * cf, content, stageH: content + 96, cols, arcs, key: `${rows}-${w}-${h}-${gap}` };
}

export interface EngineEnv {
  geo: () => Geo;
  ring: HTMLElement; camera: HTMLElement; stage: HTMLElement; knob: HTMLElement; slider: HTMLElement;
  labels: string[];
  onActive: (i: number) => void;
  onSettle: () => void;
}

export function createEngine(env: EngineEnv) {
  const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let rot = 0, mode: "idle" | "anim" | "spring" | "inertia" | "drag" | "wheel" | "fade" = "idle";
  let raf = 0, last = 0, vel = 0, active = -1;
  let cols: HTMLElement[] = [];
  let culled: boolean[] = [];
  let anim = { from: 0, to: 0, t0: 0, dur: 1, ease: easeIO };
  let spring = { t0: 0, x0: 0, target: 0 };
  let drag: null | { id: number; x0: number; y0: number; rot0: number; moved: boolean; samples: { t: number; r: number }[] } = null;
  const timers = new Set<number>();
  let wheelT = 0, lastNow = "", lastVal = -1;
  const after = (fn: () => void, ms: number) => {
    const id = window.setTimeout(() => { timers.delete(id); fn(); }, ms);
    timers.add(id);
    return id;
  };

  function render() {
    const g = env.geo();
    env.ring.style.setProperty("--rot", rot.toFixed(3));
    const visibleHalfWidth = env.stage.clientWidth / 2 + g.w;
    if (cols.length === g.N) {
      for (let k = 0; k < g.N; k++) {
        // Keep the existing looping controls, but display every column on a flat plane.
        const x = (norm(k * g.step - rot) / g.step) * g.pitch;
        const cull = Math.abs(x) > visibleHalfWidth;
        cols[k].style.setProperty("--x", `${x.toFixed(3)}px`);
        if (cull !== culled[k]) { culled[k] = cull; cols[k].classList.toggle("is-culled", cull); }
        cols[k].style.setProperty("--light", "1");
      }
    }
    const a = mod360(rot + g.step / 2) / g.step;
    let idx = g.arcs.findIndex((r) => a >= r.from && a < r.to);
    if (idx < 0) idx = 0;
    if (idx !== active) { active = idx; env.onActive(idx); }
    env.knob.style.left = ((mod360(rot + g.step / 2) / 360) * 100).toFixed(3) + "%";
    const v = Math.round(mod360(rot)) % 360;
    if (v !== lastVal) { lastVal = v; env.slider.setAttribute("aria-valuenow", String(v)); }
    const txt = env.labels[idx];
    if (txt !== lastNow) { lastNow = txt; env.slider.setAttribute("aria-valuetext", txt); }
  }

  function tick(now: number) {
    const dt = Math.min(50, now - last);
    last = now;
    let moving = false;
    if (mode === "anim") {
      const t = (now - anim.t0) / anim.dur;
      if (t >= 1) { rot = anim.to; mode = "idle"; } else { rot = anim.from + (anim.to - anim.from) * anim.ease(t); moving = true; }
    } else if (mode === "spring") {
      const t = (now - spring.t0) / 1000, w = 14;
      const x = spring.x0 * (1 + w * t) * Math.exp(-w * t);
      if (t > 0.5 || Math.abs(x) < 0.01) { rot = spring.target; mode = "idle"; } else { rot = spring.target + x; moving = true; }
    } else if (mode === "inertia") {
      const f = dt / 16.67;
      rot += vel * f;
      vel *= Math.pow(0.94, f);
      if (Math.abs(vel) < 0.02) startSpring(); else moving = true;
      if ((mode as string) === "spring") moving = true;
    }
    render();
    raf = 0;
    if (moving) { raf = requestAnimationFrame(tick); }
    else if (mode === "idle") env.onSettle();
  }
  function request() {
    if (!raf) { last = performance.now(); raf = requestAnimationFrame(tick); }
  }
  function nearest() { const s = env.geo().step; return Math.round(rot / s) * s; }
  function startSpring() {
    const target = nearest();
    spring = { t0: performance.now(), x0: rot - target, target };
    mode = "spring";
  }
  function animateTo(target: number, dur: number, ease = easeIO) {
    timers.forEach((t) => window.clearTimeout(t)); timers.clear();
    window.clearTimeout(wheelT);
    env.camera.classList.remove("is-fading");
    if (reduced()) {
      crossfade(target);
      return;
    }
    const to = rot + norm(target - rot);
    anim = { from: rot, to, t0: performance.now(), dur, ease };
    mode = "anim";
    request();
  }
  function crossfade(target: number) {
    mode = "fade";
    env.camera.classList.add("is-fading");
    after(() => {
      rot = rot + norm(target - rot);
      render();
      env.camera.classList.remove("is-fading");
       after(() => { mode = "idle"; env.onSettle(); }, 100);
    }, 100);
  }
  function snap() {
    if (reduced()) { anim = { from: rot, to: nearest(), t0: performance.now(), dur: 150, ease: easeIO }; mode = "anim"; request(); }
    else { startSpring(); request(); }
  }

  const api = {
    getRot: () => rot,
    getActive: () => active,
    setCols(els: HTMLElement[]) { cols = els; culled = els.map(() => false); els.forEach((e) => e.classList.remove("is-culled")); },
    setRot(v: number) { rot = v; render(); },
    render,
    animateTo,
    goCategory(i: number) {
      const g = env.geo();
      const target = g.arcs[i].center;
      const d = Math.abs(norm(target - rot));
      animateTo(target, clamp(600 + d * 3, 700, 1300));
    },
    nudge(dir: number) {
      const s = env.geo().step;
      const base = Math.round((mode === "anim" ? anim.to : rot) / s) * s;
      animateTo(base + dir * s, 450);
    },
    snap,
    down(e: PointerEvent) {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      timers.forEach((t) => window.clearTimeout(t)); timers.clear();
      window.clearTimeout(wheelT);
      env.camera.classList.remove("is-fading");
      mode = "idle";
      drag = { id: e.pointerId, x0: e.clientX, y0: e.clientY, rot0: rot, moved: false, samples: [] };
    },
    move(e: PointerEvent) {
      if (!drag || e.pointerId !== drag.id) return;
      if (!drag.moved) {
        if (Math.hypot(e.clientX - drag.x0, e.clientY - drag.y0) <= 6) return;
        if (e.pointerType === "touch" && Math.abs(e.clientY - drag.y0) > Math.abs(e.clientX - drag.x0)) { drag = null; return; }
        drag.moved = true;
        try { env.stage.setPointerCapture(e.pointerId); } catch { /* noop */ }
        mode = "drag"; vel = 0;
        env.stage.classList.add("is-dragging");
        drag.x0 = e.clientX; drag.rot0 = rot;
      }
      rot = drag.rot0 - ((e.clientX - drag.x0) / env.geo().R) * DEG;
      const t = performance.now();
      drag.samples.push({ t, r: rot });
      while (drag.samples.length > 2 && t - drag.samples[0].t > 100) drag.samples.shift();
      request();
    },
    up(e: PointerEvent) {
      if (!drag || e.pointerId !== drag.id) return;
      const d = drag; drag = null;
      if (!d.moved) return;
      env.stage.classList.remove("is-dragging");
      try { env.stage.releasePointerCapture(e.pointerId); } catch { /* noop */ }
      if (reduced()) { snap(); return; }
      const s = d.samples, now = performance.now();
      let v = 0;
      if (s.length > 1 && now - s[s.length - 1].t < 100) {
        const dt = s[s.length - 1].t - s[0].t;
        if (dt > 1) v = ((s[s.length - 1].r - s[0].r) / dt) * 16.67;
      }
      vel = clamp(v, -2.5, 2.5);
      if (Math.abs(vel) < 0.02) snap(); else { mode = "inertia"; request(); }
    },
    wheel(e: WheelEvent) {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault(); e.stopPropagation();
      timers.forEach((t) => window.clearTimeout(t)); timers.clear();
      env.camera.classList.remove("is-fading");
      mode = "wheel";
      rot += (e.deltaX / env.geo().R) * DEG;
      request();
      window.clearTimeout(wheelT);
      wheelT = window.setTimeout(() => { mode = "idle"; snap(); }, 150);
    },
    dispose() {
      cancelAnimationFrame(raf); raf = 0;
      window.clearTimeout(wheelT);
      timers.forEach((t) => window.clearTimeout(t)); timers.clear();
      env.camera.classList.remove("is-fading");
      env.stage.classList.remove("is-dragging");
      mode = "idle"; drag = null;
    },
  };
  return api;
}
export type Engine = ReturnType<typeof createEngine>;
