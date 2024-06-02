import { Follow, Prisma } from "@prisma/client";

type FollowIds = Omit<Prisma.FollowCreateManyInput, "id">;

export type FollowRepository = {
  create(data: FollowIds): Promise<Follow>;
  removeFollow(data: FollowIds): Promise<boolean>;
  findByFollowedIdAndUserId(data: FollowIds): Promise<Follow | null>;
};
