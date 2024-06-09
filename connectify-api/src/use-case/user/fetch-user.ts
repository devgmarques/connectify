import { UsersRepository } from "@/repositories/user";

type FetchUserUseCaseRequest = {
  page: number;
};

export class FetchUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ page }: FetchUserUseCaseRequest) {
    const users = await this.usersRepository.findMany(page);

    return {
      users,
    };
  }
}
