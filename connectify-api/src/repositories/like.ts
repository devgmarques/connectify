import { Like } from "@prisma/client";

type LikesCreate = {
  userId: string;
  postId: number;
};

export type LikesRepository = {
  create(data: LikesCreate): Promise<Like>;
  findByUserIdAndPostId({ postId, userId }: LikesCreate): Promise<Like | null>;
};
