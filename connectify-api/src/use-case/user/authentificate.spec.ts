import { beforeEach, describe, expect, it } from "vitest";

import { UserInMemoryRepository } from "../../repositories/in-memory/users-in-memory";
import { AuthentificateUseCase } from "./authentificate";
import { HashInMemoryRepository } from "@/repositories/in-memory/hash-in-memory-repository";
import { UserNotExistError } from "../errors/user-not-exist-error";
import { CredentialsInvalidateError } from "../errors/credential-invalid-error";

let usersRepository: UserInMemoryRepository;
let hashRepository: HashInMemoryRepository
let sup: AuthentificateUseCase;

describe("Authentificate use case", () => {
  beforeEach(() => {
    usersRepository = new UserInMemoryRepository();
    hashRepository = new HashInMemoryRepository()

    sup = new AuthentificateUseCase(usersRepository, hashRepository);

    usersRepository.users.push({
      id: "user_id",
      url_avatar: "https://github/gmarques.png",
      email: "gui@gmail.com",
      name: "Guilherme",
      password: "123456",
      nickname: "developer",
      createdAt: new Date(),
      details: "Sou o desenvolvedor deste projeto.",
    });
  });

  it("should be able to create authentication", async () => {
    const { user } = await sup.execute({
      email: "gui@gmail.com",
      password: "123456",
    });

    expect(user).toEqual(expect.objectContaining({
      email: "gui@gmail.com",
    }
    ));
  });

  it("should be able to return error user not exists", async () => {
    expect(() => sup.execute({
      email: "user-not-exist@teste.com",
      password: "123456",
    })).rejects.toBeInstanceOf(UserNotExistError)
  })

  it("should be able to return error credential invalid", async ()=>{
    expect(() => sup.execute({
      email: "gui@gmail.com",
      password: "eqwqweq",
    })).rejects.toBeInstanceOf(CredentialsInvalidateError)
  })
});
