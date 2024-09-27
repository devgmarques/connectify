import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'
import { ICreatePostUseCase } from '@/domain/use-cases/posts'
import { TitleAlreadyExistInUserError } from '@/application/errors'

export class CreatePostController {
  constructor(private readonly createPostUseCase: ICreatePostUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const createBody = z.object({
        body: z.string(),
        title: z.string(),
      })
    
      const { body, title } = createBody.parse(request.body)

      const result = await this.createPostUseCase.execute({
        userId: request.user.sub,
        data: {
          author: request.user.nickname,
          body,
          title
        }
      })

      return reply.status(201).send(result)
    } catch (error: any) {
      if (error instanceof TitleAlreadyExistInUserError) {
        return reply.status(400).send({ message: error.message })
      }

      return reply.status(500).send()
    }
  }
}