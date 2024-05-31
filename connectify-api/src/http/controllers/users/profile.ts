import { FastifyReply, FastifyRequest } from "fastify";

import { UserPrismaRepository } from "../../../repositories/prisma/user-prisma-repository";
import { GetUserProfileUseCase } from "../../../use-case/user/get-user-profile";

export async function profile(req: FastifyRequest, reply: FastifyReply) {
  try {
    const userRepository = new UserPrismaRepository();
    const useCase = new GetUserProfileUseCase(userRepository);

    const { user } = await useCase.execute({
      userId: req.user.sub,
    });

    return reply.send({ user });
  } catch (error) {
    throw error;
  }
}
