import { FastifyReply, FastifyRequest } from "fastify";

import { UserPrismaRepository } from "@/repositories/prisma/user-prisma-repository";
import { GetUserProfileUseCase } from "@/use-case/user/get-user-profile";
import { PostPrismaRepository } from "@/repositories/prisma/post-prisma-repository";

export async function profile(req: FastifyRequest, reply: FastifyReply) {
  try {
    const userRepository = new UserPrismaRepository();
    const postRepository = new PostPrismaRepository()
    const useCase = new GetUserProfileUseCase(userRepository, postRepository);

    const { user, posts } = await useCase.execute({
      userId: req.user.sub,
    });

    return reply.send({ user, posts });
  } catch (error) {
    throw error;
  }
}
