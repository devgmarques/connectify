import { CommentRepository } from "@/application/protocols/database"
import { Comment } from "@/domain/entities"

export class InMemoryCommentsRepository implements CommentRepository {
    private database: Comment[] = []

    async create(input: CommentRepository.Create.Input): CommentRepository.Create.Output {
      const comment: Comment = {
        commentId: input.commentId ?? 0,
        body: input.body,
        postId: input.postId,
        userId: input.userId,
        createdAt: new Date()
      } 

      this.database.push(comment)

      return comment
    }
}