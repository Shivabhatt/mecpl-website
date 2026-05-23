interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}

export default function SectionHeader({ label, title, subtitle, center = false, light = false }: SectionHeaderProps) {
  return (
    <div className={`space-y-3 mb-10 ${center ? "text-center max-w-2xl mx-auto" : ""}`}>
      {label && (
        <span className="text-[#C41E3A] text-[10px] font-black tracking-widest uppercase block">
          {label}
        </span>
      )}
      <h2 className={`text-3xl md:text-5xl font-black tracking-tight uppercase leading-tight ${light ? "text-white" : "text-white"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-400 text-sm leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
