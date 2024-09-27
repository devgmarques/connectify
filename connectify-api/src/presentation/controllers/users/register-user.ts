import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'
import { IRegisterUserUseCase } from '@/domain/use-cases/users'
import { EmailAlreadyExistError, NicknameAlreadyExistError } from '@/application/errors'

export class RegisterUserController {
  constructor(private readonly registerUserUseCase: IRegisterUserUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const registerBody = z.object({
        name: z.string(),
        nickname: z.string(),
        email: z.string(),
        password: z.string().min(6),
      })
    
      const { email, name, password, nickname } = registerBody.parse(request.body)

      const result = await this.registerUserUseCase.execute({
        email,
        name,
        nickname,
        password
      })

      const token = await reply.jwtSign({ sub: result.userId, nickname: result.nickname })

      return reply.send({ token })
    } catch (error: any) {
      if (error instanceof EmailAlreadyExistError) {
        return reply.status(400).send({ message: error.message })
      }
  
      if (error instanceof NicknameAlreadyExistError) {
        return reply.status(400).send({ message: error.message })
      }

      return reply.status(500).send()
    }
  }
}