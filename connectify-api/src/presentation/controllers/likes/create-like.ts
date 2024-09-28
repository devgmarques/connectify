import { FastifyRequest, FastifyReply } from 'fastify'

import { ICreateLikeUseCase } from "@/domain/use-cases/likes"
import { z } from 'zod'
import { PostNotExistError } from '@/application/errors'

export class CreateLikeController {
  constructor(private readonly createLikeUseCase: ICreateLikeUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const createBody = z.object({
        postId: z.coerce.number()
      })
    
      const { postId } = createBody.parse(request.params)

      const result = await this.createLikeUseCase.execute({
        postId,
        userId: request.user.sub
      })

      return reply.status(201).send(result)
    } catch (error: any) {
      if (error instanceof PostNotExistError) {
        return reply.status(400).send({ message: error.message })
      }

      return reply.status(500).send()
    }
  }
}