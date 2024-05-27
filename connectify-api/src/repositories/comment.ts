import { Comment, Prisma } from "@prisma/client";

export type CommentRepository = {
  create(data: Prisma.CommentCreateManyInput): Promise<Comment>;
};
