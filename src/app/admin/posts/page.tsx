"use client";

import DeleteModal from "@/components/common/DeleteModal";
import { useRouter } from "next/navigation";
import { AdminPageLayout } from "@/components/admin/layout/AdminPageLayout";
import { AdminSummaryGrid } from "@/components/admin/layout/AdminSummaryGrid";
import { AdminActionBar } from "@/components/admin/layout/AdminActionBar";
import { AdminTable } from "@/components/admin/table/AdminTable";
import { CommonPagination } from "@/components/common/Pagination";
import { LoadingState } from "@/components/common/LoadingState";
import { FormattedPost, PostColumns, usePosts } from "@/features/admin/posts";
import { useSummaryData } from "@/hooks/common/useSummaryData";
import { AdminSearchBar } from "@/components/admin/common/AdminSearchBar";
import { MESSAGES } from "@/lib/constants/messages";
import { useAdmin } from "@/providers/AdminProvider";
import { DeleteButton } from "@/components/common/DeleteButton";
import { usePagination } from "@/hooks/common/usePagination";

export default function PostsPage() {
  const { isMaster } = useAdmin();
  const router = useRouter();

  const {
    posts,
    summary,
    loading,
    searchQuery,
    setSearchQuery,
    setFilterType,
    selectedIds,
    handleToggleSelect,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleConfirmDelete,
    openDeleteModal,
    setSelectedIds,
  } = usePosts();

  const {
    currentData: paginatedPosts,
    currentPage,
    setCurrentPage,
    totalPages,
  } = usePagination(posts, { itemsPerPage: 10 });

  const summaryItems = useSummaryData([
    {
      label: "총 게시글 개수",
      icon: "bookContent",
      bgColor: "bg-bg-purple",
      getValue: () => `${summary.total}개`,
    },
    {
      label: "오늘 작성된 게시글 개수",
      icon: "timeFive",
      bgColor: "bg-bg-blue",
      getValue: () => `${summary.recent}개`,
    },
  ]);

  const columns = PostColumns((id) => {
    if (!isMaster) return;
    router.push(`/admin/posts/editor?id=${id}`);
  });

  const postFilters = [
    { label: "카테고리별", onClick: () => setFilterType("category") },
    { label: "최신순", onClick: () => setFilterType("latest") },
    { label: "오래된순", onClick: () => setFilterType("oldest") },
  ];

  const handleToggleSelectAllOnPage = () => {
    const pageIds = paginatedPosts.map((post) => String(post.id));
    const isAllSelectedOnPage =
      pageIds.length > 0 && pageIds.every((id) => selectedIds.includes(id));

    setSelectedIds(isAllSelectedOnPage ? [] : pageIds);
  };

  if (loading && posts.length === 0)
    return (
      <AdminPageLayout title="Posts">
        <LoadingState />
      </AdminPageLayout>
    );

  return (
    <AdminPageLayout title="Posts">
      <AdminSummaryGrid items={summaryItems} columns={2} />

      <AdminActionBar>
        <div className="grid w-full gap-2 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <AdminSearchBar
            placeholder="게시글 검색"
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            filterItems={postFilters}
          />

          {isMaster && (
            <DeleteButton
              onClick={openDeleteModal}
              disabled={selectedIds.length === 0}
              className="w-full justify-center whitespace-nowrap sm:justify-self-end sm:w-auto"
            />
          )}
        </div>
      </AdminActionBar>

      <AdminTable<FormattedPost>
        columns={columns}
        data={paginatedPosts}
        getItemId={(item: FormattedPost) => String(item.id)}
        selectedIds={selectedIds}
        onToggleSelect={handleToggleSelect}
        onToggleSelectAll={handleToggleSelectAllOnPage}
        showAddColumn={false}
      />

      <div className="mt-6 flex justify-center">
        <CommonPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title={MESSAGES.POSTS.DELETE.TITLE}
        description={MESSAGES.POSTS.DELETE.DESCRIPTION(selectedIds.length)}
      />
    </AdminPageLayout>
  );
}
