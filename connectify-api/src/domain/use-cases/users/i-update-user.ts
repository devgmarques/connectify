import { User } from "@/domain/entities"

export interface IUpdateUserUseCase {
  execute(input: IUpdateUserUseCase.Input): IUpdateUserUseCase.Output
}

export namespace IUpdateUserUseCase {
  export type Input = {
    userId: string
    data: {
      email: string
      nickname: string
      name: string
      password: string
      details: string
    }
  }

  export type Output = Promise<User>
}