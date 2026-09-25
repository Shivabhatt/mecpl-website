import { Quote } from "lucide-react";
import "./_group.css";
import "./Reference.css";

const founderImage = "/__mockup/images/mecpl-founder.jpg";

export function Reference() {
  return (
    <div className="founder-preview">
      <section className="founder-section" aria-labelledby="founder-reference-title">
        <div className="founder-layout">
          <div className="founder-photo-shell">
            <img src={founderImage} alt="M. B. Nambiar" />
            <div className="founder-photo-quote" aria-hidden="true">
              <Quote size={24} />
            </div>
          </div>

          <div className="founder-copy">
            <span className="founder-kicker">OUR FOUNDER</span>
            <h2 id="founder-reference-title">A Vision That Built Generations.</h2>
            <div className="founder-identity">
              <span className="founder-name">M. B. Nambiar</span>
              <span className="founder-role">Founder &amp; Promoter</span>
            </div>
            <div className="founder-bio">
              <p>
                A civil engineer with over six decades of experience, M. B. Nambiar began his professional journey in 1964 and went on to establish Shreyas Constructions, laying the foundation for what would become the Millennium Engineers group.
              </p>
              <p>
                Since the establishment of MECPL in 1999, his vision and entrepreneurial leadership have shaped the company&apos;s growth, reputation and enduring commitment to quality, safety and professional excellence.
              </p>
              <p>
                His contribution to the construction industry has been recognised with the Nirman Ratna Lifetime Achievement Award by the Builders Association of India and the AES Lifetime Achievement Award in 2022, presented by the Architects, Engineers and Surveyors Association (AESA), Pune.
              </p>
            </div>
            <div className="founder-quote">
              <div className="founder-quote-copy">
                <p>
                  A legacy built on experience. A culture built to endure.
                </p>
                <span>M. B. Nambiar</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}