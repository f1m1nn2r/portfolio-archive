import { Icon } from "@/components/common/Icon";
import { SummaryCardProps } from "@/types/admin";

export const AdminSummaryCard = ({
  title,
  value,
  icon,
  bgColor,
}: SummaryCardProps) => {
  return (
    <div className={`${bgColor} flex items-center gap-4 rounded-lg p-5 sm:gap-6.5 sm:p-8 lg:p-10`}>
      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-ddd bg-white sm:h-12 sm:w-12">
        <Icon type={icon} size={20} />
      </div>
      <div>
        <p className="mb-1 text-sm font-medium sm:text-base lg:text-lg">{title}</p>
        <p className="text-xl font-semibold sm:text-2xl lg:text-3xl">{value}</p>
      </div>
    </div>
  );
};
