import { useEffect, useState } from "react";
import {
  ArrowRight,
  Award,
  Building2,
  GraduationCap,
  HeartPulse,
  House,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Link } from "wouter";

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
  Icon: LucideIcon;
};

const teamStats: SafetyStat[] = [
  { value: "8000+", label: "Skilled Workforce", Icon: Users },
  { value: "1000+", label: "Experienced Professionals", Icon: Building2 },
  {
    value: "Health & Safety Priority",
    label: "On Site Accommodation, Induction and Health Check-Ups",
    Icon: HeartPulse,
  },
  { value: "Training & Development", label: "Continuous Learning", Icon: GraduationCap },
  { value: "Recognition", label: "Encouraged Growth", Icon: Award },
];

const hseStats: SafetyStat[] = [
  { value: "100%", label: "PPE Compliance", Icon: ShieldCheck },
  { value: "School Facility", label: "At Labour Camp", Icon: GraduationCap },
  { value: "Regular Health Check-Ups", label: "Medical Professional On Site", Icon: HeartPulse },
  { value: "Safety & Vertigo Tests", label: "Health Prioritized", Icon: Building2 },
  { value: "Hygiene Accommodation", label: "Health Prioritized", Icon: House },
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

function StatsRow({ stats, id }: { stats: SafetyStat[]; id?: string }) {
  return (
    <div id={id} className="ps-stats">
      {stats.map(({ value, label, Icon }) => (
        <div className="ps-stat" key={`${value}-${label}`}>
          <Icon className="ps-stat-icon" size={25} strokeWidth={1.6} aria-hidden="true" />
          <strong>{value}</strong>
          <span className="text-[10px]">{label}</span>
        </div>
      ))}
    </div>
  );
}

export default function PeopleSafetySection() {
  const assetBase = import.meta.env.BASE_URL;

  return (
    <section id="people-safety" data-testid="section-people-safety" className="ps-section">
      <div className="ps-shell">
        <article className="ps-panel ps-panel-team">
          <div className="ps-copy">
            <span className="ps-eyebrow">People &amp; Safety</span>
            <h2 className="people-safety-heading">OUR TEAM IS OUR SUBSTANCE</h2>
            <p className="text-[16px]" style={{ fontSize: "16px" }}>
              Our strength lies in the people who build, engineer and lead every project.
            </p>
            <p className="text-[16px]" style={{ fontSize: "16px" }}>
              From over 8,000 skilled workers on site to experienced engineers, project managers and
              leadership teams, we invest in capability, safety, wellbeing and continuous development
              across the organisation.
            </p>
            <Link href="/careers" className="ps-link">
              <span className="ps-button">
                Join Our Team <ArrowRight size={15} />
              </span>
            </Link>
          </div>
          <ImageCarousel images={teamImages} assetBase={assetBase} />
          <StatsRow stats={teamStats} />
        </article>

        <article className="ps-panel ps-panel-hse">
          <div className="ps-copy">
            <span className="ps-eyebrow">People &amp; Safety</span>
            <h2 className="people-safety-heading">BUILDING SAFER LIVES. NOT JUST STRUCTURES.</h2>
            <p style={{ fontSize: "16px" }}>
              We put health, safety and wellbeing at the heart of every site, from safety inductions,
              protective equipment and health checks to hygienic accommodation and food. Beyond the
              workplace, we support education for workers’ children and responsible environmental
              practices, helping build safer, healthier communities.
            </p>
            <Link href="/about" className="ps-link">
              <span className="ps-button">
                Our Safety Practices <ArrowRight size={15} />
              </span>
            </Link>
          </div>
          <ImageCarousel images={hseImages} assetBase={assetBase} />
          <StatsRow id="people-safety-highlights" stats={hseStats} />
        </article>
      </div>
      <style>{`
        .ps-section {
          position: relative;
          isolation: isolate;
          width: 100%;
          background: transparent;
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
        .ps-panel {
          position: relative;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          grid-template-rows: minmax(0, 1fr) auto;
          min-height: clamp(520px, 54vw, 650px);
          overflow: hidden;
          background: #232529;
        }
        .ps-panel-team {
          --ps-team-content-offset: calc(120px - max(80px, calc(50vw - 600px)));
          grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
          grid-template-rows: minmax(276px, auto) auto;
          width: min(1200px, calc(100% - 160px));
          min-height: 0;
          margin-inline: auto;
          padding: 14px 0 72px;
          overflow: visible;
          background: #ffffff;
        }
        .ps-panel-hse {
          grid-template-rows: minmax(220px, auto) auto;
          min-height: 300px;
          background: #232529;
        }
        .ps-copy {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-width: 0;
          padding: clamp(34px, 4vw, 66px) clamp(28px, 5.2vw, 76px);
          background: #202326;
        }
        .ps-panel-team .ps-copy {
          grid-column: 1;
          grid-row: 1;
          margin-left: var(--ps-team-content-offset);
          padding: 0;
          background: #ffffff;
        }
        .ps-panel-hse .ps-copy {
          grid-column: 1;
          grid-row: 1;
          padding: 48px clamp(28px, 5vw, 60px) 48px 120px;
          background: #232529;
        }
        .ps-eyebrow {
          display: block;
          width: fit-content;
          margin-bottom: 19px;
          padding-bottom: 7px;
          color: #ec3338;
          font-family: var(--font-montserrat);
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        .ps-copy h2.people-safety-heading {
          max-width: 520px;
          margin: 0 0 17px;
          color: #ffffff;
          font-family: var(--font-montserrat);
          font-size: clamp(1.85rem, 2.7vw, 3rem);
          font-weight: 500 !important;
          line-height: 1.04;
          letter-spacing: -0.055em;
          text-transform: none;
        }
        .ps-panel-team .ps-copy h2 {
          max-width: 440px;
          font-size: clamp(1.5rem, 2.4vw, 1.85rem);
          color: #232529;
        }
        .ps-panel-hse .ps-copy h2 {
          max-width: 520px;
          font-size: clamp(1.05rem, 1.7vw, 1.35rem);
          line-height: 1.2;
          color: #ffffff;
          text-transform: none;
        }
        .ps-copy p {
          max-width: 560px;
          margin: 0 0 17px;
          color: rgba(255, 255, 255, 0.7);
          font-family: var(--font-montserrat);
          font-size: clamp(0.72rem, 0.85vw, 0.88rem);
          line-height: 1.7;
        }
        .ps-panel-team .ps-copy p {
          max-width: 700px;
          color: rgba(35, 37, 41, 0.67);
        }
        .ps-panel-hse .ps-copy p {
          color: rgba(255, 255, 255, 0.7);
        }
        .ps-quote {
          max-width: 520px;
          margin: 3px 0 20px;
          padding-left: 14px;
          border-left: 2px solid #ec3338;
          color: #232529;
          font-family: var(--font-montserrat);
          font-size: clamp(0.74rem, 0.84vw, 0.9rem);
          font-style: italic;
          font-weight: 600;
          line-height: 1.5;
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
        .ps-button {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          width: fit-content;
          padding: 11px 13px;
          background: #ec3338;
          color: #fff;
          font-family: var(--font-montserrat);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 180ms ease, color 180ms ease;
        }
        .ps-button:hover {
          background: #232529;
          color: #ffffff;
        }
        .ps-button-secondary .ps-button {
          border: 1px solid rgba(35, 37, 41, 0.22);
          background: #ffffff;
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
          grid-template-columns: repeat(6, minmax(0, 1fr));
          grid-column: 1 / -1;
          grid-row: 2;
          width: 100%;
          margin: 0;
          padding: 18px clamp(20px, 4vw, 58px) 22px;
          border-top: 1px solid rgba(35, 37, 41, 0.17);
          background: #ffffff;
        }
        .ps-panel-team .ps-stats {
          grid-template-columns: repeat(5, minmax(0, 1fr));
          width: calc(100% - var(--ps-team-content-offset));
          margin-left: var(--ps-team-content-offset);
          padding-left: 0;
          padding-right: 0;
          padding-bottom: 16px;
        }
        .ps-panel-hse .ps-stats {
          grid-template-columns: repeat(5, minmax(0, 1fr));
          grid-column: 1 / -1;
          grid-row: 2;
          margin: 0;
          padding-bottom: 22px;
        }
        .ps-stat {
          min-width: 0;
          align-self: start;
          padding: 8px 12px 0;
          text-align: center;
          border-left: 1px solid rgba(35, 37, 41, 0.3);
        }
        .ps-stat:first-child {
          border-left: 0;
          padding-left: 0;
        }
        .ps-stat-icon {
          display: block;
          margin: 0 auto 9px;
          color: #ec3338;
        }
        .ps-panel-team .ps-stat-icon {
          display: none;
        }
        .ps-stat strong,
        .ps-stat span {
          display: block;
          font-family: var(--font-montserrat);
        }
        .ps-stat strong {
          min-height: 0;
          color: #c84b50;
          font-size: clamp(1rem, 1.2vw, 1.25rem);
          font-weight: 500;
          line-height: 1.25;
        }
        .ps-stat span {
          margin-top: 6px;
          color: rgba(35, 37, 41, 0.61);
          font-size: clamp(0.52rem, 0.58vw, 0.65rem);
          font-weight: 500;
          letter-spacing: 0.06em;
          line-height: 1.4;
          text-transform: uppercase;
        }
        .ps-panel-hse .ps-stat:first-child span {
          font-size: 10px;
        }
        .ps-panel-hse .ps-stat strong {
          color: #383a3d;
        }
        .ps-panel-hse .ps-stat-icon {
          width: 16px;
          height: 16px;
          margin-bottom: 5px;
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
        .ps-panel-team .ps-carousel,
        .ps-panel-hse .ps-carousel {
          grid-column: 2;
          grid-row: 1;
          min-height: 0;
        }
        .ps-panel-hse .ps-carousel::before {
          content: "";
          position: absolute;
          z-index: 1;
          inset: 0;
          border: 1px solid rgba(255, 255, 255, 0.22);
          pointer-events: none;
        }
        .ps-carousel-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: opacity 700ms ease;
        }
        .ps-carousel-image.is-active {
          opacity: 1;
        }
        .ps-carousel-dots {
          position: absolute;
          z-index: 2;
          right: 14px;
          bottom: 14px;
          display: flex;
          gap: 6px;
          padding: 6px 8px;
          background: rgba(20, 22, 25, 0.5);
          backdrop-filter: blur(6px);
        }
        .ps-carousel-dot {
          width: 6px;
          height: 6px;
          padding: 0;
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          background: transparent;
          cursor: pointer;
          transition: width 180ms ease, background 180ms ease, border-color 180ms ease;
        }
        .ps-carousel-dot.is-active {
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
            aspect-ratio: 16 / 10;
          }
          .ps-panel-team .ps-stats,
          .ps-panel-hse .ps-stats {
            grid-column: 1;
            grid-row: 3;
            padding: 12px 14px 18px;
          }
        }
        @media (max-width: 700px) {
          .ps-copy h2.people-safety-heading {
            max-width: 330px;
            font-size: clamp(1.8rem, 8.5vw, 2.55rem);
          }
          .ps-copy p {
            max-width: 100%;
            font-size: 0.82rem;
            line-height: 1.7;
          }
          .ps-quote {
            font-size: 0.78rem;
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
          .ps-carousel-dots {
            right: 12px;
            bottom: 12px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .ps-carousel-image {
            transition: opacity 150ms linear;
          }
        }
      `}</style>
    </section>
  );
}