import { beforeEach, describe, expect, it } from "vitest";

import { UserInMemoryRepository } from "../../repositories/in-memory/users-in-memory";
import { PostsInMemoryRepository } from "../../repositories/in-memory/posts-in-memory-repository";
import { FetchPostUseCase } from "./fetch-post";
import { title } from "process";

let usersRepository: UserInMemoryRepository;
let postsRepository: PostsInMemoryRepository;
let sup: FetchPostUseCase;

describe("Fetch post use case", () => {
  beforeEach(() => {
    usersRepository = new UserInMemoryRepository();
    postsRepository = new PostsInMemoryRepository();
    sup = new FetchPostUseCase(postsRepository);

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

  it("should be able to fetch posts", async () => {
    postsRepository.posts.push({
      id: 1,
      userId: "user_id",
      title: "Novo titulo",
      author: "developer",
      body: "Body editado",
      createdAt: new Date()
    })

    postsRepository.posts.push({
      id: 0,
      userId: "user_id",
      title: "Novo titulo",
      author: "developer",
      body: "Body editado",
      createdAt: new Date()
    })

    const { posts } = await sup.execute({
      page: 1,
    });

    expect(posts).toHaveLength(2);
  });

  it("should be able to fetch posts with pagination", async () => {
    for (let i = 0; i < 21; i++) {
      postsRepository.posts.push({
        id: 1,
        userId: "user_id",
        title: "Novo titulo",
        author: "developer",
        body: "Body editado",
        createdAt: new Date()
      })
    }

    const { posts } = await sup.execute({
      page: 2,
    });

    expect(posts).toHaveLength(1);
  });
});
