import { beforeEach, describe, expect, it } from "vitest";

import { UserInMemoryRepository } from "../../repositories/in-memory/users-in-memory";
import { FetchUserUseCase } from "./fetch-user";

let usersRepository: UserInMemoryRepository;
let sup: FetchUserUseCase;

describe("Fetch users use case", () => {
  beforeEach(() => {
    usersRepository = new UserInMemoryRepository();
    sup = new FetchUserUseCase(usersRepository);
  });

  it("should be able to fetch users", async () => {
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
    });

    expect(users).toHaveLength(2);
  });
});
