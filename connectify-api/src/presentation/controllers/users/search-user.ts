import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'
import { ISearchUserUseCase } from '@/domain/use-cases/users'

export class SearchUserController {
  constructor(private readonly SearchUserUseCase: ISearchUserUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const searchBody = z.object({
        query: z.string(),
        page: z.coerce.number().min(1).default(1),
      })
    
      const { page, query } = searchBody.parse(request.query)

      const result = await this.SearchUserUseCase.execute({
        userId: request.user.sub,
        query,
        page,
      })

      return reply.status(200).send(result)
    } catch (error) {
      throw error
    }
  }
}