import { Upload, UploadRepository } from "@/entities/upload";
import { UsersRepository } from "@/entities/user";

type UploadUserUseCaseRequest = {
  file: Upload.File
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
