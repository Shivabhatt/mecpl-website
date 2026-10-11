import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import AwardsGroups from "./AwardsGroups";
import { awards } from "@/data/awardsData";
import "./AwardsPage.Emblem.css";
import "./AwardsPage.Reference.css";

const assetBase = import.meta.env.BASE_URL;

export default function AwardsPage() {
  useEffect(() => {
    const previousTitle = document.title;
    const description = `Explore ${awards.length} MECPL awards and recognitions for construction safety, quality, and structural excellence from 2002 to 2026.`;
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
    <div className="mecpl-awards-page emblem-root aw-wrap" style={{ background: "#fff", color: "#25292b" }} data-testid="awards-page">
        <main className="emblem-main">
          <section
            className="emblem-hero"
            aria-labelledby="emblem-title"
            style={{ backgroundImage: `url("${assetBase}assets/awards/awards-trophy-banner.webp")` }}
          >
            <div className="emblem-hero-shade" />
            <div className="emblem-hero-content">
              <div className="emblem-eyebrow">A record built on site</div>
              <h1 id="emblem-title">Recognition</h1>
              <p>Every distinction reflects the discipline, care and engineering rigour behind structures made to last.</p>
            </div>
          </section>

          <AwardsGroups />

          <section className="aw-cta">
            <div className="aw-label">OUR COMMITMENT</div>
            <h2 className="mecpl-role-h2-medium">Standards Today,<br />A Stronger Tomorrow.</h2>
            <p>These recognitions motivate us to keep raising the bar in quality, safety and engineering excellence.</p>
            <div className="emblem-closing-actions">
              <a href="mailto:contact@mecpl.in" className="emblem-closing-link">Contact MECPL <ArrowRight size={15} aria-hidden="true" /></a>
            </div>
          </section>
        </main>
    </div>
  );
}
