import { beforeEach, describe, expect, it } from "vitest";

import { UserInMemoryRepository } from "../../repositories/in-memory/users-in-memory";
import { EditUserProfileUseCase } from "./edit-user-profile";

let usersRepository: UserInMemoryRepository;
let sup: EditUserProfileUseCase;

describe("Edit user profile use case", () => {
  beforeEach(() => {
    usersRepository = new UserInMemoryRepository();
    sup = new EditUserProfileUseCase(usersRepository);
  });

  it("should be able to edit on user", async () => {
    usersRepository.users.push({
      id: "01",
      email: "gui@gmail.com",
      name: "Guilherme",
      password: "123456",
      nickname: "Gui",
      details: "oi",
      createdAt: new Date(),
    });

    const { user } = await sup.execute({
      userId: "01",
      data: {
        details: "Detalhes",
        email: "gui@gmail.com",
        name: "Guilherme",
        password: "123456",
        nickname: "Gui",
      },
    });

    expect(user.details).toEqual("Detalhes");
  });

  it("should be able to return an already existing nickname error", async () => {
    usersRepository.users.push({
      id: "01",
      email: "gui@gmail.com",
      name: "Guilherme",
      password: "123456",
      nickname: "Gui",
      details: "oi",
      createdAt: new Date(),
    });

    usersRepository.users.push({
      id: "02",
      email: "gui@gmail.com",
      name: "Guilherme",
      password: "123456",
      nickname: "123",
      details: "oi",
      createdAt: new Date(),
    });

    expect(
      async () =>
        await sup.execute({
          userId: "01",
          data: {
            details: "Detalhes",
            email: "gui@gmail.com",
            name: "Guilherme",
            password: "123456",
            nickname: "123",
          },
        })
    ).rejects.toThrowError(Error);
  });

  it("should be able to return an already existing nickname error", async () => {
    usersRepository.users.push({
      id: "01",
      email: "gui@gmail.com",
      name: "Guilherme",
      password: "123456",
      nickname: "Gui",
      details: "oi",
      createdAt: new Date(),
    });

    usersRepository.users.push({
      id: "02",
      email: "gui@gmail.com",
      name: "Guilherme",
      password: "123456",
      nickname: "123",
      details: "oi",
      createdAt: new Date(),
    });

    expect(
      async () =>
        await sup.execute({
          userId: "01",
          data: {
            details: "Detalhes",
            email: "gui@gmail.com",
            name: "Guilherme",
            password: "123456",
            nickname: "123",
          },
        })
    ).rejects.toThrowError(Error);
  });
  it("should be able to return an already existing email error", async () => {
    usersRepository.users.push({
      id: "01",
      email: "gui@gmail.com",
      name: "Guilherme",
      password: "123456",
      nickname: "Gui",
      details: "oi",
      createdAt: new Date(),
    });

    usersRepository.users.push({
      id: "02",
      email: "gi@gmail.com",
      name: "Guilherme",
      password: "123456",
      nickname: "123",
      details: "oi",
      createdAt: new Date(),
    });

    expect(
      async () =>
        await sup.execute({
          userId: "01",
          data: {
            details: "Detalhes",
            email: "gi@gmail.com",
            name: "Guilherme",
            password: "123456",
            nickname: "123sf",
          },
        })
    ).rejects.toThrowError(Error);
  });
});
