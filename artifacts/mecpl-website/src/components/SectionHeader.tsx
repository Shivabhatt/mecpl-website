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
        <span className="text-[#C41E3A] text-[10px] font-black tracking-widest uppercase block">
          {label}
        </span>
      )}
      {useH1 ? (
        <h1 className="page-title-font text-5xl leading-tight text-[#111827]">
          {title}
        </h1>
      ) : (
        <h3 className="page-title-font text-3xl leading-tight text-[#111827]">
          {title}
        </h3>
      )}
      {subtitle && (
        <p className="page-subtitle-font text-[#4b5563] text-sm leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
