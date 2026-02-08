"use client";

import DeleteModal from "@/components/common/DeleteModal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useContact } from "@/hooks/contact/useContact";
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
import { useAdmin } from "@/providers/AdminProvider";

export default function ContactsPage() {
  const router = useRouter();
  const { isMaster } = useAdmin();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { deleteContacts, isDeleting, contacts, summaryItems, ...handlers } =
    useContact();

  const selection = useSelectionHandler({
    data: contacts,
    getId: (item) => item.id,
    onDelete: deleteContacts,
  });

  const {
    selectedIds,
    toggleSelect,
    toggleSelectAll,
    clearSelection,
    selectionCount,
  } = selection;

  const {
    searchQuery,
    setSearchQuery,
    filterMenuItems,
    currentData,
    currentPage,
    totalPages,
    setCurrentPage,
  } = useContactFilter({
    data: contacts,
    searchKeys: ["sender", "name_company"],
    selectionHandlers: { toggleSelect, toggleSelectAll, clearSelection },
    itemsPerPage: 5,
  });

  const handleConfirmDelete = async () => {
    await deleteContacts(selectedIds, () => {
      clearSelection();
      setIsDeleteModalOpen(false);
    });
  };

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
          ) : currentData.length === 0 ? (
            <div className="py-20 text-center text-gray-555">
              {MESSAGES.CONTACT.EMPTY}
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
                    handlers.toggleStar(email.id, email.is_starred)
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
