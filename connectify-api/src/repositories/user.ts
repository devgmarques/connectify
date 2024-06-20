import { Prisma, User } from "@prisma/client";

export type UsersRepository = {
  create(data: Prisma.UserCreateInput): Promise<User>;
  updateUrlAvatar(fullPath: string, userId: string): Promise<undefined>
  updateUser(userId: string, data: Prisma.UserCreateInput): Promise<User>;
  countAllUsers(query: string): Promise<number>;
  searchMany(page: number, query: string, userId: string): Promise<User[] | null>;
  findMany(page: number, userId: string): Promise<User[]>
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  findByNickName(nickname: string): Promise<User | null>;
};
