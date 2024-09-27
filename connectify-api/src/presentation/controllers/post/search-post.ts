import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'
import { ISearchPostUseCase } from '@/domain/use-cases/posts'

export class SearchPostController {
  constructor(private readonly searchPostUseCase: ISearchPostUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const searchBody = z.object({
        query: z.string(),
        page: z.coerce.number().default(1),
      })
    
      const { page, query } = searchBody.parse(request.query)

      const result = await this.searchPostUseCase.execute({
        page,
        query
      })

      return reply.status(201).send(result)
    } catch (error: any) {
      return reply.status(500).send()
    }
  }
}


