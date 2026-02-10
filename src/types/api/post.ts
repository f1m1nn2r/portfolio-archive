import { FormattedPost, Post } from "@/types/admin";

export interface PostsResponse {
  success: boolean;
  posts: FormattedPost[];
  totalCount: number;
  recentCount: number;
}
