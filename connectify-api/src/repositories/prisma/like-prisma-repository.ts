import { prisma } from "@/lib/prisma";
import { Like, LikesRepository } from "../../entities/like";

export class LikePrismaRepository implements LikesRepository {
  async create({ postId, userId }: Like.LikeCreateInput) {
    const like = await prisma.like.create({
      data: {
        postId,
        userId,
      },
    })

    return like
  }

  async findByUserIdAndPostId({ postId, userId }: Like.LikeCreateInput) {
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