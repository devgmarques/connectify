import { LikesRepository } from "@/application/protocols/database"
import { Like } from "@/domain/entities"

export class InMemoryLikesRepository implements LikesRepository {
    private database: Like[] = []

    async create(input: LikesRepository.Create.Input): LikesRepository.Create.Output {
      const like: Like = {
        likeId: input.likeId ?? 0,
        postId: input.postId,
        userId: input.userId,
        createdAt: new Date()
      }

      this.database.push(like)

      return like
    }

    async findByUserIdAndPostId(input: LikesRepository.FindByUserIdAndPostId.Input): LikesRepository.FindByUserIdAndPostId.Output {
      const like = this.database.find(
        (item) => item.userId === input.userId && item.postId === input.postId
      )
  
      if (!like) {
        return null
      }
  
      return like
    }

    async delete(input: LikesRepository.Delete.Input): LikesRepository.Delete.Output {
      const likes = this.database.filter((item) => item.likeId !== input.likeId)

      this.database = likes

      return true
    }
}