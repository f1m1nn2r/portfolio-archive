"use client";

import "react-markdown-editor-lite/lib/index.css";
import Link from "next/link";
import DeleteModal from "@/components/common/DeleteModal";
import { useCategories } from "@/hooks/categories/useCategories";
import { Icon } from "@/components/common/Icon";
import { CategoryResponse } from "@/types/api/category";
import { useEtcFilter, usePosts } from "@/features/admin/posts";
import { LoadingState } from "@/components/common/LoadingState";
import { Button } from "@/components/common/Button";
import { mdParser } from "@/lib/markdown";
import { useAdmin } from "@/providers/AdminProvider";
import { CommonPagination } from "@/components/common/Pagination";

export default function EtcClient({
  initialCategories,
}: {
  initialCategories: CategoryResponse;
}) {
  const { categories } = useCategories({
    initialData: initialCategories,
  });

  const { isMaster } = useAdmin();

  const {
    posts,
    loading,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    setSelectedIds,
    handleConfirmDelete,
  } = usePosts();

  const onClickDelete = (id: string) => {
    setSelectedIds([id]);
    setIsDeleteModalOpen(true);
  };

  const pagination = useEtcFilter(posts, 1);

  return (
    <div className="flex w-full gap-10 items-start">
      <aside className="w-64 sticky top-10">
        {categories.map((parent) => (
          <div key={parent.id} className="text-gray-555 text-sm mb-6">
            {/* 1차 카테고리 */}
            <div className="py-0 mb-3">
              <Link href={`/etc?categoryId=${parent.id}`}>
                <div className="flex items-center gap-1 cursor-pointer">
                  <Icon type="fileBlank" size={16} />
                  {parent.name}
                  <span>({parent.postCount || 0})</span>
                </div>
              </Link>
            </div>

            {/* 2차 카테고리 */}
            <ul className="space-y-3 pl-2">
              {parent.children?.map((sub: any) => (
                <li key={sub.id}>
                  <Link
                    href={`/etc?categoryId=${sub.id}`}
                    className="flex items-center gap-1 transition-colors"
                  >
                    <span>ㄴ</span>
                    <Icon type="fileBlank" size={16} />
                    {sub.name}
                    <span className="text-xs text-gray-400">
                      ({sub.postCount || 0})
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </aside>

      {/* 오른쪽: 게시글 목록 영역 */}
      <main className="flex-1 min-w-0 min-h-[500px]">
        {/* 상단 요약 정보 */}
        <div className="mb-8 pb-4">
          <p className="text-base text-gray-555 font-regular flex gap-2">
            <span className="font-semibold">
              {posts.length > 0 ? posts[0].category : "전체 보기"}{" "}
            </span>
            {posts.length}
            개의 글
          </p>
        </div>

        {loading ? (
          <LoadingState />
        ) : (
          <div className="flex flex-col gap-16">
            {pagination.paginatedPosts.map((post: any) => (
              <article key={post.id} className="group">
                <div className="pb-7.5 mb-7.5 border-b border-gray-ddd">
                  {/* 카테고리 표시 */}
                  <span className="text-lg text-gray-999 mb-2 block">
                    {post.category.split(">").pop()?.trim() || post.category}
                  </span>

                  {/* 제목 */}
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold ">{post.title}</h2>
                    <span className="text-gray-999 text-lg">{post.date}</span>
                  </div>
                </div>

                {/* 본문 미리보기 및 내용 */}
                <div className="prose prose-slate max-w-none min-w-0 pb-25">
                  <div
                    className="custom-html-style markdown-body"
                    dangerouslySetInnerHTML={{
                      __html: mdParser.render(post.content),
                    }}
                  />
                </div>

                {/* 하단 수정/삭제 버튼 영역 (이미지의 우측 하단) */}
                {isMaster && (
                  <div className="flex justify-end gap-1.5 border-t border-gray-ddd pt-7.5">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="bg-white"
                      onClick={() => onClickDelete(post.id)}
                    >
                      삭제
                    </Button>
                    <Link href={`/admin/posts/editor?id=${post.id}`}>
                      <Button variant="ghost" size="sm" className="bg-white">
                        수정
                      </Button>
                    </Link>
                  </div>
                )}
              </article>
            ))}
            {/* 데이터 없음 처리 */}
            {!loading && posts.length === 0 && (
              <div className="py-20 text-center text-gray-400 border border-dashed rounded-lg">
                해당 카테고리에 게시글이 없습니다.
              </div>
            )}

            {!loading && posts.length > 0 && (
              <div className="flex justify-center">
                <CommonPagination
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
                  onPageChange={pagination.handlePageChange}
                  maxVisiblePages={5}
                />
              </div>
            )}
          </div>
        )}
      </main>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedIds([]);
        }}
        onConfirm={handleConfirmDelete}
        isLoading={loading}
      />
    </div>
  );
}
