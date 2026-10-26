import { Fragment, useEffect, useState } from "react";
import { sentenceCase } from "@/lib/typography";
import { Link } from "wouter";
import MecplArrowButtonContent from "./MecplArrowButtonContent";

type CarouselImage = {
  src: string;
  alt: string;
};

const teamImages: CarouselImage[] = [
  {
    src: "assets/people-safety/credai-pride-best-facility-award-2025-team-full-no-watermark.jpg",
    alt: "MECPL team receiving the 2025 CREDAI Pune Pride Best Facility Gold Award",
  },
  { src: "assets/people-safety/credai-pride-best-facility-award-2025-team-presentation-no-watermark.jpg", alt: "MECPL team presenting the 2025 CREDAI Pune Pride Best Facility Gold Award and certificate" },
  { src: "assets/people-safety/credai-pride-best-facility-award-2025-gold-trophy-landscape.jpg", alt: "Original CREDAI Pune Pride Best Facility Gold Award trophy and plaque, 2025, with an extended background" },
  { src: "assets/people-safety/18_1790178654341.jpg", alt: "MECPL workforce gathered together on site" },
  { src: "assets/people-safety/27_1790178654349.jpg", alt: "Children taking part in a supported classroom lesson" },
  { src: "assets/people-safety/26_1790178654348.jpg", alt: "Children receiving education support at a MECPL labour camp" },
  { src: "assets/people-safety/23_1790178654345.jpg", alt: "MECPL team members taking part in recreational activities" },
];

const hseImages: CarouselImage[] = [
  { src: "assets/people-safety/19_1790178654342.jpg", alt: "MECPL workers attending a safety induction" },
  { src: "assets/people-safety/20_1790178654343.jpg", alt: "MECPL workers completing site entry verification" },
  { src: "assets/people-safety/17_1790178654339.jpg", alt: "Personal protective equipment prepared for a construction site" },
  { src: "assets/people-safety/hse-electrical-room-fire-station.jpg", alt: "Fire extinguishers and a fire bucket beside the MECPL site electrical room" },
  { src: "assets/people-safety/hse-fire-hose-reel-full-no-watermark.jpg", alt: "Fire hose reel installed at a MECPL site" },
  { src: "assets/people-safety/21_1790178654344.jpg", alt: "MECPL worker using fall-protection equipment" },
  { src: "assets/people-safety/22_1790178654345.jpg", alt: "Medical professional checking a MECPL worker on site" },
  { src: "assets/people-safety/hse-fire-hydrant-line-full-no-watermark.jpg", alt: "Fire hydrant line installed along the MECPL site building" },
  { src: "assets/people-safety/28_1790178654350.jpg", alt: "Medical care being provided to a MECPL worker" },
  { src: "assets/people-safety/hse-accommodation-room.jpg", alt: "MECPL worker accommodation room with a bed and wall fan" },
];

type SafetyStat = {
  value: string;
  label: string;
};

const teamStats: SafetyStat[] = [
  { value: "8000+", label: "Skilled Workforce" },
  { value: "1000+", label: "Experienced Professionals" },
  {
    value: "Health & Safety Priority",
    label: "On Site Accommodation, Induction and Health Check-Ups",
  },
  { value: "Training & Development", label: "Continuous Learning" },
  { value: "Recognition", label: "Encouraged Growth" },
];

const hseStats: SafetyStat[] = [
  { value: "100%", label: "PPE Compliance" },
  { value: "School Facility", label: "At Labour Camp" },
  { value: "Regular Health Check-Ups", label: "Medical Professional On Site" },
  { value: "Safety & Vertigo Tests", label: "Preparedness" },
  { value: "Hygiene Accommodation", label: "Health Prioritized" },
];

function ImageCarousel({
  images,
  assetBase,
  label,
}: {
  images: CarouselImage[];
  assetBase: string;
  label: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  // Also restart the viewing interval when the current dot is selected again.
  const [selection, setSelection] = useState(0);
  const stopped = prefersReducedMotion || hovered || focused;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setPrefersReducedMotion(preference.matches);
    preference.addEventListener("change", onChange);
    return () => preference.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (stopped || images.length < 2) return;

    const timer = window.setTimeout(() => {
      setActiveIndex((index) => (index + 1) % images.length);
    }, 4000);

    return () => window.clearTimeout(timer);
  }, [images.length, activeIndex, selection, stopped]);

  return (
    <div
      className="ps-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse" || event.pointerType === "pen") setHovered(true);
      }}
      onPointerLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      {images.map((image, index) => (
        <Fragment key={image.src}>
          <div
            aria-hidden="true"
            className={`ps-carousel-backdrop ${index === activeIndex ? "is-active" : ""}`}
            style={{ backgroundImage: `url("${assetBase}${image.src}")` }}
          />
          <img
            src={`${assetBase}${image.src}`}
            alt={image.alt}
            className={`ps-carousel-image ${index === activeIndex ? "is-active" : ""}`}
            loading={index === 0 ? "eager" : "lazy"}
            aria-hidden={index !== activeIndex}
          />
        </Fragment>
      ))}
      <div className="ps-carousel-controls">
        <div className="ps-carousel-dots" role="group" aria-label={`${label} navigation`}>
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              className={`ps-carousel-dot ${index === activeIndex ? "is-active" : ""}`}
              onClick={() => {
                setActiveIndex(index);
                setSelection((value) => value + 1);
              }}
              aria-label={`Show image ${index + 1} of ${images.length}`}
              aria-current={index === activeIndex ? "true" : undefined}
            />
          ))}
        </div>
      </div>
      <span className="sr-only" aria-live={stopped ? "polite" : "off"} aria-atomic="true">
        Photo {activeIndex + 1} of {images.length}: {images[activeIndex].alt}
      </span>
    </div>
  );
}

function StatsRow({ stats, id }: { stats: SafetyStat[]; id?: string }) {
  return (
    <div id={id} className="ps-stats">
      {stats.map(({ value, label }) => (
        <div className="ps-stat" key={`${value}-${label}`}>
          <strong className={/^[\d,]+(?:\.\d+)?\s*[+%]?$/.test(value.trim()) ? "mecpl-role-stat-number" : "mecpl-role-stat-label"}>
            {sentenceCase(value)}
          </strong>
          <span>{sentenceCase(label)}</span>
        </div>
      ))}
    </div>
  );
}

export default function PeopleSafetySection() {
  const assetBase = import.meta.env.BASE_URL;

  return (
    <section id="people-safety" data-testid="section-people-safety" className="ps-section" aria-labelledby="people-safety-title">
      <div className="ps-shell">
        <header className="ps-section-heading">
          <span className="ps-section-kicker text-[#ec3338]">PEOPLE &amp; SAFETY</span>
          <h2 id="people-safety-title" className="mecpl-role-h2-large ps-common-heading">
            Building a Culture of Care and Capability
          </h2>
        </header>
        <article className="ps-panel ps-panel-hse">
          <div className="ps-copy">
            <h3 className="people-safety-heading">Building safer lives. Not just structures.</h3>
            <p>
              We put health, safety and wellbeing at the heart of every site, from safety inductions,
              protective equipment and health checks to hygienic accommodation and food. Beyond the
              workplace, we support education for workers’ children and responsible environmental
              practices, helping build safer, healthier communities.
            </p>
            <Link href="/about" className="ps-link mecpl-arrow-fill-link">
              <span className="mecpl-arrow-fill-button mecpl-arrow-fill-button--primary mecpl-role-button">
                <MecplArrowButtonContent>Our safety practices</MecplArrowButtonContent>
              </span>
            </Link>
          </div>
          <ImageCarousel images={hseImages} assetBase={assetBase} label="Safety photos" />
          <StatsRow id="people-safety-highlights" stats={hseStats} />
        </article>

        <article className="ps-panel ps-panel-team">
          <div className="ps-copy">
            <h3 className="people-safety-heading">Our team is our substance</h3>
            <p>
              Our strength lies in the people who build, engineer and lead every project.
            </p>
            <p>
              From over 8,000 skilled workers on site to experienced engineers, project managers and
              leadership teams, we invest in capability, safety, wellbeing and continuous development
              across the organisation.
            </p>
            <Link href="/careers" className="ps-link mecpl-arrow-fill-link">
              <span className="mecpl-arrow-fill-button mecpl-arrow-fill-button--primary mecpl-role-button">
                <MecplArrowButtonContent>Join our team</MecplArrowButtonContent>
              </span>
            </Link>
          </div>
          <ImageCarousel images={teamImages} assetBase={assetBase} label="Team photos" />
          <StatsRow stats={teamStats} />
        </article>
      </div>
      <style>{`
        .ps-section {
          position: relative;
          isolation: isolate;
          width: 100%;
          background: #ffffff;
          padding: 0;
          overflow: hidden;
        }
        .ps-shell {
          width: 100%;
          max-width: none;
          margin: 0 auto;
          display: grid;
          gap: 0;
          overflow: hidden;
          background: #ffffff;
        }
        .ps-section-heading {
          grid-column: 1 / -1;
          padding: 32px 20px 48px;
          background: #ffffff;
          text-align: center;
        }
        .ps-section-kicker {
          display: block;
          margin: 0 0 12px;
          color: #ec3338;
        }
        #people-safety .ps-section-heading h2.ps-common-heading {
          max-width: 900px;
          margin: 0 auto;
          color: #111111;
          text-align: center;
        }
        .ps-panel {
          position: relative;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          grid-template-rows: minmax(0, 1fr) auto;
          min-height: clamp(220px, 22vw, 320px);
          overflow: hidden;
          background: #232529;
        }
        .ps-panel-team {
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          grid-template-rows: minmax(0, 1fr) auto;
          width: 100%;
          min-height: clamp(220px, 22vw, 320px);
          margin: 0;
          padding: 0;
          overflow: hidden;
          background: #232529;
        }
        .ps-panel-hse {
          grid-template-rows: minmax(0, 1fr) auto;
          min-height: clamp(220px, 22vw, 320px);
          background: #232529;
        }
        .ps-copy {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-width: 0;
          padding: clamp(26px, 4vw, 56px) clamp(24px, 4.4vw, 64px);
          background: #232529;
        }
        .ps-panel-team .ps-copy {
          grid-column: 2;
          grid-row: 1;
          margin-left: 0;
          padding: clamp(26px, 4vw, 56px) clamp(24px, 4.4vw, 64px);
          background: #232529;
        }
        .ps-panel-hse .ps-copy {
          grid-column: 1;
          grid-row: 1;
          padding: clamp(26px, 4vw, 56px) clamp(24px, 4.4vw, 64px);
          background: #232529;
        }
        .ps-copy h3.people-safety-heading {
          max-width: 520px;
          margin: 0 0 10px;
          color: #ffffff;
        }
        .ps-copy p {
          max-width: 560px;
          margin: 0 0 12px;
          color: rgba(255, 255, 255, 0.76);
        }
        .ps-panel-team .ps-copy p {
          max-width: 700px;
          color: rgba(255, 255, 255, 0.76);
        }
        .ps-quote {
          max-width: 520px;
          margin: 3px 0 20px;
          padding-left: 14px;
          border-left: 2px solid #ec3338;
          color: #232529;
        }
        .ps-actions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 9px;
        }
        .ps-link {
          display: inline-flex;
          width: fit-content;
          color: inherit;
          text-decoration: none;
        }
        .ps-carousel-dot:focus-visible {
          outline: 2px solid #ec3338;
          outline-offset: 4px;
        }
        .ps-stats {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          grid-column: 1 / -1;
          grid-row: 2;
          width: 100%;
          margin: 0;
          padding: 10px clamp(18px, 4vw, 58px) 12px;
          border-top: 1px solid rgba(35, 37, 41, 0.14);
          background: #ffffff;
        }
        .ps-panel-team .ps-stats,
        .ps-panel-hse .ps-stats {
          grid-template-columns: repeat(5, minmax(0, 1fr));
          width: 100%;
          margin: 0;
        }
        @media (min-width: 1280px) {
          .ps-panel-team .ps-stats {
            grid-template-columns:
              minmax(0, 1.1fr)
              minmax(0, 1.35fr)
              minmax(0, 2.75fr)
              minmax(0, 1.5fr)
              minmax(0, 1.15fr);
          }
        }
        .ps-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-width: 0;
          align-self: stretch;
          padding: 4px 10px 2px;
          text-align: center;
          border-left: 1px solid rgba(35, 37, 41, 0.15);
        }
        .ps-stat:first-child {
          border-left: 0;
          padding-left: 0;
        }
        .ps-stat strong,
        .ps-stat span {
          display: block;
          width: 100%;
        }
        .ps-stat strong {
          min-height: 0;
          color: var(--mecpl-red);
        }
        .ps-stat span {
          margin-top: 4px;
          color: rgba(35, 37, 41, 0.61);
        }
        .ps-carousel {
          position: relative;
          z-index: 1;
          grid-column: 2;
          grid-row: 1;
          min-height: 0;
          overflow: hidden;
          background: #232529;
        }
        .ps-panel-team .ps-carousel,
        .ps-panel-hse .ps-carousel {
          grid-column: 2;
          grid-row: 1;
          min-height: clamp(360px, 37.5vw, 720px);
        }
        .ps-panel-team .ps-carousel {
          grid-column: 1;
        }
        .ps-panel-hse .ps-carousel::before {
          content: "";
          position: absolute;
          z-index: 1;
          inset: 0;
          border: 1px solid rgba(255, 255, 255, 0.22);
          pointer-events: none;
        }
        .ps-carousel-backdrop {
          position: absolute;
          inset: -18px;
          background-size: cover;
          background-position: center;
          filter: blur(16px);
          opacity: 0;
          transition: opacity 700ms ease;
          pointer-events: none;
        }
        .ps-carousel-backdrop.is-active {
          opacity: 1;
        }
        .ps-carousel-image {
          position: absolute;
          z-index: 1;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center center;
          opacity: 0;
          transition: opacity 700ms ease;
        }
        .ps-carousel-image.is-active {
          opacity: 1;
        }
        .ps-carousel-controls {
          position: absolute;
          z-index: 2;
          right: 14px;
          bottom: 14px;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          max-width: calc(100% - 28px);
          gap: 6px;
          padding: 6px 8px;
          background: transparent;
        }
        .ps-carousel-dots {
          display: flex;
          flex-wrap: wrap;
          gap: 2px;
        }
        .ps-carousel-dot {
          display: grid;
          place-items: center;
          width: 24px;
          height: 28px;
          padding: 0;
          border: 0;
          background: transparent;
          cursor: pointer;
        }
        .ps-carousel-dot::after {
          content: "";
          width: 6px;
          height: 6px;
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          background: transparent;
          transition: width 180ms ease, background 180ms ease, border-color 180ms ease;
        }
        .ps-carousel-dot.is-active::after {
          width: 19px;
          border-radius: 10px;
          background: #ec3338;
          border-color: #ec3338;
        }
        @media (max-width: 800px) {
          .ps-panel,
          .ps-panel-hse {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto auto;
            min-height: 0;
          }
          .ps-panel-team {
            width: 100%;
            padding: 0;
          }
          .ps-copy,
          .ps-panel-team .ps-copy,
          .ps-panel-hse .ps-copy {
            grid-column: 1;
            grid-row: 1;
            margin-left: 0;
            padding: 32px 22px 28px;
          }
          .ps-panel-team .ps-carousel,
          .ps-panel-hse .ps-carousel {
            grid-column: 1;
            grid-row: 2;
            min-height: 0;
            aspect-ratio: 4 / 3;
          }
          .ps-panel-team .ps-stats,
          .ps-panel-hse .ps-stats {
            grid-column: 1;
            grid-row: 3;
            padding: 12px 14px 18px;
          }
        }
        @media (max-width: 800px) {
          .ps-section-heading {
            padding: 28px 18px 40px;
          }
          .ps-copy h3.people-safety-heading {
            max-width: 100%;
          }
          .ps-copy p {
            max-width: 100%;
          }
          .ps-panel-team .ps-stats,
          .ps-panel-hse .ps-stats {
            width: 100%;
            margin-left: 0;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            padding: 10px 14px 16px;
          }
          .ps-stat:nth-child(odd),
          .ps-panel-hse .ps-stat:nth-child(odd) {
            border-left: 0;
          }
          .ps-stat:first-child {
            padding-left: 0;
          }
          .ps-carousel-controls {
            right: 12px;
            bottom: 12px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .ps-carousel-image,
          .ps-carousel-backdrop,
          .ps-carousel-dot::after {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}