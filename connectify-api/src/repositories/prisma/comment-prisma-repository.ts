import { Prisma } from "@prisma/client";
import { CommentRepository } from "../comment";
import { prisma } from "@/lib/prisma";

export class CommentPrismaRepository implements CommentRepository {
  async create(data: Prisma.CommentCreateManyInput) {
    const comment = await prisma.comment.create({
      data
    })

    return comment
  }
}