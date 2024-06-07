import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { FetchPostUseCase } from "@/use-case/post/fetch-post";
import { PostPrismaRepository } from "@/repositories/prisma/post-prisma-repository";

export async function fetch(req: FastifyRequest, reply: FastifyReply) {
  const fetchBody = z.object({
    page: z.coerce.number().default(1),
  });

  const { page } = fetchBody.parse(req.query);

  try {
    const postsRepository = new PostPrismaRepository();
    const useCase = new FetchPostUseCase(postsRepository);

    const { posts } = await useCase.execute({
      page
    });

    return reply.status(200).send({ posts });
  } catch (error) {
    throw error;
  }
}
