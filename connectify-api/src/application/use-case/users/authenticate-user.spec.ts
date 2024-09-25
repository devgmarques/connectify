import { beforeEach, describe, expect, it } from "vitest"

import { AuthenticateUserUseCase } from "./authenticate-user"

import { IAuthenticateUserUseCase } from "@/domain/use-cases/users"
import { UsersRepository } from "@/application/protocols/database"
import { HashRepository } from "@/application/protocols/crypto/hash-repository"
import { CredentialsInvalidateError, UserNotExistError } from "@/application/errors"
import { InMemoryUsersRepository } from "@/infra/database/in-memory"
import { InMemoryHashRepository } from "@/infra/crypto/in-memory/in-memory-hashs-repository"

let usersRepository: UsersRepository
let hashRepository: HashRepository
let sup: IAuthenticateUserUseCase

describe("authenticate use case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    hashRepository = new InMemoryHashRepository()

    sup = new AuthenticateUserUseCase(usersRepository, hashRepository)

    usersRepository.create({
      userId: "userId-01",
      email: "email",
      name: "name",
      password: "password",
      nickname: "nickname",
    })
  })

  it("should be able to create authentication", async () => {
    const user = await sup.execute({
      email: "email",
      password: "password",
    })

    expect(user.userId).toBe("userId-01")
    expect(user.email).toBe("email")
    expect(user.name).toBe("name")
    expect(user.nickname).toBe("nickname")
    expect(user.password).toBe("password")
    expect(user.createdAt).toBeDefined()
  })

  it("should be able to return error user not exists", async () => {
    expect(() => sup.execute({
      email: "user-not-exist@teste.com",
      password: "123456",
    })).rejects.toBeInstanceOf(UserNotExistError)
  })

  it("should be able to return error credential invalid", async ()=>{
    expect(() => sup.execute({
      email: "email",
      password: "password-not-exists",
    })).rejects.toBeInstanceOf(CredentialsInvalidateError)
  })
})
