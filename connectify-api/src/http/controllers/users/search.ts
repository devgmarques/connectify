import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { UserPrismaRepository } from "@/repositories/prisma/user-prisma-repository";
import { SearchUserUseCase } from "@/use-case/user/search-user";

export async function search(req: FastifyRequest, reply: FastifyReply) {
  const SearchBody = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { page, query } = SearchBody.parse(req.query);

  try {
    const userRepository = new UserPrismaRepository();
    const useCase = new SearchUserUseCase(userRepository);

    const { users } = await useCase.execute({
      page,
      query,
    });

    return reply.status(200).send({ users });
  } catch (error) {
    throw error;
  }
}
