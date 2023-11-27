export type PostDetailWithComments = PostBrief & { comments: Comment[] };

export type Comment = {
  id: string;
  comment: string;
  author: AuthorInfo;
  published: string;
  is_liked: boolean;
  like_count: number;
}

export type PostVisibility = 'PUBLIC' | 'PRIVATE' | 'FRIENDS';
export type ContentType = 'text/markdown' | 'text/plain' | 'image';

export type AuthorInfo = {
  id: string;
  displayName: string;
  url: string;
  host: string;
  profileImage: string;
  github: string;
  is_following: boolean;
}

export type FriendRequest = {
  id: string;
  requester: AuthorInfo;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  created_at: string;
}

export type PostBase = {
  id: string;
  title: string;
  content: string;
  visibility: PostVisibility;
  contentType: ContentType;
  unlisted?: boolean;
  image_url?: string;
}

export type PostBrief = {
  id: string;
  published: string;
  is_liked: boolean;
  count: number;
  like_count: number;
  author: AuthorInfo;
  is_my_post: boolean;
} & PostBase;

export type PostDetail = PostBrief & {
  commentsSrc: {
    comments: Comment[];
  }
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

