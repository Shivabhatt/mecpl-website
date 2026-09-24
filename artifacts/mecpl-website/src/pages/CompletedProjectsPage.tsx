import { useState, useEffect, useRef } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { ongoingProjects } from "@/pages/OngoingProjectsPage";
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

const completedProjects = [
  // Residential
  { name: "Kingsbury Pride Purple Group", type: "Residential", location: "Charoli, Pune", image: `${assetBase}assets/projects/Kingsbury.jpg` },
  { name: "Gera Song of Joy", type: "Residential", location: "Kharadi, Pune", image: `${assetBase}assets/projects/gera-songs-of-joy-01-large.webp` },
  { name: "Godrej Rejuve", type: "Residential", location: "Keshav Nagar, Pune", image: `${assetBase}assets/projects/Rejuve.jpg` },
  { name: "Kalpataru Jade Residences", type: "Residential", location: "Baner, Pune", image: `${assetBase}assets/projects/Kalpataru.jpeg` },
  { name: "Yoo Villas", type: "Residential", location: "Wagholi, Pune", image: `${assetBase}assets/projects/yoovilla-1.webp` },
  { name: "Trump Tower", type: "Residential", location: "Kalyani Nagar, Pune", image: `${assetBase}assets/projects/Trump-Tower.jpg` },
  { name: "Godrej Nurture", type: "Residential", location: "Mamurdi, Pune", image: `${assetBase}assets/projects/nurture-scaled.jpg` },
  { name: "Pride Atlantic", type: "Residential", location: "Charholi, Pune", image: `${assetBase}assets/projects/Atlantic.webp` },
  { name: "Highrise-Panchshil Tower", type: "Residential", location: "Wagholi, Pune", image: `${assetBase}assets/projects/HIGH-RISE-1-scaled.jpg` },
  { name: "Godrej Forest Grove", type: "Residential", location: "Mamurdi, Pune", image: `${assetBase}assets/projects/Godrej-Forest-grove.jpg` },
  { name: "Godrej Infinity", type: "Residential", location: "Keshav Nagar, Pune", image: `${assetBase}assets/projects/GODREJ-INFINITY.jpg` },
  { name: "Emirus Project", type: "Residential", location: "Balewadi, Pune", image: `${assetBase}assets/projects/Emirus-scaled.jpg` },
  // Commercial
  { name: "Eon West LP II", type: "Commercial", location: "Wakad, Pune", image: `${assetBase}assets/projects/Eonwest.jpg` },
  { name: "Panchshil Tech Park", type: "Commercial", location: "Viman Nagar, Pune", image: `${assetBase}assets/projects/TechPark.jpg` },
  { name: "Gera Commerzone", type: "Commercial", location: "Kharadi, Pune", image: `${assetBase}assets/projects/KRC-scaled-e1700730314593.jpg` },
  { name: "Syntel Phase I & II", type: "Commercial", location: "Talawade IT Park", image: `${assetBase}assets/projects/syntel-03-large.webp` },
  { name: "Indira College of Engineering", type: "Commercial", location: "Tathawade, Pune", image: `${assetBase}assets/projects/indira-01-large-1.webp` },
  { name: "Golden Bell Complex", type: "Commercial", location: "Mundhwa, Pune", image: `${assetBase}assets/projects/Golden-Bell.jpg` },
  { name: "43 Privet Drive", type: "Commercial", location: "Balewadi, Pune", image: `${assetBase}assets/projects/43PD-1-scaled.jpg` },
  { name: "Connect Project", type: "Commercial", location: "Baudhan, Pune", image: `${assetBase}assets/projects/connect-01.webp` },
  // Industrial
  { name: "Mahindra Electric", type: "Industrial", location: "Chakan, Pune", image: `${assetBase}assets/projects/MAHINDRA-1.webp` },
  { name: "Praj Industries Ltd.", type: "Industrial", location: "Pirangut, Pune", image: `${assetBase}assets/projects/PRAJ-INDUSTRIES.webp` },
  { name: "Amtek Auto Ltd.", type: "Industrial", location: "Sanaswadi, Pune", image: `${assetBase}assets/projects/AMTEK-AUTO-LTD.webp` },
  { name: "Bekaert Industries", type: "Industrial", location: "Ranjangaon, Pune", image: `${assetBase}assets/projects/BEKAERT-INDUSTRIES-PVT.LTD_.webp` },
  // Special
  { name: "Universal Temple Ramakrishna Math", type: "Special", location: "Pune City Hub", image: `${assetBase}assets/projects/Ramkrishna-Math.jpg` },
];

const allProjects = [
  ...completedProjects,
  ...ongoingProjects.map((project) => ({
    name: project.name,
    type: "Ongoing Projects",
    location: project.location,
    image: project.image,
  })),
];

const filters = ["All", "Residential", "Commercial", "Industrial", "Ongoing Projects"];

const typeBadge: Record<string, string> = {
  Residential: "bg-[#C41E3A]/15 text-[#C41E3A] border border-[#C41E3A]/20",
  Commercial: "bg-[#f9f9f9] text-[#6b7280] border border-black/[0.1]",
  Industrial: "bg-[#f9f9f9] text-[#6b7280] border border-black/[0.1]",
  "Ongoing Projects": "bg-[#C41E3A]/15 text-[#C41E3A] border border-[#C41E3A]/20",
  Special: "bg-[#C41E3A]/15 text-[#C41E3A] border border-[#C41E3A]/20",
};

const areaCoordinates: Record<string, { mapX: number; mapY: number }> = {
  "Charoli, Pune": { mapX: 63, mapY: 46 },
  "Kharadi, Pune": { mapX: 68, mapY: 57 },
  "Keshav Nagar, Pune": { mapX: 64, mapY: 61 },
  "Baner, Pune": { mapX: 51, mapY: 57 },
  "Wagholi, Pune": { mapX: 72, mapY: 54 },
  "Kalyani Nagar, Pune": { mapX: 65, mapY: 55 },
  "Mamurdi, Pune": { mapX: 50, mapY: 47 },
  "Charholi, Pune": { mapX: 64, mapY: 46 },
  "Balewadi, Pune": { mapX: 53, mapY: 54 },
  "Wakad, Pune": { mapX: 54, mapY: 49 },
  "Viman Nagar, Pune": { mapX: 67, mapY: 53 },
  "Talawade IT Park": { mapX: 51, mapY: 44 },
  "Tathawade, Pune": { mapX: 51, mapY: 50 },
  "Mundhwa, Pune": { mapX: 65, mapY: 63 },
  "Baudhan, Pune": { mapX: 49, mapY: 63 },
  "Chakan, Pune": { mapX: 59, mapY: 39 },
  "Pirangut, Pune": { mapX: 45, mapY: 66 },
  "Sanaswadi, Pune": { mapX: 75, mapY: 61 },
  "Ranjangaon, Pune": { mapX: 81, mapY: 65 },
  "Pune City Hub": { mapX: 59, mapY: 60 },
};

const explorerProjects = allProjects.map((project, index) => {
  const markerPosition = areaCoordinates[project.location] ?? { mapX: 52, mapY: 58 };
  const duplicateOffset = (index % 3) - 1;

  return {
    ...project,
    mapX: markerPosition.mapX + duplicateOffset * 1.25,
    mapY: markerPosition.mapY + duplicateOffset * 0.8,
  };
});

export default function CompletedProjectsPage() {
  const [active, setActive] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 4;
  const filtered = active === "All" ? allProjects : allProjects.filter(p => p.type === active);
  const totalPages = Math.ceil(filtered.length / projectsPerPage);
  const visibleProjects = filtered.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage,
  );

  const selectFilter = (filter: string) => {
    setActive(filter);
    setCurrentPage(1);
  };

  const selectPage = (page: number) => {
    setCurrentPage(page);
    document.getElementById("projects-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const targetId = window.location.hash.slice(1);
    if (!["project-metrics", "projects-grid", "architecture-approach"].includes(targetId)) return;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({ block: "start" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div data-animate-page className="completed-projects-page bg-white font-montserrat">
      {/* Project Hero */}
      <div className="relative min-h-screen overflow-hidden bg-[#111827] flex items-center">
        <img
          src="/assets/projects/HIGH-RISE-1-scaled.jpg"
          className="absolute inset-0 h-full w-full object-cover"
          alt="MECPL construction projects"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,10,16,0.88)_0%,rgba(6,10,16,0.68)_48%,rgba(6,10,16,0.38)_100%)]" />
        <div className="absolute inset-0 bg-black/15" />
        <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center px-6 py-24 text-center font-montserrat font-medium">
          <span className="about-label-font font-montserrat font-medium text-[18px]" style={{
              fontFamily: "Montserrat",
            fontSize: "18px",
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
            <div className="hp-banner-line text-[35px]" style={{
              fontSize: "clamp(18px, 3.5vw, 35px)",
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
        </div>
      </div>
      {/* Awards and industry recognition */}
      <section
        id="project-awards"
        className="bg-white px-6 py-8 font-montserrat md:py-10"
        data-testid="section-project-awards"
        aria-label="Awards and industry recognition"
      >
        <div className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">
          {[
            {
              src: "/assets/awards/bai-well-built-structure-award.png",
              alt: "Builders' Association of India Well Built Structure Award",
              title: "Well Built Structure Awards for Quality",
              count: "13 Projects Awarded",
            },
            {
              src: "/assets/awards/cidc-vishwakarma-award-2026.png",
              alt: "CIDC Vishwakarma Award emblem",
              title: "CIDC Vishwakarma Awards",
              count: "4 Projects Awarded",
            },
            {
              src: "/assets/awards/nsci-safety-award-2025.png",
              alt: "National Safety Council of India safety award logo",
              title: "NSCI Safety Awards",
              count: "4 Projects Awarded",
            },
            {
              src: "/assets/awards/pcerf-safety-award.png",
              alt: "PCER safety award logo",
              title: "PCER Safety Awards",
              count: "11 Projects Awarded",
            },
          ].map((award, index) => (
            <div
              key={award.title}
              className={`flex min-h-[150px] flex-col items-center justify-center px-4 py-6 text-center ${
                index % 2 === 1 ? "border-l border-black/[0.08]" : ""
              } ${index < 2 ? "border-b border-black/[0.08]" : ""} ${
                index > 0 ? "md:border-l md:border-black/[0.08]" : "md:border-l-0"
              } md:border-b-0`}
            >
              <div className="recognition-mark-frame">
                <img
                  src={award.src}
                  alt={award.alt}
                  className="recognition-mark-image"
                  loading="lazy"
                />
              </div>
              <div className="mt-3 max-w-[256px]">
                <span className="block font-montserrat text-[12px] font-semibold leading-[1.3] tracking-[0.015em] text-[#73777d]">
                  {award.title}
                </span>
                <span className="mt-1 block font-montserrat text-[11px] font-medium leading-[1.3] tracking-[0.04em] text-[#73777d]">
                  {award.count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Project metrics */}
      <section
        id="project-metrics"
        className="bg-[#232529] px-6 py-11 font-montserrat md:py-14"
        data-testid="section-project-metrics"
        aria-label="Project delivery metrics"
      >
        <div className="mx-auto grid max-w-5xl grid-cols-1 sm:grid-cols-3">
          {[
            { value: "150", suffix: "+", label: "Projects Delivered" },
            { value: "50M", suffix: "+", label: "Sq. Ft. Delivered" },
            { value: "25", suffix: "+", label: "Locations in Pune" },
          ].map((metric, index) => (
            <div
              key={metric.label}
              className={`flex min-h-[112px] flex-col items-center justify-center px-6 py-5 text-center ${
                index > 0 ? "border-t border-white/10 sm:border-l sm:border-t-0" : ""
              }`}
            >
              <div className="flex items-baseline justify-center">
                <span className="text-[2.25rem] font-medium leading-none tracking-[-0.045em] text-white md:text-[2.75rem]">
                  {metric.value}
                </span>
                <span className="ml-1 text-[1.8rem] font-medium leading-none text-[#EC3338] md:text-[2.15rem]">
                  {metric.suffix}
                </span>
              </div>
              <span className="mt-3 text-[8px] font-semibold uppercase leading-tight tracking-[0.2em] text-white/45 md:text-[9px]">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-white px-6 py-12 text-center md:py-16" data-testid="section-projects-intro">
        <p data-scroll-reveal="text" className="mx-auto max-w-3xl font-montserrat text-sm leading-relaxed text-[#6b7280] md:text-base">
          Our portfolio spans residential, commercial, industrial, and special-purpose developments across Pune.
          Each project reflects our commitment to quality construction, thoughtful execution, and lasting value.
        </p>
      </section>
      <ArchitectureApproach />
      <ProjectExplorer />
      {/* Sticky project filters */}
      <div className="sticky top-0 z-40 border-b border-black/[0.12] bg-white py-3 shadow-[0_4px_14px_rgba(0,0,0,0.04)] md:py-4" data-testid="section-project-filters">
        <div className="mx-auto flex w-full max-w-7xl justify-start overflow-x-auto px-6 font-montserrat sm:justify-center">
          <div className="grid w-full grid-cols-5 items-center gap-1 font-montserrat sm:min-w-[42rem] sm:gap-8">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => selectFilter(f)}
                aria-pressed={active === f}
                className={`cursor-pointer whitespace-normal px-1 py-2 text-center font-montserrat text-[8px] font-bold normal-case leading-tight tracking-[0.1em] transition-colors duration-300 sm:text-xs sm:tracking-[0.16em] lg:text-[14px] ${
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
      {/* Projects Grid */}
      <section id="projects-grid" className="scroll-mt-16 mx-auto max-w-7xl bg-white px-6 py-14" data-testid="section-projects-grid">
        <div>
          {visibleProjects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={(currentPage - 1) * projectsPerPage + i} />
          ))}
        </div>
        {totalPages > 1 && (
          <nav className="mt-12 flex flex-wrap items-center justify-center gap-2 border-t border-black/[0.08] pt-8 font-montserrat" aria-label="Project pages">
            <button
              type="button"
              onClick={() => selectPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-10 border border-black/[0.12] px-4 text-[10px] font-bold uppercase tracking-[0.14em] text-[#4d4f54] transition-colors hover:border-[#C41E3A] hover:text-[#C41E3A] disabled:cursor-not-allowed disabled:opacity-30"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
              <button
                key={page}
                type="button"
                onClick={() => selectPage(page)}
                aria-current={currentPage === page ? "page" : undefined}
                className={`h-10 min-w-10 border px-3 text-xs font-bold transition-colors ${
                  currentPage === page
                    ? "border-[#C41E3A] bg-[#C41E3A] text-white"
                    : "border-black/[0.12] text-[#6b7280] hover:border-[#C41E3A] hover:text-[#C41E3A]"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              onClick={() => selectPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-10 border border-black/[0.12] px-4 text-[10px] font-bold uppercase tracking-[0.14em] text-[#4d4f54] transition-colors hover:border-[#C41E3A] hover:text-[#C41E3A] disabled:cursor-not-allowed disabled:opacity-30"
            >
              Next
            </button>
          </nav>
        )}
      </section>
    </div>
  );
}

function ArchitectureApproach() {
  return (
    <section id="architecture-approach" className="scroll-mt-20 overflow-visible bg-white px-6 py-20 md:px-10 md:py-28" data-testid="section-architecture-approach">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-0">
        <div className="relative z-10 max-w-xl lg:py-10 lg:pr-16" data-scroll-reveal="text">
          <span className="mb-5 block font-montserrat text-[10px] font-bold uppercase tracking-[0.22em] text-[#EC3338]">
            Architectural Approach
          </span>
          <h2 className="max-w-md font-montserrat text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.08] tracking-[-0.045em] text-[#232529]">
            Architecture that feels considered.
          </h2>
          <div className="mt-7 max-w-md space-y-4 text-sm leading-[1.85] text-[#232529]">
            <p>
              We believe architecture should feel considered from the first line on paper to the final detail on site.
            </p>
            <p>
              Our approach brings together clear structure, honest materials, and the everyday experience of the people
              who inhabit each space.
            </p>
          </div>
          <p className="mt-8 font-montserrat text-[10px] font-bold uppercase tracking-[0.2em] text-[#949599]">
            Form, function, and enduring value
          </p>
          <a
            href="#project-explorer"
            className="mt-8 inline-flex items-center gap-3 font-montserrat text-[10px] font-bold uppercase tracking-[0.2em] text-[#232529] transition-colors hover:text-[#EC3338]"
          >
            Explore our projects <ArrowRight size={14} />
          </a>
        </div>

        <div className="relative mx-auto w-full max-w-[34rem] lg:ml-0 lg:pt-2" data-scroll-reveal="image">
          <div className="relative aspect-square overflow-visible">
            <img
              src={`${assetBase}assets/projects/Godrej-Emerald-Waters.jpg`}
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
              alt="Contemporary residential architecture with landscaped surroundings"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-8 left-4 w-[min(86%,17rem)] bg-white px-6 py-5 shadow-[0_18px_40px_rgba(35,37,41,0.16)] sm:left-8 sm:px-7 sm:py-6">
            <span className="block font-montserrat text-[9px] font-bold uppercase tracking-[0.18em] text-[#EC3338]">
              Our Design Principle
            </span>
            <p className="mt-3 font-montserrat text-[1.35rem] font-medium leading-[1.12] tracking-[-0.035em] text-[#232529]">
              Build with purpose.
              <br />
              <strong className="font-bold">Last with meaning.</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectExplorer() {
  const [selectedIndex, setSelectedIndex] = useState(explorerProjects.length - 1);
  const selectedProject = explorerProjects[selectedIndex] ?? explorerProjects[0];

  useEffect(() => {
    if (window.location.hash !== "#project-explorer") return;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById("project-explorer")?.scrollIntoView({ block: "start" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <section
      id="project-explorer"
      className="scroll-mt-20 overflow-hidden bg-white font-montserrat"
      data-testid="section-project-explorer"
      aria-label="MECPL project explorer"
    >
      <div className="mx-auto grid min-h-[680px] max-w-[1500px] border-y border-black/[0.08] bg-white lg:grid-cols-[0.42fr_0.58fr]">
        <div className="relative min-h-[500px] overflow-hidden bg-[#e8e7e2]" data-scroll-reveal="image">
          <video
            src={`${assetBase}assets/video/projects-explorer.mp4`}
            poster={`${assetBase}assets/video/posters/projects-explorer.jpg`}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Portrait video of Trump Towers"
          />
        </div>

        <div className="grid bg-white xl:grid-cols-[0.92fr_1.08fr] xl:grid-rows-[auto_minmax(0,1fr)]">
          <header className="border-b border-black/[0.08] px-6 py-8 xl:col-span-2 xl:px-10">
            <h2 className="text-[clamp(1.25rem,2vw,1.8rem)] font-semibold leading-tight tracking-[-0.025em] text-[#CF2E2E]">
              Building with purpose.
            </h2>
            <p className="mt-3 max-w-2xl text-[11px] leading-relaxed text-[#626667]">
              From residential communities to commercial landmarks, MECPL delivers spaces shaped by precision,
              responsibility, and a long-term view of Pune.
            </p>
          </header>

          <div className="relative min-h-[500px] overflow-hidden bg-white px-6 py-8 xl:min-h-0 xl:border-r xl:border-black/[0.08]">
            <div className="relative mx-auto h-full min-h-[430px] max-w-[390px]">
              <svg
                viewBox="0 0 360 470"
                className="absolute inset-0 h-full w-full"
                role="img"
                aria-label="Pune project region with selectable MECPL locations"
              >
                <g fill="none" stroke="#d8d8d4" strokeWidth="1" strokeDasharray="3 5">
                  <circle cx="184" cy="258" r="72" />
                  <circle cx="184" cy="258" r="112" />
                  <circle cx="184" cy="258" r="154" />
                </g>
                <path
                  d="M153 24 188 43l31-3 22 31 37 11 16 42-25 34 17 35-31 24 11 37-29 23 6 44-28 28-16 61-28-45-19-35-34-23 8-39-35-30 21-36-13-40 33-28-5-43 31-18Z"
                  fill="#ededeb"
                  stroke="#9fa09d"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <g fill="none" stroke="#d2d2cf" strokeWidth="1">
                  <path d="m126 111 83 245M96 211l164 66M132 323l117-167M151 64l86 285" />
                </g>
              </svg>

              {explorerProjects.map((project, index) => {
                const selected = selectedIndex === index;
                const left = Math.max(12, Math.min(88, (project.mapX - 40) * 2));
                const top = Math.max(14, Math.min(84, (project.mapY - 30) * 1.65));
                return (
                  <button
                    key={`${project.name}-${project.location}`}
                    type="button"
                    onMouseEnter={() => setSelectedIndex(index)}
                    onFocus={() => setSelectedIndex(index)}
                    onClick={() => setSelectedIndex(index)}
                    aria-label={`Show ${project.name} in ${project.location}`}
                    aria-pressed={selected}
                    data-testid={`button-project-map-${index}`}
                    className="group absolute z-10 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CF2E2E] focus-visible:ring-offset-2"
                    style={{ left: `${left}%`, top: `${top}%` }}
                  >
                    <span
                      className={`block rounded-full border-2 border-white bg-[#CF2E2E] shadow-[0_2px_7px_rgba(80,0,0,0.24)] transition-all ${
                        selected ? "h-4 w-4 ring-[7px] ring-[#CF2E2E]/20" : "h-3 w-3 group-hover:scale-125"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <article
            className="flex min-h-[500px] flex-col bg-white px-6 py-8 text-[#232529] xl:min-h-0 xl:px-8"
            aria-live="polite"
            data-testid="project-map-detail-card"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-[#ecece9]">
              <img
                src={selectedProject.image}
                alt={`${selectedProject.name} project`}
                className="h-full w-full object-cover transition-opacity duration-500"
              />
            </div>
            <div className="mt-auto pt-7">
              <h2 className="text-lg font-semibold leading-tight text-[#232529]">{selectedProject.name}</h2>
              <p className="mt-3 flex items-center gap-2 text-[10px] text-[#777a79]">
                <MapPin size={12} className="shrink-0 text-[#CF2E2E]" />
                {selectedProject.location}
              </p>
              <dl className="mt-5 grid grid-cols-[74px_1fr] gap-x-4 gap-y-2 border-t border-black/[0.1] pt-4 text-[9px]">
                <dt className="uppercase tracking-[0.12em] text-[#949599]">Category</dt>
                <dd>{selectedProject.type}</dd>
                <dt className="uppercase tracking-[0.12em] text-[#949599]">Portfolio</dt>
                <dd>MECPL Projects</dd>
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
            <div className="mb-5 flex items-center gap-4 text-[9px] font-bold normal-case tracking-[0.2em] text-[#949599]">
              <span className="text-[#111111]">{projectNumber}</span>
              <span className="h-px w-8 bg-[#c7c7c1]" />
              <span>{project.type}</span>
            </div>
            <h2 className="max-w-sm text-2xl font-medium leading-[0.98] tracking-[-0.045em] text-[#111111] md:text-3xl">
              {project.name}
            </h2>
            <div className="mt-5 flex items-center gap-2 text-[10px] normal-case tracking-[0.16em] text-[#949599]">
              <MapPin size={12} className="text-[#C41E3A]" />
              <span>{project.location}</span>
            </div>
          </div>

        </div>

        <div className="grid h-52 grid-cols-[minmax(0,1.55fr)_minmax(110px,0.85fr)] gap-2 overflow-hidden sm:h-60 md:h-64">
          <div className="relative overflow-hidden border-b-2 border-[#949599] bg-white">
            <img
              src={project.image}
              className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
              alt={`${project.name} primary view`}
              loading="lazy"
              decoding="async"
              fetchPriority={index === 0 ? "high" : "auto"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
          </div>
          <div className="relative overflow-hidden border-b-2 border-[#949599] bg-white">
            <img
              src={project.image}
              className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
              style={{ objectPosition: "72% center" }}
              alt={`${project.name} detail view`}
              loading="lazy"
              decoding="async"
              fetchPriority={index === 0 ? "high" : "auto"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
