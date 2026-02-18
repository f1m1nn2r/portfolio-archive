import { Category } from "@/types/admin";
import { CategoryResponse } from "@/types/api/category";
import { http } from "@/services/http/client";

export const getCategoriesApi = async (): Promise<CategoryResponse> => {
  return http.get<CategoryResponse>("/api/categories");
};

export const createCategoryApi = async (
  payload: Partial<Category>,
): Promise<Category> => {
  return http.post<Category>("/api/categories", {
    body: payload,
    unwrapData: true,
  });
};

export const updateCategoryApi = async (
  id: string,
  payload: { name: string },
): Promise<void> => {
  await http.patch(`/api/categories/${id}`, { body: payload });
};

export const deleteCategoryApi = async (id: string): Promise<void> => {
  await http.delete(`/api/categories/${id}`);
};
