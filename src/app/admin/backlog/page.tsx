"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/common/Button";
import { MOCK_BACKLOG } from "@/mock/backlog";
import { CommonPagination } from "@/components/common/Pagination";
import { AdminPageLayout } from "@/components/admin/layout/AdminPageLayout";
import { AdminSummaryGrid } from "@/components/admin/layout/AdminSummaryGrid";
import { AdminActionBar } from "@/components/admin/layout/AdminActionBar";
import { AdminTable } from "@/components/admin/table/AdminTable";
import { Backlog, Epic } from "@/types/admin";
import { BacklogColumns } from "@/components/admin/backlog/BacklogColumns";
import { EpicManager } from "@/components/admin/backlog/BacklogEpicManager";
import { useSelectionHandler } from "@/hooks/useSelectionHandler";
import { useSelectionData } from "@/hooks/useSelectionData";
import DeleteModal from "@/components/common/DeleteModal";
import { useSummaryData } from "@/hooks/useSummaryData";
import { LoadingState } from "@/components/common/LoadingState";

const MOCK_EPICS: Epic[] = [
  { id: "1", label: "경력 관리", color: "#DBF0D6" },
  { id: "2", label: "Epic 태그가 들어갑니다.", color: "#C7E0E9" },
];

export default function BacklogPage() {
  const [page, setPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [epics, setEpics] = useState<Epic[]>(MOCK_EPICS);
  const [loading, setLoading] = useState(true);

  const totalPages = 5;

  // 초기 로딩 처리 (MOCK 데이터 로드 시뮬레이션)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300); // 짧은 로딩 시간

    return () => clearTimeout(timer);
  }, []);

  // 데이터 관리
  const {
    data: backlogData,
    toggleField,
    deleteItems,
  } = useSelectionData(MOCK_BACKLOG);

  // 선택 관리
  const {
    selectedIds,
    toggleSelect,
    toggleSelectAll,
    deleteSelected,
    selectionCount,
  } = useSelectionHandler({
    data: backlogData,
    getId: (item) => item.id,
    onDelete: deleteItems,
  });

  // 요약 데이터
  const summaryItems = useSummaryData([
    {
      icon: "barChartAlt2",
      bgColor: "bg-bg-purple",
      label: "총 백로그 개수",
      getValue: () => `${backlogData.length}개`,
    },
    {
      icon: "listUl",
      bgColor: "bg-bg-blue",
      label: "구현 완료 상태",
      getValue: () => {
        const total = backlogData.length;
        const completed = backlogData.filter((item) => item.isDone).length;
        return total > 0 ? `${Math.round((completed / total) * 100)}%` : "0%";
      },
    },
  ]);

  // 테이블 컬럼
  const columns = useMemo(
    () =>
      BacklogColumns((id, field) => {
        toggleField(String(id), field);
      }),
    [toggleField],
  );

  // 핸들러
  const handleConfirmDelete = useCallback(() => {
    deleteSelected();
    setIsDeleteModalOpen(false);
  }, [deleteSelected]);

  const handleRemoveEpic = useCallback((id: string) => {
    setEpics((prev) => prev.filter((epic) => epic.id !== id));
  }, []);

  const handleAddEpic = useCallback(() => {
    console.log("Epic 추가");
  }, []);

  if (loading) {
    return (
      <AdminPageLayout title="Backlog">
        <LoadingState message="백로그를 불러오는 중..." />
      </AdminPageLayout>
    );
  }

  return (
    <AdminPageLayout title="Backlog">
      <AdminSummaryGrid items={summaryItems} />

      <AdminActionBar>
        <Button
          variant="secondary"
          icon="trash"
          disabled={selectionCount === 0}
          onClick={() => setIsDeleteModalOpen(true)}
        >
          선택 항목 삭제 ({selectionCount})
        </Button>
        <Button variant="secondary" icon="chevronDown">
          필터
        </Button>
      </AdminActionBar>

      <AdminTable<Backlog>
        columns={columns}
        data={backlogData}
        selectedIds={selectedIds}
        onToggleSelect={toggleSelect}
        onToggleSelectAll={toggleSelectAll}
        getItemId={(item) => item.id}
      />

      <CommonPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      <EpicManager
        epics={epics}
        onRemove={handleRemoveEpic}
        onAdd={handleAddEpic}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </AdminPageLayout>
  );
}
