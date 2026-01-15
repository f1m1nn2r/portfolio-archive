import { BadgeProps } from "@/types/common/ui";

export const Badge = ({
  children,
  className = "",
  backgroundColor,
}: BadgeProps) => {
  return (
    <span
      className={`inline-flex items-center justify-center px-2 py-1 rounded text-sm ${className}`}
      style={{ backgroundColor: backgroundColor }}
    >
      {children}
    </span>
  );
};
