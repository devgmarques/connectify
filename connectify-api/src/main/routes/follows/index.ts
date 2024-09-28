import { FastifyInstance } from "fastify"

import { verifyJwt } from "@/presentation/middlewares"
import { makeCreateFollowController } from "@/main/factories/follows"

export async function routesFollow(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt)

  app.post("/users/:followedId/follows", (req, res) => makeCreateFollowController().handle(req, res))
}