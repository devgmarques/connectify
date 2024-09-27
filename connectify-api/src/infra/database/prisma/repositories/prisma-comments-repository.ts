import { CommentRepository } from "@/application/protocols/database"
import { prisma } from ".."

export class PrismaCommentsRepository implements CommentRepository {
  async create(input: CommentRepository.Create.Input): CommentRepository.Create.Output {
    const comment = await prisma.comment.create({
      data: {
        body: input.body,
        postId: input.postId,
        userId: input.userId
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

    return comment as any
  }
}