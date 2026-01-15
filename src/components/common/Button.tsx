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
    "inline-flex items-center justify-center rounded font-medium transition-colors gap-2";

  const variants = {
    primary: "bg-black text-white hover:bg-gray-800",
    secondary: "bg-white border border-gray-ddd text-gray-700 hover:bg-gray-50",
    danger: "bg-[#F6B9BA] border border-[#FC8181] hover:bg-[#FFE3E3]",
    ghost: "text-gray-400 hover:text-gray-600 px-0",
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
        className
      )}
      {...props}
    >
      {icon && <Icon type={icon} size={iconSize} />}
      {children}
    </button>
  );
};
