import { beforeEach, describe, expect, it, vitest } from "vitest"

import { RegisterUserUseCase } from "./register-user"
import { IRegisterUserUseCase } from "@/domain/use-cases/users"
import { UsersRepository } from "@/application/protocols/database"
import { InMemoryUsersRepository } from "@/infra/database/in-memory"
import { HashRepository } from "@/application/protocols/crypto"
import { InMemoryHashRepository } from "@/infra/crypto/in-memory"
import { EmailAlreadyExistError, NicknameAlreadyExistError } from "@/application/errors"
import { User } from "@/domain/entities"

let usersRepository: UsersRepository
let hashRepository: HashRepository
let sut: IRegisterUserUseCase

describe("register use case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    hashRepository = new InMemoryHashRepository()
    sut = new RegisterUserUseCase(usersRepository, hashRepository)
  })

  it("should be able to create new user", async () => {
    const user = await sut.execute({
      name: "name",
      email: "email",
      password: "password",
      nickname: "nickname",
    })

    expect(user.userId).toEqual(expect.any(String))
    expect(user.email).toBe("email")
    expect(user.name).toBe("name")
    expect(user.nickname).toBe("nickname")
    expect(user.password).toBe("password")
    expect(user.createdAt).toBeDefined()
  })

  it("should be able to return an error because the email was repeated", async () => {
    const user: User = {
      userId: "userId",
      name: "name",
      email: "email",
      nickname: "nickname",
      details: "details",
      password: "password",
      url_avatar: "url_avatar",
      createdAt: new Date()
    }

    vitest.spyOn(usersRepository, "findByEmail").mockImplementationOnce(async () => user)

    expect(() =>
      sut.execute({
        email: "email",
        name: "name",
        password: "password",
        nickname: "nickname",
      })
    ).rejects.toBeInstanceOf(EmailAlreadyExistError)
  })

  it("should be able to return an error because the nickname was repeated", async () => {
    const user: User = {
      userId: "userId",
      name: "name",
      email: "email",
      nickname: "nickname",
      details: "details",
      password: "password",
      url_avatar: "url_avatar",
      createdAt: new Date()
    }

    vitest.spyOn(usersRepository, "findByNickName").mockImplementationOnce(async () => user)

    expect(() =>
      sut.execute({
        email: "gui@gmail.com",
        name: "Guilherme",
        password: "123456",
        nickname: "gui",
      })
    ).rejects.toBeInstanceOf(NicknameAlreadyExistError)
  })
})
