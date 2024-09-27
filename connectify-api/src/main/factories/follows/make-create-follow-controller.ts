import { CreateFollowUseCase } from "@/application/use-case/follows"
import { PrismaFollowsRepository } from "@/infra/database/prisma/repositories"
import { CreateFollowController } from "@/presentation/controllers/follows"

export function makeCreateFollowController() {
    const followsRepository = new PrismaFollowsRepository()

    const createLikeUseCase = new CreateFollowUseCase(followsRepository)
    return new CreateFollowController(createLikeUseCase)
}