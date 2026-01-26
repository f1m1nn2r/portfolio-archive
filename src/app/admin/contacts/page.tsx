"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { CommonPagination } from "@/components/common/Pagination";
import { Dropdown } from "@/components/common/Dropdown";
import { AdminSummaryGrid } from "@/components/admin/layout/AdminSummaryGrid";
import { AdminPageLayout } from "@/components/admin/layout/AdminPageLayout";
import { useSelectionHandler } from "@/hooks/useSelectionHandler";
import { EmailItem } from "@/components/admin/email/EmailItem";
import { EmailSearchBar } from "@/components/admin/email/EmailSearchBar";
import { LoadingState } from "@/components/common/LoadingState";
import { useContact } from "@/hooks/useContact";
import { useSummaryData } from "@/hooks/useSummaryData";
import { useRouter } from "next/navigation";

export default function ContactsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const router = useRouter();

  // 1. 실제 DB 데이터 및 핸들러 가져오기
  const { contacts, loading, deleteContacts, toggleStar, markAsRead } =
    useContact();

  // 2. 다중 선택 핸들러 설정
  const {
    selectedIds,
    toggleSelect,
    toggleSelectAll,
    clearSelection,
    selectionCount,
  } = useSelectionHandler({
    data: contacts,
    getId: (item) => item.id,
    onDelete: deleteContacts,
  });

  // 3. 상단 요약 정보 계산
  const summaryItems = useSummaryData([
    {
      icon: "mailSend",
      bgColor: "bg-bg-purple",
      label: "총 메시지",
      getValue: () => `${contacts.length}개`,
    },
    {
      icon: "envelopeOpen",
      bgColor: "bg-bg-blue",
      label: "읽지 않음",
      getValue: () => `${contacts.filter((e) => !e.isRead).length}개`,
    },
  ]);

  // 4. 선택 메뉴 아이템 구성
  const filterMenuItems = useMemo(
    () => [
      { label: "전체 선택", onClick: () => toggleSelectAll() },
      { label: "선택 해제", onClick: () => clearSelection() },
      {
        label: "읽은 메일 선택",
        onClick: () => {
          clearSelection();
          contacts.filter((e) => e.isRead).forEach((e) => toggleSelect(e.id));
        },
      },
      {
        label: "읽지 않은 메일 선택",
        onClick: () => {
          clearSelection();
          contacts.filter((e) => !e.isRead).forEach((e) => toggleSelect(e.id));
        },
      },
    ],
    [contacts, toggleSelectAll, clearSelection, toggleSelect],
  );

  const totalPages = Math.ceil(contacts.length / itemsPerPage) || 1;
  const currentData = contacts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  if (loading) {
    return (
      <AdminPageLayout title="Contacts">
        <LoadingState message="메시지를 불러오는 중..." />
      </AdminPageLayout>
    );
  }

  return (
    <AdminPageLayout title="Contacts">
      {/* 요약 그리드 */}
      <AdminSummaryGrid items={summaryItems} />

      {/* 검색 바 */}
      <EmailSearchBar />

      {/* 리스트 영역 */}
      <div className="bg-white rounded-lg border border-gray-ddd overflow-hidden">
        {/* 리스트 컨트롤러 */}
        <div className="flex items-center justify-between px-10 py-5 border-b border-gray-ddd bg-bg-light/30">
          <div className="flex items-center gap-4">
            <Dropdown
              trigger={
                <div className="flex items-center cursor-pointer">
                  <Icon
                    type={
                      selectedIds.length === contacts.length &&
                      contacts.length > 0
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
              onClick={() => {
                markAsRead(selectedIds);
                clearSelection();
              }}
              disabled={selectionCount === 0}
            >
              <Icon type="envelopeOpen" size={20} /> 읽음 표시
            </Button>
            <Button
              variant="danger"
              size="md"
              onClick={() => {
                if (
                  confirm(
                    `선택한 ${selectionCount}개의 메시지를 삭제하시겠습니까?`,
                  )
                ) {
                  deleteContacts(selectedIds);
                  clearSelection();
                }
              }}
              disabled={selectionCount === 0}
            >
              <Icon type="trash" size={16} /> 삭제
            </Button>
          </div>
        </div>

        {/* 메시지 아이템 리스트 */}
        <div className="flex flex-col">
          {currentData.length === 0 ? (
            <div className="text-center py-20 text-gray-555">
              받은 메시지가 없습니다.
            </div>
          ) : (
            currentData.map((email) => (
              <div
                key={email.id}
                onClick={() => router.push(`/admin/contacts/${email.id}`)}
                className="cursor-pointer border-b border-gray-ddd last:border-b-0"
              >
                <EmailItem
                  key={email.id}
                  email={email}
                  isSelected={selectedIds.includes(email.id)}
                  onToggleSelect={toggleSelect}
                  onToggleStar={() => toggleStar(email.id, email.isStarred)}
                />
              </div>
            ))
          )}
        </div>
      </div>

      {/* 페이지네이션 */}
      <CommonPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </AdminPageLayout>
  );
}
