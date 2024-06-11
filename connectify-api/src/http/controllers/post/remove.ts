import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { PostPrismaRepository } from "@/repositories/prisma/post-prisma-repository";
import { RemovePostUseCase } from "@/use-case/post/remove-post";
import { PostNotExistError } from "@/use-case/errors/post-not-exist-error";

export async function remove(req: FastifyRequest, reply: FastifyReply) {
  const removeParams = z.object({
    postId: z.coerce.number()
  });

  const { postId } = removeParams.parse(req.params);

  try {
    const postsRepository = new PostPrismaRepository();
    const useCase = new RemovePostUseCase(postsRepository);

    await useCase.execute({
      postId
    });

    return reply.status(202).send();
  } catch (error) {
    if (error instanceof PostNotExistError) {
      return reply.status(400).send({ message: error.message });
    }

    throw error;
  }
}
