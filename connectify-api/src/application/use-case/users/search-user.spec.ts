import { beforeEach, describe, expect, it } from "vitest"

import { SearchUserUseCase } from "./search-user"
import { ISearchUserUseCase } from "@/domain/use-cases/users"
import { UsersRepository } from "@/application/protocols/database"
import { InMemoryUsersRepository } from "@/infra/database/in-memory"

let usersRepository: UsersRepository
let sup: ISearchUserUseCase

describe("search users use case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sup = new SearchUserUseCase(usersRepository)
  })

  it("should be able to search users", async () => {
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

    const { users, meta } = await sup.execute({
      page: 1,
      query: "name",
      userId: "not-exists-id"
    })

    expect(meta.countUsers).toBe(2)
    expect(users).toHaveLength(2)
  })

  it("should be able to fetch users with pagination", async () => {
    for (let i = 0; i < 21; i++) {
      usersRepository.create({
        userId: "userId-01",
        email: "email",
        name: "name",
        password: "password",
        nickname: "nickname",
      })
    }

    const { users, meta } = await sup.execute({
      page: 2,
      query: "name",
      userId: "not-exist-id"
    })

    expect(users).toHaveLength(1)
    expect(meta.countUsers).toBe(21)
  })

  it("should be able to return zero when userId is equal to id", async () => {
    usersRepository.create({
      userId: "userId-01",
      email: "email",
      name: "name",
      password: "password",
      nickname: "nickname",
    })

    const { users } = await sup.execute({
      page: 1,
      query: "name",
      userId: "userId-01"
    })

    expect(users).toHaveLength(0)
  })
})
