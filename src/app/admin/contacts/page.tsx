"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { CommonPagination } from "@/components/common/Pagination";
import { Dropdown } from "@/components/common/Dropdown";
import { AdminSummaryGrid } from "@/components/admin/layout/AdminSummaryGrid";
import { AdminPageLayout } from "@/components/admin/layout/AdminPageLayout";
import { useSelectionHandler } from "@/hooks/common/useSelectionHandler";
import { EmailItem } from "@/components/admin/email/EmailItem";
import { EmailSearchBar } from "@/components/admin/email/EmailSearchBar";
import { LoadingState } from "@/components/common/LoadingState";
import { useContact } from "@/hooks/contact/useContact";
import { useRouter } from "next/navigation";
import { useAdminMode } from "@/hooks/common/useAdminMode";
import { AdminAuthGuard } from "@/components/admin/common/AdminAuthGuard";
import DeleteModal from "@/components/common/DeleteModal";

export default function ContactsPage() {
  const router = useRouter();
  const itemsPerPage = 5;
  const { isMaster, session } = useAdminMode();
  const [currentPage, setCurrentPage] = useState(1);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    contacts,
    currentData,
    summaryItems,
    totalPages,
    loading,
    ...handlers
  } = useContact(currentPage, itemsPerPage);

  const {
    selectedIds,
    toggleSelect,
    toggleSelectAll,
    clearSelection,
    selectionCount,
  } = useSelectionHandler({
    data: contacts,
    getId: (item) => item.id,
    onDelete: handlers.deleteContacts,
  });

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await handlers.deleteContacts(selectedIds);
      clearSelection();
      setIsDeleteModalOpen(false);
    } finally {
      setIsDeleting(false);
    }
  };

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

  if (loading) {
    return (
      <AdminPageLayout title="Contacts">
        <LoadingState message="메시지를 불러오는 중..." />
      </AdminPageLayout>
    );
  }

  if (!session) {
    return (
      <AdminPageLayout title="Access Denied">
        <div className="py-20 text-center">
          <p className="text-lg">로그인이 필요한 페이지입니다.</p>
        </div>
      </AdminPageLayout>
    );
  }

  return (
    <AdminPageLayout title="Contacts">
      <AdminAuthGuard isMaster={isMaster} />
      <AdminSummaryGrid items={summaryItems} columns={3} />
      <EmailSearchBar />

      <div className="bg-white rounded-lg border border-gray-ddd overflow-hidden">
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

          <div className="flex gap-2 relative z-10">
            <Button
              variant="secondary"
              size="md"
              onClick={() => {
                handlers.markAsRead(selectedIds);
                clearSelection();
              }}
              disabled={!isMaster}
              className={!isMaster ? "opacity-50 cursor-not-allowed" : ""}
            >
              <Icon type="envelopeOpen" size={20} /> 읽음 표시
            </Button>
            {isMaster && (
              <Button
                variant="danger"
                size="md"
                onClick={() => setIsDeleteModalOpen(true)}
                disabled={selectionCount === 0}
              >
                <Icon type="trash" size={16} /> 삭제
              </Button>
            )}
          </div>
        </div>

        <div className="flex flex-col ">
          {!isMaster ? (
            <div className="flex flex-col items-center justify-center flex-1 py-20 bg-gray-50/50">
              <h3 className="mb-2 text-gray-888">
                관리자만 확인할 수 있습니다.
              </h3>
            </div>
          ) : currentData.length === 0 ? (
            <div className="py-20 text-center text-gray-555">
              받은 메시지가 없습니다.
            </div>
          ) : (
            currentData.map((email) => (
              <div
                key={email.id}
                onClick={() => router.push(`/admin/contacts/${email.id}`)}
                className="cursor-pointer border-b border-gray-ddd last:border-b-0 hover:bg-gray-50 transition-colors"
              >
                <EmailItem
                  email={email}
                  isSelected={selectedIds.includes(email.id)}
                  onToggleSelect={toggleSelect}
                  onToggleStar={() =>
                    handlers.toggleStar(email.id, email.isStarred)
                  }
                />
              </div>
            ))
          )}
        </div>
      </div>

      <CommonPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        title="메시지 삭제"
        description={`선택한 ${selectionCount}개의 메시지를 정말 삭제하시겠습니까?`}
      />
    </AdminPageLayout>
  );
}
