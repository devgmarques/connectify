import { UsersRepository } from "../repositories/users";

type GetUserUseCaseRequest = {
  userId: string;
};

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ userId }: GetUserUseCaseRequest) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new Error("User not exists with this id.");
    }

    return {
      user,
    };
  }
}
