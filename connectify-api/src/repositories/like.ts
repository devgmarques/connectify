import { Like } from "@prisma/client";

type LikesCreate = {
  userId: string;
  postId: number;
};

export type LikesRepository = {
  create(data: LikesCreate): Promise<Like>;
  removeLike(id: number): Promise<boolean>;
  findByUserIdAndPostId({ postId, userId }: LikesCreate): Promise<Like | null>;
};
