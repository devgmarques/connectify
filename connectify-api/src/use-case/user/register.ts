import { hash } from "bcryptjs";
import { UsersRepository } from "../../repositories/users";
import { CreadentialsAlreadyExistError } from "../errors/credentials-already-exist-error";

type RegisterUseCaseRequest = {
  email: string;
  nickname: string;
  name: string;
  password: string;
};

export class RegisterUseCase {
  constructor(private usersRespository: UsersRepository) {}

  async execute({ email, name, password, nickname }: RegisterUseCaseRequest) {
    const emailAlreadyExists = await this.usersRespository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new CreadentialsAlreadyExistError()
    }

    const nicknameAlreadyExists = await this.usersRespository.findByNickName(
      nickname
    );

    if (nicknameAlreadyExists) {
      throw new CreadentialsAlreadyExistError()
    }

    const passwordHash = await hash(password, 6);

    const user = await this.usersRespository.create({
      email,
      name,
      password: passwordHash,
      nickname
    });

    return {
      user,
    };
  }
}
