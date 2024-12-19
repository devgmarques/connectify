import { NicknameAlreadyExistError, UserNotExistError } from "@/application/errors"
import { HashRepository } from "@/application/protocols/crypto"
import { UsersRepository } from "@/application/protocols/database"
import { IUpdateUserUseCase } from "@/domain/use-cases/users"

export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashRepository: HashRepository
  ) { }

  async execute(input: IUpdateUserUseCase.Input): IUpdateUserUseCase.Output {
    const userById = await this.usersRepository.findById({ userId: input.userId })

    if (!userById) {
      throw new UserNotExistError()
    }

    const nicknameAlreadyExists = await this.usersRepository.findByNickName({ nickname: input.data.nickname })

    if (nicknameAlreadyExists && nicknameAlreadyExists.userId !== input.userId) {
      throw new NicknameAlreadyExistError()
    }

    const passwordHash = await this.hashRepository.create({ string: input.data.password, salt: 6})

    const user = await this.usersRepository.updateUser({
      userId: input.userId,
      data: {
        email: input.data.email,
        nickname: input.data.nickname,
        name: input.data.name,
        password: passwordHash,
        details: input.data.details,
      }
    })

    return user
  }
}