import { useEffect, useRef, useState, type RefObject } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import type { Award } from "@/data/awardsData";
import { awardCertificateImages, type AwardCertificateImage } from "@/data/awardCertificates";

type Selection = { key: string; label: string; list: Award[] };
const base = import.meta.env.BASE_URL;

export default function AwardIssuerDialog({
  dialogRef, selection, onClose,
}: {
  dialogRef: RefObject<HTMLDialogElement | null>;
  selection: Selection | null;
  onClose: () => void;
}) {
  const imagesRef = useRef<HTMLDivElement>(null);
  const recordsRef = useRef<HTMLOListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const recordPhotos: AwardCertificateImage[] = (selection?.list ?? []).filter((award) => award.image).map((award) => ({
    src: award.image!,
    caption: `${award.title} · ${award.project ? `${award.project} · ` : ""}${award.year}`,
  }));
  const profileScans = selection ? awardCertificateImages[selection.key] ?? [] : [];
  const images = [...recordPhotos, ...profileScans].filter((image, index, list) =>
    list.findIndex((other) => other.src === image.src) === index
  );

  useEffect(() => {
    setActiveIndex(0);
    imagesRef.current?.scrollTo({ top: 0, behavior: "instant" });
    recordsRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [selection]);

  const scrollImages = (direction: number) => {
    const viewport = imagesRef.current;
    const next = Math.max(0, Math.min(images.length - 1, activeIndex + direction));
    if (viewport) viewport.scrollTo({ top: next * viewport.clientHeight, behavior: "smooth" });
  };
  const shownIndex = Math.min(activeIndex, Math.max(0, images.length - 1));

  return (
    <dialog
      ref={dialogRef}
      className="aw-dlg aw-issuer-dialog"
      data-lenis-prevent
      aria-labelledby="aw-dlg-t"
      onClose={onClose}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right ||
          event.clientY < bounds.top || event.clientY > bounds.bottom) event.currentTarget.close();
      }}
    >
      <button className="aw-issuer-close" aria-label="Close award details" onClick={() => dialogRef.current?.close()}>
        <X size={20} />
      </button>
      <div className="aw-issuer-layout">
        <section className="aw-issuer-copy" aria-label="Award records">
          <div className="aw-label">AWARDS &amp; RECOGNITION</div>
          <h2 id="aw-dlg-t" className="mecpl-role-h2-medium">{selection?.label}</h2>
          <p className="aw-issuer-intro">
            {selection?.list.length} {selection?.list.length === 1 ? "recognition" : "recognitions"}.
            {" "}Award, project and year details from our company profile.
          </p>
          <ol ref={recordsRef} className="aw-issuer-records" tabIndex={0}>
            {selection?.list.map((award) => (
              <li key={award.id} className="aw-issuer-record">
                <strong className="aw-issuer-record-title">{award.title}</strong>
                <dl>
                  <div><dt>Project</dt><dd>{award.project || "Not listed in award table"}</dd></div>
                  <div><dt>Year</dt><dd>{award.year}</dd></div>
                </dl>
                {award.note && <p className="aw-issuer-note">{award.note}</p>}
              </li>
            ))}
          </ol>
        </section>
        <section className="aw-issuer-media" aria-label="Award images">
          <div ref={imagesRef} className="aw-issuer-images" tabIndex={0}
            aria-label="Scroll award certificates"
            onScroll={(event) => {
              const viewport = event.currentTarget;
              if (viewport.clientHeight) setActiveIndex(Math.max(0, Math.min(images.length - 1,
                Math.round(viewport.scrollTop / viewport.clientHeight))));
            }}>
            {images.length ? images.map((image) => (
              <figure key={image.src}>
                <img src={base + image.src} alt={image.caption} loading="lazy" />
              </figure>
            )) : <div className="aw-issuer-empty">
              <strong>Original award images are not yet available.</strong>
              <p>No matching scan is included in the company profile. The verified award, project and year details are listed alongside.</p>
            </div>}
          </div>
          {images.length > 0 && <div className="aw-issuer-media-controls">
            <button aria-label="Previous award certificate" disabled={shownIndex === 0} onClick={() => scrollImages(-1)}>
              <ArrowLeft size={18} />
            </button>
            <div className="aw-issuer-image-caption" aria-live="polite">
              <strong>{images[shownIndex]?.caption}</strong>
              <span>{shownIndex + 1} / {images.length}</span>
            </div>
            <button aria-label="Next award certificate" disabled={shownIndex === images.length - 1} onClick={() => scrollImages(1)}>
              <ArrowRight size={18} />
            </button>
          </div>}
        </section>
      </div>
    </dialog>
  );
}
