import { UsersRepository } from "@/entities/user";
import { CredentialsInvalidateError } from "../errors/credential-invalid-error";
import { UserNotExistError } from "../errors/user-not-exist-error";
import { HashRepository } from "@/entities/hash";

type AuthentificateUseCaseRequest = {
  email: string;
  password: string;
};

export class AuthentificateUseCase {
  constructor(
    private usersRespository: UsersRepository,
    private hashRepository: HashRepository
  ) { }

  async execute({ email, password }: AuthentificateUseCaseRequest) {
    const user = await this.usersRespository.findByEmail(email);

    if (!user) {
      throw new UserNotExistError()
    }

    const comparePasswordHash = await this.hashRepository.compare(password, user.password);

    if (!comparePasswordHash) {
      throw new CredentialsInvalidateError()
    }

    return {
      user,
    };
  }
}
