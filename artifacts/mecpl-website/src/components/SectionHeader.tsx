import { sentenceCase } from "@/lib/typography";

interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
  useH1?: boolean;
}

export default function SectionHeader({ label, title, subtitle, center = true, light = false, useH1 = true }: SectionHeaderProps) {

  return (
    <div className={`space-y-3 ${center ? "text-center max-w-3xl mx-auto px-6 pt-6 pb-0" : ""}`}>
      {label && (
        <span className="mecpl-section-label">
          {sentenceCase(label)}
        </span>
      )}
      {useH1 ? (
        <h1 className="page-title-font text-5xl leading-tight text-mecpl-text">
          {sentenceCase(title)}
        </h1>
      ) : (
        <h2 className="mecpl-type-section-title page-title-font text-3xl leading-tight text-mecpl-text">
          {sentenceCase(title)}
        </h2>
      )}
      {subtitle && (
        <p className="page-subtitle-font text-mecpl-text text-sm leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
