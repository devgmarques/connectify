import { beforeEach, describe, expect, it, vitest } from "vitest"

import { DeletePostUseCase } from "./delete-post"
import { IDeletePostUseCase } from "@/domain/use-cases/posts"
import { PostsRepository } from "@/application/protocols/database"
import { InMemoryPostsRepository } from "@/infra/database/in-memory"
import { PostNotExistError } from "@/application/errors"

let postsRepository: PostsRepository
let sut: IDeletePostUseCase

describe("delete post use case", () => {
  beforeEach(() => {
    postsRepository = new InMemoryPostsRepository()
    sut = new DeletePostUseCase(postsRepository)

    postsRepository.create({
      postId: 0,
      userId: "userId-01",
      author: "author",
      body: "body",
      title: "title",
    })
  })

  it("should be able to delete post", async () => {
    const postsRepositorySpy = vitest.spyOn(postsRepository, 'delete')

    await sut.execute({
      postId: 0
    })

    expect(postsRepositorySpy).toHaveBeenCalledWith({
      postId: 0
    })
  })

  it("should be able to return error post not exist", async () => {
    vitest.spyOn(postsRepository, "findById").mockImplementationOnce(async () => null)

    expect(() => sut.execute({
      postId: 0
    })
    ).rejects.toBeInstanceOf(PostNotExistError)
  })
})
