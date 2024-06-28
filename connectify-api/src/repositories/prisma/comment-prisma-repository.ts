import { Comment, CommentRepository } from "../../entities/comment";
import { prisma } from "@/lib/prisma";

export class CommentPrismaRepository implements CommentRepository {
  async create({ body, postId, userId }: Comment.CommentCreateInput) {
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