import { UploadUserUseCase } from "@/application/use-case/users"
import { PrismaUserRepository } from "@/infra/database/prisma/repositories"
import { SupabaseUploadUserRepository } from "@/infra/database/supabase/repositories/supabase-upload-user-repository"
import { UploadUserController } from "@/presentation/controllers/users"

export function makeUploadUserController() {
    const usersRepository = new PrismaUserRepository()
    const uploadRepository = new SupabaseUploadUserRepository()

    const uploadUserUseCase = new UploadUserUseCase(usersRepository, uploadRepository)
    return new UploadUserController(uploadUserUseCase)
}