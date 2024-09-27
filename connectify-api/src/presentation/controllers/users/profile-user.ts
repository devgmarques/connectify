import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'
import { IGetProfileUserUseCase } from '@/domain/use-cases/users'

export class ProfileUserController {
  constructor(private readonly profileUserUseCase: IGetProfileUserUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const profileParams = z.object({
        nickname: z.string()
      })
    
      const { nickname } = profileParams.parse(request.params)

      const result = await this.profileUserUseCase.execute({
        nickname
      })

      return reply.status(200).send(result)
    } catch (error) {
      throw error
    }
  }
}