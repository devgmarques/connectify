import { beforeEach, describe, expect, it } from "vitest";

import { UserInMemoryRepository } from "../../repositories/in-memory/users-in-memory";
import { SearchUserUseCase } from "./search-user";

let usersRepository: UserInMemoryRepository;
let sup: SearchUserUseCase;

describe("Search users use case", () => {
  beforeEach(() => {
    usersRepository = new UserInMemoryRepository();
    sup = new SearchUserUseCase(usersRepository);
  });

  it("should be able to search users", async () => {
    usersRepository.users.push({
      id: "user_id",
      url_avatar: "https://github/gmarques.png",
      email: "gui@gmail.com",
      name: "Guilherme",
      password: "123456",
      nickname: "gui",
      createdAt: new Date(),
      details: "Sou o desenvolvedor deste projeto.",
    });

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

    const { users, meta } = await sup.execute({
      page: 1,
      query: "gui",
      userId: "not-exists-id"
    });

    expect(meta.countUsers).toBe(1)
    expect(users).toHaveLength(1);
  });

  it("should be able to fetch users with pagination", async () => {
    for (let i = 0; i < 26; i++) {
      usersRepository.users.push({
        id: "user_id",
        url_avatar: "https://github/gmarques.png",
        email: "gui@gmail.com",
        name: "Guilherme",
        password: "123456",
        nickname: "gui",
        createdAt: new Date(),
        details: "Sou o desenvolvedor deste projeto.",
      });
    }

    const { users, meta } = await sup.execute({
      page: 2,
      query: "gui",
      userId: "not-exist-id"
    });

    expect(users).toHaveLength(6);
    expect(meta.countUsers).toBe(26)
  });

  it("should be able to return zero when userId is equal to id", async() => {
    usersRepository.users.push({
      id: "user_id",
      url_avatar: "https://github/gmarques.png",
      email: "gui@gmail.com",
      name: "Guilherme",
      password: "123456",
      nickname: "gui",
      createdAt: new Date(),
      details: "Sou o desenvolvedor deste projeto.",
    });

    const { users } = await sup.execute({
      page: 2,
      query: "gui",
      userId: "user_id"
    });

    expect(users).toHaveLength(0)
  })
});
