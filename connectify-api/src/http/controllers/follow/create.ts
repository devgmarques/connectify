import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { CreateFollowUserUseCase } from "@/use-case/follow/create-follow-user";
import { FollowPrismaRepository } from "@/repositories/prisma/follow-prisma-repository";

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const createBody = z.object({
    followedId: z.string().uuid()
  });

  const { followedId } = createBody.parse(req.params);

  try {
    const followsRepository = new FollowPrismaRepository()
    const useCase = new CreateFollowUserUseCase(followsRepository);

    await useCase.execute({
      followedId,
      userId: req.user.sub
    });

    return reply.status(201).send();
  } catch (error) {
    throw error;
  }
}
