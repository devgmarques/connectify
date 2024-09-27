import { RegisterUserUseCase } from "@/application/use-case/users"
import { BcryptHashRepository } from "@/infra/crypto/bcrypt"
import { PrismaUserRepository } from "@/infra/database/prisma/repositories"
import { RegisterUserController } from "@/presentation/controllers/users"

export function makeRegisterUserController() {
    const usersRepository = new PrismaUserRepository()
    const hashRepository = new BcryptHashRepository()

    const registerUserUseCase = new RegisterUserUseCase(usersRepository, hashRepository)
    return new RegisterUserController(registerUserUseCase)
}