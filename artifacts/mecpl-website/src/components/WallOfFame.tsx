import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import "./WallOfFame.css";
import { awards, categories, categoryCounts, initials, type Award, type AwardCategory } from "@/data/awardsData";
import { buildGeo, createEngine, norm, type Engine, type Geo } from "./wallEngine";

const BASE = import.meta.env.BASE_URL;
const src = (p?: string) => (p ? `${BASE}${p.replace(/^\//, "")}` : undefined);
const catLabel = (k: AwardCategory) => categories.find((c) => c.key === k)!.label;
const awardName = (a: Award) =>
  [a.title, a.year, a.project, a.issuer].filter(Boolean).join(", ") + (a.featured ? ", featured" : "");

/* ---------- flat list (default until mounted, fallback, print) ---------- */
const listFilters = [
  { key: "featured", label: "Featured" },
  { key: "safety", label: "Safety" },
  { key: "quality", label: "Quality" },
  { key: "national-state", label: "National & State" },
  { key: "all", label: "All" },
] as const;

type ListFilter = (typeof listFilters)[number]["key"];

function WallList({ showHeading = false, initialFilter = "all" }: { showHeading?: boolean; initialFilter?: ListFilter }) {
  const [filter, setFilter] = useState<ListFilter>(initialFilter);
  const filtersRef = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    if (!showHeading || initialFilter !== "featured") return;
    filtersRef.current?.querySelector<HTMLButtonElement>('[data-testid="list-filter-featured"]')?.focus({ preventScroll: true });
    filtersRef.current?.scrollIntoView({ block: "start", behavior: "auto" });
  }, [showHeading, initialFilter]);
  const visibleAwards = awards.filter((a) => filter === "all" || (filter === "featured" ? a.featured : a.category === filter));
  return (
    <div className="wof-list" data-testid="awards-list">
      {showHeading && (
        <nav ref={filtersRef} className="wof-list-filters" aria-label="Filter awards">
          {listFilters.map((f) => (
            <button
              key={f.key}
              type="button"
              className="wof-list-filter"
              aria-pressed={filter === f.key}
              aria-controls="wof-award-rows"
              data-testid={`list-filter-${f.key}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
          <span className="wof-sr" role="status">
            Showing {listFilters.find((f) => f.key === filter)!.label.toLowerCase()} awards.
          </span>
        </nav>
      )}
      {showHeading && <h2 className="wof-lh" id="wof-title">Awards and recognition</h2>}
      <ul className="wof-rows" id={showHeading ? "wof-award-rows" : undefined}>
        {visibleAwards.map((a) => (
          <li key={a.id} data-testid={`award-row-${a.id}`}>
            <Medal award={a} />
            <span className="t">
              <span className="tt">{a.title}</span>
              <span className="p">{a.project ?? catLabel(a.category)}</span>
            </span>
            <span className="y">{a.year}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Medal({ award }: { award: Award }) {
  const [failed, setFailed] = useState(false);
  return (
    <span className="wof-medal" aria-hidden="true">
      <span>{initials(award.issuer)}</span>
      {award.logo && !failed && (
        <img
          src={src(award.logo)}
          alt=""
          width={50}
          height={50}
          loading="lazy"
          decoding="async"
          onLoad={(e) => {
            e.currentTarget.classList.add("is-loaded");
            e.currentTarget.parentElement?.classList.add("has-logo");
          }}
          onError={() => setFailed(true)}
        />
      )}
    </span>
  );
}

/* ---------- flat, pannable wall ---------- */
function WallStage({ initialCategory, onList }: { initialCategory: AwardCategory; onList: () => void }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Engine | null>(null);
  const S = useRef({ init: false, applied: null as Geo | null, statusT: 0, seen: null as string | null });

  const [geo, setGeo] = useState<Geo>(() => buildGeo(window.innerWidth, window.innerHeight, categories, awards));
  const geoRef = useRef(geo);
  geoRef.current = geo;

  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const initialAward = useMemo(() => awards.find((a) => a.id === params.get("award")) ?? null, [params]);
  const startCat = useMemo(() => {
    const k = initialAward?.category ?? (params.get("category") as AwardCategory | null) ?? initialCategory;
    return Math.max(0, categories.findIndex((c) => c.key === k));
  }, [params, initialAward, initialCategory]);

  const [active, setActive] = useState(startCat);
  const activeRef = useRef(startCat);
  const [entered, setEntered] = useState(false);
  const [settled, setSettled] = useState(false);
  const [openId, setOpenId] = useState<string | null>(initialAward?.id ?? null);
  const openRef = useRef(openId);
  openRef.current = openId;

  const colOfAward = useCallback((id: string) => geoRef.current.cols.findIndex((c) => c.type === "awards" && c.items.some((a) => a.id === id)), []);

  const announce = useCallback(() => {
    window.clearTimeout(S.current.statusT);
    S.current.statusT = window.setTimeout(() => {
      const cat = categories[activeRef.current];
      const ys = awards.filter((a) => a.category === cat.key).map((a) => a.year);
      if (statusRef.current)
        statusRef.current.textContent = `${cat.label}, ${ys.length} awards. Showing ${Math.max(...ys)} to ${Math.min(...ys)}.`;
    }, 400);
  }, []);
  const announceRef = useRef(announce);
  announceRef.current = announce;

  const labels = useMemo(() => categories.map((c) => c.label), []);

  // engine (created once, disposable/reusable for StrictMode)
  useLayoutEffect(() => {
    if (!engineRef.current) {
      engineRef.current = createEngine({
        geo: () => geoRef.current,
        ring: ringRef.current!, camera: cameraRef.current!, stage: stageRef.current!,
        knob: knobRef.current!, slider: trackRef.current!, labels,
        onActive: (i) => { activeRef.current = i; setActive(i); },
        onSettle: () => announceRef.current(),
      });
    }
    const stage = stageRef.current!;
    const eng = engineRef.current;
    const onWheel = (e: WheelEvent) => eng.wheel(e);
    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      stage.removeEventListener("wheel", onWheel);
      eng.dispose();
      window.clearTimeout(S.current.statusT);
    };
  }, [labels]);

  const targetAngle = useCallback((g: Geo) => {
    const aw = initialAward && openRef.current ? g.cols.findIndex((c) => c.type === "awards" && c.items.some((a) => a.id === initialAward.id)) : -1;
    return aw >= 0 ? aw * g.step : g.arcs[activeRef.current].center;
  }, [initialAward]);

  // geometry -> columns
  useLayoutEffect(() => {
    const eng = engineRef.current!;
    const el = ringRef.current!;
    eng.setCols(Array.from(el.children) as HTMLElement[]);
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!S.current.init) {
      S.current.init = true;
      eng.setRot(targetAngle(geo) - (rm ? 0 : 30));
    } else if (S.current.applied && S.current.applied !== geo) {
      eng.setRot(geo.arcs[activeRef.current].center);
    } else {
      eng.render();
    }
    S.current.applied = geo;
  }, [geo, targetAngle]);

  // resize
  useEffect(() => {
    const stage = stageRef.current!;
    let t = 0;
    const resize = () => {
      window.clearTimeout(t);
      t = window.setTimeout(() => {
        const g = buildGeo(window.innerWidth, window.innerHeight, categories, awards);
        setGeo((old) => (old.key === g.key ? old : g));
      }, 100);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(stage);
    window.addEventListener("resize", resize);
    return () => { ro.disconnect(); window.removeEventListener("resize", resize); window.clearTimeout(t); };
  }, []);

  // entrance at 35% visibility
  useEffect(() => {
    const stage = stageRef.current!;
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer = 0;
    const enter = () => {
      setEntered(true);
      if (!rm) engineRef.current!.animateTo(targetAngle(geoRef.current), 1200);
      timer = window.setTimeout(() => setSettled(true), 1900);
    };
    if (typeof IntersectionObserver === "undefined") { enter(); return () => window.clearTimeout(timer); }
    const io = new IntersectionObserver((es) => {
      if (es.some((e) => e.isIntersecting && e.intersectionRatio >= 0.35)) { io.disconnect(); enter(); }
    }, { threshold: 0.35 });
    io.observe(stage);
    return () => { io.disconnect(); window.clearTimeout(timer); };
  }, [targetAngle]);

  const setUrl = useCallback((cat?: AwardCategory, award?: string | null) => {
    const u = new URL(window.location.href);
    if (cat) u.searchParams.set("category", cat);
    if (award) u.searchParams.set("award", award); else if (award === null) u.searchParams.delete("award");
    window.history.replaceState(window.history.state, "", u);
  }, []);

  const goCategory = (i: number) => {
    const n = categories.length;
    const idx = ((i % n) + n) % n;
    engineRef.current!.goCategory(idx);
    setUrl(categories[idx].key);
  };

  // dialog
  const dlgAward = openId ? awards.find((a) => a.id === openId) ?? null : null;
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (openId && !d.open) { setEntered(true); d.showModal(); }
  }, [openId]);

  const closeDialog = () => dialogRef.current?.close();
  const onDialogClose = () => {
    const id = openRef.current;
    setOpenId(null);
    setUrl(undefined, null);
    if (id) {
      requestAnimationFrame(() => {
        stageRef.current?.querySelector<HTMLElement>(`[data-id="${id}"]`)?.focus({ preventScroll: true });
      });
    }
  };
  const openAward = (id: string) => {
    const a = awards.find((x) => x.id === id)!;
    setOpenId(id);
    setUrl(a.category, id);
  };
  const stepAward = (dir: number) => {
    if (!dlgAward) return;
    const list = awards.filter((a) => a.category === dlgAward.category);
    const next = list[list.findIndex((a) => a.id === dlgAward.id) + dir];
    if (!next) return;
    setOpenId(next.id);
    setUrl(next.category, next.id);
    const k = colOfAward(next.id);
    if (k >= 0) engineRef.current!.animateTo(k * geoRef.current.step, 500);
  };

  const onStageKey = (e: React.KeyboardEvent) => {
    if (e.target !== e.currentTarget) return;
    const eng = engineRef.current!;
    if (e.key === "ArrowRight") { eng.nudge(1); e.preventDefault(); }
    else if (e.key === "ArrowLeft") { eng.nudge(-1); e.preventDefault(); }
    else if (e.key === "Home") { goCategory(eng.getActive() - 1); e.preventDefault(); }
    else if (e.key === "End") { goCategory(eng.getActive() + 1); e.preventDefault(); }
  };
  const onFocusCapture = (e: React.FocusEvent) => {
    const p = (e.target as HTMLElement).closest<HTMLElement>(".wof-plaque");
    if (!p) return;
    const eng = engineRef.current!;
    const theta = Number(p.dataset.k) * geoRef.current.step;
    if (Math.abs(norm(theta - eng.getRot())) > 25) { setEntered(true); eng.animateTo(theta, 500); }
  };
  const onTrackPointer = (e: React.MouseEvent) => {
    const r = trackRef.current!.getBoundingClientRect();
    const f = (e.clientX - r.left) / r.width;
    engineRef.current!.animateTo(f * 360 - geoRef.current.step / 2, 700);
  };
  const onTrackKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowUp") { engineRef.current!.nudge(1); e.preventDefault(); }
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") { engineRef.current!.nudge(-1); e.preventDefault(); }
  };
  const onScroll = (e: React.UIEvent<HTMLDivElement>) => { e.currentTarget.scrollLeft = 0; e.currentTarget.scrollTop = 0; };

  const centerK = Math.round(targetAngle(geo) / geo.step);
  const style = {
    "--R": `${geo.R}px`, "--c": `${geo.c}px`, "--pw": `${geo.w}px`, "--ph": `${geo.h}px`,
    "--gap": `${geo.gap}px`, "--content-h": `${geo.content}px`, "--stage-h": `${geo.stageH}px`,
  } as React.CSSProperties;
  const touch = typeof window.matchMedia === "function" && window.matchMedia("(pointer: coarse)").matches;
  const prevNext = dlgAward ? awards.filter((a) => a.category === dlgAward.category) : [];
  const di = dlgAward ? prevNext.findIndex((a) => a.id === dlgAward.id) : -1;

  return (
    <div className={`wof-wall${entered ? " is-entered" : ""}${settled ? " is-settled" : ""}`} style={style} ref={(n) => {
      // propagate state classes to the .wof root so CSS can key off them
      const root = n?.closest(".wof");
      root?.classList.toggle("is-entered", entered);
      root?.classList.toggle("is-settled", settled);
    }}>
      <nav className="wof-nav" aria-label="Award categories">
        <div className="wof-index">
          <button type="button" className="wof-chev" aria-label="Previous category" onClick={() => goCategory(active - 1)} data-testid="button-prev-category">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M9 2 4 7l5 5" /></svg>
          </button>
          <div className="wof-cats">
            {categories.map((c, i) => (
              <span key={c.key} style={{ display: "contents" }}>
                {i > 0 && <span className="wof-sep" aria-hidden="true">·</span>}
                <button type="button" className="wof-cat" aria-pressed={active === i} onClick={() => goCategory(i)} data-testid={`button-category-${c.key}`}>
                  {c.label}<b>{categoryCounts[c.key]}</b>
                </button>
              </span>
            ))}
          </div>
          <button type="button" className="wof-chev" aria-label="Next category" onClick={() => goCategory(active + 1)} data-testid="button-next-category">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m5 2 5 5-5 5" /></svg>
          </button>
        </div>
        <div
          className="wof-track"
          ref={trackRef}
          role="slider"
          tabIndex={0}
          aria-label="Position in the room"
          aria-valuemin={0}
          aria-valuemax={359}
          aria-valuenow={0}
          aria-valuetext={categories[active].label}
          onClick={onTrackPointer}
          onKeyDown={onTrackKey}
        >
          {geo.arcs.map((a, i) => (
            <div key={i} className="wof-seg" style={{ flex: a.to - a.from }} aria-hidden="true">{categories[i].label}</div>
          ))}
          <div className="wof-knob" ref={knobRef} aria-hidden="true" />
        </div>
        <div className="wof-foot">
          <button type="button" className="wof-link" onClick={onList} data-testid="button-view-list">View as list ↗</button>
        </div>
      </nav>
      <div
        ref={stageRef}
        className={`wof-stage${openId ? " is-dimmed" : ""}`}
        tabIndex={0}
        role="region"
        aria-roledescription="Awards gallery"
        aria-label={`Awards wall. ${touch ? "Swipe" : "Drag"} or use arrow keys to explore.`}
        data-testid="awards-stage"
        onPointerDown={(e) => engineRef.current?.down(e.nativeEvent)}
        onPointerMove={(e) => engineRef.current?.move(e.nativeEvent)}
        onPointerUp={(e) => engineRef.current?.up(e.nativeEvent)}
        onPointerCancel={(e) => engineRef.current?.up(e.nativeEvent)}
        onKeyDown={onStageKey}
        onFocusCapture={onFocusCapture}
        onScroll={onScroll}
      >
        <div className="wof-camera" ref={cameraRef}>
          <div className="wof-ring" ref={ringRef}>
            {geo.cols.map((col, k) => {
              const dist = Math.min(Math.abs(k - centerK), geo.N - Math.abs(k - centerK));
              const base = { "--d": `${dist * 20}ms` } as React.CSSProperties;
              if (col.type === "divider") {
                const cat = categories[col.cat];
                return (
                  <div key={`d${k}`} className="wof-col wof-col--divider" style={base}>
                    <div className="wof-div">
                      <div className="wof-div-label"><span>{cat.label}</span><b>{categoryCounts[cat.key]}</b></div>
                      <p className="wof-div-blurb">{cat.blurb}</p>
                    </div>
                  </div>
                );
              }
              return (
                <div key={`c${k}`} className="wof-col" style={base}>
                  {col.items.map((a) => (
                    <button
                      key={a.id}
                      type="button"
                      className="wof-plaque"
                      data-id={a.id}
                      data-k={k}
                      aria-label={awardName(a)}
                      data-testid={`plaque-${a.id}`}
                      onClick={() => openAward(a.id)}
                    >
                      {a.featured && <span className="wof-dot" title="Featured recognition" />}
                      <span className="wof-year">{a.year}</span>
                      <Medal award={a} />
                      <span className="wof-ptitle">{a.title}</span>
                      {a.project && <span className="wof-proj">{a.project}</span>}
                    </button>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
        <div className="wof-vignette" aria-hidden="true" />
      </div>

      <div className="wof-sr" aria-live="polite" id="wof-status" ref={statusRef} />

      <dialog
        ref={dialogRef}
        className="wof-dialog"
        aria-labelledby="wof-d-title"
        onClose={onDialogClose}
        onClick={(e) => { if (e.target === e.currentTarget) closeDialog(); }}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") { stepAward(-1); e.preventDefault(); }
          if (e.key === "ArrowRight") { stepAward(1); e.preventDefault(); }
        }}
      >
        {dlgAward && (
          <div className="wof-d-grid" data-testid="award-dialog">
            <div className="wof-d-media">
              {dlgAward.image ? <img src={src(dlgAward.image)} alt={dlgAward.title} /> : <Medal key={dlgAward.id} award={dlgAward} />}
            </div>
            <div className="wof-d-body">
              <p className="wof-d-eyebrow">{catLabel(dlgAward.category)}</p>
              <h3 className="wof-d-title" id="wof-d-title">{dlgAward.title}</h3>
              <p className="wof-d-meta"><span className="wof-d-year">{dlgAward.year}</span></p>
              {dlgAward.project && <p className="wof-d-meta">{dlgAward.project}</p>}
              {dlgAward.note && <p className="wof-d-meta">{dlgAward.note}</p>}
              <p className="wof-d-issuer">{dlgAward.issuer}</p>
            </div>
            <div className="wof-d-foot">
              <button type="button" className="wof-d-btn" disabled={di <= 0} onClick={() => stepAward(-1)} data-testid="button-dialog-prev">← Previous</button>
              <button type="button" className="wof-d-btn" disabled={di >= prevNext.length - 1} onClick={() => stepAward(1)} data-testid="button-dialog-next">Next →</button>
            </div>
            <button type="button" className="wof-d-x" aria-label="Close" onClick={closeDialog} data-testid="button-dialog-close">×</button>
          </div>
        )}
      </dialog>
    </div>
  );
}

/* ---------- section ---------- */
export default function WallOfFame({ initialCategory = "national-state" }: { initialCategory?: AwardCategory }) {
  const [ready, setReady] = useState(false);
  const [canWall, setCanWall] = useState(false);
  const [view, setView] = useState<"wall" | "list">("wall");
  const [listInitialFilter, setListInitialFilter] = useState<ListFilter>("all");

  useEffect(() => {
    const ok = typeof CSS !== "undefined" && CSS.supports("transform-style", "preserve-3d");
    setCanWall(ok);
    setView(ok ? "wall" : "list");
    setReady(true);
  }, []);

  const choose = (v: "wall" | "list") => {
    if (v === "list") setListInitialFilter("featured");
    setView(v);
  };
  const showWall = ready && view === "wall";
  const touch = ready && typeof window.matchMedia === "function" && window.matchMedia("(pointer: coarse)").matches;

  return (
    <section className="wof" id="awards-wall" aria-labelledby="wof-title" data-testid="section-wall-of-fame">
      {showWall && (
        <header className="wof-header">
          <span className="wof-eyebrow">The record</span>
          <h2 className="wof-title" id="wof-title">A wall of the work.</h2>
          <p className="wof-sub">{touch ? "Swipe to explore, or choose a category." : "Drag to explore, or choose a category."}</p>
        </header>
      )}
      {showWall ? (
        <>
          <WallStage initialCategory={initialCategory} onList={() => choose("list")} />
          <div className="wof-print-only"><WallList /></div>
        </>
      ) : (
        <>
          <WallList showHeading initialFilter={listInitialFilter} />
          {canWall && (
            <div className="wof-nav wof-view-ui">
              <div className="wof-foot">
                <button type="button" className="wof-link" onClick={() => choose("wall")} data-testid="button-view-wall">View as wall</button>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}
