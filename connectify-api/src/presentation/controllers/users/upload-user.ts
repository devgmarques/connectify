import { FastifyRequest, FastifyReply } from 'fastify'

import { IUploadUserUseCase } from '@/domain/use-cases/users'

export class UploadUserController {
  constructor(private readonly uploadUserUseCase: IUploadUserUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const file = await request.file()

      await this.uploadUserUseCase.execute({
        userId: request.user.sub,
        file: file
      })

      return reply.status(201).send()
    } catch (error: any) {
      return reply.status(500).send()
    }
  }
}