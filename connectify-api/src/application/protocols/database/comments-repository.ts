import { Comment } from "@/domain/entities"

export type CommentRepository = {
  create(Input: CommentRepository.Create.Input): CommentRepository.Create.Output
}

export namespace CommentRepository {
  export namespace Create {
    export type Input = {
      commentId?: number
      body: string
      postId: number
      userId: string
    }

    export type Output = Promise<Comment>
  }
}