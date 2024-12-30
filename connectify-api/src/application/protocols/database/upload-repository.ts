import { File } from '@/domain/entities'

export type UploadRepository = {
  upload(input: UploadRepository.Upload.Input): UploadRepository.Upload.Output
}

export namespace UploadRepository {
  export namespace Upload { 
    export type Input = { 
      file: File
      buffer: Buffer
    }

    export type Output = Promise<string> 
  }
}