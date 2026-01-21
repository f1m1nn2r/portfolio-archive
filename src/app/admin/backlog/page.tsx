"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { MOCK_BACKLOG } from "@/mock/backlog";
import { Badge } from "@/components/common/Badge";
import { CommonPagination } from "@/components/common/Pagination";
import { AdminPageLayout } from "@/components/admin/layout/AdminPageLayout";
import { AdminSummaryGrid } from "@/components/admin/layout/AdminSummaryGrid";
import { AdminActionBar } from "@/components/admin/layout/AdminActionBar";
import { AdminTable } from "@/components/admin/table/AdminTable";
import { AdminSummaryItem, AdminTableColumn } from "@/types/admin";
import { Backlog } from "@/types/backlog";

export default function BacklogPage() {
  const [page, setPage] = useState(1);
  const totalPages = 5;
  const [backlogData, setBacklogData] = useState<Backlog[]>(MOCK_BACKLOG);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // ------------------ 요약 데이터 계산
  const { totalCount, completionRate } = useMemo(() => {
    const total = backlogData.length;
    const completed = backlogData.filter((item) => item.isDone).length;
    return {
      totalCount: total,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  }, [backlogData]);

  // ------------------ 핸들러
  const toggleStatus = (id: string, field: "isDone" | "isDesigned") => {
    setBacklogData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: !item[field] } : item,
      ),
    );
  };

  // 개별 행 선택 토글
  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id],
    );
  };

  // 전체 행 선택/해제 토글
  const toggleSelectAll = () => {
    if (selectedIds.length === backlogData.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(backlogData.map((item) => item.id));
    }
  };

  // ------------------ 컬럼 정의
  const COLUMNS: AdminTableColumn<Backlog>[] = [
    {
      label: "checkbox",
      width: "w-15",
      center: true,
    },
    {
      label: "NO",
      width: "w-15",
      center: true,
      renderCell: (item: Backlog) => item.no,
    },
    {
      label: "화면",
      width: "w-[150px]",
      renderCell: (item: Backlog) => (
        <span className="truncate block">{item.screen}</span>
      ),
    },
    {
      label: "세부 페이지",
      width: "w-[120px]",
      renderCell: (item: Backlog) => (
        <span className="truncate block">{item.subPage}</span>
      ),
    },
    {
      label: "Epic",
      width: "w-[150px]",
      renderCell: (item: Backlog) => (
        <Badge backgroundColor="#DBF0D6" className="gap-1">
          {item.epicId}
        </Badge>
      ),
    },
    {
      label: "기능",
      width: "w-[390px]",
      renderCell: (item: Backlog) => (
        <span className="truncate block">{item.feature}</span>
      ),
    },
    {
      label: "설명",
      width: "w-[370px]",
      renderCell: (item: Backlog) => (
        <span className="truncate block">{item.description}</span>
      ),
    },
    {
      label: "구현",
      center: true,
      width: "w-[100px]",
      renderCell: (item: Backlog) => (
        <div
          className="flex justify-center cursor-pointer"
          onClick={() => toggleStatus(item.id, "isDone")}
        >
          <Icon type={item.isDone ? "checkboxChecked" : "checkbox"} size={24} />
        </div>
      ),
    },
    {
      label: "디자인",
      center: true,
      width: "w-[100px]",
      renderCell: (item: Backlog) => (
        <div
          className="flex justify-center cursor-pointer"
          onClick={() => toggleStatus(item.id, "isDesigned")}
        >
          <Icon
            type={item.isDesigned ? "checkboxChecked" : "checkbox"}
            size={24}
          />
        </div>
      ),
    },
  ];

  // ------------------ 요약 아이템
  const summaryItems: AdminSummaryItem[] = [
    {
      title: "총 백로그 개수",
      value: `${totalCount}개`,
      icon: "barChartAlt2",
      bgColor: "bg-bg-purple",
    },
    {
      title: "구현 완료 상태",
      value: `${completionRate}%`,
      icon: "listUl",
      bgColor: "bg-bg-blue",
    },
  ];

  return (
    <AdminPageLayout title="Backlog">
      <AdminSummaryGrid items={summaryItems} />

      <AdminActionBar>
        <Button
          variant="secondary"
          icon="trash"
          disabled={selectedIds.length === 0}
        >
          선택 항목 삭제 {selectedIds.length > 0 && `(${selectedIds.length})`}
        </Button>
        <Button variant="secondary" icon="chevronDown">
          필터
        </Button>
      </AdminActionBar>

      <AdminTable<Backlog>
        columns={COLUMNS}
        data={backlogData}
        selectedIds={selectedIds}
        onToggleSelect={toggleSelect}
        onToggleSelectAll={toggleSelectAll}
        getItemId={(item) => item.id}
      />

      <CommonPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
      />

      {/* Epic 관리 영역 */}
      <div className="mt-7.5 border-gray-100">
        <h3 className="text-lg font-bold mb-5 pb-5 border-b border-gray-ddd">
          Epic 관리
        </h3>
        <div className="flex flex-wrap gap-2">
          <Badge backgroundColor="#DBF0D6">
            <Icon type="x" size="16" />
            경력 관리
          </Badge>
          <Badge backgroundColor="#C7E0E9">
            <Icon type="x" size="16" />
            Epic 태그가 들어갑니다.
          </Badge>
          <Button
            variant="secondary"
            size="md"
            className="text-gray-999 text-sm"
          >
            <Icon type="plus" size="16" />
            Add Epic
          </Button>
        </div>
      </div>
    </AdminPageLayout>
  );
}
