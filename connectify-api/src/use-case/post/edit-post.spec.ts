import { beforeEach, describe, expect, it } from "vitest";

import { UserInMemoryRepository } from "../../repositories/in-memory/users-in-memory";
import { PostsInMemoryRepository } from "../../repositories/in-memory/posts-in-memory-repository";
import { EditPostUseCase } from "./edit-post";
import { TitleAlreadyExistInUserError } from "../errors/title-already-exist-in-user-error";

let usersRepository: UserInMemoryRepository;
let postsRepository: PostsInMemoryRepository;
let sup: EditPostUseCase;

describe("Edit post use case", () => {
  beforeEach(() => {
    usersRepository = new UserInMemoryRepository();
    postsRepository = new PostsInMemoryRepository();
    sup = new EditPostUseCase(postsRepository);

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
      userId: "user_id",
      title: "Novo titulo",
      author: "developer",
      body: "Body editado",
      createdAt: new Date()
    })
  });

  it("should be able to edit post", async () => {
    const { post } = await sup.execute({
      userId: "user_01",
      data: {
        id: 0,
        title: "Novo",
        author: "developer",
        body: "Body editado",
        createdAt: new Date().toISOString()
      }
    });

    expect(post).toEqual(expect.objectContaining({
      title: "Novo",
    }));
  });

  it("should be able return an already existing title error", async () => {
    await sup.execute({
      userId: "user_01",
      data: {
        id: 0,
        title: "Novo",
        author: "developer",
        body: "Body editado",
        createdAt: new Date().toISOString()
      }
    });

    expect(() =>
      sup.execute({
        userId: "user_01",
        data: {
          id: 0,
          title: "Novo",
          author: "developer",
          body: "Body editado",
          createdAt: new Date().toISOString()
        }
      })
    ).rejects.toBeInstanceOf(TitleAlreadyExistInUserError);
  });
});
