import { beforeEach, describe, expect, it, vitest } from "vitest"

import { UsersRepository } from "@/application/protocols/database"
import { UpdateUserUseCase } from "./update-user"
import { IUpdateUserUseCase } from "@/domain/use-cases/users"
import { InMemoryUsersRepository } from "@/infra/database/in-memory"
import { HashRepository } from "@/application/protocols/crypto"
import { InMemoryHashRepository } from "@/infra/crypto/in-memory/in-memory-hashs-repository"
import { NicknameAlreadyExistError, UserNotExistError } from "@/application/errors"

let usersRepository: UsersRepository
let hashRepository: HashRepository
let sut: IUpdateUserUseCase

describe("update user use case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    hashRepository = new InMemoryHashRepository()
    sut = new UpdateUserUseCase(usersRepository, hashRepository)

    usersRepository.create({
      userId: "userId-01",
      email: "email",
      name: "name",
      password: "password",
      nickname: "nickname",
    })
  })

  it("should be able to update user", async () => {
    const user = await sut.execute({
      userId: "userId-01",
      data: {
        details: "details",
        email: "email",
        name: "name",
        password: "password",
        nickname: "nickname-01",
      },
    })

    expect(user.userId).toBe("userId-01")
    expect(user.email).toBe("email")
    expect(user.name).toBe("name")
    expect(user.nickname).toBe("nickname-01")
    expect(user.password).toBe("password")
    expect(user.createdAt).toBeDefined()
  })

  it("should be able to return an user not exists", async () => {
    vitest.spyOn(usersRepository, "findById").mockImplementationOnce(async () => null)

    expect(() => sut.execute({
      userId: "userId-01",
      data: {
        details: "details",
        email: "email",
        name: "name",
        password: "password",
        nickname: "nickname-01",
      },
    })).rejects.toBeInstanceOf(UserNotExistError)
  })

  it("should be able to return an already existing nickname error", async () => {
    usersRepository.create({
      userId: "userId-02",
      email: "email",
      name: "name",
      password: "password",
      nickname: "nickname-01",
    })

    expect(
      () =>
        sut.execute({
          userId: "userId-02",
          data: {
            details: "details",
            email: "email",
            name: "name",
            password: "password",
            nickname: "nickname",
          },
        })
    ).rejects.toBeInstanceOf(NicknameAlreadyExistError)
  })
})
