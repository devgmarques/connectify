import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { CreateLikeInPostUseCase } from "@/use-case/like/create-like";
import { LikePrismaRepository } from "@/repositories/prisma/like-prisma-repository";
import { PostPrismaRepository } from "@/repositories/prisma/post-prisma-repository";

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const createBody = z.object({
    postId: z.coerce.number()
  });

  const { postId } = createBody.parse(req.params);

  try {
    const likesRepository = new LikePrismaRepository();
    const postsRepository = new PostPrismaRepository()
    const useCase = new CreateLikeInPostUseCase(likesRepository, postsRepository);

    await useCase.execute({
      postId,
      userId: req.user.sub
    });

    return reply.status(201).send();
  } catch (error) {
    throw error;
  }
}
