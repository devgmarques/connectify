import { beforeEach, describe, expect, it, vitest } from "vitest"

import { CreateCommentUseCase } from "./create-comment"

import { PostNotExistError } from "@/application/errors"
import { ICreateCommentUseCase } from "@/domain/use-cases/comments"
import { CommentRepository, UsersRepository, PostsRepository } from "@/application/protocols/database"

import { InMemoryCommentsRepository, InMemoryUsersRepository, InMemoryPostsRepository } from "@/infra/database/in-memory"

let usersRepository: UsersRepository
let commentRepository: CommentRepository
let postsRepository: PostsRepository
let sut: ICreateCommentUseCase

describe("create comment in post use case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    commentRepository = new InMemoryCommentsRepository()
    postsRepository = new InMemoryPostsRepository()
    sut = new CreateCommentUseCase(commentRepository, postsRepository)

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

  it("should be able to create comment", async () => {
    const comment = await sut.execute({
      postId: 0,
      userId: "userId-01",
      body: "body",
    })

    expect(comment.commentId).toBe(0)
    expect(comment.body).toBe("body")
    expect(comment.postId).toBe(0)
    expect(comment.createdAt).toBeDefined()
  })

  it("should be able to call posts repository with the correct values", async () => {
    const postsRepositorySpy = vitest.spyOn(postsRepository, 'findById')

    await sut.execute({
      postId: 0,
      userId: "userId-01",
      body: "body",
    })

    expect(postsRepositorySpy).toHaveBeenCalledWith({
      postId: 0,
    })
  })

  it("should be able to call comments repository with the correct values", async () => {
    const forgersRepositorySpy = vitest.spyOn(commentRepository, 'create')

    await sut.execute({
      postId: 0,
      userId: "userId-01",
      body: "body",
    })

    expect(forgersRepositorySpy).toHaveBeenCalledWith({
      postId: 0,
      userId: "userId-01",
      body: "body",
    })
  })

  it("should be able to return error post not exist", async () => {
    expect(() =>
      sut.execute({
        postId: 1,
        userId: "user_01",
        body: "Não concordo com sua opinião",
      })
    ).rejects.toBeInstanceOf(PostNotExistError)
  })
})
