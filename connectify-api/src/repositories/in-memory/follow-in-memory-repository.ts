import { Follow, Prisma } from "@prisma/client";
import { FollowRepository } from "../follow";

export class FollowInMemoryRepository implements FollowRepository {
  follows: Follow[] = [];

  async create(data: Prisma.FollowCreateManyInput) {
    const follow = {
      id: 0,
      followedId: data.followedId,
      userId: data.userId,
    };

    this.follows.push(follow);

    return follow;
  }

  async removeFollow(data: { followedId: string; userId: string }) {
    const removeFollow = this.follows.filter(
      (item) =>
        item.followedId !== data.followedId && item.userId !== data.userId
    );

    this.follows = removeFollow;

    return true;
  }

  async findByFollowedIdAndUserId(data: { followedId: string; userId: string }) {
    const followById = this.follows.find(
      (item) =>
        item.userId === data.userId && item.followedId === data.followedId
    );

    if (!followById) {
      return null;
    }

    return followById;
  }
}
