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

    const root = rootRef.current;
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".bg-mecpl-card:not([data-animate-exclude='true']), [data-animate='card']");
      const fadeIns = gsap.utils.toArray<HTMLElement>("[data-animate='fade']");
      const scrollReveals = gsap.utils.toArray<HTMLElement>("[data-scroll-reveal='text'], [data-scroll-reveal='image']");

      mm.add("(prefers-reduced-motion: no-preference)", () => {
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
              once: true,
            },
          });
        });

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
              once: true,
            },
          });
        });

        scrollReveals.forEach((el) => {
          const isImage = el.dataset.scrollReveal === "image";
          const delay = Number(el.dataset.scrollRevealDelay ?? 0) / 1000;
          const fromVars: gsap.TweenVars = {
            opacity: 0,
            y: isImage ? 34 : 26,
            duration: isImage ? 0.95 : 0.8,
            delay: Number.isFinite(delay) ? delay : 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: el.dataset.scrollRevealStart ?? "top 86%",
              toggleActions: "play none none none",
              once: true,
            },
          };

          if (isImage) {
            fromVars.clipPath = "inset(0 0 12% 0)";
          }

          gsap.from(el, fromVars);
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([...cards, ...fadeIns, ...scrollReveals], {
          clearProps: "opacity,transform,clipPath",
        });
      });
    }, root);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, [location]);

  return rootRef;
}
