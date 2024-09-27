import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'
import { IFetchUserUseCase } from '@/domain/use-cases/users'

export class FetchUserController {
  constructor(private readonly fetchUserUseCase: IFetchUserUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const FetchBody = z.object({
        page: z.coerce.number().min(1).default(1),
      })
    
      const { page } = FetchBody.parse(request.query)

      const result = await this.fetchUserUseCase.execute({
        page,
        userId: request.user.sub
      })

      return reply.status(200).send(result)
    } catch (error) {
      throw error
    }
  }
}