import { User } from "@/domain/entities"

export interface IFetchUserUseCase {
  execute(input: IFetchUserUseCase.Input): IFetchUserUseCase.Output
}

export namespace IFetchUserUseCase {
  export type Input = {
    page: number
    userId: string
  }

  export type Output = Promise<User[]>
}