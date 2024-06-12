import { beforeEach, describe, expect, it } from "vitest";

import { UserInMemoryRepository } from "../../repositories/in-memory/users-in-memory";
import { PostsInMemoryRepository } from "../../repositories/in-memory/posts-in-memory-repository";
import { SearchPostUseCase } from "./search-post";

let usersRepository: UserInMemoryRepository;
let postsRepository: PostsInMemoryRepository;
let sup: SearchPostUseCase;

describe("Search posts use case", () => {
  beforeEach(() => {
    usersRepository = new UserInMemoryRepository();
    postsRepository = new PostsInMemoryRepository();
    sup = new SearchPostUseCase(postsRepository);

    usersRepository.users.push({
      createdAt: new Date(),
      id: "user_01",
      details: "",
      nickname: "",
      email: "gui@gmail",
      name: "Guilherme",
      password: "123456",
    });
  });

  it("should be able to search posts", async () => {
    postsRepository.posts.push({
      id: 0,
      body: "",
      author: "",
      title: "titulo 01",
      userId: "user_01",
      createdAt: new Date(),
    });

    postsRepository.posts.push({
      id: 1,
      body: "",
      author: "",
      title: "titulo 01",
      userId: "user_01",
      createdAt: new Date(),
    });

    const { posts } = await sup.execute({
      page: 1,
      query: "0",
    });

    expect(posts).toHaveLength(2);
  });

  it("should be able to search posts with pagination", async () => {
    for (let i = 0; i < 23; i++) {
      postsRepository.posts.push({
        id: 0,
        body: "",
        author: "",
        title: "titulo 01",
        userId: "user_01",
        createdAt: new Date(),
      });
    }

    const { posts } = await sup.execute({
      page: 2,
      query: "0",
    });

    expect(posts).toHaveLength(3);
  });
});
