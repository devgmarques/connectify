import { beforeEach, describe, expect, it } from "vitest"

import { FetchPostUseCase } from "./fetch-post"
import { IFetchPostUseCase } from "@/domain/use-cases/posts"
import { PostsRepository, UsersRepository } from "@/application/protocols/database"
import { InMemoryPostsRepository, InMemoryUsersRepository } from "@/infra/database/in-memory"

let usersRepository: UsersRepository
let postsRepository: PostsRepository
let sut: IFetchPostUseCase

describe("fetch post use case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    postsRepository = new InMemoryPostsRepository()
    sut = new FetchPostUseCase(postsRepository)

    usersRepository.create({
      userId: "userId-01",
      email: "email",
      name: "name",
      password: "password",
      nickname: "nickname",
    })
  })

  it("should be able to fetch posts", async () => {
    postsRepository.create({
      userId: "userId-01",
      title: "title",
      author: "author",
      body: "body",
    })

    const posts = await sut.execute({
      page: 1,
    })

    expect(posts).toHaveLength(1)
  })

  it("should be able to fetch posts with pagination", async () => {
    for (let i = 0; i < 21; i++) {
      postsRepository.create({
        userId: "userId-01",
        title: "title",
        author: "author",
        body: "body",
      })
    }

    const posts = await sut.execute({
      page: 2,
    })

    expect(posts).toHaveLength(1)
  })
})
