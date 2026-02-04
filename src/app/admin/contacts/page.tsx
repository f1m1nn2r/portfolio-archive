"use client";

import DeleteModal from "@/components/common/DeleteModal";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useContact } from "@/hooks/contact/useContact";
import { useAdminMode } from "@/hooks/common/useAdminMode";
import { useSelectionHandler } from "@/hooks/common/useSelectionHandler";
import { useContactFilter } from "@/hooks/contact/useContactFilter";
import { MESSAGES } from "@/lib/constants/messages";
import { AdminPageLayout } from "@/components/admin/layout/AdminPageLayout";
import { AdminSummaryGrid } from "@/components/admin/layout/AdminSummaryGrid";
import { AdminActionBar } from "@/components/admin/layout/AdminActionBar";
import { AdminSearchBar } from "@/components/admin/common/AdminSearchBar";
import { ContactListHeader } from "@/components/admin/contact/ContactListHeader";
import { EmailItem } from "@/components/admin/email/EmailItem";
import { CommonPagination } from "@/components/common/Pagination";

export default function ContactsPage() {
  const router = useRouter();
  const itemsPerPage = 5;
  const { isMaster } = useAdminMode();
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { contacts, currentData, summaryItems, totalPages, ...handlers } =
    useContact(currentPage, itemsPerPage);

  const { searchQuery, setSearchQuery, filteredData } = useContactFilter({
    data: currentData,
    searchKeys: ["senderEmail", "senderName"],
  });

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

  return (
    <AdminPageLayout title="Contacts">
      <AdminSummaryGrid items={summaryItems} columns={3} />

      <AdminActionBar>
        <AdminSearchBar
          placeholder="이메일 또는 이름 검색"
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          filterItems={[
            { label: "최신순", onClick: () => {} },
            { label: "안 읽은 메시지", onClick: () => {} },
          ]}
        />
      </AdminActionBar>

      <div className="bg-white rounded-lg border border-gray-ddd overflow-hidden">
        <ContactListHeader
          selectedCount={selectionCount}
          totalCount={contacts.length}
          isMaster={isMaster}
          filterMenuItems={filterMenuItems}
          onMarkAsRead={() => {
            handlers.markAsRead(selectedIds);
            clearSelection();
          }}
          onOpenDeleteModal={() => setIsDeleteModalOpen(true)}
        />

        <div className="flex flex-col ">
          {!isMaster ? (
            <div className="flex flex-col items-center justify-center flex-1 py-20 bg-gray-50/50">
              <h3 className="mb-2 text-gray-888">
                {MESSAGES.CONTACT.ONLY_ADMIN}
              </h3>
            </div>
          ) : filteredData.length === 0 ? (
            <div className="py-20 text-center text-gray-555">
              {MESSAGES.CONTACT.EMPTY}
            </div>
          ) : (
            filteredData.map((email) => (
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
        title={MESSAGES.COMMON.DELETE_TITLE}
        description={MESSAGES.CONTACT.DELETE_SELECTED(selectionCount)}
      />
    </AdminPageLayout>
  );
}
