"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { CommonPagination } from "@/components/common/Pagination";
import { Dropdown } from "@/components/common/Dropdown";
import { MOCK_EMAILS } from "@/mock/email";
import { AdminSummaryGrid } from "@/components/admin/layout/AdminSummaryGrid";
import { AdminPageLayout } from "@/components/admin/layout/AdminPageLayout";
import { useSelectionHandler } from "@/hooks/useSelectionHandler";
import { useSelectionData } from "@/hooks/useSelectionData";
import { EmailMessage } from "@/types/admin/email";
import { EmailItem } from "@/components/admin/email/EmailItem";
import { EmailSearchBar } from "@/components/admin/email/EmailSearchBar";
import { useSummaryData } from "@/hooks/useSummaryData";
import { LoadingState } from "@/components/common/LoadingState";

export default function EmailPage() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const totalPages = 1;

  // 초기 로딩 처리
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // 커스텀 훅 사용
  const {
    data: emails,
    setData: setEmails,
    deleteItems,
  } = useSelectionData<EmailMessage>(MOCK_EMAILS);

  const {
    selectedIds,
    toggleSelect,
    toggleSelectAll,
    deleteSelected,
    clearSelection,
    selectionCount,
  } = useSelectionHandler({
    data: emails,
    getId: (item) => item.id,
    onDelete: deleteItems,
  });

  const summaryItems = useSummaryData([
    {
      icon: "mailSend",
      bgColor: "bg-bg-purple",
      label: "총 이메일",
      getValue: () => `${emails.length}개`,
    },
    {
      icon: "envelopeOpen",
      bgColor: "bg-bg-blue",
      label: "읽지 않음",
      getValue: () => `${emails.filter((e) => !e.isRead).length}개`,
    },
  ]);

  // 핸들러들
  const toggleStar = useCallback(
    (id: string) => {
      setEmails((prev) =>
        prev.map((e) => (e.id === id ? { ...e, isStarred: !e.isStarred } : e)),
      );
    },
    [setEmails],
  );

  const handleDeleteSelected = useCallback(() => {
    if (confirm(`선택한 ${selectionCount}개의 메일을 삭제하시겠습니까?`)) {
      deleteSelected();
    }
  }, [selectionCount, deleteSelected]);

  const markAsRead = useCallback(() => {
    setEmails((prev) =>
      prev.map((e) =>
        selectedIds.includes(e.id) ? { ...e, isRead: true } : e,
      ),
    );
    clearSelection();
  }, [selectedIds, setEmails, clearSelection]);

  // 선택 메뉴 아이템
  const filterMenuItems = useMemo(
    () => [
      {
        label: "전체 선택",
        onClick: () => toggleSelectAll(),
      },
      {
        label: "선택 해제",
        onClick: () => clearSelection(),
      },
      {
        label: "읽은 메일",
        onClick: () => {
          clearSelection();
          emails.filter((e) => e.isRead).forEach((e) => toggleSelect(e.id));
        },
      },
      {
        label: "읽지 않은 메일",
        onClick: () => {
          clearSelection();
          emails.filter((e) => !e.isRead).forEach((e) => toggleSelect(e.id));
        },
      },
    ],
    [emails, toggleSelectAll, clearSelection, toggleSelect],
  );

  if (loading) {
    return (
      <AdminPageLayout title="Email">
        <LoadingState message="이메일을 불러오는 중..." />
      </AdminPageLayout>
    );
  }

  return (
    <AdminPageLayout title="Email">
      {/* 요약 */}
      <AdminSummaryGrid items={summaryItems} />

      {/* 검색 */}
      <EmailSearchBar />

      {/* 이메일 리스트 */}
      <div className="bg-white rounded-lg border border-gray-ddd overflow-hidden">
        {/* 컨트롤러 */}
        <div className="flex items-center justify-between px-10 py-5 border-b border-gray-ddd bg-bg-light/30">
          <div className="flex items-center gap-4">
            <Dropdown
              trigger={
                <div className="flex items-center cursor-pointer">
                  <Icon
                    type={
                      selectedIds.length === emails.length && emails.length > 0
                        ? "checkboxChecked"
                        : "checkbox"
                    }
                    size={24}
                  />
                  <Icon type="chevronDown" size={20} />
                </div>
              }
              items={filterMenuItems}
            />
            <p className="text-base text-gray-555 font-medium">
              {selectionCount > 0 ? `${selectionCount}개 선택됨` : "항목 선택"}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="md"
              onClick={markAsRead}
              disabled={selectionCount === 0}
            >
              <Icon type="envelopeOpen" size={20} /> 읽음 표시
            </Button>
            <Button
              variant="danger"
              size="md"
              onClick={handleDeleteSelected}
              disabled={selectionCount === 0}
            >
              <Icon type="trash" size={16} /> 삭제
            </Button>
          </div>
        </div>

        {/* 이메일 아이템 리스트 */}
        <div className="flex flex-col">
          {emails.length === 0 ? (
            <div className="text-center py-20 text-gray-555">
              받은 메일이 없습니다.
            </div>
          ) : (
            emails.map((email) => (
              <EmailItem
                key={email.id}
                email={email}
                isSelected={selectedIds.includes(email.id)}
                onToggleSelect={toggleSelect}
                onToggleStar={toggleStar}
              />
            ))
          )}
        </div>
      </div>

      <CommonPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </AdminPageLayout>
  );
}
