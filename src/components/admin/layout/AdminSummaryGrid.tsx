import { AdminSummaryCard } from "@/components/admin/layout/AdminSummaryCard";
import { AdminSummaryGridProps } from "@/types/admin";

export const AdminSummaryGrid = ({
  items,
  columns = 2,
}: AdminSummaryGridProps) => {
  return (
    <div className={`grid grid-cols-${columns} gap-6 mb-8`}>
      {items.map((item, idx) => (
        <AdminSummaryCard key={idx} {...item} />
      ))}
    </div>
  );
};
