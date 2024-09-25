import { Post } from "@/domain/entities"

export interface ISearchPostUseCase {
  execute(input: ISearchPostUseCase.Input): ISearchPostUseCase.Output
}

export namespace ISearchPostUseCase {
  export type Input = {    
    query: string
    page: number
  }

  export type Output = Promise<{
    posts: Post[],
    meta: {
      countPosts: number
    }
  }>
}