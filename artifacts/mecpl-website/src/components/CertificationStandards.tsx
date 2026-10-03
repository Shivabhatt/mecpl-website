import { ArrowRight } from "lucide-react";
import "./CertificationStandards.css";

type Item = { code: string; name: string; short: string; blurb: string };
type Props = { standards: Item[]; onOpen: (index: number, button: HTMLButtonElement) => void };

const base = import.meta.env.BASE_URL;

export default function CertificationStandards({ standards, onOpen }: Props) {
  return (
    <div className="cs-slab" data-testid="certification-standards">
      <p className="cs-head">
        <span>Shared coverage</span>
        Bureau Veritas &middot; Certificate IND.26.15720/IM/U
      </p>
      <div className="cs-list">
        {standards.map((s, i) => (
          <button key={s.code} type="button" className="cs-item" onClick={(e) => onOpen(i, e.currentTarget)} data-testid={`card-standard-${i}`}>
            <span className="cs-mark">
              <img src={`${base}assets/recognition/iso-mark.png`} alt={`ISO logo for ${s.code}`} width={303} height={250} data-testid={`logo-standard-${i}`} />
            </span>
            <span className="cs-body">
              <span className="cs-code">{s.code}</span>
              <span className="cs-name">{s.name}</span>
              <span className="cs-blurb">{s.blurb}</span>
              <span className="cs-cta">View certificate <ArrowRight size={14} aria-hidden="true" /></span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
