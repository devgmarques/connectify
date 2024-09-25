import { beforeEach, describe, expect, it, vitest } from "vitest"

import { UpdatePostUseCase } from "./update-post"
import { PostsRepository, UsersRepository } from "@/application/protocols/database"
import { IUpdatePostUseCase } from "@/domain/use-cases/posts"
import { InMemoryPostsRepository, InMemoryUsersRepository } from "@/infra/database/in-memory"
import { TitleAlreadyExistInUserError } from "@/application/errors"
import { Post } from "@/domain/entities"

let usersRepository: UsersRepository
let postsRepository: PostsRepository
let sut: IUpdatePostUseCase

describe("update post use case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    postsRepository = new InMemoryPostsRepository()
    sut = new UpdatePostUseCase(postsRepository)

    usersRepository.create({
      userId: "userId-01",
      email: "email",
      name: "name",
      password: "password",
      nickname: "nickname",
    })

    postsRepository.create({
      postId: 0,
      userId: "userId-01",
      author: "author",
      body: "body",
      title: "title",
    })
  })

  it("should be able to update post", async () => {
    const post = await sut.execute({
      userId: "userId-01",
      data: {
        postId: 0,
        body: "body",
        title: "new-title",
        author: "author",
        createdAt: new Date().toISOString()
      }
    })

    expect(post).toEqual(expect.objectContaining({
      title: "new-title",
    }))
  })

  it("should be able call posts repository in correct form", async () => {
    const postsRepositorySpy = vitest.spyOn(postsRepository, "findByTitle")

    await sut.execute({
      userId: "userId-01",
      data: {
        postId: 0,
        body: "body",
        title: "new-title",
        author: "author",
        createdAt: new Date().toISOString()
      }
    })

    expect(postsRepositorySpy).toHaveBeenCalledWith({
      title: "new-title",
      userId: "userId-01",
    })
  })

  it("should be able return an already existing title error", async () => {
    const post: Post = {
      postId: 0,
      userId: "userId-01",
      author: "author",
      body: "body",
      title: "title",
      createdAt: new Date()
    }

    vitest.spyOn(postsRepository, 'findByTitle').mockImplementationOnce(async () => post)

    expect(() =>
      sut.execute({
        userId: "user_01",
        data: {
          postId: 0,
          title: "title",
          author: "author",
          body: "body",
          createdAt: new Date().toISOString()
        }
      })
    ).rejects.toBeInstanceOf(TitleAlreadyExistInUserError)
  })
})
