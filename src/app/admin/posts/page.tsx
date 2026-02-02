"use client";

import DeleteModal from "@/components/common/DeleteModal";
import { useRouter } from "next/navigation";
import { AdminPageLayout } from "@/components/admin/layout/AdminPageLayout";
import { AdminSummaryGrid } from "@/components/admin/layout/AdminSummaryGrid";
import { AdminActionBar } from "@/components/admin/layout/AdminActionBar";
import { AdminTable } from "@/components/admin/table/AdminTable";
import { CommonPagination } from "@/components/common/Pagination";
import { Button } from "@/components/common/Button";
import { LoadingState } from "@/components/common/LoadingState";
import { usePosts } from "@/hooks/posts/usePosts";
import { useSummaryData } from "@/hooks/common/useSummaryData";
import { AdminSearchBar } from "@/components/admin/common/AdminSearchBar";
import { PostColumns } from "@/components/post/PostColumns";
import { usePostManagement } from "@/hooks/posts/usePostManagement";

export default function PostsPage() {
  const router = useRouter();

  const { posts, summary, mutate, loading } = usePosts();

  const {
    searchQuery,
    setSearchQuery,
    selectedIds,
    handleToggleSelect,
    handleToggleSelectAll,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleConfirmDelete,
    openDeleteModal,
    filteredPosts,
  } = usePostManagement(posts, mutate);

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

  const columns = PostColumns((id) => router.push(`/admin/writing?id=${id}`));

  const postFilters = [
    { label: "카테고리별", onClick: () => console.log("카테고리별 정렬") },
    { label: "최신순", onClick: () => console.log("최신순 정렬") },
    { label: "오래된순", onClick: () => console.log("과거순 정렬") },
  ];

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
        <div className="flex gap-2 items-center justify-end w-full">
          <div className="flex items-center gap-2">
            <AdminSearchBar
              placeholder="게시글 검색"
              searchValue={searchQuery}
              onSearchChange={setSearchQuery}
              filterItems={postFilters}
            />

            <Button
              variant="secondary"
              icon="trash"
              onClick={openDeleteModal}
              disabled={selectedIds.length === 0}
            >
              선택 항목 삭제
            </Button>
          </div>
        </div>
      </AdminActionBar>

      <AdminTable
        columns={columns}
        data={filteredPosts}
        getItemId={(item: any) => String(item.id)}
        selectedIds={selectedIds}
        onToggleSelect={handleToggleSelect}
        onToggleSelectAll={handleToggleSelectAll}
        showAddColumn={false}
      />

      <div className="mt-6 flex justify-center">
        <CommonPagination
          currentPage={1}
          totalPages={1}
          onPageChange={() => {}}
        />
      </div>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="게시글 삭제"
        description={`정말 선택한 ${selectedIds.length}개의 게시글을 삭제하시겠습니까?`}
      />
    </AdminPageLayout>
  );
}
