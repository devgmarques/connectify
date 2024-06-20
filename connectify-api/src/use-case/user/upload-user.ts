import { File } from "@/@types/file";
import { UploadRepository } from "@/repositories/upload";
import { UsersRepository } from "@/repositories/user";

type UploadUserUseCaseRequest = {
  file: File
  userId: string
};

export class UploadUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private uploadRepository: UploadRepository
  ) { }

  async execute({ file, userId }: UploadUserUseCaseRequest) {
    const buffer = await file.toBuffer()

    const fullPath = await this.uploadRepository.upload(file, buffer)

    await this.usersRepository.updateUrlAvatar(fullPath, userId)
  }
}
