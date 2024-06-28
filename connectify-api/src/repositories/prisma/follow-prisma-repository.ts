import { prisma } from "@/lib/prisma";
import { FollowsRepository } from "../../entities/follow";

export class FollowPrismaRepository implements FollowsRepository {
  async create({ followedId, userId }: { followedId: string; userId: string; }) {

    const follow = await prisma.follow.create({
      data: {
        followedId,
        userId
      },
    })

    return follow
  }

  async findManyFollowing(userId: string) {
    const following = await prisma.follow.findMany({
      where: {
        userId
      },
      select: {
        followedId: true
      }
    })

    return following
  }

  async countManyFollowersAmount(userId: string) {
    const followers = await prisma.follow.count({
      where: {
        followedId: userId
      }
    })

    return followers
  }

  async countManyFollowingAmount(userId: string) {
    const followers = await prisma.follow.count({
      where: {
        userId
      }
    })

    return followers
  }

  async findByFollowedIdAndUserId({ followedId, userId }: { followedId: string; userId: string; }) {
    const follow = await prisma.follow.findUnique({
      where: {
        userId_followedId: {
          followedId, userId
        }
      }
    })

    return follow
  }

  async removeFollow({ followedId, userId }: { followedId: string; userId: string; }) {
    const follow = await prisma.follow.delete({
      where: {
        userId_followedId: {
          followedId, userId
        }
      }
    })

    return follow ? true : false
  }

}