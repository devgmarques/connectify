import { DeletePostUseCase } from "@/application/use-case/posts"
import { PrismaPostsRepository } from "@/infra/database/prisma/repositories"
import { DeletePostController } from "@/presentation/controllers/post"

export function makeDeletePostController() {
    const postsRepository = new PrismaPostsRepository()

    const deletePostUseCase = new DeletePostUseCase(postsRepository)
    return new DeletePostController(deletePostUseCase)
}