import { beforeEach, describe, expect, it } from "vitest";

import { UserInMemoryRepository } from "../../repositories/in-memory/users-in-memory";
import { CreateFollowUserUseCase } from "./create-follow-user";
import { FollowInMemoryRepository } from "../../repositories/in-memory/follow-in-memory-repository";

let usersRepository: UserInMemoryRepository;
let followsRepository: FollowInMemoryRepository;
let sup: CreateFollowUserUseCase;

describe("Create comment in post use case", () => {
  beforeEach(() => {
    usersRepository = new UserInMemoryRepository();
    followsRepository = new FollowInMemoryRepository();
    sup = new CreateFollowUserUseCase(followsRepository);
  });

  it("should be able to create follow", async () => {
    usersRepository.users.push({
      createdAt: new Date(),
      id: "user_01",
      details: "",
      nickname: "",
      email: "gui@gmail",
      name: "Guilherme",
      password: "123456",
    });

    usersRepository.users.push({
      createdAt: new Date(),
      id: "user_02",
      details: "",
      nickname: "",
      email: "gui@gmail",
      name: "Guilherme",
      password: "123456",
    });

    const { follow } = await sup.execute({
      followedId: "user_01",
      userId: "user_02",
    });

    expect(follow).toEqual(true);
  });

  it("should be able to remove one follow", async () => {
    usersRepository.users.push({
      createdAt: new Date(),
      id: "user_01",
      details: "",
      nickname: "",
      email: "gui@gmail",
      name: "Guilherme",
      password: "123456",
    });

    usersRepository.users.push({
      createdAt: new Date(),
      id: "user_02",
      details: "",
      nickname: "",
      email: "gui@gmail",
      name: "Guilherme",
      password: "123456",
    });

    await sup.execute({
      followedId: "user_01",
      userId: "user_02",
    });

    const { follow } = await sup.execute({
      followedId: "user_01",
      userId: "user_02",
    });

    expect(follow).toEqual(false);
  });
});
