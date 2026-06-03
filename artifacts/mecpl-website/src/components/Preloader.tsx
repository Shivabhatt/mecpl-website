import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [hidden, setHidden] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const barRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const bar     = barRef.current;
    if (!wrapper || !bar) return;

    const tl = gsap.timeline({
      onComplete: () => {
        (window as any)._preloaderDone = true;
        setHidden(true);
      },
    });

    tl
      .to(bar, { scaleX: 1, duration: 1.6, ease: "power2.inOut" })
      .to({}, { duration: 0.15 })
      .call(() => window.dispatchEvent(new CustomEvent("preloader-exit")))
      .to(wrapper, { y: "-100%", duration: 0.9, ease: "power3.inOut" });

    return () => { tl.kill(); };
  }, []);

  if (hidden) return null;

  return (
    <div
      ref={wrapperRef}
      className="preloader-force-text fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: "#ffffff" }}
    >
      {/* Logo */}
      <img
        src="/assets/logo/mecpl-logo.webp"
        alt="MECPL"
        style={{ height: "48px", width: "auto", objectFit: "contain", marginBottom: "32px" }}
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
  );
}
