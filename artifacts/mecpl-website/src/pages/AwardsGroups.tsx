import { useRef, useState } from "react";
import { awards, type Award } from "@/data/awardsData";
import AwardIssuerDialog from "./AwardIssuerDialog";

const base = import.meta.env.BASE_URL;
const a = (p: string) => `${base}assets/awards/${p}`;

const gallery = [
  { img: "2002-01-large.webp", t: "BAI", s: "Well Built Structure" },
  { img: "2010-01-large.webp", t: "BAI", s: "Well Built Structure Competition" },
  { img: "2015-01-large.webp", t: "Indian Concrete Institute", s: "Birla Super Award" },
  { img: "2017-02-large.webp", t: "India SME 100", s: "SME Awards" },
  { img: "EON-WEST.jpeg.jpg", t: "PCERF", s: "Construction Safety Awards" },
  { img: "2012-01-large.webp", t: "MECPL Team", s: "Award ceremony" },
  { img: "2013-01-large.webp", t: "MECPL Team", s: "Award ceremony" },
  { img: "WhatsApp-Image-2023-12-27.jpg", t: "MECPL Team", s: "Award ceremony" },
];

const defs: { group: string; category: Award["category"]; items: { key: string; label: string; re: RegExp; logo?: string }[] }[] = [
  { group: "National & State Recognition", category: "national-state", items: [
    { key: "british", label: "British Safety Council", re: /british/i, logo: "bsc-symbol.png" },
    { key: "cidc", label: "CIDC Vishwakarma Awards", re: /cidc/i },
    { key: "nsci-national", label: "NSCI National & State Awards", re: /nsci/i, logo: "nsci-symbol.png" },
    { key: "sme", label: "SME 100 Awards", re: /\bSME\b|India SME Forum/i },
    { key: "iconic", label: "Iconic Brand of the Year", re: /iconic/i, logo: "iconic-brand-2018.png" } ] },
  { group: "Safety Awards", category: "safety", items: [
    { key: "pcerf", label: "PCERF Safety Awards", re: /pcerf/i },
    { key: "nsci", label: "NSCI Safety Awards", re: /nsci/i, logo: "nsci-symbol.png" },
    { key: "apex", label: "Apex India Safety Awards", re: /apex/i, logo: "apex-symbol.png" } ] },
  { group: "Quality Awards", category: "quality", items: [
    { key: "bai", label: "Well Built Structure Awards for Quality", re: /builders|bai/i },
    { key: "ici", label: "Indian Concrete Institute Awards", re: /concrete|\bici\b/i, logo: "ici-mark.png" },
    { key: "aesa", label: "AESA Awards", re: /aesa/i, logo: "aesa-mark.png" } ] },
];
const match = (x: Award, re: RegExp) => re.test(x.issuer) || re.test(x.title);

export default function AwardsGroups() {
  const lb = useRef<HTMLDialogElement>(null);
  const dlg = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [pic, setPic] = useState(gallery[0]);
  const [sel, setSel] = useState<{ key: string; label: string; list: Award[] } | null>(null);
  const open = (r: React.RefObject<HTMLDialogElement | null>, e: React.MouseEvent) => {
    opener.current = e.currentTarget as HTMLElement;
    r.current?.showModal();
  };
  const close = () => opener.current?.focus();
  const count = (c: string) => awards.filter((x) => x.category === c).length;

  return (
    <>
      <section className="aw-gallery-intro" aria-labelledby="aw-gallery-title">
        <span className="aw-gallery-kicker">AWARDS GALLERY</span>
        <h2 id="aw-gallery-title" className="mecpl-role-h2-medium aw-gallery-title">
          Moments That Inspire Us.
        </h2>
        <p>A glimpse of our prestigious awards and certificates over the years.</p>
      </section>

      <section className="aw-gal" aria-label="Award photos">
        <div className="aw-rail">
          <div className="aw-track" role="group" aria-label="Award photos">
            {gallery.map((g) => (
              <button key={g.img} className="aw-card" onClick={(e) => { setPic(g); open(lb, e); }} data-testid={`button-gallery-${g.img}`}>
                <img src={a(g.img)} alt={`${g.t} ${g.s}`} loading="lazy" />
                <b>{g.t}</b>
                <span>{g.s}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="aw-strip" role="group" aria-label="Recognition totals">
        <div><strong>{awards.length}</strong><span>Verified Recognitions<br />Since 2002</span></div>
        <div><strong>{count("safety")}</strong><span>Safety<br />Awards</span></div>
        <div><strong>{count("quality")}</strong><span>Quality<br />Awards</span></div>
         <div><strong>{count("national-state")}</strong><span>National &amp; State<br />Awards</span></div>
      </div>

      <section className="aw-groups">
        {defs.map((g) => {
          const items = g.items.map((i) => ({ ...i, list: awards.filter((x) => x.category === g.category && match(x, i.re)) })).filter((i) => i.list.length);
          if (!items.length) return null;
          return (
            <div className="aw-group" key={g.group}>
              <h2 className="mecpl-role-h2-medium">{g.group}</h2>
              <div className="aw-row">
                {items.map((i) => {
                  const logo = i.logo ? a(i.logo) : i.list.find((x) => x.logo)?.logo ? base + i.list.find((x) => x.logo)!.logo : "";
                  return (
                    <button key={i.key} className="aw-badge" aria-describedby={`aw-tip-${g.category}-${i.key}`} onClick={(e) => { setSel({ key: i.key, label: i.label, list: i.list }); open(dlg, e); }} data-testid={`button-issuer-${i.key}`}>
                      <span className="aw-tooltip" id={`aw-tip-${g.category}-${i.key}`} role="tooltip">Click to view Certificate</span>
                      <span className="aw-circle">
                        {logo ? <img src={logo} alt="" onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.nextElementSibling?.removeAttribute("hidden"); }} /> : null}
                        <i hidden={!!logo}>{i.key.toUpperCase().slice(0, 4)}</i>
                      </span>
                      <b>{i.label}</b>
                      <span>{i.list.length} {i.list.length === 1 ? "Award" : "Awards"} Received</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>

      <dialog ref={lb} className="aw-dlg aw-lb" aria-label={`${pic.t} ${pic.s}`} onClose={close} onClick={(e) => e.target === lb.current && lb.current?.close()}>
        <img src={a(pic.img)} alt={`${pic.t} ${pic.s}`} />
        <p>{pic.t} — {pic.s} <button className="aw-x" style={{ float: "right", color: "#000" }} aria-label="Close" onClick={() => lb.current?.close()}>×</button></p>
      </dialog>

      <AwardIssuerDialog dialogRef={dlg} selection={sel} onClose={close} />
    </>
  );
}
