import { Comment, Prisma } from "@prisma/client";
import { CommentRepository } from "../comment";

export class CommentInMemoryRepository implements CommentRepository {
  comments: Comment[] = [];

  async create(data: Prisma.CommentCreateManyInput) {
    const comment = {
      id: 0,
      title: data.title,
      body: data.body,
      postId: data.postId,
      createdAt: new Date(),
    };

    this.comments.push(comment);

    return comment;
  }
}
