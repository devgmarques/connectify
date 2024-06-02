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

  async removeLike(id: number) {
    const like = await prisma.like.delete({
      where: {
        id
      }
    })

    return like ? true : false
  }
}