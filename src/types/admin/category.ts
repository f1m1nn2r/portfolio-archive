export interface Category {
  id: string;
  name: string;
  parent_id: string | null;
  depth: number;
  children?: Category[];
  sort_order: number;
  postCount?: number;
}
