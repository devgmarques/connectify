import { Follow, Prisma } from "@prisma/client";

type FollowIds = Omit<Prisma.FollowCreateManyInput, "id">;

type Following = {
  followedId: string
}

export type FollowsRepository = {
  create(data: FollowIds): Promise<Follow>;
  findManyFollowing(userId: string): Promise<Following[]>
  countManyFollowersAmount(userId: string): Promise<number>;
  countManyFollowingAmount(userId: string): Promise<number>;
  removeFollow(data: FollowIds): Promise<boolean>;
  findByFollowedIdAndUserId(data: FollowIds): Promise<Follow | null>;
};
