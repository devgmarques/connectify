import { FollowsRepository } from "@/application/protocols/database"
import { prisma } from ".."
import { Follow } from "@/domain/entities"

export class PrismaFollowsRepository implements FollowsRepository {
  async create(input: FollowsRepository.Create.Input): FollowsRepository.Create.Output {
    const follow = await prisma.follow.create({
      data: {
        followedId: input.followedId,
        userId: input.userId
      },
    })

    const correctFollowFormat: Follow = {
      followId: follow.id,
      followedId: follow.followedId,
      userId: follow.userId
    } 

    return correctFollowFormat
  }

  async findManyFollowing(input: FollowsRepository.FindManyFollowing.Input): FollowsRepository.FindManyFollowing.Output {
    const following = await prisma.follow.findMany({
      where: {
        userId: input.userId
      },
      select: {
        followedId: true
      }
    })

    return following
  } 
  
  async findByFollowedIdAndUserId(input: FollowsRepository.FindByFollowedIdAndUserId.Input): FollowsRepository.FindByFollowedIdAndUserId.Output {
    const follow = await prisma.follow.findUnique({
      where: {
        userId_followedId: {
          followedId: input.followedId, 
          userId: input.userId
        }
      }
    })

    if (!follow) {
      return null
    }

    const correctFollowFormat: Follow = {
      followId: follow.id,
      followedId: follow.followedId,
      userId: follow.userId
    } 

    return correctFollowFormat
  }

  async countManyFollowersAmount(input: FollowsRepository.CountManyFollowersAmount.Input): FollowsRepository.CountManyFollowersAmount.Output {
    const followers = await prisma.follow.count({
      where: {
        followedId: input.userId
      }
    })

    return followers
  }

  async countManyFollowingAmount(input: FollowsRepository.CountManyFollowingAmount.Input): FollowsRepository.CountManyFollowingAmount.Output {
    const followings = await prisma.follow.count({
      where: {
        userId: input.userId
      }
    })

    return followings
  }

  async delete(input: FollowsRepository.Delete.Input): FollowsRepository.Delete.Output {
    const follow = await prisma.follow.delete({
      where: {
        userId_followedId: {
          followedId: input.followedId, 
          userId: input.userId
        }
      }
    })

    return follow ? true : false
  } 
}