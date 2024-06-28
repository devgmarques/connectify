import { beforeEach, describe, expect, it } from "vitest";

import { UserInMemoryRepository } from "../../repositories/in-memory/users-in-memory";
import { PostsInMemoryRepository } from "../../repositories/in-memory/posts-in-memory-repository";
import { LikeInMemoryRepository } from "../../repositories/in-memory/like-in-memory-repository";
import { CreateLikeInPostUseCase } from "./create-like";
import { PostNotExistError } from "../errors/post-not-exist-error";

let usersRepository: UserInMemoryRepository;
let likesRepository: LikeInMemoryRepository;
let postsRepository: PostsInMemoryRepository;
let sup: CreateLikeInPostUseCase;

describe("Create like in post use case", () => {
  beforeEach(() => {
    usersRepository = new UserInMemoryRepository();
    likesRepository = new LikeInMemoryRepository();
    postsRepository = new PostsInMemoryRepository();
    sup = new CreateLikeInPostUseCase(likesRepository, postsRepository);

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

    postsRepository.posts.push({
      id: 0,
      userId: "user_01",
      author: "developer",
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

    expect(like).toEqual(true);
  });

  it("should be able to return deslike in post.", async () => {
    await sup.execute({
      postId: 0,
      userId: "user_01",
    });

    const { like } = await sup.execute({
      postId: 0,
      userId: "user_01",
    });

    expect(like).toEqual(false);
  });
        
  it("should be able to return error post not exist", async () => {
    expect(() =>
      sup.execute({
        postId: 1,
        userId: "user_01",
      })
    ).rejects.toBeInstanceOf(PostNotExistError)
  })
});
