import { User } from "@/domain/entities"

export interface IRegisterUserUseCase {
  execute(input: IRegisterUserUseCase.Input): IRegisterUserUseCase.Output
}

export namespace IRegisterUserUseCase {
  export type Input = {
    email: string
    nickname: string
    name: string
    password: string
  }

  export type Output = Promise<User>
}