import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'
import { IFetchPostUseCase } from '@/domain/use-cases/posts'

export class FetchPostController {
  constructor(private readonly fetchPostUseCase: IFetchPostUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const fetchBody = z.object({
        page: z.coerce.number().default(1),
      })
    
      const { page } = fetchBody.parse(request.query)
        

      const result = await this.fetchPostUseCase.execute({
        page
      })

      return reply.status(202).send(result)
    } catch (error: any) {
      return reply.status(500).send()
    }
  }
}
