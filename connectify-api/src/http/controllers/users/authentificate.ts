import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { UserPrismaRepository } from "../../../repositories/prisma/user-prisma-repository";
import { AuthentificateUseCase } from "../../../use-case/user/authentificate";
import { CredentialsInvalidateError } from "../../../use-case/errors/credential-invalid-error";

export async function authentificate(req: FastifyRequest, reply: FastifyReply) {
  const authentificateBody = z.object({
    email: z.string(),
    password: z.string(),
  });

  const { email, password } = authentificateBody.parse(req.body);

  try {
    const usersRepository = new UserPrismaRepository();
    const useCase = new AuthentificateUseCase(usersRepository);

    const { user } = await useCase.execute({
      email,
      password,
    });

    const token = await reply.jwtSign({ sub: user.id });

    return reply.send({ token });
  } catch (error) {
    if (error instanceof CredentialsInvalidateError) {
      reply.status(400).send({ message: error.message });
    }

    throw error;
  }
}
