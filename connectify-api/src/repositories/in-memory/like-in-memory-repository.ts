import { Like } from "@prisma/client";
import { LikesRepository } from "../like";

export class LikeInMemoryRepository implements LikesRepository {
  likes: Like[] = [];

  async create(data: { userId: string; postId: number }) {
    const like = {
      id: 0,
      likeCount: 1,
      userId: data.userId,
      postId: data.postId,
      createdAt: new Date(),
    };

    this.likes.push(like);

    return like;
  }

  async findByUserIdAndPostId({
    postId,
    userId,
  }: {
    userId: string;
    postId: number;
  }) {
    const likeByUserIdAndPostId = this.likes.find(
      (item) => item.userId === userId && item.postId === postId
    );

    if (!likeByUserIdAndPostId) {
      return null;
    }

    return likeByUserIdAndPostId;
  }
}
