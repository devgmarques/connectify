import { Prisma } from "@prisma/client";
import { PostsRepository } from "../post";
import { prisma } from "@/lib/prisma";

export class PostPrismaRepository implements PostsRepository {
  async create(data: Prisma.PostCreateManyInput) {
    const post = await prisma.post.create({ data });

    return post;
  }

  async delete(postId: number) {
    await prisma.post.delete({
      where: {
        id: postId
      }
    })
  }

  async update({ author, body, title, userId, createdAt, id }: Prisma.PostCreateManyInput) {
    const post = await prisma.post.update({
      where: {
        userId,
        id
      },
      data: {
        id,
        author,
        body,
        title,
        userId,
        createdAt,
      }
    })

    return post
  }

  async findById(id: number) {
    const post = await prisma.post.findFirst({ where: { id } });

    return post;
  }

  async findByTitle(userId: string, title: string) {
    const post = await prisma.post.findFirst({
      where: {
        userId,
        title,
      },
    });

    return post;
  }

  async findMany(page: number) {
    const posts = await prisma.post.findMany({
      take: 20,
      skip: (page - 1) * 20,
      orderBy: { createdAt: "desc" }
    });

    return posts;
  }

  async searchMany(page: number, query: string) {
    const posts = await prisma.post.findMany({
      where: { title: { contains: query } },
      take: 20,
      skip: (page - 1) * 20,
    });

    return posts;
  }

  async findPostForUser(userId: string) {
    const posts = await prisma.post.findMany({
      where: {
        userId
      },
      orderBy: { createdAt: "desc" }
    })

    return posts
  }
}
