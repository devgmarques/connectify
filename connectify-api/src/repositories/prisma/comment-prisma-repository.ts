import { Prisma } from "@prisma/client";
import { CommentRepository } from "../../entities/comment";
import { prisma } from "@/lib/prisma";

export class CommentPrismaRepository implements CommentRepository {
  async create({ body, postId, userId }: Prisma.CommentCreateManyInput) {
    const comment = await prisma.comment.create({
      data: {
        body,
        postId,
        userId
      },
      include: {
        user: {
          select: {
            nickname: true,
            url_avatar: true,
            name: true
          }
        }
      }
    })

    return comment
  }
}