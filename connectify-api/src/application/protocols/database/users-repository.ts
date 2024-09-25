import { User } from "@/domain/entities"

export type UsersRepository = {
  create(input: UsersRepository.Create.Input): UsersRepository.Create.Output
  updateUrlAvatar(input: UsersRepository.UpdateUrlAvatar.Input): UsersRepository.UpdateUrlAvatar.Output
  updateUser(input: UsersRepository.UpdateUser.Input): UsersRepository.UpdateUser.Output
  countAllUsers(input: UsersRepository.CountAllUsers.Input): UsersRepository.CountAllUsers.Output
  searchMany(input: UsersRepository.SearchMany.Input): UsersRepository.SearchMany.Output
  findMany(input: UsersRepository.FindMany.Input): UsersRepository.FindMany.Output
  findByEmail(input: UsersRepository.FindByEmail.Input): UsersRepository.FindByEmail.Output
  findById(input: UsersRepository.FindById.Input): UsersRepository.FindById.Output
  findByNickName(input: UsersRepository.FindByNickname.Input): UsersRepository.FindByNickname.Output
}

export namespace UsersRepository {
  export namespace Create {
    export type Input = {
      userId?: string,
      name: string,
      nickname: string,
      email: string,
      password: string,
      details?: string
    }

    export type Output = Promise<User>
  }

  export namespace UpdateUrlAvatar {
    export type Input = {
      fullPath: string, 
      userId: string
    }

    export type Output = Promise<void>
  }

  export namespace UpdateUser {
    export type Input = {
      userId: string,
      data: {
        name: string,
        nickname: string,
        email: string,
        password: string,
        details?: string
      }
    }

    export type Output = Promise<User>
  }

  export namespace CountAllUsers {
    export type Input = {
      query: string
    }

    export type Output = Promise<number>
  }

  export namespace SearchMany {
    export type Input = {
      page: number, 
      query: string, 
      userId: string
    }

    export type Output = Promise<User[] | null>
  }

  export namespace FindMany {
    export type Input = {
      page: number, 
      userId: string
    }

    export type Output = Promise<User[]>
  }

  export namespace FindByEmail {
    export type Input = {
      email: string
    }

    export type Output = Promise<User | null>
  }

  export namespace FindById {
    export type Input = {
      userId: string
    }

    export type Output = Promise<User | null>
  }

  export namespace FindByNickname {
    export type Input = {
      nickname: string
    }

    export type Output = Promise<User | null>
  }
}