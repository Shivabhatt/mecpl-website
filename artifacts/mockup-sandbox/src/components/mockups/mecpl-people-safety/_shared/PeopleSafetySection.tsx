import { useEffect, useState } from "react";
import {
  ArrowRight,
} from "lucide-react";

type CarouselImage = {
  src: string;
  alt: string;
};

const teamImages: CarouselImage[] = [
  { src: "assets/people-safety/27_1790178654349.jpg", alt: "Children taking part in a supported classroom lesson" },
  { src: "assets/people-safety/26_1790178654348.jpg", alt: "Children receiving education support at a MECPL labour camp" },
  { src: "assets/people-safety/23_1790178654345.jpg", alt: "MECPL team members taking part in recreational activities" },
  { src: "assets/people-safety/18_1790178654341.jpg", alt: "MECPL workforce gathered together on site" },
];

const hseImages: CarouselImage[] = [
  { src: "assets/people-safety/20_1790178654343.jpg", alt: "MECPL workers completing site entry verification" },
  { src: "assets/people-safety/19_1790178654342.jpg", alt: "MECPL workers attending a safety induction" },
  { src: "assets/people-safety/17_1790178654339.jpg", alt: "Personal protective equipment prepared for a construction site" },
  { src: "assets/people-safety/21_1790178654344.jpg", alt: "MECPL worker using fall-protection equipment" },
  { src: "assets/people-safety/22_1790178654345.jpg", alt: "Medical professional checking a MECPL worker on site" },
  { src: "assets/people-safety/24_1790178654346.jpg", alt: "Clean accommodation facilities for the MECPL workforce" },
  { src: "assets/people-safety/25_1790178654347.jpg", alt: "MECPL workforce accommodation building" },
  { src: "assets/people-safety/28_1790178654350.jpg", alt: "Medical care being provided to a MECPL worker" },
  { src: "assets/people-safety/29_1790178654351.jpg", alt: "Doctors conducting a health check-up for a MECPL worker" },
];

type SafetyStat = {
  value: string;
  label: string;
};

const teamStats: SafetyStat[] = [
  { value: "8000+", label: "Skilled Workforce" },
  { value: "1000+", label: "Experienced Professionals" },
  { value: "Healthy & Safety Priority", label: "On Site Accommodation, induction and health check-ups" },
  { value: "Training & Development", label: "Continuous Learning" },
  { value: "Recognition", label: "Encouraged Growth" },
];

const hseStats: SafetyStat[] = [
  { value: "100%", label: "PPE Compliance" },
  { value: "School Facility", label: "At Labour Camp" },
  { value: "Regular Health Check-Ups", label: "Medical Professional on Site" },
  { value: "Safety & Vertigo Tests", label: "Healthy Prioritized" },
  { value: "Hygeine Accommodation", label: "Healthy Prioritized" },
];

function ImageCarousel({
  images,
  assetBase,
}: {
  images: CarouselImage[];
  assetBase: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % images.length);
    }, 4000);

    return () => window.clearInterval(timer);
  }, [images.length]);

  return (
    <div className="ps-carousel">
      {images.map((image, index) => (
        <img
          key={image.src}
          src={`${assetBase}${image.src}`}
          alt={image.alt}
          className={`ps-carousel-image ${index === activeIndex ? "is-active" : ""}`}
          loading={index === 0 ? "eager" : "lazy"}
          aria-hidden={index !== activeIndex}
        />
      ))}
      <div className="ps-carousel-dots" aria-label="Carousel navigation">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            className={`ps-carousel-dot ${index === activeIndex ? "is-active" : ""}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Show image ${index + 1} of ${images.length}`}
            aria-current={index === activeIndex ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}

function StatsRow({ stats }: { stats: SafetyStat[] }) {
  return (
    <div className="ps-stats">
      {stats.map(({ value, label }) => (
        <div className="ps-stat" key={`${value}-${label}`}>
          <strong>{value}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

export default function PeopleSafetySection() {
  const assetBase = "/__mockup/images/";

  return (
    <section id="people-safety" data-testid="section-people-safety" className="ps-section">
      <div className="ps-shell">
        <article className="ps-panel ps-panel-team">
          <div className="ps-copy">
            <span className="ps-eyebrow">People &amp; Safety</span>
            <h2 className="people-safety-heading">Our Team Is Our Substance</h2>
            <p style={{ fontSize: "18px" }}>
              Our strength lies in the people who build, engineer and lead every project.
            </p>
            <p style={{ fontSize: "18px" }}>
              From over 8,000 skilled workers on site to experienced engineers, project managers and
              leadership teams, we invest in capability, safety, wellbeing and continuous development
              across the organisation.
            </p>
            <a href="/careers" className="ps-link">
              <span className="ps-button">
                Join Our Team <ArrowRight size={15} />
              </span>
            </a>
          </div>
          <ImageCarousel images={teamImages} assetBase={assetBase} />
          <StatsRow stats={teamStats} />
        </article>

        <article className="ps-panel ps-panel-hse">
          <div className="ps-copy">
            <span className="ps-eyebrow">People &amp; Safety</span>
            <h2 className="people-safety-heading">Building Safer Lives. Not Just Structures.</h2>
            <p style={{ fontSize: "18px" }}>
              We put health, safety and wellbeing at the heart of every site, from safety inductions,
              protective equipment and health checks to hygienic accommodation and food. Beyond the
              workplace, we support education for workers&apos; children and responsible environmental
              practices, helping build safer, healthier communities.
            </p>
            <a href="/about" className="ps-link">
              <span className="ps-button">
                Our Safety Practices <ArrowRight size={15} />
              </span>
            </a>
          </div>
          <ImageCarousel images={hseImages} assetBase={assetBase} />
          <StatsRow stats={hseStats} />
        </article>
      </div>
      <style>{`
        .ps-section {
          position: relative;
          isolation: isolate;
          font-family: var(--app-font-body) !important;
          background-color: #ffffff !important;
          background-image: none !important;
          padding: 0;
          overflow: hidden;
        }
        .ps-section::before {
          display: none;
        }
        .ps-shell {
          width: 100%;
           max-width: none;
          margin: 0 auto;
          display: grid;
          gap: 0;
          background: #ffffff;
          overflow: hidden;
        }
        .ps-panel {
          position: relative;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          grid-template-rows: minmax(0, 1fr) auto;
           min-height: clamp(360px, 31vw, 520px);
          overflow: visible;
          background: #232529;
           box-shadow: none;
        }
        .ps-panel::before {
           display: none;
        }
        .ps-panel-team {
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          grid-template-rows: minmax(0, 1fr) auto;
          background: #ffffff !important;
        }
        .ps-panel-hse {
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          grid-template-rows: minmax(0, 1fr) auto;
          background: #232529;
        }
        .ps-panel-hse::before {
          left: auto;
          right: 0;
        }
        .ps-copy {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-width: 0;
           padding: clamp(48px, 5.5vw, 82px) clamp(30px, 5.6vw, 86px);
          background: #202326;
        }
        .ps-panel-team .ps-copy {
          grid-column: 1;
          grid-row: 1;
          background: #ffffff !important;
        }
        .ps-panel-hse .ps-copy {
          grid-column: 1;
          grid-row: 1;
          background: #232529;
        }
        .ps-eyebrow {
          display: block;
          width: fit-content;
          margin-bottom: 25px;
          padding-bottom: 9px;
          color: #ec3338;
          font-family: var(--app-font-display) !important;
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }
        .ps-copy h2.people-safety-heading {
           max-width: 410px;
          margin: 0 0 21px;
          color: #ffffff;
          font-family: var(--app-font-display) !important;
          font-size: clamp(2rem, 3.45vw, 3.75rem);
          font-weight: 400 !important;
          line-height: 0.98;
          letter-spacing: -0.065em;
          text-transform: none;
        }
        .ps-panel-team .ps-copy h2 {
          color: #232529;
           max-width: 360px;
        }
        .ps-panel-hse .ps-copy h2 {
           max-width: 470px;
          color: #ffffff;
          text-transform: none;
        }
        .ps-copy p {
           max-width: 480px;
          margin: 0 0 31px;
          color: rgba(255, 255, 255, 0.7);
          font-family: var(--app-font-body) !important;
          font-size: 0.76rem;
          line-height: 1.78;
        }
        .ps-panel-team .ps-copy p {
          color: rgba(35, 37, 41, 0.68);
        }
        .ps-quote {
          max-width: 610px;
          margin: 0 0 28px;
          padding-left: 18px;
          border-left: 3px solid #ec3338;
          color: #232529;
          font-family: var(--app-font-display) !important;
          font-size: 0.8rem;
          font-style: italic;
          font-weight: 600;
          line-height: 1.5;
        }
        .ps-panel-hse .ps-copy p {
          color: rgba(255, 255, 255, 0.7);
        }
        .ps-link {
          display: inline-flex;
          width: fit-content;
          color: inherit;
          text-decoration: none;
        }
        .ps-actions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 10px;
        }
        .ps-button {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 34px;
          width: fit-content;
          padding: 14px 17px;
          background: #ec3338;
          color: #fff;
          font-family: var(--app-font-display) !important;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: none;
          cursor: pointer;
          transition: background 180ms ease, color 180ms ease;
        }
        .ps-button:hover {
          background: #ffffff;
          color: #232529;
        }
        .ps-button-secondary .ps-button {
          border: 1px solid rgba(35, 37, 41, 0.2);
          background: transparent;
          color: #232529;
        }
        .ps-button-secondary .ps-button:hover {
          border-color: #ec3338;
          background: #ec3338;
          color: #ffffff;
        }
        .ps-button:focus-visible,
        .ps-carousel-dot:focus-visible {
          outline: 2px solid #ec3338;
          outline-offset: 4px;
        }
        .ps-stats {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          width: 100%;
          margin: 0;
          padding: 18px clamp(24px, 4vw, 64px) 22px;
          border-top: 1px solid rgba(35, 37, 41, 0.12);
          background: #ffffff;
        }
        .ps-panel-team .ps-stats {
          grid-template-columns: repeat(5, minmax(0, 1fr));
          grid-column: 1 / -1;
          grid-row: 2;
        }
        .ps-panel-hse .ps-stats {
          grid-template-columns: repeat(5, minmax(0, 1fr));
          grid-column: 1 / -1;
          grid-row: 2;
          align-self: stretch;
          margin: 0;
        }
        .ps-panel-team .ps-stat {
          border-left-color: rgba(35, 37, 41, 0.16);
        }
        .ps-panel-team .ps-stat-icon {
           display: none;
        }
        .ps-panel-team .ps-stat strong {
           color: #c84b50;
        }
        .ps-panel-team .ps-stat span {
          color: rgba(35, 37, 41, 0.6);
        }
        .ps-panel-hse .ps-stat {
          border-left-color: rgba(35, 37, 41, 0.16);
        }
        .ps-stat strong {
          color: #ffffff;
        }
        .ps-stat span {
          color: rgba(255, 255, 255, 0.58);
        }
        .ps-panel-team .ps-stats {
          margin-top: 0;
        }
        .ps-stat {
          min-width: 0;
          padding: 16px 13px 0;
          text-align: left;
          border-left: 1px solid rgba(255, 255, 255, 0.16);
        }
        .ps-stat:first-child {
          border-left: 0;
          padding-left: 0;
        }
        .ps-stat strong,
        .ps-stat span {
          display: block;
          font-family: var(--app-font-display) !important;
          font-size: clamp(0.95rem, 1.25vw, 1.25rem);
          font-weight: 600;
        }
        .ps-stat-icon {
          display: block;
          margin: 0 0 10px;
          color: #ec3338;
        }
        .ps-stat strong {
          min-height: 27px;
          line-height: 1.22;
        }
        .ps-stat span {
          margin-top: 5px;
          font-size: 0.58rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          line-height: 1.35;
        }
        .ps-panel-hse .ps-stat strong {
          color: #232529;
        }
        .ps-panel-hse .ps-stat span {
          color: rgba(35, 37, 41, 0.6);
        }
        .ps-panel-hse .ps-carousel {
          grid-column: 2;
          grid-row: 1;
          min-height: 0;
          background: #171a1d;
        }
        .ps-panel-hse .ps-carousel::before {
          content: "";
          position: absolute;
          z-index: 1;
          inset: 0;
          border: 1px solid rgba(255, 255, 255, 0.22);
          pointer-events: none;
        }
        .ps-panel-hse .ps-carousel-image {
          z-index: 0;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .ps-panel-hse .ps-carousel-dots {
          right: 24px;
          bottom: 24px;
        }
        .ps-safety-visual {
          position: relative;
          grid-column: 2;
          grid-row: 1;
          min-height: 420px;
          overflow: hidden;
          background:
            linear-gradient(135deg, transparent 49.8%, rgba(255, 255, 255, 0.06) 50%, transparent 50.2%),
            linear-gradient(45deg, transparent 49.8%, rgba(255, 255, 255, 0.04) 50%, transparent 50.2%),
            #232529;
        }
        .ps-safety-visual::before,
        .ps-safety-visual::after {
          content: "";
          position: absolute;
          pointer-events: none;
          background: rgba(236, 51, 56, 0.28);
        }
        .ps-safety-visual::before {
          top: 16%;
          right: 12%;
          width: 1px;
          height: 68%;
        }
        .ps-safety-visual::after {
          top: 50%;
          right: 4%;
          width: 78%;
          height: 1px;
        }
        .ps-safety-index {
          position: absolute;
          top: 26px;
          right: 30px;
          color: #ec3338;
          font-family: var(--font-montserrat);
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.18em;
        }
        .ps-safety-orbit {
          position: absolute;
          top: 50%;
          right: 28%;
          width: clamp(170px, 18vw, 250px);
          aspect-ratio: 1;
          border: 1px solid rgba(255, 255, 255, 0.22);
          border-radius: 50%;
          transform: translate(50%, -50%);
        }
        .ps-safety-orbit-outer {
          box-shadow: 0 0 0 1px rgba(236, 51, 56, 0.22), 0 0 0 20px rgba(236, 51, 56, 0.04);
        }
        .ps-safety-orbit-inner {
          width: clamp(118px, 12vw, 170px);
          border-color: rgba(236, 51, 56, 0.4);
        }
        .ps-safety-crosshair {
          position: absolute;
          background: rgba(236, 51, 56, 0.62);
        }
        .ps-safety-crosshair-horizontal {
          top: 50%;
          right: 9%;
          width: 72%;
          height: 1px;
        }
        .ps-safety-crosshair-vertical {
          top: 19%;
          right: 28%;
          width: 1px;
          height: 62%;
        }
        .ps-safety-label {
          position: absolute;
          top: 50%;
          right: 28%;
          color: rgba(255, 255, 255, 0.62);
          font-family: var(--font-montserrat);
          font-size: 0.58rem;
          font-weight: 600;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          transform: translate(50%, -50%);
        }
        .ps-carousel {
          position: relative;
          z-index: 1;
          grid-column: 2;
          grid-row: 1;
          min-height: 0;
          overflow: hidden;
          background: #171a1d;
        }
        .ps-panel-team .ps-carousel {
          grid-column: 2;
          grid-row: 1;
          order: initial;
          margin: 0;
          background: #232529;
        }
        .ps-panel-team .ps-carousel::before {
          content: "";
          position: absolute;
          z-index: 1;
          inset: 0;
          border: 0;
          pointer-events: none;
        }
        .ps-carousel-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          opacity: 0;
          transform: none;
          transition: opacity 700ms ease;
          will-change: opacity, transform;
        }
        .ps-panel-team .ps-carousel-image {
          z-index: 0;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: none;
        }
        .ps-carousel-image.is-active {
          opacity: 1;
          transform: none;
        }
        .ps-carousel-dots {
          position: absolute;
          z-index: 2;
          right: 18px;
          bottom: 18px;
          display: flex;
          gap: 8px;
          padding: 8px 10px;
          background: rgba(23, 26, 29, 0.58);
          backdrop-filter: blur(8px);
        }
        .ps-carousel-dot {
          width: 7px;
          height: 7px;
          padding: 0;
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          background: transparent;
          cursor: pointer;
          transition: width 180ms ease, background 180ms ease, border-color 180ms ease;
        }
        .ps-carousel-dot.is-active {
          width: 22px;
          border-radius: 10px;
          background: #ec3338;
          border-color: #ec3338;
        }
        @media (min-width: 801px) {
          .ps-section {
            width: 100vw;
            max-width: none;
            margin-left: calc(50% - 50vw);
            margin-right: calc(50% - 50vw);
          }
          .ps-shell {
            max-width: none;
          }
        }
        @media (max-width: 800px) {
          .ps-section {
            padding-inline: 0;
          }
          .ps-panel,
          .ps-panel-hse {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto auto;
            min-height: 0;
            overflow: hidden;
          }
          .ps-copy {
            min-height: 0;
          }
          .ps-panel-team .ps-carousel {
            grid-column: 1;
            grid-row: 2;
            min-height: 0;
            aspect-ratio: 16 / 10;
            margin: 0;
          }
          .ps-panel-team .ps-carousel {
            order: initial;
          }
          .ps-panel-team .ps-stats {
            grid-column: 1;
            grid-row: 3;
          }
          .ps-panel-hse .ps-copy {
            grid-column: 1;
            grid-row: 1;
          }
          .ps-panel-hse .ps-carousel {
            grid-column: 1;
            grid-row: 2;
            min-height: 280px;
          }
          .ps-panel-hse .ps-stats {
            grid-column: 1;
            grid-row: 3;
          }
        }
        @media (max-width: 700px) {
          .ps-section {
            padding: 56px 0;
          }
          .ps-shell {
            width: 100%;
            gap: 56px;
          }
          .ps-copy {
            min-height: 0;
            padding: 38px 22px 34px;
          }
          .ps-copy h2.people-safety-heading {
            max-width: 300px;
            font-size: clamp(2rem, 9vw, 2.85rem);
            letter-spacing: -0.065em;
          }
          .ps-copy p {
            margin-bottom: 28px;
            font-size: 0.7rem;
            line-height: 1.72;
          }
          .ps-stats,
          .ps-panel-team .ps-stats,
          .ps-panel-hse .ps-stats {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            margin: 0;
            padding: 14px 18px 18px;
          }
          .ps-panel-team .ps-stat:nth-child(n + 3) {
            border-top: 1px solid rgba(35, 37, 41, 0.16);
          }
          .ps-panel-hse .ps-stats {
            padding: 18px 18px 20px;
          }
          .ps-stat {
            padding-top: 15px;
          }
          .ps-stat:nth-child(odd),
          .ps-panel-hse .ps-stat:nth-child(odd) {
            border-left: 0;
          }
          .ps-stat:first-child {
            padding-left: 0;
          }
          .ps-carousel {
            min-height: 0;
            aspect-ratio: 4 / 3;
          }
          .ps-carousel-dots {
            right: 12px;
            bottom: 12px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .ps-carousel-image {
            transition: opacity 150ms linear, transform 150ms linear;
          }
        }

        /* Supplied People & Safety reference layout */
        .ps-section {
          background: #ffffff !important;
          padding: 0;
        }
        .ps-shell {
          max-width: none;
          gap: 0;
           background: #ffffff;
        }
        .ps-panel {
          min-height: 0;
          overflow: hidden;
          box-shadow: none;
        }
        .ps-panel-team {
          min-height: clamp(430px, 34vw, 560px);
          background: #ffffff !important;
        }
        .ps-panel-hse {
          min-height: clamp(320px, 25vw, 410px);
          background: #232529 !important;
        }
        .ps-copy {
          padding: clamp(34px, 4vw, 66px) clamp(28px, 5.2vw, 76px);
        }
        .ps-eyebrow {
          margin-bottom: 19px;
          padding-bottom: 7px;
           font-size: 20px;
          letter-spacing: 0.2em;
        }
        .ps-copy h2.people-safety-heading,
        .ps-panel-team .ps-copy h2,
        .ps-panel-hse .ps-copy h2 {
          max-width: 520px;
          margin-bottom: 17px;
          font-size: clamp(1.85rem, 2.7vw, 3rem);
          font-weight: 500 !important;
          line-height: 1.04;
          letter-spacing: -0.055em;
          text-transform: none;
        }
        .ps-panel-team .ps-copy h2 {
          max-width: none;
          white-space: nowrap;
          color: #232529;
        }
        .ps-panel-hse .ps-copy h2 {
          max-width: 520px;
          color: #ffffff;
        }
        .ps-copy p {
          max-width: 560px;
          margin-bottom: 17px;
          font-size: clamp(0.62rem, 0.72vw, 0.78rem);
          line-height: 1.65;
        }
        .ps-panel-team .ps-copy p {
          color: rgba(35, 37, 41, 0.67);
        }
        .ps-quote {
          max-width: 520px;
          margin: 3px 0 20px;
          padding-left: 12px;
          border-left-width: 2px;
          font-size: clamp(0.59rem, 0.68vw, 0.72rem);
          line-height: 1.5;
        }
        .ps-actions {
          gap: 8px;
        }
        .ps-button {
          gap: 13px;
          padding: 10px 12px;
          font-size: 15px;
          letter-spacing: 0.13em;
        }
        .ps-stats {
          grid-template-columns: repeat(5, minmax(0, 1fr));
          padding: 12px clamp(20px, 4vw, 58px) 15px;
          border-top-color: rgba(35, 37, 41, 0.17);
          background: #ffffff;
        }
        .ps-panel-team .ps-stats {
          grid-template-columns: repeat(5, minmax(0, 1fr));
           padding-bottom: 96px;
        }
        .ps-panel-hse .ps-stats {
          grid-template-columns: repeat(5, minmax(0, 1fr));
          padding-bottom: 22px;
        }
        .ps-stat,
        .ps-panel-team .ps-stat,
        .ps-panel-hse .ps-stat {
          min-width: 0;
          align-self: start;
          padding: 8px 12px 0;
          text-align: center;
          border-left: 1px solid rgba(35, 37, 41, 0.44);
        }
        .ps-stat:first-child {
          border-left: 0;
          padding-left: 0;
        }
        .ps-stat-icon {
          display: none !important;
        }
        .ps-stat strong,
        .ps-panel-team .ps-stat strong,
        .ps-panel-hse .ps-stat strong {
          min-height: 0;
          color: #c84b50;
          font-size: 20px;
          font-weight: 500;
          line-height: 1.2;
        }
        .ps-stat span,
        .ps-panel-team .ps-stat span,
        .ps-panel-hse .ps-stat span {
          margin-top: 6px;
          color: rgba(35, 37, 41, 0.61);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.09em;
          line-height: 1.4;
        }
        .ps-carousel {
          min-height: 0;
        }
        .ps-panel-team .ps-carousel,
        .ps-panel-hse .ps-carousel {
          background: #171a1d;
        }
        .ps-panel-team .ps-carousel-image,
        .ps-panel-hse .ps-carousel-image {
          object-fit: cover;
          object-position: center;
        }
        .ps-carousel-dots {
          right: 14px;
          bottom: 14px;
          gap: 6px;
          padding: 6px 8px;
        }
        .ps-carousel-dot {
          width: 6px;
          height: 6px;
        }
        .ps-carousel-dot.is-active {
          width: 19px;
        }
        @media (max-width: 800px) {
          .ps-section {
            padding: 24px 0;
          }
          .ps-shell {
            gap: 0;
          }
          .ps-panel,
          .ps-panel-team,
          .ps-panel-hse {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto auto;
            min-height: 0;
          }
          .ps-copy {
            padding: 32px 22px 28px;
          }
          .ps-copy h2.people-safety-heading,
          .ps-panel-team .ps-copy h2,
          .ps-panel-hse .ps-copy h2 {
            max-width: 330px;
            font-size: clamp(1.8rem, 8.5vw, 2.55rem);
            white-space: normal;
          }
          .ps-copy p {
            max-width: 100%;
            font-size: 0.68rem;
            line-height: 1.7;
          }
          .ps-quote {
            font-size: 0.64rem;
          }
          .ps-panel-team .ps-carousel,
          .ps-panel-hse .ps-carousel {
            grid-column: 1;
            grid-row: 2;
            min-height: 0;
            aspect-ratio: 16 / 10;
          }
          .ps-panel-team .ps-stats,
          .ps-panel-hse .ps-stats,
          .ps-stats {
            grid-column: 1;
            grid-row: 3;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            padding: 10px 14px 14px;
          }
          .ps-stat,
          .ps-panel-team .ps-stat,
          .ps-panel-hse .ps-stat {
            padding: 9px 9px 0;
          }
          .ps-stat:nth-child(odd),
          .ps-panel-hse .ps-stat:nth-child(odd) {
            border-left: 0;
          }
          .ps-stat:nth-child(n + 3) {
            border-top: 1px solid rgba(35, 37, 41, 0.14);
          }
          .ps-stat:first-child {
            padding-left: 0;
          }
          .ps-stat strong,
          .ps-panel-team .ps-stat strong,
          .ps-panel-hse .ps-stat strong {
            font-size: 20px;
          }
          .ps-stat span,
          .ps-panel-team .ps-stat span,
          .ps-panel-hse .ps-stat span {
            font-size: 12px;
          }
        }
      `}</style>
    </section>
  );
}