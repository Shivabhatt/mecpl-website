import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import "./Preloader.css";

const images = [
  "assets/projects/Trump-Tower.jpg",
  "assets/projects/HIGH-RISE-1-scaled.jpg",
  "assets/projects/Eonwest.jpg",
  "assets/projects/KRC-scaled-e1700730314593.jpg",
  "assets/video/posters/banner-giant-behind-the-giants.jpg",
];

gsap.registerPlugin(CustomEase);
const loaderEase = CustomEase.create(
  "mecpl-wordmark-loader",
  "M0,0 C0.87,0 0.13,1 1,1",
);

export default function Preloader({ onReveal }: { onReveal: () => void }) {
  const [hidden, setHidden] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const assetBase = import.meta.env.BASE_URL;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    let revealed = false;
    const resetScroll = () => {
      window.dispatchEvent(new Event("mecpl:scroll-top"));
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    };
    const reveal = () => {
      if (revealed) return;
      revealed = true;
      // Startup always opens at the top; subsequent in-site anchor links still work.
      if (window.location.hash) {
        window.history.replaceState(
          window.history.state, "", window.location.pathname + window.location.search,
        );
      }
      resetScroll();
      onReveal();
    };
    const finish = () => {
      reveal();
      document.body.style.overflow = previousOverflow;
      (window as Window & { _preloaderDone?: boolean })._preloaderDone = true;
      window.dispatchEvent(new CustomEvent("preloader-exit"));
      resetScroll();
      setHidden(true);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }

    const wrapper = wrapperRef.current;
    const slot = slotRef.current;
    const image = imageRef.current;
    if (!wrapper || !slot || !image) {
      finish();
      return;
    }

    document.body.style.overflow = "hidden";
    window.dispatchEvent(new Event("mecpl:preloader-start"));
    let timeline: gsap.core.Timeline;
    const context = gsap.context(() => {
      const extras = image.querySelectorAll(".mecpl-loader-extra");
      const updateImageFrame = () => {
        const box = slot.getBoundingClientRect();
        gsap.set(image, {
          left: box.left, top: box.top, width: box.width, height: box.height,
        });
      };

      timeline = gsap.timeline({ paused: true, onComplete: finish });
      timeline
        .call(updateImageFrame, [], 0)
        .fromTo(".mecpl-loader-lockup", { opacity: 0, y: 12 }, {
          opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
          onUpdate: updateImageFrame,
        }, 0.25)
        .fromTo(image, { clipPath: "inset(0 50% 0 50%)" }, {
          clipPath: "inset(0 0% 0 0%)", duration: 1.25, ease: loaderEase,
        }, 1.35)
        .to(extras, {
          opacity: 0, duration: 0.05, stagger: 0.45, ease: "none",
        }, 2.75)
        .to(".mecpl-loader-lockup", {
          opacity: 0, duration: 0.4, ease: "power2.in",
        }, 4.4)
        .to(image, {
          top: 0, left: 0,
          width: () => wrapper.clientWidth,
          height: () => wrapper.clientHeight,
          duration: 2, ease: loaderEase,
        }, 4.45)
        .call(reveal, [], 6.45)
        .to(wrapper, { opacity: 0, duration: 0.7, ease: "power2.out" }, 6.45);
    }, wrapper);

    let cancelled = false;
    let started = false;
    const start = () => {
      if (cancelled || started) return;
      started = true;
      window.clearTimeout(loadTimeout);
      timeline.play();
    };
    const loadTimeout = window.setTimeout(start, 1500);
    void Promise.allSettled([
      document.fonts.ready,
      ...Array.from(wrapper.querySelectorAll("img")).map((img) => img.decode()),
    ]).then(start);

    return () => {
      cancelled = true;
      window.clearTimeout(loadTimeout);
      context.revert();
      document.body.style.overflow = previousOverflow;
    };
  }, [onReveal]);

  if (hidden) return null;

  return (
    <div
      ref={wrapperRef}
      className="mecpl-preloader"
      role="status"
      aria-label="Loading MECPL website"
      style={{ backgroundColor: "#000000", color: "#f4f4f4" }}
    >
      <div
        className="mecpl-loader-lockup"
        role="img"
        aria-label="Millennium Engineers & Contractors Pvt. Ltd."
      >
        <img
          className="mecpl-loader-logo"
          src={`${assetBase}assets/logo/mecpl-logo.webp`}
          alt=""
          loading="eager"
        />
        <span className="mecpl-loader-divider" aria-hidden="true" />
        <div className="mecpl-loader-brand-copy" aria-hidden="true">
          <div className="mecpl-loader-brand-line">
            <span>Millennium</span>
            <div ref={slotRef} className="mecpl-loader-slot" />
            <span>Engineers &amp; Contractors</span>
          </div>
          <div className="mecpl-loader-brand-subline">PVT. LTD.</div>
        </div>
      </div>
      <div ref={imageRef} className="mecpl-loader-image" aria-hidden="true">
        {images.map((src, index) => (
          <img
            key={src}
            className={index < images.length - 1 ? "mecpl-loader-extra" : undefined}
            src={`${assetBase}${src}`}
            alt=""
            loading="eager"
            style={{ zIndex: images.length - index }}
          />
        ))}
      </div>
    </div>
  );
}