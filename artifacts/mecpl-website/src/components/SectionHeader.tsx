interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}

export default function SectionHeader({ label, title, subtitle, center = true, light = false }: SectionHeaderProps) {

  return (
    <div className={`space-y-3 ${center ? "text-center max-w-3xl mx-auto px-6 pt-6 pb-0" : ""}`}>
      {label && (
        <span className="text-[#C41E3A] text-[10px] font-black tracking-widest uppercase block">
          {label}
        </span>
      )}
      <h3 className={`text-3xl font-black tracking-tight uppercase leading-tight ${light ? "text-white" : "text-white"}`}>
        {title}
      </h3>
      {subtitle && (
        <p className="text-gray-400 text-sm leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
