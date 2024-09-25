import { UsersRepository } from "@/application/protocols/database"

import { User } from "@/domain/entities"
import { randomUUID } from "crypto"

export class InMemoryUsersRepository implements UsersRepository {
    private database: User[] = []

    async create(input: UsersRepository.Create.Input): UsersRepository.Create.Output {
      const user: User = {
        userId: input.userId ?? randomUUID(),
        url_avatar: "url_avatar",
        name: input.name,
        nickname: input.nickname,
        email: input.email,
        password: input.password,
        details: input.details ?? "details",
        createdAt: new Date()
      }

      this.database.push(user)

      return user
    }

    async updateUser(input: UsersRepository.UpdateUser.Input): UsersRepository.UpdateUser.Output {
      const userIndex = this.database.findIndex(item => item.userId === input.userId)

      const user = this.database[userIndex]

      const updatedUser: User = {
        userId: input.userId,
        name: input.data.name ?? user.name,
        details: input.data.details ?? user.details,
        email: input.data.email ?? user.email,
        nickname: input.data.nickname ?? user.nickname,
        password: input.data.password ?? user.password,
        url_avatar: user.url_avatar,
        createdAt: user.createdAt,
      }

      this.database[userIndex] = updatedUser
      return updatedUser
    }

    async updateUrlAvatar(input: UsersRepository.UpdateUrlAvatar.Input): UsersRepository.UpdateUrlAvatar.Output {
      const userIndex = this.database.findIndex(item => item.userId === input.userId)

      if (userIndex > -1) {
        this.database[userIndex].url_avatar = input.fullPath
      }
    }

    async findMany(input: UsersRepository.FindMany.Input): UsersRepository.FindMany.Output {
      const users = this.database
      .filter(item => item.userId !== input.userId)
      .slice((input.page - 1) * 20, input.page * 20)

      return users
    }

    async findById(input: UsersRepository.FindById.Input): UsersRepository.FindById.Output {
      const user = this.database.find((item) => item.userId === input.userId)
  
      if (!user) {
        return null
      }
  
      return user
    }

    async findByEmail(input: UsersRepository.FindByEmail.Input): UsersRepository.FindByEmail.Output {
      const user = this.database.find((item) => item.email === input.email)

      if (!user) {
        return null
      }
  
      return user
    }

    async findByNickName(input: UsersRepository.FindByNickname.Input): UsersRepository.FindByNickname.Output {
      const user = this.database.find(
        (item) => item.nickname === input.nickname
      )
  
      if (!user) {
        return null
      }
  
      return user
    }

    async searchMany(input: UsersRepository.SearchMany.Input): UsersRepository.SearchMany.Output {
      const users = this.database
        .filter((item) => item.nickname.toLowerCase()
          .includes(input.query.toLowerCase()) && item.userId !== input.userId
        )
        .slice((input.page - 1) * 20, input.page * 20)

      if (!users) {
        return null
      }

      return users
    }

    async countAllUsers(input: UsersRepository.CountAllUsers.Input): UsersRepository.CountAllUsers.Output {
      const count = this.database.reduce((acc, item) => {
        if (item.nickname.includes(input.query)) {
          return acc + 1
        }
  
        return acc
      }, 0)
  
      return count
    }
}