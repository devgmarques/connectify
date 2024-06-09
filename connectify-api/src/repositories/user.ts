import { Prisma, User } from "@prisma/client";

export type UsersRepository = {
  create(data: Prisma.UserCreateInput): Promise<User>;
  updateUser(userId: string, data: Prisma.UserCreateInput): Promise<User>;
  searchMany(page: number, query: string): Promise<User[] | null>;
  findMany(page: number): Promise<User[]>
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  findByNickName(nickname: string): Promise<User | null>;
};
