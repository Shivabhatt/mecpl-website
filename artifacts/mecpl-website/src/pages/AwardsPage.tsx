import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import WallOfFame from "@/components/WallOfFame";
import { awards, categoryCounts } from "@/data/awardsData";
import "./AwardsPage.Emblem.css";

const assetBase = import.meta.env.BASE_URL;

export default function AwardsPage() {
  const countFor = (key: keyof typeof categoryCounts) => categoryCounts[key];

  useEffect(() => {
    const previousTitle = document.title;
    const description = "Explore 41 MECPL awards and recognitions for construction safety, quality, and structural excellence from 2002 to 2026.";
    const updates = [
      ['meta[name="description"]', description],
      ['meta[property="og:title"]', "Awards & Recognition | MECPL"],
      ['meta[property="og:description"]', description],
      ['meta[name="twitter:title"]', "Awards & Recognition | MECPL"],
      ['meta[name="twitter:description"]', description],
    ] as const;
    const previous = updates.map(([selector, content]) => {
      const tag = document.querySelector<HTMLMetaElement>(selector);
      const oldContent = tag?.content;
      if (tag) tag.content = content;
      return [tag, oldContent] as const;
    });
    document.title = "Awards & Recognition | MECPL";
    return () => {
      document.title = previousTitle;
      previous.forEach(([tag, content]) => {
        if (tag && content !== undefined) tag.content = content;
      });
    };
  }, []);

  return (
    <div className="mecpl-awards-page emblem-root" style={{ background: "#fff", color: "#25292b" }} data-testid="awards-page">
        <main className="emblem-main">
          <section
            className="emblem-hero"
            aria-labelledby="emblem-title"
            style={{ backgroundImage: `url("${assetBase}assets/awards/awards-trophy-banner.webp")` }}
          >
            <div className="emblem-hero-shade" />
            <div className="emblem-hero-content">
              <div className="emblem-eyebrow">A record built on site</div>
              <h1 id="emblem-title" style={{ fontSize: 35, fontWeight: 500 }}>Recognition<br /><em>Earned on the Ground.</em></h1>
              <p>Every distinction reflects the discipline, care and engineering rigour behind structures made to last.</p>
            </div>
          </section>

          <section className="emblem-intro" aria-label="Awards archive summary">
            <div className="emblem-intro-copy">
              <div className="emblem-section-label">A measured record</div>
              <h2>Recognition is a result.<br /><span>Execution is the standard.</span></h2>
              <p>From safe worksites to enduring structures, these honours recognise the teams and partnerships that have shaped MECPL’s work across Pune and Maharashtra.</p>
            </div>
            <div className="emblem-proof" role="group" aria-label="Recognition totals">
              <div className="emblem-proof-stat"><strong>{awards.length}</strong><span>Verified recognitions<br />since 2002</span></div>
              <div className="emblem-proof-stat"><strong>{countFor("safety")}</strong><span>Safety</span></div>
              <div className="emblem-proof-stat"><strong>{countFor("quality")}</strong><span>Quality</span></div>
              <div className="emblem-proof-stat"><strong>{String(countFor("national-state")).padStart(2, "0")}</strong><span>National &amp; State</span></div>
            </div>
          </section>

          <WallOfFame />

          <section className="emblem-closing">
            <div className="emblem-closing-copy">
              <div className="emblem-section-label">The journey continues</div>
              <h2>Same purpose.<br />Greater possibilities.</h2>
              <p>From the foundations laid in 1975 to what we build next, the purpose remains the same: to build better, safer and stronger.</p>
              <div className="emblem-closing-actions">
                <a href="mailto:contact@mecpl.in" className="emblem-closing-link">
                  Contact MECPL <ArrowRight size={15} aria-hidden="true" />
                </a>
              </div>
            </div>
          </section>
        </main>
    </div>
  );
}
