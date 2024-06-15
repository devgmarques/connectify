import { UsersRepository } from "@/repositories/user";

type SearchUserUseCaseRequest = {
  query: string;
  page: number;
};

export class SearchUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ page, query }: SearchUserUseCaseRequest) {
    const users = await this.usersRepository.searchMany(page, query);
    const countUsers = await this.usersRepository.countAllUsers(query)

    return {
      users,
      meta: {
        countUsers
      }
    };
  }
}
