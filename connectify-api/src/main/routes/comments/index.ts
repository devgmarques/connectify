import { FastifyInstance } from "fastify"

import { verifyJwt } from "@/presentation/middlewares"
import { makeCreateCommentController } from "@/main/factories/comments"

export async function routesComment(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt)

  app.post("/posts/:postId/comments", (req, res) => makeCreateCommentController().handle(req, res))
}