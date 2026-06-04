import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [hidden, setHidden] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const barRef     = useRef<HTMLDivElement>(null);
  const logoRef    = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const bar     = barRef.current;
    const logo    = logoRef.current;
    if (!wrapper || !bar || !logo) return;

    gsap.set(logo, { opacity: 0, y: 12 });

    const tl = gsap.timeline({
      onComplete: () => {
        (window as any)._preloaderDone = true;
        setHidden(true);
      },
    });

    tl
      .to(logo, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" })
      .to(bar,  { scaleX: 1, duration: 1.4, ease: "power2.inOut" }, "-=0.1")
      .to({}, { duration: 0.4 })
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
      <img
        ref={logoRef}
        src="/assets/logo/mecpl-logo.webp"
        alt="MECPL"
        style={{ height: "56px", width: "auto", objectFit: "contain", marginBottom: "44px" }}
      />

      <div style={{ width: "160px", height: "1px", background: "rgba(17,24,39,0.09)", position: "relative", overflow: "hidden" }}>
        <div
          ref={barRef}
          style={{
            position: "absolute", top: 0, left: 0,
            height: "100%", width: "100%",
            background: "#C41E3A",
            transformOrigin: "left center",
            transform: "scaleX(0)",
          }}
        />
      </div>
    </div>
  );
}
