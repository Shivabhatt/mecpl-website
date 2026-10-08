import type { Ref } from "react";

type RecognitionMarksSectionProps = {
  sectionRef?: Ref<HTMLElement>;
};

const assetBase = import.meta.env.BASE_URL;

const recognitionData = [
  {
    title: "India's Small Giants",
    detail: "Emerging Enterprises of India",
    image: "assets/recognition/indias-small-giants.png",
    maxLogoWidth: 110,
    maxLogoHeight: 75,
    displayLogoWidth: 54,
    displayLogoHeight: 45,
  },
  {
    title: "India SME 100 Awards",
    detail: "Recognised SME Excellence",
    image: "assets/recognition/india-sme-100-awards.jpeg",
    maxLogoWidth: 130,
    maxLogoHeight: 70,
    displayLogoWidth: 80,
    displayLogoHeight: 40,
    cropLogoPadding: true,
  },
  {
    title: "British Safety Council",
    detail: "International Safety Award – Distinction 2026",
    image: "assets/recognition/british-safety-council.png",
    maxLogoWidth: 150,
    maxLogoHeight: 65,
    displayLogoWidth: 95,
    displayLogoHeight: 44,
    cropLogoPadding: true,
  },
  {
    title: "CRISIL BBB / Positive",
    detail: "Financial Rating",
    image: "assets/recognition/crisil-rating.jpg",
    maxLogoWidth: 145,
    maxLogoHeight: 70,
    displayLogoWidth: 95,
    displayLogoHeight: 42,
    cropLogoPadding: true,
    trimLogoBorder: true,
  },
];

export default function RecognitionMarksSection({
  sectionRef,
}: RecognitionMarksSectionProps) {
  return (
    <section
      id="recognition"
      ref={sectionRef}
      className="bg-white px-5 py-7 md:py-8"
    >
      <div className="mx-auto w-full">
        <div className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
          <div className="grid min-w-[560px] grid-cols-5 md:min-w-0">
            {recognitionData.map((item, index) => (
              <div
                key={item.title}
                className={`rec-card flex min-h-[142px] flex-col items-center justify-center px-2 py-3 text-center ${
                  index > 0 ? "border-l border-mecpl-dark/[0.08]" : ""
                }`}
              >
                <div className="recognition-mark-frame">
                  <img
                    src={`${assetBase}${item.image}`}
                    alt={item.title}
                    className="recognition-mark-image"
                    style={{
                      width: item.displayLogoWidth,
                      height: item.displayLogoHeight,
                      maxWidth: `min(100%, ${item.maxLogoWidth}px)`,
                      maxHeight: `min(100%, ${item.maxLogoHeight}px)`,
                      objectFit: item.cropLogoPadding ? "cover" : "contain",
                      clipPath: item.trimLogoBorder ? "inset(0 2.2%)" : undefined,
                    }}
                    loading="lazy"
                  />
                </div>
                <h2 className="rec-card-title recognition-card-title mt-2 max-w-[180px] text-[#30343a]">
                  {item.title}
                </h2>
                <p
                  className="recognition-card-detail mt-1 max-w-[180px] text-[#74777b]"
                  style={item.detail === "Brand Recognition" ? { color: "#4f545b" } : undefined}
                >
                  {item.detail}
                </p>
              </div>
            ))}
            <div
              role="group"
              aria-label="ISO certifications"
              className="rec-card flex min-h-[142px] flex-col items-center justify-center border-l border-mecpl-dark/[0.08] px-2 py-3 text-center"
            >
              <div className="recognition-mark-frame">
                <img
                  src={`${assetBase}assets/recognition/iso-mark.png`}
                  alt="Blue ISO logo"
                  className="recognition-mark-image"
                  style={{
                    width: 55,
                    height: 45,
                    maxWidth: "min(100%, 95px)",
                    maxHeight: "min(100%, 80px)",
                    filter: "drop-shadow(0 2px 5px rgba(23,95,155,0.16))",
                  }}
                  loading="lazy"
                />
              </div>
              <h2 className="rec-card-title recognition-card-title mt-2 max-w-[180px] text-[#30343a]">
                ISO Certified
              </h2>
              <p className="recognition-card-detail mt-1 w-full max-w-[220px] text-[#74777b]">
                <span className="block" style={{ color: "#4f545b" }}>
                  ISO 14001:2015, ISO 9001:2015,
                </span>
                <span className="block" style={{ color: "#4f545b" }}>
                  ISO 45001: 2018
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
