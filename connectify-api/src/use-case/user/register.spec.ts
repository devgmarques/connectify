import { beforeEach, describe, expect, it } from "vitest";

import { RegisterUseCase } from "./register";
import { UserInMemoryRepository } from "../../repositories/in-memory/users-in-memory";
import { EmailAlreadyExistError } from "../errors/email-already-exist-error";
import { NicknameAlreadyExistError } from "../errors/nickname-already-exist-error";

let usersRepository: UserInMemoryRepository;
let sup: RegisterUseCase;

describe("Register use case", () => {
  beforeEach(() => {
    usersRepository = new UserInMemoryRepository();
    sup = new RegisterUseCase(usersRepository);
  });

  it("should be able to create new user", async () => {
    const { user } = await sup.execute({
      email: "gui@gmail.com",
      name: "Guilherme",
      password: "123456",
      nickname: "Gui",
    });

    expect(user.email).toEqual(expect.any(String));
  });

  it("should be able to return an error because the email was repeated", async () => {
    usersRepository.users.push({
      id: "user_id",
      url_avatar: "https://github/gmarques.png",
      email: "gui@gmail.com",
      name: "Guilherme",
      password: "123456",
      nickname: "da",
      createdAt: new Date(),
      details: "Sou o desenvolvedor deste projeto.",
    });

    expect(() =>
      sup.execute({
        email: "gui@gmail.com",
        name: "Guilherme",
        password: "123456",
        nickname: "gui",
      })
    ).rejects.toBeInstanceOf(EmailAlreadyExistError);
  });

  it("should be able to return an error because the nickname was repeated", async () => {
    usersRepository.users.push({
      id: "user_id",
      url_avatar: "https://github/gmarques.png",
      email: "guia@gmail.com",
      name: "Guilherme",
      password: "123456",
      nickname: "gui",
      createdAt: new Date(),
      details: "Sou o desenvolvedor deste projeto.",
    });

    expect(() =>
      sup.execute({
        email: "gui@gmail.com",
        name: "Guilherme",
        password: "123456",
        nickname: "gui",
      })
    ).rejects.toBeInstanceOf(NicknameAlreadyExistError);
  });
});
