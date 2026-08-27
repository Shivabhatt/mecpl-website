import { useLayoutEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function useLenis() {
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const isTouchDevice =
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(max-width: 768px)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = new Lenis({
      duration: isTouchDevice ? 0.8 : 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !isTouchDevice && !prefersReducedMotion,
      syncTouch: false,
      orientation: "vertical",
      gestureOrientation: "vertical",
    });

    lenis.scrollTo(0, { immediate: true });

    const handleScrollTop = () => {
      lenis.scrollTo(0, { immediate: true });
    };

    window.addEventListener("mecpl:scroll-top", handleScrollTop);

    const handleLenisScroll = () => ScrollTrigger.update();
    lenis.on("scroll", handleLenisScroll);

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      window.removeEventListener("mecpl:scroll-top", handleScrollTop);
      lenis.off("scroll", handleLenisScroll);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}
