import { Category } from "@/types/admin";
import { CategoryResponse } from "@/types/api/category";

export const getCategoriesApi = async (): Promise<CategoryResponse> => {
  const res = await fetch("/api/categories");
  if (!res.ok) throw new Error("카테고리 로드 실패");
  return res.json();
};

export const createCategoryApi = async (
  payload: Partial<Category>,
): Promise<Category | null> => {
  const res = await fetch("/api/categories", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) return null;
  const result = await res.json();
  return result.data;
};

export const updateCategoryApi = async (
  id: string,
  name: string,
): Promise<boolean> => {
  const res = await fetch(`/api/categories/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  return res.ok;
};

export const deleteCategoryApi = async (id: string): Promise<boolean> => {
  const res = await fetch(`/api/categories/${id}`, {
    method: "DELETE",
  });
  return res.ok;
};
