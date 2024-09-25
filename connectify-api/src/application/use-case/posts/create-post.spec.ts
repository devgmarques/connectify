import { beforeEach, describe, expect, it, vitest } from "vitest"

import { CreatePostUseCase } from "./create-post"
import { PostsRepository, UsersRepository } from "@/application/protocols/database"
import { ICreatePostUseCase } from "@/domain/use-cases/posts"
import { InMemoryPostsRepository, InMemoryUsersRepository } from "@/infra/database/in-memory"
import { TitleAlreadyExistInUserError } from "@/application/errors"
import { Post } from "@/domain/entities"

let usersRepository: UsersRepository
let postsRepository: PostsRepository
let sut: ICreatePostUseCase

describe("create post use case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    postsRepository = new InMemoryPostsRepository()
    sut = new CreatePostUseCase(postsRepository)

    usersRepository.create({
      userId: "userId-01",
      email: "email",
      name: "name",
      password: "password",
      nickname: "nickname",
    })
  })

  it("should be able to create post", async () => {
    const post = await sut.execute({
      userId: "userId-01",
      data: {
        author: "author",
        title: "title",
        body: "body",
      }
    })

    expect(post.postId).toBe(0)
    expect(post.body).toBe("body")
    expect(post.userId).toBe("userId-01")
    expect(post.createdAt).toBeDefined()
  })

  it("should be able to call posts repository with the correct values", async () => {
    const postsRepositorySpy = vitest.spyOn(postsRepository, 'findByTitle')

    await sut.execute({
      userId: "userId-01",
      data: {
        author: "author",
        body: "body",
        title: "title",
      }
    })

    expect(postsRepositorySpy).toHaveBeenCalledWith({
      title: "title",
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

    expect(() => sut.execute({
      userId: "userId_01",
      data: {
        author: "author",
        title: "title",
        body: "body",
      }
    })).rejects.toBeInstanceOf(TitleAlreadyExistInUserError)
  })
})
