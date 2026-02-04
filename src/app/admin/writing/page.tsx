"use client";

import Image from "next/image";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { AdminPageLayout } from "@/components/admin/layout/AdminPageLayout";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { useCategories } from "@/hooks/categories/useCategories";
import { useWritingForm } from "@/hooks/writing/useWritingForm";
import { PostCategorySelect } from "@/components/admin/post/PostCategorySelect";
import { PostEditor } from "@/components/admin/post/PostEditor";

export default function WritingPage() {
  const searchParams = useSearchParams();
  const postId = searchParams.get("id") as string;

  const { categories, loading: categoryLoading } = useCategories();

  const {
    title,
    setTitle,
    content,
    setContent,
    category1,
    setCategory1,
    category2,
    setCategory2,
    isSubmitting,
    handleSubmit,
    isMaster,
  } = useWritingForm(postId, categories);

  const subCategories = useMemo(() => {
    if (!category1) return [];
    const selected = categories.find((cat) => cat.id === category1);
    return selected?.children || [];
  }, [category1, categories]);

  return (
    <AdminPageLayout title={postId ? "Editing" : "Writing"}>
      <div className="w-full overflow-hidden">
        <Image
          src="/images/write-it.png"
          width={1500}
          height={600}
          alt="일단 쓰고봐"
        />
      </div>

      <div className="flex flex-col gap-6 bg-white mt-10">
        {/* 카테고리 선택 */}
        <PostCategorySelect
          categories={categories}
          category1={category1}
          setCategory1={setCategory1}
          category2={category2}
          setCategory2={setCategory2}
          subCategories={subCategories}
        />

        {/* 제목 */}
        <input
          type="text"
          placeholder="제목을 입력하세요."
          className="w-full py-4 text-xl font-bold border-b-1 border-gray-eee focus:outline-none focus:border-gray-999"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* 에디터 */}
        <PostEditor value={content} onChange={setContent} isMaster={isMaster} />

        {/* 버튼 */}
        <div className="flex justify-end gap-3 mt-6">
          <Button
            variant="ghost"
            size="md"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={!isMaster ? "opacity-50 cursor-not-allowed" : ""}
          >
            <Icon type={isSubmitting ? "loader" : "save"} />
            {postId ? "수정하기" : "저장하기"}
          </Button>
        </div>
      </div>
    </AdminPageLayout>
  );
}
