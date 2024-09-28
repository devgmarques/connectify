import { CreateCommentUseCase } from "@/application/use-case/comments"
import { PrismaCommentsRepository, PrismaPostsRepository } from "@/infra/database/prisma/repositories"
import { CreateCommentController } from "@/presentation/controllers/comments"

export function makeCreateCommentController() {
    const commentsRepository = new PrismaCommentsRepository()
    const postsRepository = new PrismaPostsRepository()

    const createCommentUseCase = new CreateCommentUseCase(commentsRepository, postsRepository)
    return new CreateCommentController(createCommentUseCase)
}