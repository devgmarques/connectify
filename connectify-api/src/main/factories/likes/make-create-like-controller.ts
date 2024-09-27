import { CreateLikeUseCase } from "@/application/use-case/likes"
import { PrismaLikesRepository, PrismaPostsRepository } from "@/infra/database/prisma/repositories"
import { CreateLikeController } from "@/presentation/controllers/likes"

export function makeCreateLikeController() {
    const likesRepository = new PrismaLikesRepository()
    const postsRepository = new PrismaPostsRepository()

    const createLikeUseCase = new CreateLikeUseCase(likesRepository, postsRepository)
    return new CreateLikeController(createLikeUseCase)
}