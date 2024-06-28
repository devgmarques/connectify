import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { UserPrismaRepository } from "@/repositories/prisma/user-prisma-repository";
import { AuthentificateUseCase } from "@/use-case/user/authentificate";
import { CredentialsInvalidateError } from "@/use-case/errors/credential-invalid-error";
import { UserNotExistError } from "@/use-case/errors/user-not-exist-error";
import { HashBcryptRepository } from "@/repositories/bcrypt/hash";

export async function authentificate(req: FastifyRequest, reply: FastifyReply) {
  const authentificateBody = z.object({
    email: z.string(),
    password: z.string(),
  });

  const { email, password } = authentificateBody.parse(req.body);

  try {
    const usersRepository = new UserPrismaRepository();
    const hashRepository = new HashBcryptRepository()

    const useCase = new AuthentificateUseCase(usersRepository, hashRepository);

    const { user } = await useCase.execute({
      email,
      password,
    });

    const token = await reply.jwtSign({ sub: user.id, nickname: user.nickname });

    return reply.send({ token });
  } catch (error) {
    if (error instanceof CredentialsInvalidateError) {
      reply.status(400).send({ message: error.message });
    }

    if(error instanceof UserNotExistError){
      reply.status(400).send({ message: error.message });
    }

    throw error;
  }
}
