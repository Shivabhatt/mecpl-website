import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [hidden, setHidden] = useState(false);
  const [count,  setCount]  = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const topRef     = useRef<HTMLDivElement>(null);
  const botRef     = useRef<HTMLDivElement>(null);
  const barRef     = useRef<HTMLDivElement>(null);
  const numRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const top     = topRef.current;
    const bot     = botRef.current;
    const bar     = barRef.current;
    const num     = numRef.current;
    if (!wrapper || !top || !bot || !bar || !num) return;

    const ticker = { val: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        (window as any)._preloaderDone = true;
        setHidden(true);
      },
    });

    tl
      /* Progress + counter run together */
      .to(ticker, {
        val: 100,
        duration: 1.6,
        ease: "power2.inOut",
        onUpdate() {
          setCount(Math.round(ticker.val));
        },
      })
      .to(bar, { scaleX: 1, duration: 1.6, ease: "power2.inOut" }, 0)

      /* Pause briefly at 100 */
      .to({}, { duration: 0.15 })

      /* Notify hero so its GSAP can arm */
      .call(() => window.dispatchEvent(new CustomEvent("preloader-exit")))

      /* Counter + logo fade out */
      .to([num], { autoAlpha: 0, y: -20, duration: 0.4, ease: "power2.in" })

      /* Split-curtain exit: top half slides up, bottom half slides down */
      .to(top, { y: "-100%", duration: 0.75, ease: "power3.inOut" }, "<+0.05")
      .to(bot, { y:  "100%", duration: 0.75, ease: "power3.inOut" }, "<");

    return () => { tl.kill(); };
  }, []);

  if (hidden) return null;

  return (
    <div ref={wrapperRef} className="fixed inset-0 z-[9999]" style={{ pointerEvents: "all" }}>

      {/* Top half */}
      <div ref={topRef}
        className="preloader-force-text absolute left-0 right-0"
        style={{
          top: 0,
          height: "50%",
          background: "#ffffff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: "28px",
        }}>
        {/* Logo */}
        <img
          src="/assets/logo/mecpl-logo.webp"
          alt="MECPL"
          style={{ height: "48px", width: "auto", objectFit: "contain", marginBottom: "28px" }}
        />
        {/* Progress line */}
        <div style={{ width: "220px", height: "1px", background: "rgba(17,24,39,0.1)", position: "relative", overflow: "hidden" }}>
          <div
            ref={barRef}
            style={{
              position: "absolute",
              top: 0, left: 0,
              height: "100%",
              width: "100%",
              background: "#C41E3A",
              transformOrigin: "left center",
              transform: "scaleX(0)",
            }}
          />
        </div>
      </div>

      {/* Bottom half */}
      <div ref={botRef}
        className="preloader-force-text absolute left-0 right-0"
        style={{
          bottom: 0,
          height: "50%",
          background: "#ffffff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: "28px",
        }}>
        {/* Percentage counter */}
        <div ref={numRef}
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "clamp(3.5rem, 8vw, 7rem)",
            fontWeight: 700,
            color: "#111827",
            lineHeight: 1,
            letterSpacing: "-0.03em",
          }}>
          {String(count).padStart(2, "0")}
          <span style={{ fontSize: "0.45em", fontWeight: 400, letterSpacing: "0.02em", marginLeft: "4px", opacity: 0.4 }}>%</span>
        </div>
      </div>

      {/* Thin divider seam */}
      <div style={{
        position: "absolute",
        left: 0, right: 0,
        top: "50%",
        height: "1px",
        background: "rgba(17,24,39,0.07)",
        transform: "translateY(-0.5px)",
        zIndex: 1,
      }} />

    </div>
  );
}
