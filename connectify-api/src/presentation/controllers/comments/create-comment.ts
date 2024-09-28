import { FastifyRequest, FastifyReply } from 'fastify'

import { ICreateCommentUseCase } from "@/domain/use-cases/comments"
import { z } from 'zod'
import { PostNotExistError } from '@/application/errors'

export class CreateCommentController {
  constructor(private readonly createCommentUseCase: ICreateCommentUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const createParams = z.object({
        postId: z.coerce.number()
      })
    
      const createBody = z.object({
        body: z.string()
      })
    
      const { postId } = createParams.parse(request.params)
      const { body } = createBody.parse(request.body)

      const result = await this.createCommentUseCase.execute({
        body,
        postId,
        userId: request.user.sub
      })

      return reply.status(201).send(result)
    } catch (error: any) {
      const message = error.message

      if (error instanceof PostNotExistError) {
          return reply.status(404).send({ message })
      }

      return reply.status(500).send({ message })
    }
  }
}