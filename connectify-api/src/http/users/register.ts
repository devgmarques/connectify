import { FastifyReply, FastifyRequest } from "fastify";

import { z } from "zod";
import { RegisterUseCase } from "../../use-case/user/register";
import { UserPrismaRepository } from "../../repositories/prisma/user-prisma-repository";
import { CreadentialsAlreadyExistError } from "../../use-case/errors/credentials-already-exist-error";

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const registerBody = z.object({
    name: z.string(),
    nickname: z.string(),
    email: z.string(),
    password: z.string().min(6),
  });

  const { email, name, password, nickname } = registerBody.parse(req.body);

  try {
    const repository = new UserPrismaRepository();
    const useCase = new RegisterUseCase(repository);

    await useCase.execute({
      email,
      name,
      nickname,
      password,
    });

    return reply.status(201).send();
  } catch (error) {
    if (error instanceof CreadentialsAlreadyExistError) {
      return reply.status(400).send({ message: error.message });
    }

    throw error;
  }
}
