import { SearchUserUseCase } from "@/application/use-case/users"
import { PrismaUserRepository } from "@/infra/database/prisma/repositories"
import { SearchUserController } from "@/presentation/controllers/users"

export function makeSearchUserController() {
    const usersRepository = new PrismaUserRepository()

    const searchUserUseCase = new SearchUserUseCase(usersRepository)
    return new SearchUserController(searchUserUseCase)
}