import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [hidden, setHidden] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const barRef     = useRef<HTMLDivElement | null>(null);

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

    tl.to(bar, { width: "100%", duration: 1.2, ease: "power2.inOut" })
      .call(() => {
        window.dispatchEvent(new CustomEvent("preloader-exit"));
      })
      .to(wrapper, { y: "-100vh", duration: 0.8, ease: "power3.inOut" }, ">");

    return () => { tl.kill(); };
  }, []);

  if (hidden) return null;

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: "#f5f3ef" }}
    >
      <img
        src="/assets/logo/mecpl-logo.webp"
        alt="MECPL"
        className="h-16 w-auto object-contain mb-10"
        style={{ filter: "brightness(0)" }}
      />
      <div className="relative" style={{ width: "160px", height: "2px", background: "rgba(17,24,39,0.12)" }}>
        <div
          ref={barRef}
          className="absolute left-0 top-0 h-full"
          style={{ width: "0%", background: "#C41E3A" }}
        />
      </div>
    </div>
  );
}
