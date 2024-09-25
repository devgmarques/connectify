import { Like } from "@/domain/entities"

export type LikesRepository = {
  create(input: LikesRepository.Create.Input): LikesRepository.Create.Output
  delete(input: LikesRepository.Delete.Input): LikesRepository.Delete.Output
  findByUserIdAndPostId(input: LikesRepository.FindByUserIdAndPostId.Input): LikesRepository.FindByUserIdAndPostId.Output
}

export namespace LikesRepository {
  export namespace Create {
    export type Input = {
      likeId?: number
      userId: string
      postId: number
    }  

    export type Output = Promise<Like>
  }

  export namespace Delete {
    export type Input = {
      likeId: number
    }  

    export type Output = Promise<boolean>
  }

  export namespace FindByUserIdAndPostId {
    export type Input = {
      userId: string
      postId: number
    }  

    export type Output = Promise<Like | null>
  }
}