import { useLayoutEffect } from "react";
import Lenis from "lenis";

export default function useLenis() {
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: true,
      orientation: "vertical",
      gestureOrientation: "vertical",
    });

    lenis.scrollTo(0, { immediate: true });

    const handleScrollTop = () => {
      lenis.scrollTo(0, { immediate: true });
    };

    window.addEventListener("mecpl:scroll-top", handleScrollTop);

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      window.removeEventListener("mecpl:scroll-top", handleScrollTop);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}
