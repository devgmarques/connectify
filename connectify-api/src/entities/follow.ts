import { Follow, Prisma } from "@prisma/client";




export type FollowsRepository = {
  create(data: Follow.FollowCreateInput): Promise<Follow>;
  findManyFollowing(userId: string): Promise<Follow.FollowFollowed[]>
  countManyFollowersAmount(userId: string): Promise<number>;
  countManyFollowingAmount(userId: string): Promise<number>;
  removeFollow(data: Follow.FollowCreateInput): Promise<boolean>;
  findByFollowedIdAndUserId(data: Follow.FollowCreateInput): Promise<Follow.Follow | null>;
};

export namespace Follow {
  export type FollowCreateInput = {
    followedId: string;
    userId: string;
  }

  export type FollowFollowed = {
    followedId: string
  }

  export type Follow = {
    id: number;
    followedId: string;
    userId: string;
  }
}
