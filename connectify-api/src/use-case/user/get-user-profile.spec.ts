import { beforeEach, describe, expect, it } from "vitest";

import { GetUserProfileUseCase } from "./get-user-profile";
import { UserInMemoryRepository } from "../../repositories/in-memory/users-in-memory";
import { PostsInMemoryRepository } from "@/repositories/in-memory/posts-in-memory-repository";

let usersRepository: UserInMemoryRepository;
let postsRepository: PostsInMemoryRepository;
let sup: GetUserProfileUseCase;

describe("Get user profile use case", () => {
  beforeEach(() => {
    usersRepository = new UserInMemoryRepository();
    sup = new GetUserProfileUseCase(usersRepository, postsRepository);
  });

  it("should be able to get user", async () => {
    usersRepository.users.push({
      createdAt: new Date(),
      id: "user_01",
      email: "gui@gmail",
      name: "Guilherme",
      password: "123456",
      details: "",
      nickname: "",
    });

    const { posts } = await sup.execute({ userId: "user_01" });

    expect(posts).toHaveLength(0);
  });

  it("should not be able to get user", () => {
    expect(
      async () => await sup.execute({ userId: "non-existing-id" })
    ).rejects.toThrowError(Error);
  });
});
