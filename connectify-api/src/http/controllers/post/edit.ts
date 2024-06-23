import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { PostPrismaRepository } from "@/repositories/prisma/post-prisma-repository";
import { TitleAlreadyExistInUserError } from "@/use-case/errors/title-already-exist-in-user-error";
import { EditPostUseCase } from "@/use-case/post/edit-post";

export async function edit(req: FastifyRequest, reply: FastifyReply) {
  const editParams = z.object({
    postId: z.coerce.number(),
  })

  const editBody = z.object({
    body: z.string(),
    title: z.string(),
    author: z.string(),
    createdAt: z.string().datetime(),
  });

  const { body, title, author, createdAt } = editBody.parse(req.body);
  const { postId } = editParams.parse(req.params);

  try {
    const postsRepository = new PostPrismaRepository();
    const useCase = new EditPostUseCase(postsRepository);

    const { post } = await useCase.execute({
      userId: req.user.sub,
      data: {
        id: postId,
        body,
        title,
        author,
        createdAt,
      },
    });

    return reply.status(200).send({ post });
  } catch (error) {
    if (error instanceof TitleAlreadyExistInUserError) {
      return reply.status(400).send({ message: error.message });
    }

    throw error;
  }
}
