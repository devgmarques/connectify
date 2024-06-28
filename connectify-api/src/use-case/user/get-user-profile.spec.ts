import { beforeEach, describe, expect, it } from "vitest";

import { GetUserProfileUseCase } from "./get-user-profile";
import { UserInMemoryRepository } from "../../repositories/in-memory/users-in-memory";
import { PostsInMemoryRepository } from "../../repositories/in-memory/posts-in-memory-repository";
import { FollowInMemoryRepository } from "../../repositories/in-memory/follow-in-memory-repository";
import { UserNotExistError } from "../errors/user-not-exist-error";

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
      id: "user_id",
      url_avatar: "https://github/gmarques.png",
      email: "gui@gmail.com",
      name: "Guilherme",
      password: "123456",
      nickname: "developer",
      createdAt: new Date(),
      details: "Sou o desenvolvedor deste projeto.",
    });

    const { posts, user } = await sup.execute({ nickname: "developer" });

    expect(posts).toHaveLength(0);
    expect(user).toEqual(expect.objectContaining({
      details: "Sou o desenvolvedor deste projeto.",
      email: "gui@gmail.com",
      name: "Guilherme",
      nickname: "developer",
      url_avatar: "https://github/gmarques.png",
    }))
  });

  it("should not be able to get user", () => {
    expect(
      () => sup.execute({ nickname: "non-existing-id" })
    ).rejects.toBeInstanceOf(UserNotExistError);
  });
});
