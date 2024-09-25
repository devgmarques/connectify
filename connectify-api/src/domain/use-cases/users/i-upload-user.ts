import { Upload } from "@/domain/entities/upload"

export interface IUploadUserUseCase {
  execute(input: IUploadUserUseCase.Input): IUploadUserUseCase.Output
}

export namespace IUploadUserUseCase {
  export type Input = {
    file: Upload.File
    userId: string
  }

  export type Output = Promise<void>
}