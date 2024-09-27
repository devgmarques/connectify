import { LikesRepository } from "@/application/protocols/database"
import { prisma } from ".."
import { Like } from "@/domain/entities"

export class PrismaLikesRepository implements LikesRepository {
  async create(input: LikesRepository.Create.Input): LikesRepository.Create.Output {
    const like = await prisma.like.create({
      data: {
        postId: input.postId,
        userId: input.userId,
      },
    })

    const correctLikeFormat: Like = {
      likeId: like.id,
      postId: like.postId,
      userId: like.userId,
      createdAt: like.createdAt
    } 

    return correctLikeFormat
  }

  async delete(input: LikesRepository.Delete.Input): LikesRepository.Delete.Output {
    const like = await prisma.like.delete({
      where: {
        id: input.likeId
      }
    })

    return like ? true : false
  }

  async findByUserIdAndPostId(input: LikesRepository.FindByUserIdAndPostId.Input): LikesRepository.FindByUserIdAndPostId.Output {
    const like = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: input.userId,
          postId: input.postId
        }
      }
    })

    if (!like) {
      return null
    }

    const correctLikeFormat: Like = {
      likeId: like.id,
      postId: like.postId,
      userId: like.userId,
      createdAt: like.createdAt
    } 

    return correctLikeFormat
  }
}