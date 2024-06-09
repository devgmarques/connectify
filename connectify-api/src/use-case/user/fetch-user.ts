import { UsersRepository } from "@/repositories/user";

type FetchUserUseCaseRequest = {
  page: number;
  userId: string;
};

export class FetchUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ page, userId }: FetchUserUseCaseRequest) {
    const users = await this.usersRepository.findMany(page, userId);

    return {
      users,
    };
  }
}
