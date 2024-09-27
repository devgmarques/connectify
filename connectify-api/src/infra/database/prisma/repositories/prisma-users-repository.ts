import { UsersRepository } from "@/application/protocols/database"

import { prisma } from ".."
import { User } from "@/domain/entities"
import { env } from "@/infra/env"

export class PrismaUserRepository implements UsersRepository {
  async create(input: UsersRepository.Create.Input): UsersRepository.Create.Output {
    const user = await prisma.user.create({
      data: {
        email: input.email,
        name: input.name,
        nickname: input.nickname,
        password: input.password
      },
    })

    const correctUserFormat: User = {
      userId: user.id,
      email: user.email,
      name: user.name,
      nickname: user.nickname,
      details: user.details,
      password: user.password,
      url_avatar: user.url_avatar,
      createdAt: user.createdAt
    } 

    return correctUserFormat
  }

  async updateUser(input: UsersRepository.UpdateUser.Input): UsersRepository.UpdateUser.Output {
    const user = await prisma.user.update({ 
      where: { id: input.userId }, 
      data: input
    })

    const correctUserFormat: User = {
      userId: user.id,
      email: user.email,
      name: user.name,
      nickname: user.nickname,
      details: user.details,
      password: user.password,
      url_avatar: user.url_avatar,
      createdAt: user.createdAt
    } 

    return correctUserFormat
  }

  async findById(input: UsersRepository.FindById.Input): UsersRepository.FindById.Output {
    const user = await prisma.user.findFirst({ 
      where: { id: input.userId } 
    })

    if (!user) {
      return null
    }

    const correctUserFormat: User = {
      userId: user.id,
      email: user.email,
      name: user.name,
      nickname: user.nickname,
      details: user.details,
      password: user.password,
      url_avatar: user.url_avatar,
      createdAt: user.createdAt
    } 

    return correctUserFormat
  }

  async findByEmail(input: UsersRepository.FindByEmail.Input): UsersRepository.FindByEmail.Output {
    const user = await prisma.user.findFirst({ 
      where: { email: input.email } 
    })

    if (!user) {
      return null
    }

    const correctUserFormat: User = {
      userId: user.id,
      email: user.email,
      name: user.name,
      nickname: user.nickname,
      details: user.details,
      password: user.password,
      url_avatar: user.url_avatar,
      createdAt: user.createdAt
    } 

    return correctUserFormat
  }

  async findByNickName(input: UsersRepository.FindByNickname.Input): UsersRepository.FindByNickname.Output {
    const user = await prisma.user.findFirst({ 
      where: { nickname: input.nickname } 
    })

    if (!user) {
      return null
    }

    const correctUserFormat: User = {
      userId: user.id,
      email: user.email,
      name: user.name,
      nickname: user.nickname,
      details: user.details,
      password: user.password,
      url_avatar: user.url_avatar,
      createdAt: user.createdAt
    } 

    return correctUserFormat
  }

  async findMany(input: UsersRepository.FindMany.Input): UsersRepository.FindMany.Output {
    const users = await prisma.user.findMany({
      where: { NOT: { id: input.userId } },
      take: 10,
      skip: (input.page - 1) * 10,
    })

    const correctUsersFormat = users.map(user => ({
      userId: user.id,
      email: user.email,
      name: user.name,
      nickname: user.nickname,
      details: user.details,
      password: user.password,
      url_avatar: user.url_avatar,
      createdAt: user.createdAt
    }))

    return correctUsersFormat
  }

  async searchMany(input: UsersRepository.SearchMany.Input): UsersRepository.SearchMany.Output {
    const users = await prisma.user.findMany({
      where: { nickname: { contains: input.query }, NOT: { id: input.userId } },
      take: 10,
      skip: (input.page - 1) * 10,
    })

    const correctUsersFormat = users.map(user => ({
      userId: user.id,
      email: user.email,
      name: user.name,
      nickname: user.nickname,
      details: user.details,
      password: user.password,
      url_avatar: user.url_avatar,
      createdAt: user.createdAt
    }))

    return correctUsersFormat
  }

  async countAllUsers(input: UsersRepository.CountAllUsers.Input): UsersRepository.CountAllUsers.Output {
    const usersCount = await prisma.user.count(
      { where: { nickname: { contains: input.query } } }
    )

    return usersCount
  }
  
  async updateUrlAvatar(input: UsersRepository.UpdateUrlAvatar.Input): UsersRepository.UpdateUrlAvatar.Output {
    await prisma.user.update({
      where: {
        id: input.userId
      },
      data: {
        url_avatar: `${env.SUPABASE_IMG_BASEUR}${input.fullPath}`
      }
    })
  }
}