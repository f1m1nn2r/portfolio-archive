import { SummaryCard } from "@/components/admin/SummaryCard";
import { AdminSummaryGridProps } from "@/types/admin";

export const AdminSummaryGrid = ({
  items,
  columns = 2,
}: AdminSummaryGridProps) => {
  return (
    <div className={`grid grid-cols-${columns} gap-6 mb-8`}>
      {items.map((item, idx) => (
        <SummaryCard key={idx} {...item} />
      ))}
    </div>
  );
};
