import { beforeEach, describe, expect, it } from "vitest";

import { GetUserProfileUseCase } from "./get-user-profile";
import { UserInMemoryRepository } from "../../repositories/in-memory/users-in-memory";
import { PostsInMemoryRepository } from "../../repositories/in-memory/posts-in-memory-repository";
import { FollowInMemoryRepository } from "../../repositories/in-memory/follow-in-memory-repository";

let followsRepository: FollowInMemoryRepository
let usersRepository: UserInMemoryRepository;
let postsRepository: PostsInMemoryRepository;
let sup: GetUserProfileUseCase;

describe("Get user profile use case", () => {
  beforeEach(() => {
    usersRepository = new UserInMemoryRepository();
    postsRepository = new PostsInMemoryRepository()
    followsRepository = new FollowInMemoryRepository()
    sup = new GetUserProfileUseCase(usersRepository, postsRepository, followsRepository);
  });

  it("should be able to get user", async () => {
    usersRepository.users.push({
      createdAt: new Date(),
      id: "user_01",
      email: "gui@gmail",
      name: "Guilherme",
      password: "123456",
      details: "",
      nickname: "oi",
    });

    const { posts } = await sup.execute({ nickname: "oi" });

    expect(posts).toHaveLength(0);
  });

  it("should not be able to get user", () => {
    expect(
      async () => await sup.execute({ nickname: "non-existing-id" })
    ).rejects.toThrowError(Error);
  });
});
