import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'
import { IAuthenticateUserUseCase } from '@/domain/use-cases/users'
import { CredentialsInvalidateError, UserNotExistError } from '@/application/errors'

export class AuthenticateUserController {
  constructor(private readonly authenticateUserUseCase: IAuthenticateUserUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const authenticateBody = z.object({
        email: z.string(),
        password: z.string(),
      })
    
      const { email, password } = authenticateBody.parse(request.body)

      const result = await this.authenticateUserUseCase.execute({
        email,
        password
      })

      const token = await reply.jwtSign({ sub: result.userId, nickname: result.nickname })

      return reply.send({ token })
    } catch (error: any) {
      if (error instanceof CredentialsInvalidateError) {
        reply.status(400).send({ message: error.message })
      }
  
      if (error instanceof UserNotExistError) {
        reply.status(400).send({ message: error.message })
      }

      return reply.status(500).send()
    }
  }
}