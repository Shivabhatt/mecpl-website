import { useEffect, useState, type RefObject } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { sentenceCase } from "@/lib/typography";

type RisingProject = { name: string; location: string; headline: string; video: string; description: string };

type Props = {
  projects: RisingProject[];
  activeIndex: number;
  onSelect: (index: number | ((current: number) => number)) => void;
  videoRef: RefObject<HTMLVideoElement | null>;
  assetBase: string;
  posterFor: (src: string) => string;
};

function useIsDesktop() {
  const [desktop, setDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return desktop;
}

export default function RisingProjectsSection({ projects, activeIndex, onSelect, videoRef, assetBase, posterFor }: Props) {
  const isDesktop = useIsDesktop();
  const [paused, setPaused] = useState(true);
  useEffect(() => { setPaused(true); }, [activeIndex, isDesktop]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.currentTime = 0;
          void video.play().catch(() => undefined);
          return;
        }
        video.pause();
        video.currentTime = 0;
      },
      { threshold: 0.35 },
    );
    observer.observe(video);
    return () => {
      observer.disconnect();
      video.pause();
      video.currentTime = 0;
    };
  }, [activeIndex, isDesktop, videoRef]);

  const cycle = (dir: 1 | -1) => {
    onSelect((current) => (current + dir + projects.length) % projects.length);
  };

  const controls = (
    <div className="-mt-10 flex justify-end">
      <button
        type="button"
        aria-label="Previous project"
        onClick={() => cycle(-1)}
        className="rising-project-control flex h-[36px] w-[36px] cursor-pointer items-center justify-center border border-mecpl-dark/10 bg-white text-mecpl-text transition-colors hover:border-mecpl-red hover:bg-mecpl-red hover:text-white"
      >
        <ChevronLeft size={14} />
      </button>
      <button
        type="button"
        aria-label="Next project"
        onClick={() => cycle(1)}
        className="rising-project-control -ml-px flex h-[36px] w-[36px] cursor-pointer items-center justify-center border border-mecpl-dark/10 bg-white text-mecpl-text transition-colors hover:border-mecpl-red hover:bg-mecpl-red hover:text-white"
      >
        <ChevronRight size={14} />
      </button>
    </div>
  );

  const player = (project: RisingProject, className: string) => (
    <div className={className}>
      <video
        key={project.video}
        ref={videoRef}
        controls
        muted
        playsInline
        preload="metadata"
        poster={posterFor(project.video)}
        className="h-full w-full object-cover"
        onPlay={() => setPaused(false)}
        onPause={() => setPaused(true)}
        onEnded={() => setPaused(true)}
        aria-label={`${project.name} construction progress video`}
      >
        <source src={`${assetBase}${project.video}`} type="video/mp4" />
      </video>
    </div>
  );

  const active = projects[activeIndex];

  return (
    <section
      id="rising-projects"
      data-testid="section-home-ongoing-projects"
      className="relative overflow-hidden bg-white"
      style={{ background: "#ffffff", padding: "0 0 128px" }}
    >
      <div className="relative w-full">
        <div data-scroll-reveal="text" className="mb-10 px-6 text-center md:mb-12 md:px-10">
          <span className="home-section-label home-intro-label block text-mecpl-red">
            Right now
          </span>
          <h2 className="mecpl-role-h2-large hp-section-title home-heading-26 home-intro-title home-intro-title-has-description mt-3 text-mecpl-text">
            {isDesktop ? (<><span className="rising-title-accent">Rising</span> as We Speak</>) : "Rising as We Speak"}
          </h2>
          <p className="home-intro-description home-rising-description mx-auto mt-2 max-w-[440px] text-balance text-[#4f545b]" style={{ color: "#4f545b" }}>
            Four project milestones and active works currently taking shape across Pune.
          </p>
        </div>

        {isDesktop ? (
          <div className="rising-showcase" data-testid="reel-rising">
            <div className="rising-main">
              <div className="rising-stage-frame">
                <div className="rising-stage-video">
                  {player(active, "h-full w-full")}
                </div>
                {paused && (
                  <button
                    type="button"
                    aria-label={`Play ${active.name} video`}
                    onClick={() => { void videoRef.current?.play().catch(() => undefined); }}
                    data-testid="button-rising-main-play"
                    className="rising-main-play"
                  >
                    <Play size={20} fill="currentColor" aria-hidden="true" />
                  </button>
                )}
                <button
                  type="button"
                  aria-label="Previous project"
                  onClick={() => cycle(-1)}
                  data-testid="button-rising-prev"
                  className="rising-arrow rising-arrow-prev"
                >
                  <ChevronLeft size={16} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label="Next project"
                  onClick={() => cycle(1)}
                  data-testid="button-rising-next"
                  className="rising-arrow rising-arrow-next"
                >
                  <ChevronRight size={16} aria-hidden="true" />
                </button>
              </div>
              <p key={active.video} className="home-rising-detail rising-description text-[#4f545b]" style={{ color: "#4f545b" }} data-testid="card-rising-active">
                {active.description}
              </p>
            </div>
            <ul className="rising-rail" aria-label="Rising projects">
              {projects.map((project, i) => (
                <li key={project.video}>
                  <button
                    type="button"
                    onClick={() => onSelect(i)}
                    aria-pressed={i === activeIndex}
                    data-testid={`button-rising-preview-${i}`}
                    className="rising-row"
                  >
                    <span className="rising-row-thumb">
                      <img src={posterFor(project.video)} alt="" loading="lazy" />
                      <span className="rising-row-play" aria-hidden="true"><Play size={11} fill="currentColor" /></span>
                    </span>
                    <span className="rising-row-text">
                      <span className="rising-rail-name">{project.name}</span>
                      <span className="rising-rail-headline">{sentenceCase(project.headline)}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div
            data-scroll-reveal="image"
            className="relative grid items-center gap-10"
            style={{ background: "#e4e4e6" }}
          >
            {player(active, "group relative aspect-video overflow-hidden rounded-[5px] bg-[#d8d7d3] shadow-[0_15px_45px_rgba(35,37,41,0.08)]")}
            <div className="relative">
              <article>
                <p className="home-rising-project-label mb-3 text-mecpl-red">
                  {active.name}
                </p>
                <h2 className="home-rising-headline text-mecpl-text">
                  {sentenceCase(active.headline)}
                </h2>
                <span className="mt-5 block h-0.5 w-10 bg-mecpl-red" />
                <p className="home-rising-detail mt-6 max-w-sm text-[#4f545b]" style={{ color: "#4f545b" }}>
                  {active.description}
                </p>
              </article>
            </div>
            {controls}
          </div>
        )}
      </div>
    </section>
  );
}
