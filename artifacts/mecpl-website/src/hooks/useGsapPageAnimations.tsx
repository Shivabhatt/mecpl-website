import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocation } from "wouter";

gsap.registerPlugin(ScrollTrigger);

export default function useGsapPageAnimations() {
  const [location] = useLocation();
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const pageBlocks = gsap.utils.toArray<HTMLElement>("[data-animate-page] > *");
      pageBlocks.forEach((block, index) => {
        gsap.from(block, {
          y: 30,
          opacity: 0,
          duration: 0.9,
          delay: index * 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: block,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        });
      });

      const cards = gsap.utils.toArray<HTMLElement>(".bg-mecpl-card:not([data-animate-exclude='true']), [data-animate='card']");
      cards.forEach((card, index) => {
        gsap.from(card, {
          y: 25,
          opacity: 0,
          duration: 0.75,
          delay: 0.08 * (index % 8),
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        });
      });

      const fadeIns = gsap.utils.toArray<HTMLElement>("[data-animate='fade']");
      fadeIns.forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        });
      });
    }, rootRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((instance) => instance.kill());
    };
  }, [location]);

  return rootRef;
}
