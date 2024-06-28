import { Follow, FollowsRepository } from "../../entities/follow";

export class FollowInMemoryRepository implements FollowsRepository {
  follows: Follow.Follow[] = [];


  async create({ followedId, userId }: Follow.FollowCreateInput) {
    const follow = {
      id: 0,
      followedId,
      userId,
    };

    this.follows.push(follow);

    return follow;
  }

  async removeFollow({ followedId, userId }: Follow.FollowCreateInput) {
    const removeFollow = this.follows.filter(
      (item) =>
        item.followedId !== followedId && item.userId !== userId
    );

    this.follows = removeFollow;

    return true;
  }

  async findManyFollowers(userId: string) {
    const followers = this.follows.filter(item => item.followedId === userId)

    return followers.length
  }

  async findManyFollowing(userId: string) {
    const following = this.follows.filter(item => item.userId === userId)

    return following
  }

  async countManyFollowersAmount(userId: string) {
    const followers = this.follows.filter(item => item.followedId === userId)

    return followers.length
  }

  async countManyFollowingAmount(userId: string) {
    const following = this.follows.filter(item => item.userId === userId)

    return following.length
  }

  async findByFollowedIdAndUserId({ followedId, userId }: Follow.FollowCreateInput) {
    const followById = this.follows.find(
      (item) =>
        item.userId === userId && item.followedId === followedId
    );

    if (!followById) {
      return null;
    }

    return followById;
  }
}
