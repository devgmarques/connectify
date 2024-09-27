import { CreatePostUseCase } from "@/application/use-case/posts"
import { PrismaPostsRepository } from "@/infra/database/prisma/repositories"
import { CreatePostController } from "@/presentation/controllers/post"

export function makeCreatePostController() {
    const postsRepository = new PrismaPostsRepository()

    const createPostUseCase = new CreatePostUseCase(postsRepository)
    return new CreatePostController(createPostUseCase)
}