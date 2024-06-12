import { Prisma, Post } from "@prisma/client";

export type PostsRepository = {
  create(data: Prisma.PostCreateManyInput): Promise<Post>;
  update(data: Post): Promise<Post>
  delete(postId: number): Promise<void>
  findPostForUser(userId: string): Promise<Post[]>
  searchMany(page: number, query: string): Promise<Post[] | null>;
  findMany(page: number): Promise<Post[]>;
  findByTitle(userId: string, title: string): Promise<Post | null>;
  findById(id: number): Promise<Post | null>;
};
