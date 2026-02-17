import { AdminSummaryCard } from "@/components/admin/layout/AdminSummaryCard";
import { AdminSummaryGridProps } from "@/types/admin";

export const AdminSummaryGrid = ({
  items,
  columns = 2,
}: AdminSummaryGridProps) => {
  const gridColumnsClass = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4",
  }[columns];

  return (
    <div className={`mb-8 grid gap-4 sm:gap-6 ${gridColumnsClass}`}>
      {items.map((item, idx) => (
        <AdminSummaryCard key={idx} {...item} />
      ))}
    </div>
  );
};
