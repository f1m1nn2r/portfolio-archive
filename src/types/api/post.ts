import { Post } from "@/types/admin";

export interface PostsResponse {
  posts: Post[];
  totalCount: number;
  recentCount: number;
}
