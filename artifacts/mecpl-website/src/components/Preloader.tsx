import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export default function Preloader() {
  const [hidden, setHidden] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const barRef     = useRef<HTMLDivElement>(null);
  const numRef     = useRef<HTMLDivElement>(null);
  const tagRef     = useRef<HTMLDivElement>(null);
  const logoRef    = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const bar     = barRef.current;
    const num     = numRef.current;
    const tag     = tagRef.current;
    const logo    = logoRef.current;
    if (!wrapper || !bar || !num || !tag || !logo) return;

    gsap.set([logo, num, tag], { opacity: 0 });
    gsap.set(logo, { y: 10 });
    gsap.set(num,  { y: 28 });

    const tl = gsap.timeline({
      onComplete: () => {
        (window as any)._preloaderDone = true;
        setHidden(true);
      },
    });

    tl
      .to(logo, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" })
      .to(num,  { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" }, "-=0.1")
      .to(bar,  { scaleX: 1, duration: 1.35, ease: "power2.inOut" }, "<")
      .call(() => {
        const split = new SplitText(tag, { type: "chars" });
        gsap.set(tag, { opacity: 1 });
        gsap.from(split.chars, {
          yPercent: 60, opacity: 0, duration: 0.55,
          stagger: 0.028, ease: "power3.out",
          onComplete: () => split.revert(),
        });
      }, [], "-=0.75")
      .to({}, { duration: 0.45 })
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
        style={{ height: "44px", width: "auto", objectFit: "contain", marginBottom: "52px" }}
      />

      <div ref={numRef} style={{
        fontFamily: "'Montserrat',sans-serif",
        fontSize: "clamp(5rem, 12vw, 9.5rem)",
        fontWeight: 800,
        color: "#111827",
        lineHeight: 1,
        letterSpacing: "-0.03em",
        marginBottom: "18px",
      }}>
        25
      </div>

      <div ref={tagRef} style={{
        fontFamily: "'Montserrat',sans-serif",
        fontSize: "10px",
        fontWeight: 500,
        letterSpacing: "0.38em",
        color: "#9ca3af",
        textTransform: "uppercase",
        marginBottom: "48px",
        overflow: "hidden",
      }}>
        YEARS OF EXCELLENCE
      </div>

      <div style={{ width: "180px", height: "1px", background: "rgba(17,24,39,0.09)", position: "relative", overflow: "hidden" }}>
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
