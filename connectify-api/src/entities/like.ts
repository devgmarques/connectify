


export type LikesRepository = {
  create(data: Like.LikeCreateInput): Promise<Like.Like>;
  removeLike(id: number): Promise<boolean>;
  findByUserIdAndPostId(data: Like.LikeCreateInput): Promise<Like.Like | null>;
};

export namespace Like {
  export type LikeCreateInput = {
    userId: string;
    postId: number;
  };

 export type Like = {
    id: number;
    userId: string;
    postId: number;
    createdAt: Date;
}
}