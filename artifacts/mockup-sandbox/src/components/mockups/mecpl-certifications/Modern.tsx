import "./_group.css";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { SiteFooter, SiteHeader } from "./_shared";

type Certification = {
  id: string;
  number: string;
  category: string;
  standard: string;
  system: string;
  detail: string;
};

const certifications: Certification[] = [
  {
    id: "quality",
    number: "01",
    category: "Quality",
    standard: "ISO 9001:2015",
    system: "Quality management",
    detail: "Quality management system",
  },
  {
    id: "environment",
    number: "02",
    category: "Environment",
    standard: "ISO 14001:2015",
    system: "Environmental management",
    detail: "Environmental management system",
  },
  {
    id: "health-safety",
    number: "03",
    category: "Occupational health & safety",
    standard: "ISO 45001:2018",
    system: "Occupational health & safety",
    detail: "Occupational health and safety management system",
  },
];

export function Modern() {
  const [activeCertification, setActiveCertification] = useState<Certification | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!activeCertification) return;

    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveCertification(null);
      if (event.key === "Tab") {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [activeCertification]);

  return (
    <div className="mecpl-preview">
      <SiteHeader />
      <main className="mecpl-page-top mecpl-modern-main">
        <section className="mecpl-modern-hero">
          <div className="mecpl-hero-copy">
            <div className="mecpl-hero-kicker">MECPL certification register</div>
            <h1>Quality, environment,<br /><span>health &amp; safety.</span></h1>
            <p className="mecpl-modern-hero-copy">
              Explore MECPL’s three ISO management-system certifications by category. Select a category to view its details here.
            </p>
            <div className="mecpl-hero-link-row">
              <a className="mecpl-hero-link" href="#certifications">
                Explore categories <ArrowRight size={15} />
              </a>
            </div>
          </div>
          <aside className="mecpl-hero-annotation">
            <small>Three categories · three standards</small>
            <p>Quality management, environmental management, and occupational health &amp; safety—shown separately for quick reference.</p>
          </aside>
        </section>

        <section className="mecpl-modern-certifications" id="certifications">
          <div className="mecpl-section-heading">
            <div className="mecpl-section-kicker">Browse by category</div>
            <h2>One clear record for each discipline.</h2>
            <p>Choose a category to see the corresponding standard and the information available for it.</p>
          </div>

          <div className="mecpl-category-grid">
            {certifications.map((certification) => (
              <button
                className="mecpl-category-card"
                key={certification.id}
                type="button"
                aria-haspopup="dialog"
                onClick={() => setActiveCertification(certification)}
              >
                <span className="mecpl-category-card-top">
                  <span className="mecpl-category-number">{certification.number} / 03</span>
                  <span className="mecpl-category-chip">ISO</span>
                </span>
                <span className="mecpl-category-label">{certification.category}</span>
                <span className="mecpl-category-standard">{certification.standard}</span>
                <span className="mecpl-category-system">{certification.system}</span>
                <span className="mecpl-category-action">
                  View certification details <ArrowRight size={15} />
                </span>
              </button>
            ))}
          </div>

          <div className="mecpl-cert-source-note">
            <span className="mecpl-cert-source-mark" aria-hidden="true">M</span>
            <p>
              <strong>Information shown:</strong> These standards and editions are listed in MECPL’s 2026 company profile. Official certificate scans and issuer, registration, or validity details were not included in the available assets.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />

      {activeCertification && (
        <div
          className="mecpl-detail-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveCertification(null);
          }}
        >
          <section
            className="mecpl-detail-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mecpl-detail-title"
            aria-describedby="mecpl-detail-description"
          >
            <div className="mecpl-detail-topline">
              <span>Certification details</span>
              <button
                className="mecpl-detail-close"
                ref={closeButtonRef}
                type="button"
                onClick={() => setActiveCertification(null)}
                aria-label="Close certification details"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mecpl-detail-category">
              <span className="mecpl-detail-number">{activeCertification.number}</span>
              <span className="mecpl-detail-category-name">{activeCertification.category}</span>
            </div>

            <h2 id="mecpl-detail-title">{activeCertification.standard}</h2>
            <p className="mecpl-detail-system">{activeCertification.detail}</p>

            <div className="mecpl-detail-facts">
              <div>
                <span>Category</span>
                <strong>{activeCertification.category}</strong>
              </div>
              <div>
                <span>Management system</span>
                <strong>{activeCertification.system}</strong>
              </div>
              <div>
                <span>Edition</span>
                <strong>{activeCertification.standard.split(":")[1]}</strong>
              </div>
            </div>

            <p className="mecpl-detail-description" id="mecpl-detail-description">
              This standard is listed in MECPL’s 2026 company profile. This in-page view presents the available certification information; it is not a reproduction of the official certificate document.
            </p>
            <div className="mecpl-detail-document-note">
              Certificate scan, issuer, registration number, and validity dates were not supplied.
            </div>
          </section>
        </div>
      )}
    </div>
  );
}