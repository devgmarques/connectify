import { prisma } from "@/lib/prisma";
import { LikesRepository } from "../like";

export class LikePrismaRepository implements LikesRepository {
  async create(data: { userId: string; postId: number; }) {
    const like = await prisma.like.create({
      data: {
        postId: data.postId,
        userId: data.userId,
      },
    })

    return like
  }

  async findByUserIdAndPostId({ postId, userId }: { userId: string; postId: number; }) {
    const like = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId
        }
      }
    })

    return like
  }

  async increment(id: number) {
    const like = await prisma.like.update({
      where: { id },
      data: {
        likeCount: { increment: 1 }
      }
    })

    return like.likeCount
  }

  async removeLike(id: number) {
    const like = await prisma.like.update({
      where: { id }, data: {
        likeCount: { decrement: 1 }
      }
    })

    await prisma.like.delete({
      where: {
        id
      }
    })

    return like.likeCount
  }
}