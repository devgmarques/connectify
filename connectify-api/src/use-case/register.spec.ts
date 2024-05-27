import { beforeEach, describe, expect, it } from "vitest";

import { RegisterUseCase } from "./register";
import { UserInMemoryRepository } from "../repositories/in-memory/users-in-memory";

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
    await usersRepository.create({
      email: "gui@gmail.com",
      name: "Guilherme",
      password: "123456",
      nickname: "gui",
    });

    expect(
      await sup.execute({
        email: "gui@gmail.com",
        name: "Guilherme",
        password: "123456",
        nickname: "gui",
      })
    ).toThrowError(Error);
  });

  it("should be able to return an error because the nickname was repeated", async () => {
    await usersRepository.create({
      email: "gi@gmail.com",
      name: "Guilherme",
      password: "123456",
      nickname: "gui",
    });

    expect(
      await sup.execute({
        email: "gui@gmail.com",
        name: "Guilherme",
        password: "123456",
        nickname: "gui",
      })
    ).toThrowError(Error);
  });
});
