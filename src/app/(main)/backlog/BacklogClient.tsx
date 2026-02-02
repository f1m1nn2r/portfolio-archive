"use client";

import useSWR from "swr";
import { AdminTable } from "@/components/admin/table/AdminTable";
import { BacklogMainColumns } from "@/components/backlog/BacklogMainColumns";
import { CommonPagination } from "@/components/common/Pagination";
import { Backlog, BacklogResponse } from "@/types/admin";
import { useMemo, useState } from "react";
import { getBacklogs } from "@/services/backlog/client";
import { BacklogClientProps } from "@/types/ui/backlog";
import { useAdminMode } from "@/hooks/common/useAdminMode";

export default function BacklogClient({
  initialBacklogs,
  initialEpics,
}: BacklogClientProps) {
  const { isMaster } = useAdminMode();
  const { data: backlogResponse } = useSWR<BacklogResponse>(
    "/api/backlog",
    () => getBacklogs(),
    {
      fallbackData: {
        items: initialBacklogs.slice(0, 10),
        stats: {
          total: initialBacklogs.length,
          completed: initialBacklogs.filter((b) => b.is_done).length,
          completionRate: 0,
        },
      },
      revalidateOnFocus: true,
    },
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const currentData = useMemo(
    () => backlogResponse?.items || [],
    [backlogResponse],
  );

  const totalPages = Math.ceil(currentData.length / itemsPerPage);

  const pagedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return currentData.slice(start, start + itemsPerPage);
  }, [currentData, currentPage]);

  const columns = useMemo(
    () => BacklogMainColumns(initialEpics, currentPage, isMaster),
    [initialEpics, currentPage, isMaster],
  );

  return (
    <div className="mt-8 w-full overflow-x-auto">
      <div className="min-w-[1200px] [&_table]:table-auto">
        <AdminTable<Backlog>
          columns={columns}
          data={pagedData}
          selectedIds={[]}
          getItemId={(item) => String(item.id)}
          showAddColumn={false}
          onToggleSelect={() => {}}
          onToggleSelectAll={() => {}}
        />

        <div className="mt-6 flex justify-center">
          <CommonPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
}
