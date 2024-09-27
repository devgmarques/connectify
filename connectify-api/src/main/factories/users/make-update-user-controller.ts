import { UpdateUserUseCase } from "@/application/use-case/users"
import { BcryptHashRepository } from "@/infra/crypto/bcrypt"
import { PrismaUserRepository } from "@/infra/database/prisma/repositories"
import { UpdateUserController } from "@/presentation/controllers/users"

export function makeUpdateUserController() {
    const usersRepository = new PrismaUserRepository()
    const hashRepository = new BcryptHashRepository()

    const updateUserUseCase = new UpdateUserUseCase(usersRepository, hashRepository)
    return new UpdateUserController(updateUserUseCase)
}