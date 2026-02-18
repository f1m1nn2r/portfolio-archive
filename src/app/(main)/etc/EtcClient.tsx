"use client";

import Link from "next/link";
import hljs from "highlight.js";
import DeleteModal from "@/components/common/DeleteModal";
import { useCallback, useEffect, useRef } from "react";
import { useCategories } from "@/hooks/categories/useCategories";
import { Icon } from "@/components/common/Icon";
import { CategoryResponse } from "@/types/api/category";
import { useEtcFilter, useEtcPosts } from "@/features/admin/posts";
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
  const contentRootRef = useRef<HTMLDivElement>(null);

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
  } = useEtcPosts();

  const onClickDelete = useCallback(
    (id: string) => {
      setSelectedIds([id]);
      setIsDeleteModalOpen(true);
    },
    [setSelectedIds, setIsDeleteModalOpen],
  );

  const pagination = useEtcFilter(posts, 1);

  useEffect(() => {
    const root = contentRootRef.current;
    if (!root) return;

    const blocks = root.querySelectorAll("pre code");
    blocks.forEach((block) => {
      if (!(block instanceof HTMLElement)) return;
      hljs.highlightElement(block);
    });
  }, [pagination.paginatedPosts]);

  return (
    <div
      ref={contentRootRef}
      className="flex w-full flex-col items-start gap-8 lg:flex-row lg:gap-10"
    >
      <aside className="w-full lg:w-64 lg:shrink-0 lg:sticky lg:top-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1">
          {categories.map((parent) => (
            <div key={parent.id} className="mb-0 text-sm text-gray-555">
              {/* 1차 카테고리 */}
              <div className="mb-3 py-0">
                <Link href={`/etc?categoryId=${parent.id}`}>
                  <div className="flex cursor-pointer items-center gap-1">
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
        </div>
      </aside>

      {/* 오른쪽: 게시글 목록 영역 */}
      <main className="flex-1 min-w-0 w-full">
        {/* 상단 요약 정보 */}
        <div className="mb-8 pb-4">
          <p className="flex gap-2 text-sm font-regular text-gray-555 sm:text-base">
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
          <div className="flex flex-col gap-16 w-full">
            {pagination.paginatedPosts.map((post: any) => (
              <article key={post.id} className="group">
                <div className="pb-7.5 mb-7.5 border-b border-gray-ddd">
                  {/* 카테고리 표시 */}
                  <span className="mb-2 block text-base text-gray-999 sm:text-lg">
                    {post.category.split(">").pop()?.trim() || post.category}
                  </span>

                  {/* 제목 */}
                  <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
                    <h2 className="text-xl font-bold sm:text-2xl">
                      {post.title}
                    </h2>
                    <span className="text-base text-gray-999 sm:text-lg">
                      {post.date}
                    </span>
                  </div>
                </div>

                {/* 본문 미리보기 및 내용 */}
                <div className="prose prose-slate min-w-0 max-w-none pb-16 sm:pb-20 md:pb-25">
                  <div
                    className="custom-html-style markdown-body"
                    dangerouslySetInnerHTML={{
                      __html: mdParser.render(post.content),
                    }}
                  />
                </div>

                {/* 하단 수정/삭제 버튼 영역 (이미지의 우측 하단) */}
                {isMaster && (
                  <div className="flex flex-wrap justify-end gap-1.5 border-t border-gray-ddd pt-7.5">
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
              <div className="flex min-h-[300px] items-center justify-center rounded-lg border border-dashed px-4 text-center text-gray-400">
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
