import { Icon } from "@/components/common/Icon";
import { SummaryCardProps } from "@/types/admin";

export const SummaryCard = ({
  title,
  value,
  icon,
  bgColor,
}: SummaryCardProps) => {
  return (
    <div className={`${bgColor} p-10 rounded-lg flex items-center gap-6.5`}>
      <div className="bg-white p-3 rounded-lg flex items-center justify-center w-12 h-12 border border-gray-ddd">
        <Icon type={icon} size={24} />
      </div>
      <div>
        <p className="text-lg font-medium mb-1">{title}</p>
        <p className="text-3xl font-semibold ">{value}</p>
      </div>
    </div>
  );
};
