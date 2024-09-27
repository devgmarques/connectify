import { SearchPostUseCase } from "@/application/use-case/posts"
import { PrismaPostsRepository } from "@/infra/database/prisma/repositories"
import { SearchPostController } from "@/presentation/controllers/post"

export function makeSearchPostController() {
    const postsRepository = new PrismaPostsRepository()

    const searchPostUseCase = new SearchPostUseCase(postsRepository)
    return new SearchPostController(searchPostUseCase)
}