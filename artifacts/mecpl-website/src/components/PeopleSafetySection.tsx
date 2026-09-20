import { useEffect, useState } from "react";
import {
  ArrowRight,
  Award,
  BookOpen,
  Building2,
  GraduationCap,
  HardHat,
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
  { src: "assets/people-safety/team-safety-induction.jpg", alt: "MECPL workforce gathered for a safety induction" },
  { src: "assets/people-safety/team-recreation.jpg", alt: "MECPL team members taking part in recreational activities" },
  { src: "assets/people-safety/team-education.jpg", alt: "Education support for MECPL workforce families" },
];

const hseImages: CarouselImage[] = [
  { src: "assets/people-safety/hse-health-checkups.jpg", alt: "Regular health check-up for an MECPL site worker" },
  { src: "assets/people-safety/hse-safety-equipment.jpg", alt: "Personal protective equipment provided for site safety" },
  { src: "assets/people-safety/hse-safety-induction.jpg", alt: "Safety induction for MECPL site workers" },
  { src: "assets/people-safety/hse-labour-verification.jpg", alt: "Labour identity verification at an MECPL site" },
  { src: "assets/people-safety/hse-accommodation.jpg", alt: "Safe accommodation provided for the MECPL workforce" },
];

type SafetyStat = {
  value: string;
  label: string;
  Icon: LucideIcon;
};

const teamStats: SafetyStat[] = [
  { value: "8000+", label: "Skilled Workforce", Icon: Users },
  { value: "1000+", label: "Experienced Professionals", Icon: HardHat },
  { value: "Training & Development", label: "Continuous Learning", Icon: BookOpen },
  { value: "Recognition", label: "Encouraged Growth", Icon: Award },
];

const hseStats: SafetyStat[] = [
  { value: "100%", label: "PPE Compliance", Icon: ShieldCheck },
  { value: "School Facility", label: "At Labour Camp", Icon: GraduationCap },
  { value: "Regular Health Check-Ups", label: "Medical Professional On Site", Icon: HeartPulse },
  { value: "Safety & Vertigo Tests", label: "Health Prioritized", Icon: Building2 },
  { value: "Hygiene Accommodation", label: "Wellbeing Prioritized", Icon: House },
];

function ImageCarousel({
  images,
  assetBase,
  reversed = false,
}: {
  images: CarouselImage[];
  assetBase: string;
  reversed?: boolean;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % images.length);
    }, 4000);

    return () => window.clearInterval(timer);
  }, [images.length]);

  return (
    <div className={`ps-carousel ${reversed ? "ps-carousel-reversed" : ""}`}>
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
      {stats.map(({ value, label, Icon }) => (
        <div className="ps-stat" key={`${value}-${label}`}>
          <Icon className="ps-stat-icon" size={25} strokeWidth={1.6} aria-hidden="true" />
          <strong>{value}</strong>
          <span>{label}</span>
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
            <h2 className="people-safety-heading">Our Team Is Our Substance</h2>
            <p>
              Our strength lies in the people who build, engineer and lead every project. From over
              8,000 skilled workers on site to experienced engineers, project managers and leadership
              teams, we invest in capability, safety, wellbeing and continuous development across the
              organisation.
            </p>
            <StatsRow stats={teamStats} />
            <Link href="/careers">
              <span className="ps-button">
                Meet Our Team <ArrowRight size={15} />
              </span>
            </Link>
          </div>
          <ImageCarousel images={teamImages} assetBase={assetBase} />
        </article>

        <article className="ps-panel ps-panel-hse">
          <ImageCarousel images={hseImages} assetBase={assetBase} reversed />
          <div className="ps-copy">
            <span className="ps-eyebrow">People &amp; Safety</span>
            <h2 className="people-safety-heading">Building Safer Lives. Not Just Structures.</h2>
            <p>
              We put health, safety and wellbeing at the heart of every site, from safety inductions,
              protective equipment and health checks to hygienic accommodation and food. Beyond the
              workplace, we support education for workers&apos; children and responsible environmental
              practices, helping build safer, healthier communities.
            </p>
            <StatsRow stats={hseStats} />
            <Link href="/about">
              <span className="ps-button">
                Our Safety Practices <ArrowRight size={15} />
              </span>
            </Link>
          </div>
        </article>
      </div>
      <style>{`
        .ps-section {
          background: transparent;
          padding: 64px 0;
          overflow: hidden;
        }
        .ps-shell {
          width: min(1320px, calc(100% - 48px));
          margin: 0 auto;
          display: grid;
          gap: 0;
          overflow: hidden;
          background: #202326;
          box-shadow: 0 22px 54px rgba(23, 27, 31, 0.2);
        }
        .ps-panel {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.08fr);
          min-height: 430px;
          overflow: hidden;
          background: transparent;
        }
        .ps-panel-team {
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
        }
        .ps-panel-hse {
          grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
        }
        .ps-copy {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(32px, 4vw, 58px);
          background: #202326;
        }
        .ps-eyebrow {
          display: block;
          width: fit-content;
          margin-bottom: 16px;
          padding-bottom: 9px;
          color: #ec3338;
          border-bottom: 2px solid #ec3338;
          font-family: var(--font-montserrat);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }
        .ps-copy h2.people-safety-heading {
          max-width: 610px;
          margin: 0 0 15px;
          color: #ffffff;
          font-family: var(--font-montserrat);
          font-size: clamp(1.65rem, 2.3vw, 2.45rem);
          font-weight: 400 !important;
          line-height: 1.08;
          letter-spacing: -0.035em;
          text-transform: none;
        }
        .ps-panel-hse .ps-copy h2 {
          max-width: 560px;
          color: #ffffff;
          text-transform: none;
        }
        .ps-copy p {
          max-width: 630px;
          margin: 0 0 22px;
          color: rgba(255, 255, 255, 0.7);
          font-family: var(--font-montserrat);
          font-size: 14px;
          line-height: 1.65;
        }
        .ps-button {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
          width: fit-content;
          margin-bottom: 26px;
          padding: 12px 16px;
          background: #ec3338;
          color: #fff;
          font-family: var(--font-montserrat);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 180ms ease;
        }
        .ps-button:hover {
          background: #232529;
        }
        .ps-stats {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          width: 100%;
          margin-top: auto;
          padding-top: 6px;
        }
        .ps-panel-hse .ps-stats {
          grid-template-columns: repeat(5, minmax(0, 1fr));
          margin: 4px 0 25px;
        }
        .ps-panel-hse .ps-stat {
          border-left-color: rgba(255, 255, 255, 0.16);
        }
        .ps-stat strong {
          color: #ffffff;
        }
        .ps-stat span {
          color: rgba(255, 255, 255, 0.58);
        }
        .ps-panel-team .ps-stats {
          margin: 4px 0 25px;
        }
        .ps-stat {
          min-width: 0;
          padding: 5px 13px;
          text-align: center;
          border-left: 1px solid rgba(255, 255, 255, 0.16);
        }
        .ps-stat:first-child {
          border-left: 0;
          padding-left: 0;
        }
        .ps-stat strong,
        .ps-stat span {
          display: block;
          font-family: var(--font-montserrat);
        }
        .ps-stat-icon {
          display: block;
          margin: 0 auto 9px;
          color: #ec3338;
        }
        .ps-stat strong {
          min-height: 34px;
          font-size: clamp(0.68rem, 0.85vw, 0.86rem);
          font-weight: 700;
          line-height: 1.22;
        }
        .ps-stat span {
          margin-top: 5px;
          font-size: clamp(0.52rem, 0.62vw, 0.65rem);
          font-weight: 500;
          line-height: 1.35;
        }
        .ps-carousel {
          position: relative;
          min-height: 430px;
          overflow: hidden;
          background: #171a1d;
        }
        .ps-carousel-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transform: scale(1.025);
          transition: opacity 700ms ease, transform 4.8s ease;
        }
        .ps-carousel-image.is-active {
          opacity: 1;
          transform: scale(1);
        }
        .ps-carousel-dots {
          position: absolute;
          z-index: 2;
          right: 24px;
          bottom: 20px;
          display: flex;
          gap: 8px;
          padding: 8px 10px;
          background: rgba(20, 22, 25, 0.42);
          backdrop-filter: blur(5px);
        }
        .ps-carousel-dot {
          width: 7px;
          height: 7px;
          padding: 0;
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          background: transparent;
          cursor: pointer;
          transition: width 180ms ease, background 180ms ease;
        }
        .ps-carousel-dot.is-active {
          width: 22px;
          border-radius: 10px;
          background: #ec3338;
          border-color: #ec3338;
        }
        @media (max-width: 1100px) {
          .ps-panel,
          .ps-panel-hse {
            grid-template-columns: 1fr;
          }
          .ps-panel-hse .ps-carousel {
            order: 2;
          }
          .ps-panel-hse .ps-copy {
            order: 1;
          }
          .ps-carousel {
            min-height: 0;
            aspect-ratio: 16 / 9;
          }
        }
        @media (max-width: 700px) {
          .ps-section {
            padding: 28px 0;
          }
          .ps-shell {
            width: calc(100% - 24px);
          }
          .ps-copy {
            padding: 32px 22px;
          }
          .ps-copy h2.people-safety-heading {
            font-size: 1.75rem;
          }
          .ps-copy p {
            font-size: 13px;
            line-height: 1.65;
          }
          .ps-stats,
          .ps-panel-hse .ps-stats {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 20px 0;
          }
          .ps-stat:nth-child(odd) {
            border-left: 0;
          }
          .ps-stat:first-child {
            padding-left: 13px;
          }
          .ps-carousel {
            min-height: 0;
            aspect-ratio: 16 / 9;
          }
          .ps-carousel-dots {
            right: 14px;
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