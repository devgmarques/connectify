import { Follow } from "@/domain/entities"

export type FollowsRepository = {
  create(input: FollowsRepository.Create.Input): FollowsRepository.Create.Output
  findManyFollowing(input: FollowsRepository.FindManyFollowing.Input): FollowsRepository.FindManyFollowing.Output
  countManyFollowersAmount(input: FollowsRepository.CountManyFollowersAmount.Input): FollowsRepository.CountManyFollowersAmount.Output
  countManyFollowingAmount(input: FollowsRepository.CountManyFollowingAmount.Input): FollowsRepository.CountManyFollowingAmount.Output
  delete(input: FollowsRepository.Delete.Input): FollowsRepository.Delete.Output
  findByFollowedIdAndUserId(input: FollowsRepository.FindByFollowedIdAndUserId.Input): FollowsRepository.FindByFollowedIdAndUserId.Output
}

export namespace FollowsRepository {
 export namespace Create {
    export type Input = {
      followId?: number
      followedId: string
      userId: string
    }

    export type Output = Promise<Follow>
 }

 export namespace FindManyFollowing {
    export type Input = {
      userId: string
    }

    export type Output = Promise<{
      followedId: string
    }[]>
 }

 export namespace CountManyFollowersAmount {
    export type Input = {
      userId: string
    }

    export type Output = Promise<number>
 }

 export namespace CountManyFollowingAmount {
    export type Input = {
      userId: string
    }

    export type Output = Promise<number>
 }

 export namespace Delete {
    export type Input = {
      followedId: string
      userId: string
    }

    export type Output = Promise<boolean>
 }

 export namespace FindByFollowedIdAndUserId {
    export type Input = {
      followedId: string
      userId: string
    }

    export type Output = Promise<Follow | null>
 }
}
