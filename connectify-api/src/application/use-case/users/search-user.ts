import { UsersRepository } from "@/application/protocols/database"
import { ISearchUserUseCase } from "@/domain/use-cases/users"

export class SearchUserUseCase implements ISearchUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(input: ISearchUserUseCase.Input): ISearchUserUseCase.Output  {
    const users = await this.usersRepository.searchMany({
      page: input.page,
      query: input.query,
      userId: input.userId
    })

    const countUsers = await this.usersRepository.countAllUsers({ query: input.query })

    return {
      users: users || [],
      meta: {
        countUsers
      }
    }
  }
}
