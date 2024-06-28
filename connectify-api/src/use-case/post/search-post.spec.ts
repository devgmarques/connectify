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

  it("should be able to search posts", async () => {
    postsRepository.posts.push({
      id: 1,
      userId: "user_id",
      title: "Novo titulo",
      author: "developer",
      body: "Body editado",
      createdAt: new Date()
    })

    postsRepository.posts.push({
      id: 1,
      userId: "user_id",
      title: "Novo titulo",
      author: "developer",
      body: "Body editado",
      createdAt: new Date()
    })

    const { posts } = await sup.execute({
      page: 1,
      query: "N",
    });

    expect(posts).toHaveLength(2);
    expect(posts).toEqual([
      expect.objectContaining({
        title: "Novo titulo",
      }),

      expect.objectContaining({
        title: "Novo titulo",
      }),
    ])
  });

  it("should be able to search posts with pagination", async () => {
    for (let i = 0; i < 23; i++) {
      postsRepository.posts.push({
        id: 1,
        userId: "user_id",
        title: "Novo titulo",
        author: "developer",
        body: "Body editado",
        createdAt: new Date()
      })
    }

    const { posts, meta } = await sup.execute({
      page: 2,
      query: "N",
    });

    expect(posts).toHaveLength(3);
    expect(meta.countPosts).toEqual(23)
  });
});
