import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { CreatePostUseCase } from "@/use-case/post/create-post";
import { PostPrismaRepository } from "@/repositories/prisma/post-repository";
import { TitleAlreadyExistInUserError } from "@/use-case/errors/title-already-exist-in-user-error";

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const registerBody = z.object({
    body: z.string(),
    title: z.string(),
  });

  const { body, title } = registerBody.parse(req.body);

  try {
    const postsRepository = new PostPrismaRepository();
    const useCase = new CreatePostUseCase(postsRepository);

    await useCase.execute({
      data: {
        body,
        title,
      },
      userId: req.user.sub,
    });

    return reply.status(201).send();
  } catch (error) {
    if (error instanceof TitleAlreadyExistInUserError) {
      return reply.status(400).send({ message: error.message });
    }

    throw error;
  }
}
