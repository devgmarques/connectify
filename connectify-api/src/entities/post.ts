export type PostsRepository = {
  create(data: Post.PostCreateInput): Promise<Post.Post>;
  update(data: Post.Post): Promise<Post.Post>
  delete(postId: number): void
  countAllPosts(query: string): Promise<number>
  findPostForUser(userId: string): Promise<Post.Post[]>
  searchMany(page: number, query: string): Promise<Post.Post[] | null>;
  findMany(page: number): Promise<Post.Post[]>;
  findByTitle(userId: string, title: string): Promise<Post.Post | null>;
  findById(id: number): Promise<Post.Post | null>;
};

export namespace Post {
  export type PostCreateInput = {
    title: string;
    body: string;
    author: string;
    userId: string;
  }

  export type Post   ={
    id: number;
    title: string;
    body: string;
    author: string;
    userId: string;
    createdAt: Date;
  }
}