import { Category } from "@/types/admin";

export interface PostCategorySelectProps {
  categories: Category[];
  category1: string;
  setCategory1: (id: string) => void;
  category2: string;
  setCategory2: (id: string) => void;
  subCategories: Category[];
}

export interface PostEditorProps {
  value: string;
  onChange: (text: string) => void;
  isMaster?: boolean;
}
