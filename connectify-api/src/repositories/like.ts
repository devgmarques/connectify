import { Like } from "@prisma/client";

type LikesCreate = {
  userId: string;
  postId: number;
};

export type LikesRepository = {
  create(data: LikesCreate): Promise<Like>;
  removeLike(id: number): Promise<number>;
  findByUserIdAndPostId({ postId, userId }: LikesCreate): Promise<Like | null>;
};
