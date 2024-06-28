import { UsersRepository } from "@/entities/user";
import { UserNotExistError } from "../errors/user-not-exist-error";
import { NicknameAlreadyExistError } from "../errors/nickname-already-exist-error";
import { hash } from "bcryptjs";

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
  constructor(private usersRepository: UsersRepository) { }

  async execute({ userId, data: { details, email, name, nickname, password } }: EditUserProfileUseCaseRequest) {
    const userById = await this.usersRepository.findById(userId);

    if (!userById) {
      throw new UserNotExistError();
    }

    const nicknameAlreadyExists = await this.usersRepository.findByNickName(
      nickname
    );

    if (nicknameAlreadyExists && nicknameAlreadyExists.id !== userId) {
      throw new NicknameAlreadyExistError();
    }

    const passwordHash = await hash(password, 6)

    const user = await this.usersRepository.updateUser(userId, {
      email,
      nickname,
      name,
      password: passwordHash,
      details,
    });

    return {
      user,
    };
  }
}
