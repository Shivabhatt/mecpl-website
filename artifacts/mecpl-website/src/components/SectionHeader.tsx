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
          {label}
        </span>
      )}
      {useH1 ? (
        <h1 className="page-title-font text-5xl leading-tight text-[#232529]">
          {title}
        </h1>
      ) : (
        <h3 className="page-title-font text-3xl leading-tight text-[#232529]">
          {title}
        </h3>
      )}
      {subtitle && (
        <p className="page-subtitle-font text-[#232529] text-sm leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
