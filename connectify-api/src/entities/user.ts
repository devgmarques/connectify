export type UsersRepository = {
  create(data: User.UserCreateInput): Promise<User.User>;
  updateUrlAvatar(fullPath: string, userId: string): void
  updateUser(userId: string, data: User.UserCreateInput): Promise<User.User>;
  countAllUsers(query: string): Promise<number>;
  searchMany(page: number, query: string, userId: string): Promise<User.User[] | null>;
  findMany(page: number, userId: string): Promise<User.User[]>
  findByEmail(email: string): Promise<User.User | null>;
  findById(id: string): Promise<User.User | null>;
  findByNickName(nickname: string): Promise<User.User | null>;
};

export namespace User {
  export type UserCreateInput = {
    name: string,
    nickname: string,
    email: string,
    password: string
  }

  export type User = {
    id: string;
    url_avatar: string | null;
    name: string;
    nickname: string;
    email: string;
    password: string;
    details: string | null;
    createdAt: Date;
  }
}