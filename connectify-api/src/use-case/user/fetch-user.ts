import { UsersRepository } from "../../repositories/users";

type FetchUserUseCaseRequest = {
  query: string;
  page: number;
};

export class FetchUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ page, query }: FetchUserUseCaseRequest) {
    const users = await this.usersRepository.findMany(page, query);

    return {
      users,
    };
  }
}
