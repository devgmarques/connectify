import { User } from "@/domain/entities"

export interface ISearchUserUseCase {
  execute(input: ISearchUserUseCase.Input): ISearchUserUseCase.Output
}

export namespace ISearchUserUseCase {
  export type Input = {
    query: string
    page: number
    userId: string
  }

  export type Output = Promise<{
    users: User[],
    meta: {
      countUsers: number
    }
  }>
}