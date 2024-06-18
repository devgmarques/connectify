import { Prisma } from "@prisma/client";
import { CommentRepository } from "../comment";
import { prisma } from "@/lib/prisma";

export class CommentPrismaRepository implements CommentRepository {
  async create({ body, postId, userId }: Prisma.CommentCreateManyInput) {
    const comment = await prisma.comment.create({
      data: {
        body,
        postId,
        userId
      }
    })

    return comment
  }
}