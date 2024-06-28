import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../../entities/user";

export class UserInMemoryRepository implements UsersRepository {
  users: User[] = [];

  async findMany(page: number) {
    const users = this.users
      .slice((page - 1) * 20, page * 20)

    return users
  }

  async countAllUsers(query: string) {
    const count = this.users.reduce((acc, item) => {
      if (item.nickname.includes(query)) {
        return acc + 1
      }

      return acc
    }, 0)

    return count
  }

  async updateUrlAvatar(fullPath: string, userId: string): Promise<undefined> {
    const index = this.users.findIndex(item => item.id === userId)


    if (index > -1) {
      this.users[index].url_avatar = fullPath
    }
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: "user_01",
      name: data.name,
      email: data.email,
      password: data.password,
      url_avatar: data.url_avatar ?? "",
      createdAt: new Date(),
      nickname: data.nickname,
      details: "Seja bem vindo",
    };

    return user;
  }

  async updateUser(userId: string, data: Prisma.UserCreateInput) {
    const user = {
      id: "user_01",
      name: data.name,
      email: data.email,
      url_avatar: data.url_avatar ?? "",
      password: data.password,
      createdAt: new Date(),
      nickname: data.nickname,
      details: data.details ?? "",
    };

    this.users.map((item) => (item.id === userId ? user : item));

    return user;
  }

  async searchMany(page: number, query: string) {
    const users = this.users
      .filter((item) => item.nickname.toLowerCase().includes(query.toLowerCase()))
      .slice((page - 1) * 20, page * 20);

    if (!users) {
      return null;
    }

    return users;
  }

  async findByEmail(email: string) {
    const userByEmail = this.users.find((item) => item.email === email);

    if (!userByEmail) {
      return null;
    }

    return userByEmail;
  }

  async findById(id: string) {
    const userById = this.users.find((item) => item.id === id);

    if (!userById) {
      return null;
    }

    return userById;
  }

  async findByNickName(nickname: string) {
    const userByNickname = this.users.find(
      (item) => item.nickname === nickname
    );

    if (!userByNickname) {
      return null;
    }

    return userByNickname;
  }
}
