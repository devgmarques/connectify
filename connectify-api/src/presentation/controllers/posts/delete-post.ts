import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'
import { IDeletePostUseCase } from '@/domain/use-cases/posts'
import { PostNotExistError } from '@/application/errors'

export class DeletePostController {
  constructor(private readonly deletePostUseCase: IDeletePostUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const deleteParams = z.object({
        postId: z.coerce.number()
      })
    
      const { postId } = deleteParams.parse(request.params)
        

      await this.deletePostUseCase.execute({
        postId
      })

      return reply.status(202).send()
    } catch (error: any) {
      if (error instanceof PostNotExistError) {
        return reply.status(400).send({ message: error.message })
      }

      return reply.status(500).send()
    }
  }
}
