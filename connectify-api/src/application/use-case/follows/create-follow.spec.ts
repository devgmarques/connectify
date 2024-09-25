import { beforeEach, describe, expect, it, vitest } from "vitest"

import { CreateFollowUseCase } from "./create-follow"
import { ICreateFollowUseCase } from "@/domain/use-cases/follows"
import { FollowsRepository, UsersRepository } from "@/application/protocols/database"
import { InMemoryFollowsRepository, InMemoryUsersRepository } from "@/infra/database/in-memory"

let usersRepository: UsersRepository
let followsRepository: FollowsRepository
let sut: ICreateFollowUseCase

describe("create follow use case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    followsRepository = new InMemoryFollowsRepository()
    sut = new CreateFollowUseCase(followsRepository)

    usersRepository.create({
      userId: "userId-01",
      email: "email",
      name: "name",
      password: "password",
      nickname: "nickname",
    })

    usersRepository.create({
      userId: "userId-02",
      email: "email",
      name: "name",
      password: "password",
      nickname: "nickname",
    })
  })

  it("should be able to create follow", async () => {
    const follow = await sut.execute({
      followedId: "userId_01",
      userId: "userId_02",
    })

    expect(follow).toEqual(true)
  })

  it("should be able to call findByFollowedIdAndUserId with the correct values", async () => {
    const followsRepositorySpy = vitest.spyOn(followsRepository, 'findByFollowedIdAndUserId')

    await sut.execute({
      followedId: "userId_01",
      userId: "userId_02",
    })

    expect(followsRepositorySpy).toHaveBeenCalledWith({
      followedId: "userId_01",
      userId: "userId_02",
    })
  })

  it("should be able to call delete with the correct values", async () => {
    const followsRepositorySpy = vitest.spyOn(followsRepository, 'delete')

    await sut.execute({
      followedId: "userId_01",
      userId: "userId_02",
    })

    const follow = await sut.execute({
      followedId: "userId_01",
      userId: "userId_02",
    })

    expect(followsRepositorySpy).toHaveBeenCalledWith({
      followedId: "userId_01",
      userId: "userId_02",
    })
  })

  it("should be able to remove one follow", async () => {
    await sut.execute({
      followedId: "userId_01",
      userId: "userId_02",
    })

    const follow = await sut.execute({
      followedId: "userId_01",
      userId: "userId_02",
    })

    expect(follow).toEqual(false)
  })
})
