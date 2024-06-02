import { prisma } from "@/lib/prisma";
import { FollowRepository } from "../follow";

export class FollowPrismaRepository implements FollowRepository {
  async create(data: { followedId: string; userId: string; }) {
    const follow = await prisma.follow.create({
      data,
    })

    return follow
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