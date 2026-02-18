export interface Post {
  id: string;
  title: string;
  content: string;
  category_id: string;
  status: "draft" | "published";
  thumbnail: string | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

export interface FormattedPost {
  id: string;
  no: number;
  title: string;
  category: string;
  date: string;
}
