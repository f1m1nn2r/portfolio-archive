import { AdminActionBarProps } from "@/types/admin";

export const AdminActionBar = ({
  children,
  align = "right",
}: AdminActionBarProps) => {
  const alignClass = {
    left: "justify-start",
    right: "justify-end",
    between: "justify-between",
  };

  return (
    <div className={`mb-4 flex gap-2 ${alignClass[align]}`}>{children}</div>
  );
};
