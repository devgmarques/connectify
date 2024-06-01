import { UsersRepository } from "@/repositories/user";
import { EmailAlreadyExistError } from "../errors/email-already-exist-error";
import { UserNotExistError } from "../errors/user-not-exist-error";

type EditUserProfileUseCaseRequest = {
  userId: string;
  data: {
    email: string;
    nickname: string;
    name: string;
    password: string;
    details: string;
  };
};

export class EditUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ userId, data }: EditUserProfileUseCaseRequest) {
    const userById = await this.usersRepository.findById(userId);

    if (!userById) {
      throw new UserNotExistError();
    }

    const emailAlreadyExists = await this.usersRepository.findByEmail(
      data.email
    );

    if (emailAlreadyExists && emailAlreadyExists.id !== userId) {
      throw new EmailAlreadyExistError()
    }

    const nicknameAlreadyExists = await this.usersRepository.findByNickName(
      data.nickname
    );

    if (nicknameAlreadyExists && nicknameAlreadyExists.id !== userId) {
      throw new Error("User already exists with this nickname.");
    }

    const user = await this.usersRepository.updateUser(userId, data);

    return {
      user,
    };
  }
}
