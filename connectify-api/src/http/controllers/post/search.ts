import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { SearchPostUseCase } from "@/use-case/post/search-post";
import { PostPrismaRepository } from "@/repositories/prisma/post-prisma-repository";

export async function search(req: FastifyRequest, reply: FastifyReply) {
  const searchBody = z.object({
    query: z.string(),
    page: z.coerce.number().default(1),
  });

  const { page, query } = searchBody.parse(req.query);

  try {
    const postsRepository = new PostPrismaRepository();
    const useCase = new SearchPostUseCase(postsRepository);

    const { posts } = await useCase.execute({
      page,
      query
    });

    return reply.status(200).send({ posts });
  } catch (error) {
    throw error;
  }
}
