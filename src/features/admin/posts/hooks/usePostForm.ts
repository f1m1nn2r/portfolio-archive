import { useState, useEffect } from "react";
import { Category } from "@/types/admin";
import { useRouter } from "next/navigation";
import { showToast } from "@/lib/toast";
import { createPostApi, getPostByIdApi, updatePostApi } from "../api/client";
import { useAdmin } from "@/providers/AdminProvider";

export const usePostForm = (
  postId: string | undefined,
  categories: Category[],
) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category1, setCategory1] = useState("");
  const [category2, setCategory2] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { isMaster } = useAdmin();

  useEffect(() => {
    if (!postId || categories.length === 0) return;

    const fetchAndMapPost = async () => {
      const post = await getPostByIdApi(postId);
      if (post) {
        setTitle(post.title);
        setContent(post.content);

        const allSubCategories = categories.flatMap((c) => c.children || []);
        const targetSub = allSubCategories.find(
          (sub) => sub.id === post.category_id,
        );

        if (targetSub) {
          setCategory1(targetSub.parent_id || "");
          setCategory2(targetSub.id);
        } else {
          // 2차가 없다면 1차 카테고리임
          setCategory1(post.category_id);
        }
      }
    };
    fetchAndMapPost();
  }, [postId, categories]);

  const handleSubmit = async () => {
    if (!isMaster) {
      showToast.error("관리자 권한이 없어 저장할 수 없습니다.");
      return;
    }

    if (!title.trim() || !content.trim() || !category1) {
      showToast.error("모든 필드를 입력해주세요.");
      return;
    }

    setIsSubmitting(true);
    const payload = {
      title,
      content,
      category_id: category2 || category1,
      status: "published" as const,
    };

    try {
      const result = postId
        ? await updatePostApi(postId, payload)
        : await createPostApi(payload);

      if (result) {
        showToast.save(postId ? "edit" : "add");
        router.push("/admin/posts");
      }
    } catch (err) {
      showToast.error("오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    title,
    setTitle,
    content,
    setContent,
    category1,
    setCategory1,
    category2,
    setCategory2,
    handleSubmit,
    isSubmitting,
    isMaster,
  };
};
