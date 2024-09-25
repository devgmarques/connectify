import { Post } from "@/domain/entities"

export interface IGetProfileUserUseCase {
  execute(input: IGetProfileUserUseCase.Input): IGetProfileUserUseCase.Output
}

export namespace IGetProfileUserUseCase {
  export type Input = {
    nickname: string
  }

  export type Output = Promise<{
    user: {
      name: string
      nickname: string
      email: string
      details: string | null
      url_avatar: string | null
    }
    follows: {
      following: {
        followedId: string
      }[]
      _count: {
          followersAmount: number
          followingAmount: number
      }
    }
    posts: Post[]
}>
}