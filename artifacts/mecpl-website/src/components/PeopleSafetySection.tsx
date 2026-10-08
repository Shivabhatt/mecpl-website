import { useEffect, useState } from "react";
import { sentenceCase } from "@/lib/typography";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

type CarouselImage = {
  src: string;
  alt: string;
};

const teamImages: CarouselImage[] = [
  { src: "assets/people-safety/18_1790178654341.jpg", alt: "MECPL workforce gathered together on site" },
  { src: "assets/people-safety/27_1790178654349.jpg", alt: "Children taking part in a supported classroom lesson" },
  { src: "assets/people-safety/26_1790178654348.jpg", alt: "Children receiving education support at a MECPL labour camp" },
  { src: "assets/people-safety/23_1790178654345.jpg", alt: "MECPL team members taking part in recreational activities" },
];

const hseImages: CarouselImage[] = [
  { src: "assets/people-safety/19_1790178654342.jpg", alt: "MECPL workers attending a safety induction" },
  { src: "assets/people-safety/20_1790178654343.jpg", alt: "MECPL workers completing site entry verification" },
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
          <span className="ps-section-kicker">People &amp; safety</span>
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
            <Link href="/about" className="ps-link">
              <span className="ps-button mecpl-role-button">
                Our safety practices <ArrowRight size={15} />
              </span>
            </Link>
          </div>
          <ImageCarousel images={hseImages} assetBase={assetBase} />
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
            <Link href="/careers" className="ps-link">
              <span className="ps-button mecpl-role-button">
                Join our team <ArrowRight size={15} />
              </span>
            </Link>
          </div>
          <ImageCarousel images={teamImages} assetBase={assetBase} />
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
          color: #cb777d;
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
        .ps-button {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          width: fit-content;
          padding: 11px 13px;
          background: #ec3338;
          color: #fff;
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
          background: #171a1d;
        }
        .ps-panel-team .ps-carousel,
        .ps-panel-hse .ps-carousel {
          grid-column: 2;
          grid-row: 1;
          min-height: 0;
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