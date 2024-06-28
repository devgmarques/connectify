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
      id: "user_id",
      url_avatar: "https://github/gmarques.png",
      email: "gui@gmail.com",
      name: "Guilherme",
      password: "123456",
      nickname: "developer",
      createdAt: new Date(),
      details: "Sou o desenvolvedor deste projeto.",
    });

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

    const { users } = await sup.execute({
      page: 1,
      userId: ""
    });

    expect(users).toHaveLength(2);
  });
});
