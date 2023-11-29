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


export type CommitCommentEvent = {
  type: 'CommitCommentEvent';
  payload: {
    comment: {
      id: number;
      body: string;
      user: {
        login: string;
        avatar_url: string;
        html_url: string;
      }
    }
  };
  created_at: string;
}

export type CreateEvent = {
  type: 'CreateEvent';
  payload: {
    ref_type: string;
    ref: string;
    master_branch: string;
    description: string;
    pusher_type: string;
  }
  created_at: string;
}

export type DeleteEvent = {
  type: 'DeleteEvent';
  payload: {
    ref_type: string;
    ref: string;
    pusher_type: string;
  }
  created_at: string;
}

export type ForkEvent = {
  type: 'ForkEvent';
  payload: {
    forkee: {
      name: string;
      full_name: string;
      owner: {
        login: string;
        avatar_url: string;
        html_url: string;
      }
    }
  }
  created_at: string;
}

export type GollumEvent = {
  type: 'GollumEvent';
  payload: {
    pages: {
      page_name: string;
      title: string;
      action: string;
      html_url: string;
    }[]
  }
  created_at: string;
}

export type IssueCommentEvent = {
  type: 'IssueCommentEvent';
  payload: {
    action: string;
    issue: {
      number: number;
      title: string;
      html_url: string;
      user: {
        login: string;
        avatar_url: string;
        html_url: string;
      }
    }
  };
  created_at: string;
}

export type IssueEvent = {
  type: 'IssueEvent';
  payload: {
    action: string;
    issue: {
      number: number;
      title: string;
      html_url: string;
      user: {
        login: string;
        avatar_url: string;
        html_url: string;
      }
    }
  }
  created_at: string;
}

export type MemberEvent = {
  type: 'MemberEvent';
  payload: {
    action: string;
    member: {
      login: string;
      avatar_url: string;
      html_url: string;
    }
  }
  created_at: string;
}

export type PublicEvent = {
  type: 'PublicEvent';
  payload: {
    repository: {
      name: string;
      html_url: string;
    }
  }
  created_at: string;
}

export type PullRequestEvent = {
  type: 'PullRequestEvent';
  payload: {
    action: string;
    number: number;
    pull_request: {
      title: string;
      html_url: string;
      user: {
        login: string;
        avatar_url: string;
        html_url: string;
      }
    }
  }
  created_at: string;
}

export type PullRequestReviewEvent = {
  type: 'PullRequestReviewEvent';
  payload: {
    action: string;
    pull_request: {
      title: string;
      html_url: string;
      user: {
        login: string;
        avatar_url: string;
        html_url: string;
      }
    }
  }
  created_at: string;
}

export type PullRequestReviewCommentEvent = {
  type: 'PullRequestReviewCommentEvent';
  payload: {
    action: string;
    pull_request: {
      title: string;
      html_url: string;
      user: {
        login: string;
        avatar_url: string;
        html_url: string;
      }
    }
  }
  created_at: string;
}

export type PushEvent = {
  type: 'PushEvent';
  payload: {
    ref: string;
    commits: {
      sha: string;
      message: string;
      author: {
        name: string;
        email: string;
      };
      distinct: boolean;
      url: string;
    }[];
  }
  actor: {
    login: string;
    avatar_url: string;
    html_url: string;
    display_login: string;
    url: string;
  };
  repo: {
    name: string;
    url: string;
  };
  created_at: string;
}

export type ReleaseEvent = {
  type: 'ReleaseEvent';
  payload: {
    action: string;
    release: {
      tag_name: string;
      html_url: string;
      name: string;
      body: string;
      draft: boolean;
      repo: {
        name: string;
        url: string;
      }
      owner: {
        login: string;
        avatar_url: string;
        html_url: string;
      }
    }
  }
  created_at: string;
}
