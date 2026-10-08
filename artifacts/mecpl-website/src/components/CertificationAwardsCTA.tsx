import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import "./CertificationAwardsCTA.css";

export default function CertificationAwardsCTA() {
  return (
    <section className="cert-awards-cta" aria-labelledby="cert-awards-cta-title" data-testid="cert-awards-cta">
      <div className="cert-awards-cta-inner">
        <p className="cert-awards-cta-eyebrow">The journey continues</p>
        <h2
          id="cert-awards-cta-title"
          style={{ fontSize: 26, fontWeight: 300, fontSynthesis: "none" }}
        >
          Same purpose.<br />Greater possibilities.
        </h2>
        <p className="cert-awards-cta-copy">
          From the standards we uphold to the recognition we earn, our purpose remains the same:
          to build better, safer and stronger.
        </p>
        <Link href="/awards" className="cert-awards-cta-button" data-testid="link-cert-awards">
          View Awards <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}