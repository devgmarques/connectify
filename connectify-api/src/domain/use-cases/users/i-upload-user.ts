import { File } from "@/domain/entities"

export interface IUploadUserUseCase {
  execute(input: IUploadUserUseCase.Input): IUploadUserUseCase.Output
}

export namespace IUploadUserUseCase {
  export type Input = {
    file: File
    userId: string
  }

  export type Output = Promise<void>
}