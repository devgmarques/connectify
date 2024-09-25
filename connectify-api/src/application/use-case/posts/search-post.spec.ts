import { beforeEach, describe, expect, it } from "vitest"

import { SearchPostUseCase } from "./search-post"
import { PostsRepository, UsersRepository } from "@/application/protocols/database"
import { InMemoryPostsRepository, InMemoryUsersRepository } from "@/infra/database/in-memory"
import { ISearchPostUseCase } from "@/domain/use-cases/posts"

let usersRepository: UsersRepository
let postsRepository: PostsRepository
let sup: ISearchPostUseCase

describe("search posts use case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    postsRepository = new InMemoryPostsRepository()
    sup = new SearchPostUseCase(postsRepository)

    usersRepository.create({
      userId: "userId-01",
      email: "email",
      name: "name",
      password: "password",
      nickname: "nickname",
    })
  })

  it("should be able to search posts", async () => {
    postsRepository.create({
      postId: 0,
      userId: "userId-01",
      author: "author",
      body: "body",
      title: "title",
    })

    const { posts, meta } = await sup.execute({
      page: 1,
      query: "title",
    })

    expect(posts).toHaveLength(1)
    expect(meta.countPosts).toBe(1)
  })

  it("should be able to search posts with pagination", async () => {
    for (let i = 0; i < 23; i++) {
      postsRepository.create({
        postId: i,
        userId: "userId-01",
        author: "author",
        body: "body",
        title: "title",
      })
    }

    const { posts, meta } = await sup.execute({
      page: 2,
      query: "title",
    })

    expect(posts).toHaveLength(3)
    expect(meta.countPosts).toEqual(23)
  })
})
