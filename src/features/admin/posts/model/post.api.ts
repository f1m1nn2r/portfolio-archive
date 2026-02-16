import { FormattedPost } from "./post.admin";

export interface PostsResponse {
  success: boolean;
  posts: FormattedPost[];
  totalCount: number;
  recentCount: number;
}
