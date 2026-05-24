import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [hidden, setHidden] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  // swipeRefs removed: preloader simplified to mobile style for all viewports

  useEffect(() => {
    if (!wrapperRef.current) return;
    const lines = wrapperRef.current.querySelectorAll<HTMLElement>(".preloader-line");

    const tl = gsap.timeline({ defaults: { ease: "power3.out" }, onComplete: () => setHidden(true) });

    // animate the text lines in, then fade out the whole preloader
    tl.from(lines, {
      yPercent: 100,
      opacity: 0,
      duration: 0.65,
      stagger: 0.08,
    })
      .to(wrapperRef.current, {
        opacity: 0,
        duration: 0.55,
        ease: "power2.inOut",
        delay: 0.25,
      })
      .set(wrapperRef.current, { display: "none" });

    return () => {
      tl.kill();
    };
  }, []);

  if (hidden) return null;

  return (
    <div ref={wrapperRef} className="preloader-force-text fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black text-white">
      <div className="relative z-10 space-y-3 px-6 text-center">
        <div className="preloader-line text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-tight">MECPL</div>
        <div className="preloader-line text-[10px] md:text-xs uppercase tracking-[0.5em] text-white/60">Millennium Engineers &amp; Contractors</div>
      </div>
    </div>
  );
}
