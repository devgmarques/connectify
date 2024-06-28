import { beforeEach, describe, expect, it } from "vitest";

import { UserInMemoryRepository } from "../../repositories/in-memory/users-in-memory";
import { CreatePostUseCase } from "./create-post";
import { PostsInMemoryRepository } from "../../repositories/in-memory/posts-in-memory-repository";
import { TitleAlreadyExistInUserError } from "../errors/title-already-exist-in-user-error";

let usersRepository: UserInMemoryRepository;
let postsRepository: PostsInMemoryRepository;
let sup: CreatePostUseCase;

describe("Create post use case", () => {
  beforeEach(() => {
    usersRepository = new UserInMemoryRepository();
    postsRepository = new PostsInMemoryRepository();
    sup = new CreatePostUseCase(postsRepository);

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
  });

  it("should be able to create post", async () => {
    const { post } = await sup.execute({
      userId: "user_01",
      data: {
        author: "developer",
        title: "Sobre RS",
        body: "Não concordo com sua opinião",
      }
    });

    expect(post).toEqual(expect.objectContaining({
      title: "Sobre RS"
    }));
  });

  it("should be able return an already existing title error", async () => {
    await sup.execute({
      userId: "user_01",
      data: {
        author: "developer",
        title: "Sobre RS",
        body: "Não concordo com sua opinião",
      }
    });

    expect(() => sup.execute({
      userId: "user_01",
      data: {
        author: "developer",
        title: "Sobre RS",
        body: "Não concordo com sua opinião",
      }
    })).rejects.toBeInstanceOf(TitleAlreadyExistInUserError);
  });
});
