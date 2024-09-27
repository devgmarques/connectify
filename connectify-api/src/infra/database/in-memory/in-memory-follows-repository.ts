import { FollowsRepository } from "@/application/protocols/database"
import { Follow } from "@/domain/entities"

export class InMemoryFollowsRepository implements FollowsRepository {
    private database: Follow[] = []

    async create(input: FollowsRepository.Create.Input): FollowsRepository.Create.Output {
      const follow: Follow = {
        followId: input.followId ?? 0,
        followedId: input.followedId,
        userId: input.userId
      }

      this.database.push(follow)

      return follow
    }

    async findManyFollowing(input: FollowsRepository.FindManyFollowing.Input): FollowsRepository.FindManyFollowing.Output {
      const following = this.database.filter(item => item.userId === input.userId)

      return following
    }

    async findByFollowedIdAndUserId(input: FollowsRepository.FindByFollowedIdAndUserId.Input): FollowsRepository.FindByFollowedIdAndUserId.Output {
      const follow = this.database.find(
        (item) =>
          item.userId === input.userId && item.followedId === input.followedId
      )
  
      if (!follow) {
        return null
      }
  
      return follow
    }

    async countManyFollowingAmount(input: FollowsRepository.CountManyFollowingAmount.Input): FollowsRepository.CountManyFollowingAmount.Output {
      const following = this.database.filter(item => item.userId === input.userId)

      return following.length
    }

    async countManyFollowersAmount(input: FollowsRepository.CountManyFollowersAmount.Input): FollowsRepository.CountManyFollowersAmount.Output {
      const followers = this.database.filter(item => item.followedId === input.userId)

      return followers.length
    }

    async delete(input: FollowsRepository.Delete.Input): FollowsRepository.Delete.Output {
      const follows = this.database.filter(
        (item) =>
          item.followedId !== input.followedId && item.userId !== input.userId
      )
  
      this.database = follows
  
      return true
    }
}