import { File } from "@/@types/file"

export type UploadRepository = {
  upload(file: File, buffer: Buffer): Promise<string>
}