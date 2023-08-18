export interface Author {
  id: number;
  name: string;
}

export interface Post {
  id: number;
  author: Author;
  title: string;
  body: string;
  userId: number;
}

export interface PostsStore {
  posts: Post[];
  fetchPostsAndAuthors: () => Promise<void>;
}