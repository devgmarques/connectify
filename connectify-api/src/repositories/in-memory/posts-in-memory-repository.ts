import { Post, Prisma } from "@prisma/client";
import { PostsRepository } from "../post";

export class PostsInMemoryRepository implements PostsRepository {
  posts: Post[] = [];

  async create(data: Prisma.PostCreateManyInput) {
    const post = {
      id: 1,
      title: data.title,
      body: data.body,
      userId: data.userId,
      createdAt: new Date(),
    };

    this.posts.push(post);

    return post;
  }

  async findByTitle(userId: string, title: string) {
    const post = this.posts.find(
      (item) => item.userId === userId && item.title === title
    );

    if (!post) {
      return null;
    }

    return post;
  }

  async findById(id: number) {
    const post = this.posts.find((item) => item.id === id);

    if (!post) {
      return null;
    }

    return post;
  }

  async fetchPosts(page: number) {
    const posts = this.posts.slice((page - 1) * 20, page * 20);
    
    return posts;
  }
}
