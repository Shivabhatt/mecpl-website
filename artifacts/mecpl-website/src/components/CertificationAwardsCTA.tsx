import MecplArrowButtonContent from "./MecplArrowButtonContent";
import { Link } from "wouter";
import "./CertificationAwardsCTA.css";

export default function CertificationAwardsCTA() {
  return (
    <section className="cert-awards-cta" aria-labelledby="cert-awards-cta-title" data-testid="cert-awards-cta">
      <div className="cert-awards-cta-inner">
        <p className="cert-awards-cta-eyebrow">The journey continues</p>
        <h2 id="cert-awards-cta-title">
          Same Purpose.<br />Greater Possibilities.
        </h2>
        <p className="cert-awards-cta-copy">
          From the standards we uphold to the recognition we earn, our purpose remains the same:
          to build better, safer and stronger.
        </p>
        <Link href="/awards" className="mecpl-arrow-fill-button mecpl-arrow-fill-button--primary cert-awards-cta-action" data-testid="link-cert-awards">
          <MecplArrowButtonContent>View Awards</MecplArrowButtonContent>
        </Link>
      </div>
    </section>
  );
}