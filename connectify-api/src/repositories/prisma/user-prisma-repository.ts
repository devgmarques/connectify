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
      take: 20,
      skip: (page - 1) * 20,
    });

    return user;
  }

  async updateUser(userId: string, data: Prisma.UserCreateInput) {
    const user = await prisma.user.update({ where: { id: userId }, data });

    return user;
  }

  async findMany(page: number) {
    const user = await prisma.user.findMany({
      take: 20,
      skip: (page - 1) * 20,
    });

    return user;
  }
}
