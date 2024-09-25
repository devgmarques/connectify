import { Post } from "@/domain/entities"

export interface IFetchPostUseCase {
  execute(input: IFetchPostUseCase.Input): IFetchPostUseCase.Output
}

export namespace IFetchPostUseCase {
  export type Input = {
    page: number
  }

  export type Output = Promise<Post[]>
}