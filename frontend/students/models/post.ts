export interface IPostApiResponse {
  post: IPost;
}

export interface IPostsApiResponse {
  posts: Array<IPost>;
}

export interface IPost {
  id: number;
  content: string;
  lessonId: number;
  commentsCount: number;
  likesCount: number;
  createdAt?: string;
  author: IPostAuthor;
  lesson?: IPostLesson;
  comments?: Array<IPostComment>;
}

export interface IPostAuthor {
  avatarUrl: string | null;
  fullName: string;
}

export interface IPostLesson {
  title: string;
  authorName: string;
  avatarUrl: string | null;
}

export interface IPostComment {
  authorName: string;
  avatarUrl: string | null;
  content: string;
  createdAt: string;
}
