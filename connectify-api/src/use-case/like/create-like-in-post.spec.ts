import { beforeEach, describe, expect, it } from "vitest";

import { UserInMemoryRepository } from "../../repositories/in-memory/users-in-memory";
import { PostsInMemoryRepository } from "../../repositories/in-memory/posts-in-memory-repository";
import { LikeInMemoryRepository } from "../../repositories/in-memory/like-in-memory-repository";
import { CreateLikesInPostUseCase } from "./create-like-in-post";

let usersRepository: UserInMemoryRepository;
let likesRepository: LikeInMemoryRepository;
let postsRepository: PostsInMemoryRepository;
let sup: CreateLikesInPostUseCase;

describe("Create like in post use case", () => {
  beforeEach(() => {
    usersRepository = new UserInMemoryRepository();
    likesRepository = new LikeInMemoryRepository();
    postsRepository = new PostsInMemoryRepository();
    sup = new CreateLikesInPostUseCase(likesRepository, postsRepository);

    usersRepository.users.push({
      createdAt: new Date(),
      id: "user_01",
      details: "",
      nickname: "",
      email: "gui@gmail",
      name: "Guilherme",
      password: "123456",
    });

    postsRepository.posts.push({
      id: 0,
      userId: "user_01",
      body: "Globo",
      title: "Sobre RS",
      createdAt: new Date(),
    });
  });

  it("should be able to create like in post", async () => {
    const { like } = await sup.execute({
      postId: 0,
      userId: "user_01",
    });

    expect(like.id).toEqual(expect.any(Number));
  });

  it("should be able to returning an error user already liked the post.", async () => {
    await sup.execute({
      postId: 0,
      userId: "user_01",
    });

    expect(
      async () =>
        await sup.execute({
          postId: 0,
          userId: "user_01",
        })
    ).rejects.toThrowError(Error);
  });
});
