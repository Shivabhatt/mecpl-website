import { useState, useEffect, useRef } from "react";
import { MapPin, Pause, Play } from "lucide-react";
const assetBase = import.meta.env.BASE_URL;

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, inView };
}

const allProjects = [
  // Residential
  { name: "Kingsbury Pride Purple Group", type: "Residential", location: "Charoli, Pune", image: `${assetBase}assets/projects/Kingsbury.jpg` },
  { name: "Gera Song of Joy", type: "Residential", location: "Kharadi, Pune", image: `${assetBase}assets/projects/gera-songs-of-joy-01-large.png` },
  { name: "Godrej Rejuve", type: "Residential", location: "Keshav Nagar, Pune", image: `${assetBase}assets/projects/Rejuve.jpg` },
  { name: "Kalpataru Jade Residences", type: "Residential", location: "Baner, Pune", image: `${assetBase}assets/projects/Kalpataru.jpeg` },
  { name: "Yoo Villas", type: "Residential", location: "Wagholi, Pune", image: `${assetBase}assets/projects/yoovilla-1.png` },
  { name: "Trump Tower", type: "Residential", location: "Kalyani Nagar, Pune", image: `${assetBase}assets/projects/Trump-Tower.jpg` },
  { name: "Godrej Nurture", type: "Residential", location: "Mamurdi, Pune", image: `${assetBase}assets/projects/nurture-scaled.jpg` },
  { name: "Pride Atlantic", type: "Residential", location: "Charholi, Pune", image: `${assetBase}assets/projects/Atlantic.png` },
  { name: "Highrise-Panchshil Tower", type: "Residential", location: "Wagholi, Pune", image: `${assetBase}assets/projects/HIGH-RISE-1-scaled.jpg` },
  { name: "Godrej Forest Grove", type: "Residential", location: "Mamurdi, Pune", image: `${assetBase}assets/projects/Godrej-Forest-grove.jpg` },
  { name: "Godrej Infinity", type: "Residential", location: "Keshav Nagar, Pune", image: `${assetBase}assets/projects/GODREJ-INFINITY.jpg` },
  { name: "Emirus Project", type: "Residential", location: "Balewadi, Pune", image: `${assetBase}assets/projects/Emirus-scaled.jpg` },
  // Commercial
  { name: "Eon West LP II", type: "Commercial", location: "Wakad, Pune", image: `${assetBase}assets/projects/Eonwest.jpg` },
  { name: "Panchshil Tech Park", type: "Commercial", location: "Viman Nagar, Pune", image: `${assetBase}assets/projects/TechPark.jpg` },
  { name: "Gera Commerzone", type: "Commercial", location: "Kharadi, Pune", image: `${assetBase}assets/projects/KRC-scaled-e1700730314593.jpg` },
  { name: "Syntel Phase I & II", type: "Commercial", location: "Talawade IT Park", image: `${assetBase}assets/projects/syntel-03-large.png` },
  { name: "Indira College of Engineering", type: "Commercial", location: "Tathawade, Pune", image: `${assetBase}assets/projects/indira-01-large-1.png` },
  { name: "Golden Bell Complex", type: "Commercial", location: "Mundhwa, Pune", image: `${assetBase}assets/projects/Golden-Bell.jpg` },
  { name: "43 Privet Drive", type: "Commercial", location: "Balewadi, Pune", image: `${assetBase}assets/projects/43PD-1-scaled.jpg` },
  { name: "Connect Project", type: "Commercial", location: "Baudhan, Pune", image: `${assetBase}assets/projects/connect-01.png` },
  // Industrial
  { name: "Mahindra Electric", type: "Industrial", location: "Chakan, Pune", image: `${assetBase}assets/projects/MAHINDRA-1.png` },
  { name: "Praj Industries Ltd.", type: "Industrial", location: "Pirangut, Pune", image: `${assetBase}assets/projects/PRAJ-INDUSTRIES.png` },
  { name: "Amtek Auto Ltd.", type: "Industrial", location: "Sanaswadi, Pune", image: `${assetBase}assets/projects/AMTEK-AUTO-LTD.png` },
  { name: "Bekaert Industries", type: "Industrial", location: "Ranjangaon, Pune", image: `${assetBase}assets/projects/BEKAERT-INDUSTRIES-PVT.LTD_.png` },
  // Special
  { name: "Universal Temple Ramakrishna Math", type: "Special", location: "Pune City Hub", image: `${assetBase}assets/projects/Ramkrishna-Math.jpg` },
];

const filters = ["All", "Residential", "Commercial", "Industrial"];

const typeBadge: Record<string, string> = {
  Residential: "bg-[#C41E3A]/15 text-[#C41E3A] border border-[#C41E3A]/20",
  Commercial: "bg-[#f9f9f9] text-[#6b7280] border border-black/[0.1]",
  Industrial: "bg-[#f9f9f9] text-[#6b7280] border border-black/[0.1]",
  Special: "bg-[#C41E3A]/15 text-[#C41E3A] border border-[#C41E3A]/20",
};

const markerRings = [
  { count: 1, radius: 0 },
  { count: 5, radius: 7 },
  { count: 6, radius: 13 },
  { count: 6, radius: 19 },
  { count: 7, radius: 25 },
];

const getMarkerPosition = (index: number) => {
  let ringOffset = index;

  for (let ringIndex = 0; ringIndex < markerRings.length; ringIndex += 1) {
    const ring = markerRings[ringIndex];
    if (ringOffset < ring.count) {
      const angle = ring.count === 1
        ? 0
        : (ringOffset / ring.count) * Math.PI * 2 - Math.PI / 2 + (ringIndex % 2 ? Math.PI / ring.count : 0);
      return {
        mapX: 48 + Math.cos(angle) * ring.radius,
        mapY: 57 + Math.sin(angle) * ring.radius * 0.82,
      };
    }
    ringOffset -= ring.count;
  }

  return { mapX: 48, mapY: 57 };
};

const explorerProjects = allProjects.map((project, index) => {
  const markerPosition = getMarkerPosition(index);

  return {
    ...project,
    ...markerPosition,
  };
});

export default function CompletedProjectsPage() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? allProjects : allProjects.filter(p => p.type === active);

  useEffect(() => {
    const targetId = window.location.hash.slice(1);
    if (!["projects-grid", "architecture-approach"].includes(targetId)) return;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({ block: "start" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div data-animate-page className="bg-white">
      {/* Project Hero */}
      <div className="relative min-h-screen overflow-hidden bg-[#111827] flex items-center">
        <img
          src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1920&auto=format&fit=crop"
          className="absolute inset-0 h-full w-full object-cover"
          alt="MECPL construction projects"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,10,16,0.88)_0%,rgba(6,10,16,0.68)_48%,rgba(6,10,16,0.38)_100%)]" />
        <div className="absolute inset-0 bg-black/15" />
        <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center px-6 py-24 text-center font-montserrat font-medium">
          <span className="about-label-font font-montserrat font-medium" style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.62rem",
            fontWeight: 700,
            letterSpacing: "0.35em",
            color: "#ffffff",
            textTransform: "uppercase",
            display: "block",
            marginBottom: 20,
          }}>
            OUR PROJECTS
          </span>
          <h1 className="hp-banner-title page-title-font" style={{ margin: "0 0 16px", animation: "heroSlideIn 0.7s ease forwards" }}>
            <div className="hp-banner-line" style={{
              fontSize: "clamp(1.6rem, 4vw, 3.2rem)",
              lineHeight: 1.15,
              color: "#ffffff",
              whiteSpace: "nowrap",
            }}>
              BUILT FOR TOMORROW.
            </div>
          </h1>
          <p className="mt-0 max-w-2xl font-montserrat font-medium text-sm leading-relaxed text-white/75 md:text-base">
            From visionary designs to enduring structures, explore 150+ successful projects across Pune.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-left">
            {[
              ["150+", "Projects Delivered"],
              ["50M+", "Sq. Ft. Delivered"],
              ["25+", "Locations in Pune"],
            ].map(([value, label]) => (
              <div key={label} className="flex items-center gap-2.5">
                <span className="font-montserrat text-2xl font-medium tracking-tight text-white md:text-3xl">{value}</span>
                <span className="max-w-[76px] font-montserrat text-[9px] font-bold uppercase leading-tight tracking-[0.12em] text-white/60">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
       <section className="bg-white px-6 py-12 text-center md:py-16" data-testid="section-projects-intro">
         <p data-scroll-reveal="text" className="mx-auto max-w-3xl font-montserrat text-sm leading-relaxed text-[#6b7280] md:text-base">
           Our portfolio spans residential, commercial, industrial, and special-purpose developments across Pune.
           Each project reflects our commitment to quality construction, thoughtful execution, and lasting value.
         </p>
       </section>
      <ArchitectureApproach />
      <ProjectExplorer />
      {/* Projects Grid */}
      <section id="projects-grid" className="scroll-mt-20 mx-auto max-w-7xl bg-white px-6 py-14" data-testid="section-projects-grid">
        {/* Filters */}
        <div className="sticky top-20 z-30 -mx-6 mb-10 border-b border-black/[0.12] bg-white py-3 md:py-4" data-testid="section-project-filters">
          <div className="mx-auto flex w-full max-w-7xl justify-start overflow-x-auto px-6 font-montserrat sm:justify-center">
            <div className="flex w-full min-w-max items-center justify-between gap-5 font-montserrat sm:min-w-[42rem] sm:gap-8">
              {filters.map(f => (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  aria-pressed={active === f}
                  className={`cursor-pointer whitespace-nowrap py-2 font-montserrat text-[10px] font-bold normal-case tracking-[0.16em] transition-colors duration-300 sm:text-xs lg:text-[14px] ${
                    active === f ? "text-[#C41E3A]" : "text-[#9ca3af] hover:text-[#C41E3A]"
                  }`}
                  data-testid={`button-filter-${f.toLowerCase()}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div>
          {filtered.map((project, i) => (
            <ProjectCard key={`${active}-${i}`} project={project} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}

function ArchitectureApproach() {
  return (
    <section id="architecture-approach" className="scroll-mt-20 bg-white px-6 py-16 md:px-10 md:py-24" data-testid="section-architecture-approach">
      <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:gap-20">
         <div className="font-montserrat lg:pl-10" data-scroll-reveal="text">
          <h2 className="max-w-lg text-[30px] font-medium tracking-[-0.045em] text-[#C41E3A]">
            Architecture
          </h2>
          <div className="mt-8 max-w-md space-y-4 text-sm leading-[1.8] text-[#6f6f69]">
            <p>
              We believe architecture should feel considered from the first line on paper to the final detail on site.
            </p>
            <p>
              Our approach brings together clear structure, honest materials, and the everyday experience of the people
              who inhabit each space.
            </p>
          </div>
          <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9a948b]">
            Form, function, and enduring value
          </p>
        </div>

         <div className="relative mx-auto w-full max-w-[20rem] overflow-hidden bg-[#e6e3dd] lg:mx-0 lg:justify-self-center" data-scroll-reveal="image">
          <img
            src={`${assetBase}assets/projects/Godrej-Emerald-Waters.jpg`}
            className="aspect-[4/5] h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
            alt="Contemporary residential architecture with landscaped surroundings"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}

function ProjectExplorer() {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoPaused, setVideoPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const selectedProject = explorerProjects[selectedIndex] ?? explorerProjects[0];

  useEffect(() => {
    if (window.location.hash !== "#project-explorer") return;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById("project-explorer")?.scrollIntoView({ block: "start" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);
    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || videoFailed || !videoRef.current) return;
    videoRef.current.muted = true;
  }, [prefersReducedMotion, videoFailed]);

  const toggleVideoPlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  };

  return (
    <section
      id="project-explorer"
      className="scroll-mt-20 min-h-screen overflow-hidden bg-white font-montserrat"
      data-testid="section-project-explorer"
      aria-label="MECPL project explorer"
    >
      <div className="grid min-h-screen w-full overflow-hidden bg-[#f7f4ee] lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)]">
          <div className="relative min-h-[58vh] overflow-hidden bg-[#111827] lg:min-h-screen">
            {videoFailed || prefersReducedMotion ? (
              <img
                src={selectedProject.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-cover"
                src={`${assetBase}assets/video/projects-explorer.mp4`}
                poster={selectedProject.image}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                onError={() => setVideoFailed(true)}
                onPause={() => setVideoPaused(true)}
                onPlay={() => setVideoPaused(false)}
                aria-hidden="true"
              />
            )}
            {!videoFailed && !prefersReducedMotion && (
              <button
                type="button"
                onClick={toggleVideoPlayback}
                className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                aria-label={videoPaused ? "Play project video" : "Pause project video"}
              >
                {videoPaused ? <Play size={15} fill="currentColor" /> : <Pause size={15} fill="currentColor" />}
              </button>
            )}
          </div>

          <div className="grid min-h-[42vh] bg-white lg:min-h-screen xl:grid-cols-[minmax(0,0.95fr)_minmax(280px,1.05fr)] xl:grid-rows-[auto_minmax(0,1fr)]">
           <div className="px-6 pb-7 pt-10 font-montserrat sm:px-10 xl:col-span-2 xl:px-12 xl:pb-8 xl:pt-12" data-scroll-reveal="text">
              <h2 className="mt-3 max-w-2xl text-2xl font-medium uppercase leading-tight tracking-[-0.025em] text-primary sm:text-3xl">
                Building with purpose.
              </h2>
              <p className="mt-3 max-w-2xl text-xs leading-relaxed text-black sm:text-sm">
                From residential communities to commercial landmarks, MECPL delivers spaces shaped by precision,
                responsibility, and a long-term view of Pune.
              </p>
            </div>

           <div className="relative min-h-[540px] cursor-pointer overflow-hidden bg-white xl:min-h-0" data-scroll-reveal="image">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_57%,rgba(196,30,58,0.06),transparent_24%),linear-gradient(135deg,#ffffff_0%,#fffdf9_100%)]" />
            <svg
              viewBox="0 0 720 620"
              className="absolute inset-0 h-full w-full scale-[1.6] transform"
              aria-hidden="true"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="india-map-fill" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fbf7f0" />
                  <stop offset="100%" stopColor="#efe5d8" />
                </linearGradient>
                <filter id="projects-map-glow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="12" />
                </filter>
              </defs>
              <rect width="720" height="620" fill="#ffffff" />
              <circle cx="346" cy="354" r="178" fill="none" stroke="#eadfd4" strokeWidth="1.4" strokeDasharray="3 6" />
              <circle cx="346" cy="354" r="125" fill="none" stroke="#e3d5c7" strokeWidth="1.4" strokeDasharray="3 6" />
              <circle cx="346" cy="354" r="76" fill="none" stroke="#dac8b8" strokeWidth="1.4" strokeDasharray="3 6" />
              <path
                d="M347 60 C367 72 388 73 409 89 L430 82 L449 101 L472 111 L494 132 L517 144 L503 165 L475 174 L468 194 L490 219 L515 237 L539 262 L520 279 L492 287 L482 310 L470 331 L458 353 L446 377 L436 403 L422 427 L414 455 L397 492 L380 531 L363 499 L351 469 L332 447 L312 421 L286 408 L259 389 L236 364 L250 343 L273 329 L262 307 L243 289 L256 267 L283 253 L300 227 L320 207 L337 184 L350 161 L344 139 L327 122 L334 101 L322 82 Z"
                fill="url(#india-map-fill)"
                stroke="#c9b8a4"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
              <g fill="none" stroke="#d8c9b8" strokeWidth="1" opacity="0.85">
                <path d="M332 121 C374 148 428 169 475 174" />
                <path d="M300 227 C346 235 422 232 490 219" />
                <path d="M262 307 C326 303 407 315 470 331" />
                <path d="M286 408 C337 382 398 373 446 377" />
                <path d="M350 161 C366 235 365 340 351 469" />
              </g>
              <circle cx="346" cy="354" r="48" fill="#C41E3A" opacity="0.08" filter="url(#projects-map-glow)" />
              <circle cx="346" cy="354" r="18" fill="none" stroke="#C41E3A" strokeWidth="1.5" opacity="0.42" />
              <circle cx="346" cy="354" r="6" fill="#C41E3A" />
            </svg>

            <div className="pointer-events-none absolute inset-0">
              <span className="absolute left-[48%] top-[28%] -translate-x-1/2 font-montserrat text-[9px] font-bold tracking-[0.2em] text-[#C41E3A]">
                Pune
              </span>
            </div>

            <div className="absolute inset-0">
              {explorerProjects.map((project, index) => {
                const selected = index === selectedIndex;
                return (
                  <button
                    key={`${project.name}-${project.location}`}
                    type="button"
                    aria-label={`View ${project.name}, ${project.location}`}
                    aria-pressed={selected}
                    onMouseEnter={() => setSelectedIndex(index)}
                    onFocus={() => setSelectedIndex(index)}
                    onClick={() => setSelectedIndex(index)}
                    className="group absolute z-20 flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C41E3A] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                    style={{ left: `${project.mapX}%`, top: `${project.mapY}%` }}
                  >
                    <span
                      className={`relative flex h-4 w-4 items-center justify-center rounded-full border transition-all duration-300 ${
                        selected
                          ? "scale-150 border-[#C41E3A] bg-[#C41E3A] shadow-[0_0_0_8px_rgba(196,30,58,0.13),0_0_24px_rgba(196,30,58,0.3)]"
                          : "border-[#C41E3A] bg-[#C41E3A] shadow-[0_0_0_4px_rgba(196,30,58,0.08)] group-hover:scale-125"
                      }`}
                    >
                      <span className="h-1 w-1 rounded-full bg-white" />
                    </span>
                  </button>
                );
              })}
            </div>
            </div>

            <article
              className="flex h-full flex-col justify-start bg-white p-5 text-[#1f2933] sm:p-6"
              aria-live="polite"
              data-testid="project-map-detail-card"
            >
               <div className="relative mb-5 h-96 shrink-0 overflow-hidden bg-[#eee8dd] sm:h-[28rem] xl:h-[56vh]" data-scroll-reveal="image">
                <img
                  src={selectedProject.image}
                  alt={`${selectedProject.name} project`}
                  className="h-full w-full object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              </div>

              <div className="mt-auto">
                <h3 className="mt-2 text-xl font-medium leading-tight tracking-[-0.02em] text-[#1f2933]">
                  {selectedProject.name}
                </h3>
                <p className="mt-2 flex items-center gap-2 text-[11px] text-[#7b746b]">
                  <MapPin size={12} className="shrink-0 text-[#C41E3A]" />
                  {selectedProject.location}
                </p>

                <dl className="mt-5 grid grid-cols-[78px_1fr] gap-x-4 gap-y-2 border-t border-[#e9e2d8] pt-4 text-[10px]">
                  <dt className="uppercase tracking-[0.12em] text-[#a49a8c]">Location</dt>
                  <dd className="text-[#5d5a55]">{selectedProject.location}</dd>
                  <dt className="uppercase tracking-[0.12em] text-[#a49a8c]">Portfolio</dt>
                  <dd className="text-[#5d5a55]">MECPL Projects</dd>
                </dl>
              </div>
            </article>
          </div>
        </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: (typeof allProjects)[number]; index: number }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const delay = (index % 3) * 90;
  const projectNumber = String(index + 1).padStart(2, "0");

  return (
    <div
      ref={ref}
      className="group relative border-b border-black/[0.12] py-6 transition-colors duration-500 hover:bg-white/60 md:py-8"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms, background-color 0.4s ease`,
      }}
      data-testid={`card-project-${index}`}
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(220px,0.72fr)_minmax(0,1.28fr)] lg:items-center lg:gap-10">
        <div className="flex min-h-[180px] flex-col justify-between font-montserrat lg:min-h-[220px]">
          <div>
            <div className="mb-5 flex items-center gap-4 text-[9px] font-bold normal-case tracking-[0.2em] text-[#8d8d87]">
              <span className="text-[#111111]">{projectNumber}</span>
              <span className="h-px w-8 bg-[#c7c7c1]" />
              <span>{project.type}</span>
            </div>
            <h3 className="max-w-sm text-2xl font-medium leading-[0.98] tracking-[-0.045em] text-[#111111] md:text-3xl">
              {project.name}
            </h3>
            <div className="mt-5 flex items-center gap-2 text-[10px] normal-case tracking-[0.16em] text-[#777772]">
              <MapPin size={12} className="text-[#C41E3A]" />
              <span>{project.location}</span>
            </div>
          </div>

        </div>

        <div className="grid h-52 grid-cols-[minmax(0,1.55fr)_minmax(110px,0.85fr)] gap-2 overflow-hidden sm:h-60 md:h-64">
          <div className="relative overflow-hidden border-b-2 border-[#c9c9c3] bg-[#deded9]">
            <img
              src={project.image}
              className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
              alt={`${project.name} primary view`}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
          </div>
          <div className="relative overflow-hidden border-b-2 border-[#c9c9c3] bg-[#deded9]">
            <img
              src={project.image}
              className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
              style={{ objectPosition: "72% center" }}
              alt={`${project.name} detail view`}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
