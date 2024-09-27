import { FastifyRequest, FastifyReply } from 'fastify'

import { ICreateFollowUseCase } from "@/domain/use-cases/follows"
import { z } from 'zod'

export class CreateFollowController {
  constructor(private readonly createFollowUseCase: ICreateFollowUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const createBody = z.object({
        followedId: z.string().uuid()
      })
        
      const { followedId } = createBody.parse(request.body)

      const result = await this.createFollowUseCase.execute({
        followedId,
        userId: request.user.sub
      })

      return reply.status(201).send(result)
    } catch (error: any) {
      return reply.status(500).send()
    }
  }
}