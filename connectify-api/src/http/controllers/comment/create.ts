import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { CreateCommentInPostUseCase } from "@/application/use-case/comments";
import { CommentPrismaRepository } from "@/repositories/prisma/comment-prisma-repository";
import { PostPrismaRepository } from "@/repositories/prisma/post-prisma-repository";
import { PostNotExistError } from "@/use-case/errors/post-not-exist-error";

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const createParams = z.object({
    postId: z.coerce.number()
  });

  const createBody = z.object({
    body: z.string()
  })

  const { postId } = createParams.parse(req.params);
  const { body } = createBody.parse(req.body)

  try {
    const commentsRepository = new CommentPrismaRepository()
    const postsRepository = new PostPrismaRepository()
    const useCase = new CreateCommentInPostUseCase(commentsRepository, postsRepository);

    const { comment } = await useCase.execute({
      body, 
      postId,
      userId: req.user.sub
    });

    return reply.status(201).send({ comment });
  } catch (error) {
    if (error instanceof PostNotExistError) {
      return reply.status(400).send({ message: error })
    }

    throw error;
  }
}
