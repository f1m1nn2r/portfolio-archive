import { ICON_MAP, MyIconProps } from "@/types/icon";

export const Icon = ({ type, size = 24, color, className }: MyIconProps) => {
  const Icon = ICON_MAP[type];

  if (!Icon) {
    console.warn(`[Icon.tsx]: ${type}을 찾을 수 없습니다.`);
    return null;
  }

  return <Icon size={size} color={color} className={className} />;
};
