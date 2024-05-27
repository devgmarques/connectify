import { beforeEach, describe, expect, it } from "vitest";

import { UserInMemoryRepository } from "../repositories/in-memory/users-in-memory";
import { CreatePostUseCase } from "./create-post";
import { PostsInMemoryRepository } from "../repositories/in-memory/posts-in-memory-repository";

let usersRepository: UserInMemoryRepository;
let postsRepository: PostsInMemoryRepository;
let sup: CreatePostUseCase;

describe("Create post use case", () => {
  beforeEach(() => {
    usersRepository = new UserInMemoryRepository();
    postsRepository = new PostsInMemoryRepository();
    sup = new CreatePostUseCase(usersRepository, postsRepository);
  });

  it("should be able to create post", async () => {
    usersRepository.users.push({
      createdAt: new Date(),
      id: "user_01",
      details: "",
      nickname: "",
      email: "gui@gmail",
      name: "Guilherme",
      password: "123456",
    });

    const { post } = await sup.execute({
      userId: "user_01",
      body: "Não concordo com sua opinião",
      title: "Sobre RS",
    });

    expect(post.id).toEqual(expect.any(Number));
  });

  it("should be able return an already existing title error", async () => {
    usersRepository.users.push({
      createdAt: new Date(),
      id: "user_01",
      email: "gui@gmail",
      name: "Guilherme",
      password: "123456",
      details: "",
      nickname: "",
    });

    const { post } = await sup.execute({
      userId: "user_01",
      body: "Não concordo com sua opinião",
      title: "Sobre RS",
    });

    expect(post.id).toEqual(expect.any(Number));
  });

  it("should be able return a user error does not exist", () => {
    expect(
      async () =>
        await sup.execute({
          userId: "user_01",
          body: "Não concordo com sua opinião",
          title: "Sobre RS",
        })
    ).rejects.toThrowError(Error);
  });
});
