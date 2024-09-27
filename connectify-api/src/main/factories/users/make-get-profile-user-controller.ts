import { GetProfileUserUseCase } from "@/application/use-case/users"
import { PrismaFollowsRepository, PrismaPostsRepository, PrismaUserRepository } from "@/infra/database/prisma/repositories"
import { ProfileUserController } from "@/presentation/controllers/users"

export function makeGetProfileUserController() {
    const usersRepository = new PrismaUserRepository()
    const postsRepository = new PrismaPostsRepository()
    const followsRepository = new PrismaFollowsRepository()

    const getProfileUserUseCase = new GetProfileUserUseCase(
      usersRepository, postsRepository, followsRepository
    )
    return new ProfileUserController(getProfileUserUseCase)
}