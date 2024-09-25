import { beforeEach, describe, expect, it } from "vitest"

import { FetchUserUseCase } from "./fetch-user"
import { UsersRepository } from "@/application/protocols/database"
import { IFetchUserUseCase } from "@/domain/use-cases/users"
import { InMemoryUsersRepository } from "@/infra/database/in-memory"

let usersRepository: UsersRepository
let sup: IFetchUserUseCase

describe("fetch users use case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sup = new FetchUserUseCase(usersRepository)
  })

  it("should be able to fetch users", async () => {
    usersRepository.create({
      userId: "userId-01",
      email: "email",
      name: "name",
      password: "password",
      nickname: "nickname",
    })

    usersRepository.create({
      userId: "userId-01",
      email: "email",
      name: "name",
      password: "password",
      nickname: "nickname",
    })

    const users = await sup.execute({
      page: 1,
      userId: ""
    })

    expect(users).toHaveLength(2)
  })

  it("should not be able to fetch users with id userId-01", async () => {
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

    const users = await sup.execute({
      page: 1,
      userId: "userId-01"
    })

    expect(users).toHaveLength(1)
  })
})
