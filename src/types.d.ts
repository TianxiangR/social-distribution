export type PostDetailWithComments = PostDetail & { comments: Comment[] };

export type Comment = {
  id: string;
  content: string;
  created_at: string;
  username: string;
  post: string;
  user_profile_image: string;
  is_private: boolean;
  like_count: number;
  is_liked: boolean;
}

export type PostVisibility = 'public' | 'private' | 'friends_only';
export type PostType = 'text/markdown' | 'text/plain' | 'image';

export type PostDetail = {
  id: string;
  title: string;
  created_at: string;
  author_name: string;
  like_count: number;
  comment_count: number;
  author_profile_image: string;
  content: string;
  is_liked: boolean;
  is_my_post: boolean;
  type: PostType;
  visibility: PostVisibility;
  image: string | null;
  allowed_users?: string[];
}

export type User = {
  id: string;
  username: string;
  profile_image: string;
  created_at: string;
  email: string;
}

export type FollowUserInfo = User & {
  is_following: boolean;
}

export type PostBase = {
  title: string;
  content: string;
  image: string | null;
  type: PostType;
}

export type PublicPost = PostBase & {
  visibility: 'public' | 'friends_only';
}

export type PrivatePost = PostBase & {
  visibility: 'private';
  allowed_users: string[];
}

export type TPost = PublicPost | PrivatePost;

export type PostNotification = {
  id: string;
  type: 'SHARE_POST' | 'LIKE_POST';
  created_at: string;
  author_username: string;
  post_title: string;
  user_id: string;
  author_id: string;
  post_id: string;
  author_profile_image: string;
  is_read: boolean;
  comment_id: null;
  comment_content: null;
}

export type CommentNotification = {
  id: string;
  type: 'LIKE_COMMENT' | 'COMMENT_POST';
  created_at: string;
  author_username: string;
  post_title: string;
  user_id: string;
  author_id: string;
  post_id: string;
  comment_id: string;
  author_profile_image: string;
  is_read: boolean;
  comment_content: string;
}

export type Notification = PostNotification | CommentNotification;

