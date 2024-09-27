import { FetchPostUseCase } from "@/application/use-case/posts"
import { PrismaPostsRepository } from "@/infra/database/prisma/repositories"
import { FetchPostController } from "@/presentation/controllers/post"

export function makeFetchPostController() {
    const postsRepository = new PrismaPostsRepository()

    const fetchPostUseCase = new FetchPostUseCase(postsRepository)
    return new FetchPostController(fetchPostUseCase)
}