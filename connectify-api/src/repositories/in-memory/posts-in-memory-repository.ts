import { Post, Prisma } from "@prisma/client";
import { PostsRepository } from "../post";
import { AuthentificateUseCase } from "@/use-case/user/authentificate";

export class PostsInMemoryRepository implements PostsRepository {
  posts: Post[] = [];

  async delete(postId: number) {
    const posts = this.posts.filter(item => item.id !== postId)

    this.posts = posts
  }

  async update(data: Post) {
    const posts = this.posts.map(item => item.id === data.id ? data : item)

    this.posts = posts

    return data
  }

  async create(data: Prisma.PostCreateManyInput) {
    const post = {
      id: 1,
      title: data.title,
      author: data.author,
      body: data.body,
      userId: data.userId,
      createdAt: new Date(),
    };

    this.posts.push(post);

    return post;
  }

  async searchMany(page: number, query: string) {
    const posts = this.posts
      .filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
      .slice((page - 1) * 20, page * 20);

    return posts;
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

  async findPostForUser(userId: string) {
    const posts = this.posts
      .filter((item) => item.userId === userId)

    return posts;
  }

  async findById(id: number) {
    const post = this.posts.find((item) => item.id === id);

    if (!post) {
      return null;
    }

    return post;
  }

  async findMany(page: number) {
    const posts = this.posts.slice((page - 1) * 20, page * 20);

    return posts;
  }

  async countAllPosts(query: string) {
    const count = this.posts.reduce((acc, item) => {
      if (item.title.includes(query)) {
        return acc + 1
      }

      return acc
    }, 0)

    return count
  }
}
