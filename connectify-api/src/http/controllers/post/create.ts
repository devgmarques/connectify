import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { CreatePostUseCase } from "@/use-case/post/create-post";
import { PostPrismaRepository } from "@/repositories/prisma/post-prisma-repository";
import { TitleAlreadyExistInUserError } from "@/use-case/errors/title-already-exist-in-user-error";

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const createBody = z.object({
    body: z.string(),
    title: z.string(),
  });

  const { body, title } = createBody.parse(req.body);

  try {
    const postsRepository = new PostPrismaRepository();
    const useCase = new CreatePostUseCase(postsRepository);

    await useCase.execute({
      userId: req.user.sub,
      data: {
        author: req.user.nickname,
        body,
        title,
      },
    });

    return reply.status(201).send();
  } catch (error) {
    if (error instanceof TitleAlreadyExistInUserError) {
      return reply.status(400).send({ message: error.message });
    }

    throw error;
  }
}
