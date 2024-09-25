import { Post } from "@/domain/entities"

export interface ICreatePostUseCase {
  execute(input: ICreatePostUseCase.Input): ICreatePostUseCase.Output
}

export namespace ICreatePostUseCase {
  export type Input = {
    userId: string
    data: {
      title: string
      body: string
      author: string
    }
  }

  export type Output = Promise<Post>
}