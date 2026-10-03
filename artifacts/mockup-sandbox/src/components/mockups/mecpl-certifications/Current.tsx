import "./_group.css";
import { SiteFooter, SiteHeader } from "./_shared";

const assetBase = "/__mockup/images/mecpl-certifications/";
const awards = [
  { title: "India SME 100 Awards", desc: "Recognised SME Excellence", img: `${assetBase}recognition/india-sme-100-awards.jpeg` },
  { title: "India's Small Giants", desc: "Emerging Enterprises of India", img: `${assetBase}recognition/indias-small-giants.png` },
  { title: "Iconic Brand of The Year 2016", desc: "Brand Recognition", img: `${assetBase}recognition/iconic-brand-2026.png` },
  { title: "ISO Certified Company", desc: "Quality, Environmental & Safety", img: `${assetBase}recognition/iso-mark.png` },
  { title: "CRISIL BBB / Positive", desc: "Financial Rating", img: `${assetBase}recognition/crisil-rating.jpg` },
  { title: "NSCI Safety Awards", desc: "7 Award-Winning Projects", img: `${assetBase}awards/nsci-safety-award-2025.png` },
  { title: "CIDC Vishwakarma Awards", desc: "Construction Health, Safety & Environment", img: `${assetBase}awards/cidc-vishwakarma-award-2026.png` },
  { title: "BAI Well Built Structure Awards", desc: "13 Award-Winning Projects", img: `${assetBase}awards/bai-well-built-structure-award.png` },
  { title: "International Safety Award 2026", desc: "Distinction", img: `${assetBase}awards/british-safety-council-award-2026.jpeg` },
];

export function Current() {
  return (
    <div className="mecpl-preview">
      <SiteHeader />
      <main className="mecpl-page-top">
        <section id="certifications" data-testid="section-about-awards" className="mecpl-original-awards">
          <div className="mecpl-original-awards-inner">
            <div className="mecpl-original-awards-heading">
              <span className="mecpl-original-awards-kicker">AWARDS &amp; CERTIFICATIONS</span>
              <h1>Recognised for a Higher Standard.</h1>
            </div>
            <div className="mecpl-original-awards-grid">
              {awards.map((award, index) => (
                <div className="mecpl-original-award" key={`${award.title}-${index}`}>
                  <div className="mecpl-original-award-card">
                    {award.img && (
                      <div className="mecpl-recognition-mark">
                        <img src={award.img} alt={award.title} />
                      </div>
                    )}
                    <h2>{award.title}</h2>
                    <p>{award.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}