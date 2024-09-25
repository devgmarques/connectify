import { beforeEach, describe, expect, it, vitest } from "vitest"

import { ICreateLikeUseCase } from "@/domain/use-cases/likes"

import { CreateLikeUseCase } from "./create-like"
import { InMemoryLikesRepository, InMemoryPostsRepository, InMemoryUsersRepository } from "@/infra/database/in-memory"
import { LikesRepository, PostsRepository, UsersRepository } from "@/application/protocols/database"
import { PostNotExistError } from "@/application/errors"
import { Like } from "@/domain/entities"

let usersRepository: UsersRepository
let likesRepository: LikesRepository
let postsRepository: PostsRepository
let sut: ICreateLikeUseCase

describe("create like use case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    likesRepository = new InMemoryLikesRepository()
    postsRepository = new InMemoryPostsRepository()
    sut = new CreateLikeUseCase(likesRepository, postsRepository)

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

  it("should be able to create like", async () => {
    const like = await sut.execute({
      postId: 0,
      userId: "userId_01",
    })

    expect(like).toEqual(true)
  })

  it("should be able to call postsRepository with the correct values", async () => {
    const postsRepositorySpy = vitest.spyOn(postsRepository, 'findById')

    await sut.execute({
      postId: 0,
      userId: "userId_01",
    })

    expect(postsRepositorySpy).toHaveBeenCalledWith({
      postId: 0,
    })
  })

  it("should be able to return like false", async () => {
    const like: Like = {
      likeId: 0,
      postId: 0,
      userId: "userId_01",
      createdAt: new Date()
    }

    vitest.spyOn(likesRepository, "findByUserIdAndPostId").mockImplementationOnce(async () => like)

    const result = await sut.execute({
      postId: 0,
      userId: "userId_01",
    })

    expect(result).toEqual(false)
  })
        
  it("should be able to return error post not exist", async () => {
    vitest.spyOn(postsRepository, 'findById').mockImplementationOnce(async () => null)

    expect(() =>
      sut.execute({
        postId: 0,
        userId: "userId_01",
      })
    ).rejects.toBeInstanceOf(PostNotExistError)
  })
})
