import { IRegisterUserUseCase } from "@/domain/use-cases/users"
import { UsersRepository } from "@/application/protocols/database"

import { EmailAlreadyExistError, NicknameAlreadyExistError } from "@/application/errors"
import { HashRepository } from "@/application/protocols/crypto"

export class RegisterUserUseCase implements IRegisterUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashRepository: HashRepository
  ) {}

  async execute(input: IRegisterUserUseCase.Input): IRegisterUserUseCase.Output {
    const emailAlreadyExists = await this.usersRepository.findByEmail({ email: input.email })

    if (emailAlreadyExists) {
      throw new EmailAlreadyExistError()
    }

    const nicknameAlreadyExists = await this.usersRepository.findByNickName({ nickname: input.nickname })

    if (nicknameAlreadyExists) {
      throw new NicknameAlreadyExistError()
    }

    const passwordHash = await this.hashRepository.create({ string: input.password, salt: 6 })

    const user = await this.usersRepository.create({
      email: input.email,
      name: input.name,
      password: passwordHash,
      nickname: input.nickname
    })

    return user
  }
} 
