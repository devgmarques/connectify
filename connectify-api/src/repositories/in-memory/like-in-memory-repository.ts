import { Like } from "@prisma/client";
import { LikesRepository } from "../like";

export class LikeInMemoryRepository implements LikesRepository {
  likes: Like[] = [];

  async create(data: { userId: string; postId: number }) {
    const like = {
      id: 0,
      likeCount: 0,
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

  async removeLike(id: number) {
    this.likes.map((item) => (item.id === id ? item.likeCount-- : item));

    return this.likes.reduce((acc, item) => {
      return acc + item.likeCount;
    }, 0);
  }

  async increment(id: number){
      const like = this.likes.findIndex(item => item.id === id)

      this.likes[like].likeCount ++

      return this.likes[like].likeCount
  }
}
