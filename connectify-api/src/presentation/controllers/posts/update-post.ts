import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'
import { IUpdatePostUseCase } from '@/domain/use-cases/posts'
import { TitleAlreadyExistInUserError } from '@/application/errors'

export class UpdatePostController {
  constructor(private readonly updatePostUseCase: IUpdatePostUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const updateParams = z.object({
        postId: z.coerce.number(),
      })
    
      const updateBody = z.object({
        body: z.string(),
        title: z.string(),
        author: z.string(),
        UpdatedAt: z.string().datetime(),
      })
    
      const { body, title } = updateBody.parse(request.body)
      const { postId } = updateParams.parse(request.params)

      const result = await this.updatePostUseCase.execute({
        userId: request.user.sub,
        data: {
          postId,
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


