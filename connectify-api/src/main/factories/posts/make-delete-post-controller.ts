import { DeletePostUseCase } from "@/application/use-case/posts"
import { PrismaPostsRepository } from "@/infra/database/prisma/repositories"
import { DeletePostController } from "@/presentation/controllers/posts"

export function makeDeletePostController() {
    const postsRepository = new PrismaPostsRepository()

    const deletePostUseCase = new DeletePostUseCase(postsRepository)
    return new DeletePostController(deletePostUseCase)
}