import { useState, useEffect, useRef } from "react";
import { ArrowRight, Building2, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
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
    <div data-animate-page className="bg-white">
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
        </div>
      </div>

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
          <div className="flex w-full min-w-max items-center justify-between gap-5 font-montserrat sm:min-w-[42rem] sm:gap-8">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => selectFilter(f)}
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

  const showPreviousProject = () => {
    setSelectedIndex(current => (current - 1 + explorerProjects.length) % explorerProjects.length);
  };

  const showNextProject = () => {
    setSelectedIndex(current => (current + 1) % explorerProjects.length);
  };

  return (
    <section
      id="project-explorer"
      className="scroll-mt-20 overflow-hidden bg-[#f5f4f0] font-montserrat"
      data-testid="section-project-explorer"
      aria-label="MECPL project explorer"
    >
      <div className="mx-auto grid min-h-[720px] max-w-[1500px] bg-[#f5f4f0] lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative min-h-[520px] overflow-hidden bg-[#eef1ed] lg:min-h-full" data-scroll-reveal="image">
              <svg
                viewBox="0 0 720 720"
                className="absolute inset-0 h-full w-full"
                role="img"
                aria-label="Map of Maharashtra highlighting Mumbai, Pune, and major project areas"
                preserveAspectRatio="xMidYMid meet"
              >
                <rect width="720" height="720" fill="#f6f5f0" />
                <path
                  d="M0 0 H176 C163 70 177 126 159 183 C146 230 166 280 149 328 C131 379 148 429 166 475 C184 521 202 583 230 720 H0 Z"
                  fill="#dceff5"
                />
                <path
                  d="M176 0 C255 22 326 8 407 38 C485 66 576 43 720 93 V638 C627 655 552 630 472 660 C379 695 301 653 230 720 C202 583 184 521 166 475 C148 429 131 379 149 328 C166 280 146 230 159 183 C177 126 163 70 176 0 Z"
                  fill="#f1f0eb"
                  stroke="#d8d6cf"
                  strokeWidth="2"
                />
                <g fill="#dbe5d2" opacity="0.95">
                  <path d="M165 68 C233 34 291 68 317 137 C264 170 207 165 166 129 Z" />
                  <path d="M155 346 C218 298 288 326 314 394 C261 436 201 441 157 403 Z" />
                  <path d="M278 502 C345 466 416 494 438 561 C381 596 321 581 274 545 Z" />
                  <path d="M566 70 C626 45 678 65 720 91 V200 C655 209 603 165 566 70 Z" />
                </g>
                <g fill="none" stroke="#d6d5d0" strokeWidth="1.5">
                  <path d="M173 98 C278 75 370 116 469 92 S628 86 720 118" />
                  <path d="M159 229 C279 205 382 243 492 218 S635 214 720 244" />
                  <path d="M149 381 C255 349 378 374 496 346 S642 351 720 380" />
                  <path d="M178 535 C282 500 381 530 486 505 S630 512 720 542" />
                  <path d="M230 0 C237 128 269 232 251 357 S248 551 286 701" />
                  <path d="M448 0 C421 132 453 243 435 380 S425 553 470 661" />
                </g>
                <g fill="none" stroke="#ffffff" strokeWidth="9">
                  <path d="M145 278 C239 307 329 335 426 376 S591 431 720 458" />
                  <path d="M208 132 C272 211 330 277 397 344 S490 430 564 524" />
                </g>
                <g fill="none" stroke="#bfc1bd" strokeWidth="2">
                  <path d="M145 278 C239 307 329 335 426 376 S591 431 720 458" />
                  <path d="M208 132 C272 211 330 277 397 344 S490 430 564 524" />
                </g>
                <path d="M370 395 C432 407 466 391 523 410 C580 429 623 416 680 398" fill="none" stroke="#9bc9dc" strokeWidth="4" opacity="0.8" />

                <g fontFamily="Montserrat, sans-serif">
                  <text x="329" y="246" fill="#858987" fontSize="18" letterSpacing="6">MAHARASHTRA</text>
                  <text x="29" y="510" fill="#8bb5c4" fontSize="11" letterSpacing="5">ARABIAN</text>
                  <text x="48" y="529" fill="#8bb5c4" fontSize="11" letterSpacing="5">SEA</text>
                  <text x="217" y="306" fill="#777b79" fontSize="9">NH 48</text>
                  <text x="396" y="565" fill="#777b79" fontSize="9">NH 65</text>

                  {[
                    ["Thane", 150, 173],
                    ["Andheri", 137, 219],
                    ["Bandra", 139, 263],
                    ["Navi Mumbai", 146, 307],
                    ["Hinjawadi", 333, 365],
                    ["Wakad", 438, 369],
                    ["Baner", 359, 423],
                    ["Kharadi", 514, 424],
                    ["Bavdhan", 344, 471],
                    ["Hadapsar", 509, 474],
                    ["Kothrud", 362, 520],
                    ["Pashan", 461, 520],
                  ].map(([label, x, y]) => (
                    <g key={String(label)}>
                      <path d={`M${Number(x) - 12} ${Number(y) - 4}a7 7 0 1 1 14 0c0 6-7 12-7 12s-7-6-7-12Z`} fill="#df2832" stroke="#ffffff" strokeWidth="2" />
                      <circle cx={Number(x) - 5} cy={Number(y) - 4} r="2.2" fill="#ffffff" />
                      <text x={Number(x) + 4} y={Number(y)} fill="#3f4442" fontSize="10" fontWeight="600">{label}</text>
                    </g>
                  ))}

                  <g transform="translate(72 236)">
                    <path d="M0 0 H76 V28 H0 Z" fill="#333837" />
                    <text x="38" y="19" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="700">MUMBAI</text>
                  </g>
                  <g transform="translate(405 405)">
                    <path d="M0 0 H55 V27 H0 Z" fill="#333837" />
                    <text x="27.5" y="18" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="700">PUNE</text>
                  </g>

                  <text x="205" y="39" fill="#858987" fontSize="9">↑ Towards Nashik</text>
                  <text x="600" y="298" fill="#858987" fontSize="9">Towards Ahmednagar →</text>
                  <text x="449" y="691" fill="#858987" fontSize="9">Towards Bengaluru ↓</text>
                  <g transform="translate(662 612)" fill="#4c5250">
                    <path d="M10 0 L20 27 L10 21 L0 27 Z" />
                    <text x="10" y="43" textAnchor="middle" fontSize="11" fontWeight="700">N</text>
                  </g>
                </g>
              </svg>
              <div className="absolute inset-0">
                {explorerProjects.map((project, index) => {
                  const selected = selectedIndex === index;
                  return (
                    <button
                      key={`${project.name}-${project.location}`}
                      type="button"
                      onMouseEnter={() => setSelectedIndex(index)}
                      onFocus={() => setSelectedIndex(index)}
                      onClick={() => setSelectedIndex(index)}
                      aria-label={`Show ${project.name} in ${project.location}`}
                      aria-pressed={selected}
                      className="group absolute z-10 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EC3338] focus-visible:ring-offset-2"
                      style={{ left: `${project.mapX}%`, top: `${project.mapY}%` }}
                    >
                      <span
                        className={`block rounded-full border-2 border-white bg-[#EC3338] shadow-[0_2px_7px_rgba(80,0,0,0.35)] transition-all ${
                          selected
                            ? "h-4 w-4 scale-125 ring-[7px] ring-[#EC3338]/20"
                            : "h-3 w-3 group-hover:h-4 group-hover:w-4"
                        }`}
                      />
                      <span className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 hidden min-w-max -translate-x-1/2 bg-[#232529] px-3 py-2 text-left text-white shadow-lg group-hover:block group-focus:block">
                        <strong className="block text-[10px] font-semibold leading-tight">{project.name}</strong>
                        <span className="mt-1 block text-[8px] text-white/65">{project.location}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <article
              className="flex h-full flex-col bg-[#f8f7f3] px-6 py-10 text-[#232529] sm:px-10 lg:px-12 lg:py-12"
              aria-live="polite"
              data-testid="project-map-detail-card"
            >
              <div className="mb-5 flex items-start justify-between gap-6">
                <div>
                  <span className="block text-[9px] font-bold uppercase tracking-[0.22em] text-[#EC3338]">
                    Featured Project
                  </span>
                  <h2 className="mt-2 text-[clamp(1.25rem,2vw,1.8rem)] font-semibold leading-tight tracking-[-0.035em] text-[#1f2428]">
                    {selectedProject.name}
                  </h2>
                </div>
                <div className="shrink-0 text-right">
                  <span className="text-[9px] font-semibold tracking-[0.14em] text-[#8b8d8c]">
                    {String(selectedIndex + 1).padStart(2, "0")} / {String(explorerProjects.length).padStart(2, "0")}
                  </span>
                  <div className="mt-2 flex justify-end gap-1">
                    <button type="button" onClick={showPreviousProject} className="flex h-8 w-8 items-center justify-center text-[#454a4d] transition-colors hover:text-[#EC3338]" aria-label="Previous featured project">
                      <ChevronLeft size={17} />
                    </button>
                    <button type="button" onClick={showNextProject} className="flex h-8 w-8 items-center justify-center text-[#454a4d] transition-colors hover:text-[#EC3338]" aria-label="Next featured project">
                      <ChevronRight size={17} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-white" data-scroll-reveal="image">
                <img
                  src={selectedProject.image}
                  alt={`${selectedProject.name} project`}
                   className="h-full w-full object-cover transition-transform duration-700"
                />
                 <span className="absolute bottom-0 left-0 bg-[#EC3338] px-4 py-2 text-[9px] font-bold uppercase tracking-[0.16em] text-white">
                   {selectedProject.location.split(",")[0]}
                 </span>
              </div>

              <div className="grid grid-cols-3 border-b border-[#deddd8] bg-white">
                <div className="flex items-center gap-2 border-r border-[#deddd8] px-3 py-4 text-[9px] text-[#4f5456] sm:px-4">
                  <MapPin size={15} className="shrink-0 text-[#EC3338]" />
                  <span>{selectedProject.location}</span>
                </div>
                <div className="flex items-center gap-2 border-r border-[#deddd8] px-3 py-4 text-[9px] text-[#4f5456] sm:px-4">
                  <Building2 size={15} className="shrink-0 text-[#9C7A32]" />
                  <span>{selectedProject.type}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-4 text-[9px] text-[#4f5456] sm:px-4">
                  <Building2 size={15} className="shrink-0 text-[#9C7A32]" />
                  <span>MECPL Projects</span>
                </div>
              </div>

              <div className="bg-white px-4 py-5">
                <p className="text-[11px] leading-relaxed text-[#626667]">
                  A landmark project delivered with precision and care, contributing to Pune&apos;s evolving urban landscape.
                </p>
                <a href="#projects-grid" className="mt-5 inline-flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.18em] text-[#EC3338] transition-colors hover:text-[#232529]">
                  View project details <ArrowRight size={13} />
                </a>
              </div>
            </article>
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
            <h3 className="max-w-sm text-2xl font-medium leading-[0.98] tracking-[-0.045em] text-[#111111] md:text-3xl">
              {project.name}
            </h3>
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
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
