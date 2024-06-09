import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { UserPrismaRepository } from "@/repositories/prisma/user-prisma-repository";
import { FetchUserUseCase } from "@/use-case/user/fetch-user";

export async function fetch(req: FastifyRequest, reply: FastifyReply) {
  const FetchBody = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = FetchBody.parse(req.query);

  try {
    const userRepository = new UserPrismaRepository();
    const useCase = new FetchUserUseCase(userRepository);

    const { users } = await useCase.execute({
      page,
      userId: req.user.sub
    });

    return reply.status(200).send({ users });
  } catch (error) {
    throw error;
  }
}
