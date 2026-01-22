import { Icon } from "@/components/common/Icon";
import { ButtonProps } from "@/types/common/ui";
import { twMerge } from "tailwind-merge";

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  icon,
  className = "",
  ...props
}: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded font-medium transition-colors gap-1.5 cursor-pointer";

  const variants = {
    primary: "bg-black text-white hover:bg-gray-800",
    secondary: "bg-white border border-gray-ddd text-gray-700",
    danger: "bg-point-red border border-[#FC8181] text-black/70",
    ghost: "px-0 bg-bg-light border border-gray-ddd",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-3 py-1.5 text-base",
    lg: "px-6 py-3 text-base",
  };

  const iconSize = size === "sm" ? 16 : 20;

  return (
    <button
      className={twMerge(
        `${baseStyles} ${variants[variant]} ${sizes[size]}`,
        className,
      )}
      {...props}
    >
      {icon && <Icon type={icon} size={iconSize} />}
      {children}
    </button>
  );
};
