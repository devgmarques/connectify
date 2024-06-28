import { Comment, CommentRepository } from "../../entities/comment";

export class CommentInMemoryRepository implements CommentRepository {
  comments: Comment.Comment[] = [];

  async create({ body, postId, userId }: Comment.CommentCreateInput) {
    const comment = {
      id: 0,
      body,
      postId,
      userId,
      createdAt: new Date(),
    };

    this.comments.push(comment);

    return comment;
  }
}
