import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [hidden, setHidden] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const swipeRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (!wrapperRef.current) return;
    const lines = wrapperRef.current.querySelectorAll<HTMLElement>(".preloader-line");
    const swipes = swipeRefs.current.filter(Boolean) as HTMLDivElement[];

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => setHidden(true),
    });

    tl.set(swipes, { xPercent: 0, transformOrigin: "left center" });
    tl.fromTo(
      swipes,
      { xPercent: 0 },
      {
        xPercent: 110,
        duration: 1.15,
        stagger: 0.08,
        ease: "power4.inOut",
      }
    );

    tl.from(lines, {
      yPercent: 100,
      opacity: 0,
      duration: 0.65,
      stagger: 0.08,
    }, "-=0.75")
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
    <div
      ref={wrapperRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-mecpl-dark text-white"
    >
      <div className="absolute inset-0 hidden md:grid grid-cols-4 md:grid-cols-5">
        {["#C41E3A", "#1a1a1a", "#2c2c2c", "#111111", "#C41E3A"].map((color, index) => (
          <div
            key={color + index}
            ref={(el) => {
              swipeRefs.current[index] = el;
            }}
            className="h-full w-full rounded-r-[120px]"
            style={{ background: color }}
          />
        ))}
      </div>

      <div className="relative z-10 space-y-3 px-6 text-center mix-blend-difference">
        <div className="preloader-line text-[10px] md:text-xs uppercase tracking-[0.45em] text-white/70">MECPL</div>
        <div className="preloader-line text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-tight">MECPL</div>
        <div className="preloader-line text-[10px] md:text-xs uppercase tracking-[0.5em] text-white/60">Millennium Engineers &amp; Contractors</div>
      </div>
    </div>
  );
}
