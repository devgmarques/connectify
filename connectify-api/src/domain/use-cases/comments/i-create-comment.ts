import { Comment } from "@/domain/entities"

export interface ICreateCommentUseCase {
    execute(input: ICreateCommentUseCase.Input): ICreateCommentUseCase.Output
}

export namespace ICreateCommentUseCase {
    export type Input = {
      body: string
      postId: number
      userId: string
    }

    export type Output = Promise<Comment>
}