import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users";

export class UserInMemoryRepository implements UsersRepository {
  users: User[] = [];

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: "user_01",
      name: data.name,
      email: data.email,
      password: data.password,
      createdAt: new Date(),
    };

    return user;
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
}
