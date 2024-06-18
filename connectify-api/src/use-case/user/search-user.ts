import { UsersRepository } from "@/repositories/user";

type SearchUserUseCaseRequest = {
  query: string;
  page: number;
  userId: string
};

export class SearchUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ page, query, userId }: SearchUserUseCaseRequest) {
    const users = await this.usersRepository.searchMany(page, query, userId);
    const countUsers = await this.usersRepository.countAllUsers(query)

    return {
      users,
      meta: {
        countUsers
      }
    };
  }
}
