import { File } from "@/@types/file";
import { UserPrismaRepository } from "@/repositories/prisma/user-prisma-repository";
import { UploadSupabaseRepository } from "@/repositories/supabase/upload";
import { UploadUserUseCase } from "@/use-case/user/upload-user";
import { FastifyReply, FastifyRequest } from "fastify";

export async function upload(req: FastifyRequest, reply: FastifyReply) {
  const file = await req.file()

  try {
    const usersRepository = new UserPrismaRepository()
    const uploadRepository = new UploadSupabaseRepository()

    const useCase = new UploadUserUseCase(usersRepository, uploadRepository)

    await useCase.execute({ 
      file: file as File, userId: req.user.sub 
    })

    return reply.status(201).send();
  } catch (error) {
    throw error;
  }
}
