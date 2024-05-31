import { compare } from "bcryptjs";

import { UsersRepository } from "../../repositories/user";
import { CredentialsInvalidateError } from "../errors/credential-invalid-error";
import { UserNotExistError } from "../errors/user-not-exist-error";

type AuthentificateUseCaseRequest = {
  email: string;
  password: string;
};

export class AuthentificateUseCase {
  constructor(private usersRespository: UsersRepository) {}

  async execute({ email, password }: AuthentificateUseCaseRequest) {
    const user = await this.usersRespository.findByEmail(email);

    if (!user) {
      throw new UserNotExistError()
    }

    const comparePasswordHash = await compare(password, user.password);

    if(!comparePasswordHash){
      throw new CredentialsInvalidateError()
    }

    return {
      user,
    };
  }
}
