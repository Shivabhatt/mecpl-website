import { useEffect, type RefObject } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, Download, X } from "lucide-react";

export type Standard = { code: string; name: string; short: string };

type Props = {
  standards: Standard[];
  index: number | null;
  onIndex: (i: number | null) => void;
  image: string;
  pdf: string;
  openerRef: RefObject<HTMLButtonElement | null>;
};

export default function CertificateViewer({ standards, index, onIndex, image, pdf, openerRef }: Props) {
  const open = index !== null;
  const n = standards.length;
  useEffect(() => {
    if (index === null) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        onIndex((index + (e.key === "ArrowRight" ? 1 : -1) + n) % n);
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [index, n, onIndex]);
  const s = index !== null ? standards[index] : null;
  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onIndex(null)}>
      <Dialog.Portal>
        <Dialog.Overlay className="cert-overlay" />
        <Dialog.Content className="cert-viewer" data-testid="certificate-viewer" onCloseAutoFocus={(e) => { e.preventDefault(); openerRef.current?.focus(); }}>
          <header className="cert-viewer-head">
            <div>
              <p className="cert-viewer-kicker">Bureau Veritas / MECPL</p>
              <Dialog.Description className="cert-viewer-sub">One integrated certificate covers all three standards.</Dialog.Description>
            </div>
            <a className="cert-viewer-btn" href={pdf} download data-testid="button-viewer-download" aria-label="Download certificate PDF"><Download size={16} /></a>
            <Dialog.Close className="cert-viewer-btn" aria-label="Close" data-testid="button-viewer-close"><X size={18} /></Dialog.Close>
          </header>
          <div className="cert-viewer-stage">
            <img src={image} alt="Original Bureau Veritas integrated certificate covering ISO 9001:2015, ISO 14001:2015 and ISO 45001:2018" className="cert-viewer-img" data-testid="img-certificate" />
          </div>
          <div className="cert-viewer-controls">
            <button className="cert-nav cert-nav--prev" aria-label="Previous standard" data-testid="button-cert-prev" onClick={() => index !== null && onIndex((index - 1 + n) % n)}><ChevronLeft size={22} /></button>
            <div className="cert-viewer-caption" aria-live="polite">
              <Dialog.Title className="cert-viewer-title">{s?.code} · {s?.short}</Dialog.Title>
              <span className="cert-viewer-count" data-testid="certificate-counter">Standard {index !== null ? index + 1 : 0} / {n}</span>
            </div>
            <button className="cert-nav cert-nav--next" aria-label="Next standard" data-testid="button-cert-next" onClick={() => index !== null && onIndex((index + 1) % n)}><ChevronRight size={22} /></button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
