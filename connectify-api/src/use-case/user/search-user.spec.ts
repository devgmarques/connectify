import { beforeEach, describe, expect, it } from "vitest";

import { UserInMemoryRepository } from "../../repositories/in-memory/users-in-memory";
import { SearchUserUseCase } from "./search-user";

let usersRepository: UserInMemoryRepository;
let sup: SearchUserUseCase;

describe("Fetch users use case", () => {
  beforeEach(() => {
    usersRepository = new UserInMemoryRepository();
    sup = new SearchUserUseCase(usersRepository);
  });

  it("should be able to fetch users", async () => {
    usersRepository.users.push({
      id: "01",
      email: "gui@gmail.com",
      name: "Guilherme",
      password: "123456",
      nickname: "ui",
      details: "oi",
      createdAt: new Date(),
    });

    usersRepository.users.push({
      id: "01",
      email: "gui@gmail.com",
      name: "Guilherme",
      password: "123456",
      nickname: "Gui",
      details: "oi",
      createdAt: new Date(),
    });

    const { users } = await sup.execute({
      page: 1,
      query: "G",
    });

    expect(users).toHaveLength(1);
  });

  it("should be able to fetch users with pagination", async () => {
    for (let i = 0; i < 26; i++) {
      usersRepository.users.push({
        id: "01",
        email: "gui@gmail.com",
        name: "Guilherme",
        password: "123456",
        nickname: "sgui",
        details: "oi",
        createdAt: new Date(),
      });
    }

    const { users } = await sup.execute({
      page: 2,
      query: "g",
    });

    expect(users).toHaveLength(6);
  });
});
