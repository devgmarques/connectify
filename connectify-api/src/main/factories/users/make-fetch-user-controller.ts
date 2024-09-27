import { FetchUserUseCase } from "@/application/use-case/users"
import { PrismaUserRepository } from "@/infra/database/prisma/repositories"
import { FetchUserController } from "@/presentation/controllers/users"

export function makeFetchUserController() {
    const usersRepository = new PrismaUserRepository()

    const fetchUserUseCase = new FetchUserUseCase(usersRepository)
    return new FetchUserController(fetchUserUseCase)
}