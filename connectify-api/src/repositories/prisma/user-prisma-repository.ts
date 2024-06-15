import { Prisma } from "@prisma/client";
import { UsersRepository } from "../user";
import { prisma } from "@/lib/prisma";

export class UserPrismaRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  async countAllUsers(query: string): Promise<number> {
    const userCount = await prisma.user.count(
      { where: { nickname: { contains: query } } }
    )

    return userCount
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    return user;
  }

  async findById(id: string) {
    const user = await prisma.user.findFirst({ where: { id } });

    return user;
  }

  async findByNickName(nickname: string) {
    const user = await prisma.user.findUnique({ where: { nickname } });

    return user;
  }

  async searchMany(page: number, query: string) {
    const user = await prisma.user.findMany({
      where: { nickname: { contains: query } },
      take: 10,
      skip: (page - 1) * 10,
    });

    return user;
  }

  async updateUser(userId: string, data: Prisma.UserCreateInput) {
    const user = await prisma.user.update({ where: { id: userId }, data });

    return user;
  }

  async findMany(page: number, userId: string) {
    const user = await prisma.user.findMany({
      where: { NOT: { id: userId } },
      take: 10,
      skip: (page - 1) * 10,
    });

    return user;
  }
}
