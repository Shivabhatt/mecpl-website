import type { ReactNode } from "react";

type MecplArrowButtonContentProps = {
  children: ReactNode;
};

export default function MecplArrowButtonContent({
  children,
}: MecplArrowButtonContentProps) {
  return (
    <>
      <span className="mecpl-arrow-fill-button__label text-[10px]">{children}</span>
      <span
        className="mecpl-arrow-fill-button__circle"
        aria-hidden="true"
      />
      <span className="mecpl-arrow-fill-button__mask" aria-hidden="true">
        <span className="mecpl-arrow-fill-button__mask-label text-[10px]">{children}</span>
      </span>
    </>
  );
}
