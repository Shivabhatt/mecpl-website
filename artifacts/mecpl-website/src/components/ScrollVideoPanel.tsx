import { useEffect, useRef, useState } from "react";

const YT_ID = "2b1u5KUSUkk"; // provided video
const POSTER = `https://img.youtube.com/vi/${YT_ID}/maxresdefault.jpg`;

export default function ScrollVideoPanel() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            setInView(true);
          } else {
            setInView(false);
          }
        });
      },
      { threshold: [0.6] }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (inView && !loaded) {
      setLoaded(true);
    }
    if (!inView && loaded) {
      // remove iframe to stop playback when leaving view
      if (iframeRef.current) {
        try {
          iframeRef.current.src = "about:blank";
        } catch (e) {}
        iframeRef.current.remove();
        iframeRef.current = null;
      }
      setLoaded(false);
    }
  }, [inView, loaded]);

  const openLightbox = () => {
    const w = window.open(
      `https://www.youtube.com/embed/${YT_ID}?autoplay=1&rel=0`,
      "_blank",
      "noopener,noreferrer,width=900,height=600"
    );
    if (w) w.focus();
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-14" data-testid="scroll-video-panel">
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div className="lg:pr-8">
          <span className="text-[#C41E3A] text-[10px] font-black tracking-widest uppercase">About</span>
          <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white mt-3">MECPL — Visual Storytelling</h3>
          <p className="text-gray-400 mt-4 leading-relaxed">
            A short narrative or company line that pairs with the featured video on the right. The media will
            lazy-load and autoplay (muted) when it becomes the focus on scroll. Clicking the play button opens the full
            video in a lightbox.
          </p>
        </div>

        <div ref={containerRef} className="relative h-72 md:h-96 rounded-sm overflow-hidden bg-mecpl-card border border-white/5">
          {!loaded && (
            <button
              aria-label="Open video"
              onClick={openLightbox}
              className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors"
            >
              <img src={POSTER} alt="video poster" className="w-full h-full object-cover" />
              <span className="absolute w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5v14l11-7L8 5z" fill="#111827" />
                </svg>
              </span>
            </button>
          )}

          {loaded && (
            <div className="absolute inset-0">
              <iframe
                ref={iframeRef}
                title="MECPL feature"
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${YT_ID}?autoplay=1&mute=1&playsinline=1&controls=0&rel=0&modestbranding=1`}
                frameBorder="0"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
              <button
                onClick={openLightbox}
                aria-label="Open full video"
                className="absolute right-4 bottom-4 bg-white/90 rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5v14l11-7L8 5z" fill="#111827" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
