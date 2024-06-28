export type CommentRepository = {
  create(data: Comment.CommentCreateInput): Promise<Comment>;
};

export namespace Comment {
  export type CommentCreateInput = {
    body: string;
    postId: number;
    userId: string;
  }

  export type Comment = {
    id: number;
    body: string;
    postId: number;
    userId: string;
    createdAt: Date;
  }
}