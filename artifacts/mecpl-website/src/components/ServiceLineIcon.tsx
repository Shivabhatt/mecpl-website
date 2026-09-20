export type ServiceIconType =
  | "residential"
  | "institutional-industrial"
  | "commercial"
  | "infrastructure"
  | "interiors"
  | "turnkey";

interface ServiceLineIconProps {
  type: ServiceIconType;
  className?: string;
}

export default function ServiceLineIcon({ type, className = "" }: ServiceLineIconProps) {
  const sharedProps = {
    className,
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (type === "residential") {
    return (
      <svg {...sharedProps}>
        <path d="M8 23.5 24 10l16 13.5" />
        <path d="M11.5 21v18h25V21" />
        <path d="M19 39V27h10v12" />
        <path d="M15.5 25.5h4M28.5 25.5h4" />
      </svg>
    );
  }

  if (type === "institutional-industrial") {
    return (
      <svg {...sharedProps}>
        <path d="M6 40V23l11 5v-7l11 6V14h7v26" />
        <path d="M35 10h5v30H6" />
        <path d="M11 34h2M18 34h2M25 34h2M31 34h2M39 34h2" />
        <path d="M37 10V6h3v4" />
      </svg>
    );
  }

  if (type === "commercial") {
    return (
      <svg {...sharedProps}>
        <path d="M7 40V19h12v21M19 40V10h14v30M33 40V23h8v17" />
        <path d="M4 40h40" />
        <path d="M11 24h4M11 29h4M11 34h4M23 15h6M23 21h6M23 27h6M23 33h6M36 28h2M36 33h2" />
      </svg>
    );
  }

  if (type === "infrastructure") {
    return (
      <svg {...sharedProps}>
        <path d="M8 40 21 8h6l13 32" />
        <path d="M15 40 23 8M33 40 25 8" />
        <path d="M18.5 29h11M20.5 21h7M22 14h4" />
        <path d="M5 40h38" />
      </svg>
    );
  }

  if (type === "interiors") {
    return (
      <svg {...sharedProps}>
        <path d="M10 40V8h28v32" />
        <path d="M16 40V15h16v25" />
        <path d="M16 27h16" />
        <path d="M22 21h4M22 33h4" />
        <path d="M7 40h34" />
      </svg>
    );
  }

  return (
    <svg {...sharedProps}>
      <path d="M19 7h10l1.5 5.2 4.7 2.7 5.3-1.4 5 8.6-3.8 3.8v5.4l3.8 3.8-5 8.6-5.3-1.4-4.7 2.7-1.5 5.2H19L17.5 45l-4.7-2.7-5.3 1.4-5-8.6 3.8-3.8v-5.4l-3.8-3.8 5-8.6 5.3 1.4 4.7-2.7L19 7Z" transform="scale(.78) translate(6.8 1)" />
      <circle cx="24" cy="24" r="7" />
      <path d="m20.5 24 2.3 2.3 5-5" />
    </svg>
  );
}