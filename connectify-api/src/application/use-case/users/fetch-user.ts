import { UsersRepository } from "@/application/protocols/database"
import { IFetchUserUseCase } from "@/domain/use-cases/users"

export class FetchUserUseCase implements IFetchUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(input: IFetchUserUseCase.Input): IFetchUserUseCase.Output {
    const users = await this.usersRepository.findMany({ page: input.page, userId: input.userId })

    return users
  }
}
