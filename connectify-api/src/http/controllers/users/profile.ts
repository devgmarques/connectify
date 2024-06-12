import { FastifyReply, FastifyRequest } from "fastify";

import { UserPrismaRepository } from "@/repositories/prisma/user-prisma-repository";
import { GetUserProfileUseCase } from "@/use-case/user/get-user-profile";
import { PostPrismaRepository } from "@/repositories/prisma/post-prisma-repository";
import { FollowPrismaRepository } from "@/repositories/prisma/follow-prisma-repository";
import { z } from "zod";

export async function profile(req: FastifyRequest, reply: FastifyReply) {
  const profileParams = z.object({
    nickname: z.string()
  })

  const { nickname } = profileParams.parse(req.params)

  try {
    const userRepository = new UserPrismaRepository();
    const postRepository = new PostPrismaRepository()
    const followRepository = new FollowPrismaRepository()

    const useCase = new GetUserProfileUseCase(userRepository, postRepository, followRepository);

    const { user, posts, follows } = await useCase.execute({
      nickname,
    });

    return reply.send({ user, posts, follows });
  } catch (error) {
    throw error;
  }
}
