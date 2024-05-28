import { Prisma, Post } from "@prisma/client";

export type PostsRepository = {
  create(data: Prisma.PostCreateManyInput): Promise<Post>;
  fetchPosts(page: number): Promise<Post[]>;
  findByTitle(userId: string, title: string): Promise<Post | null>;
  findById(id: number): Promise<Post | null>;
};
