import { UploadRepository, UsersRepository } from "@/application/protocols/database"
import { IUploadUserUseCase } from "@/domain/use-cases/users"

export class UploadUserUseCase implements IUploadUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private uploadRepository: UploadRepository
  ) { }

  async execute(input: IUploadUserUseCase.Input): IUploadUserUseCase.Output {
    const buffer = await input.file.toBuffer()

    const fullPath = await this.uploadRepository.upload({ file: input.file, buffer })

    await this.usersRepository.updateUrlAvatar({ fullPath, userId: input.userId })
  }
}
