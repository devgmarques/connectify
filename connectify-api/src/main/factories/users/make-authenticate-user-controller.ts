import { AuthenticateUserUseCase } from "@/application/use-case/users"
import { BcryptHashRepository } from "@/infra/crypto/bcrypt"
import { PrismaUserRepository } from "@/infra/database/prisma/repositories"
import { AuthenticateUserController } from "@/presentation/controllers/users"

export function makeAuthenticateUserController() {
    const usersRepository = new PrismaUserRepository()
    const hashRepository = new BcryptHashRepository()

    const authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository, hashRepository)
    return new AuthenticateUserController(authenticateUserUseCase)
}