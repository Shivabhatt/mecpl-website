import { useEffect, useRef, useState } from "react";
import { Maximize2 } from "lucide-react";
import CertificateViewer, { type Standard } from "@/components/CertificateViewer";
import CertificationStandards from "@/components/CertificationStandards";
import "./CertificationsPage.css";

const base = import.meta.env.BASE_URL;
const image = `${base}assets/certifications/bureau-veritas-integrated-iso.jpg`;
const pdf = `${base}assets/certifications/bureau-veritas-integrated-iso.pdf`;

const standards: (Standard & { blurb: string })[] = [
  { code: "ISO 9001:2015", name: "Quality Management", short: "Quality", blurb: "Consistent, documented control of how every project is planned, built and handed over." },
  { code: "ISO 14001:2015", name: "Environmental Management", short: "Environment", blurb: "Systematic management of site impact, waste, resources and compliance." },
  { code: "ISO 45001:2018", name: "Occupational Health & Safety", short: "Safety", blurb: "A managed framework that protects the people who build, on every site." },
];

export default function CertificationsPage() {
  const [idx, setIdx] = useState<number | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const prev = document.title;
    const d = "MECPL holds one integrated Bureau Veritas certificate covering ISO 9001:2015, ISO 14001:2015 and ISO 45001:2018.";
    const sel = [['meta[name="description"]', d], ['meta[property="og:title"]', "Certifications | MECPL"], ['meta[property="og:description"]', d], ['meta[name="twitter:title"]', "Certifications | MECPL"], ['meta[name="twitter:description"]', d]] as const;
    const old = sel.map(([s, c]) => { const t = document.querySelector<HTMLMetaElement>(s); const o = t?.content; if (t) t.content = c; return [t, o] as const; });
    document.title = "Certifications | MECPL";
    return () => { document.title = prev; old.forEach(([t, o]) => { if (t && o !== undefined) t.content = o; }); };
  }, []);

  return (
    <div className="cert-page" data-testid="certifications-page">
      <section className="cert-hero" aria-labelledby="cert-title" style={{ backgroundImage: `url("${base}assets/certifications/certifications-banner.webp")` }}>
        <div className="cert-hero-shade" aria-hidden="true" />
        <div className="cert-hero-inner">
          <div className="cert-hero-copy">
            <div className="cert-eyebrow">Certified systems</div>
            <h1 id="cert-title" className="cert-title" style={{ fontSize: 26, fontWeight: 500, fontSynthesis: "none" }}>
              Built to a standard.<br /><em>Certified to three.</em>
            </h1>
            <p>One integrated Bureau Veritas certificate attests to MECPL's quality, environmental and safety management.</p>
          </div>
        </div>
      </section>

      <section className="cert-assurance" aria-label="Certification at a glance" data-testid="cert-assurance">
        <div className="cert-wrap">
          <div className="cert-stats" aria-label="Certification summary" data-testid="cert-stats">
            <div><strong>3</strong><span>ISO standards</span></div>
            <div><strong>1</strong><span>Integrated certificate</span></div>
            <div><strong>2026</strong><span>Latest recertification</span></div>
          </div>
        </div>
      </section>

      <section className="cert-standards">
        <div className="cert-wrap">
          <div className="cert-label">Standards covered</div>
          <h2>Three standards, one integrated certificate.</h2>
          <p className="cert-note">One Bureau Veritas certificate covers all three standards. Select a standard to view the original document.</p>
          <div className="cert-showcase">
            <figure className="cert-doc">
              <button type="button" className="cert-doc-btn" data-testid="button-open-certificate-preview" aria-label="Open the Bureau Veritas integrated certificate" onClick={(e) => { openerRef.current = e.currentTarget; setIdx(0); }}>
                <img src={image} alt="Original Bureau Veritas integrated certificate" width={2095} height={3008} loading="lazy" />
                <span className="cert-doc-zoom"><Maximize2 size={14} aria-hidden="true" /> View full certificate</span>
              </button>
              <figcaption>Original Bureau Veritas certificate</figcaption>
            </figure>
            <CertificationStandards standards={standards} onOpen={(i, button) => { openerRef.current = button; setIdx(i); }} />
          </div>
        </div>
      </section>

      <CertificateViewer standards={standards} index={idx} onIndex={setIdx} image={image} pdf={pdf} openerRef={openerRef} />
    </div>
  );
}
