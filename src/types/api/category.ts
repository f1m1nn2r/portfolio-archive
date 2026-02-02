import { Category } from "@/types/admin";

export interface CategoryResponse {
  success: boolean;
  data: Category[];
  summary: {
    totalCount: number;
    parentCount: number;
    childCount: number;
  };
}
