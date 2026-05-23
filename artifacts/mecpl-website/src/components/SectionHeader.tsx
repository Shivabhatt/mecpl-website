interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  light?: boolean;
  center?: boolean;
}

export default function SectionHeader({ label, title, subtitle, light = false, center = false }: SectionHeaderProps) {
  return (
    <div className={`mb-10 ${center ? "text-center" : ""}`}>
      {label && (
        <span className="inline-block text-[#F47920] text-xs font-bold tracking-[0.2em] uppercase mb-3">
          {label}
        </span>
      )}
      <h2 className={`text-3xl sm:text-4xl font-black leading-tight ${light ? "text-white" : "text-[#1B2F6E]"}`}>
        {title}
      </h2>
      <div className={`w-14 h-1 bg-[#F47920] rounded mt-3 ${center ? "mx-auto" : ""}`}></div>
      {subtitle && (
        <p className={`mt-4 text-base leading-relaxed max-w-2xl ${light ? "text-white/70" : "text-gray-500"} ${center ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
