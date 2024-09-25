import { Post } from "@/domain/entities"

export interface IUpdatePostUseCase {
  execute(input: IUpdatePostUseCase.Input): IUpdatePostUseCase.Output
}

export namespace IUpdatePostUseCase {
  export type Input = {
    userId: string
    data: {
      postId: number,
      body: string,
      title: string,
      author: string,
      createdAt: string
    }
  }

  export type Output = Promise<Post>
}