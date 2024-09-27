import { UpdatePostUseCase } from "@/application/use-case/posts"
import { PrismaPostsRepository } from "@/infra/database/prisma/repositories"
import { UpdatePostController } from "@/presentation/controllers/post"

export function makeUpdatePostController() {
    const postsRepository = new PrismaPostsRepository()

    const updatePostUseCase = new UpdatePostUseCase(postsRepository)
    return new UpdatePostController(updatePostUseCase)
}