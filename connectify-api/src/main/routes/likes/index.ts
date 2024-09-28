import { FastifyInstance } from "fastify"

import { verifyJwt } from "@/presentation/middlewares"
import { makeCreateLikeController } from "@/main/factories/likes"

export async function routesLike(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt)

  app.post("/posts/:postId/likes", (req, res) => makeCreateLikeController().handle(req, res))
}