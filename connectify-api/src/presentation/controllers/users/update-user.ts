import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'
import { IUpdateUserUseCase } from '@/domain/use-cases/users'
import { NicknameAlreadyExistError } from '@/application/errors'

export class UpdateUserController {
  constructor(private readonly updateUserUseCase: IUpdateUserUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const updateBody = z.object({
        details: z.string(),
        name: z.string(),
        nickname: z.string(),
        email: z.string(),
        password: z.string().min(6),
      })
    
      const { email, name, password, nickname, details } = updateBody.parse(request.body)

      const result = await this.updateUserUseCase.execute({
        userId: request.user.sub,
        data: {
          details,
          email,
          name,
          nickname,
          password
        }
      })

      return reply.status(201).send(result)
    } catch (error: any) {
      if (error instanceof NicknameAlreadyExistError) {
        return reply.status(400).send({ message: error.message })
      }

      return reply.status(500).send()
    }
  }
}