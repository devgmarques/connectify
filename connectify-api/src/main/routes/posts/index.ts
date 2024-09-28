import { FastifyInstance } from "fastify"

import { verifyJwt } from "@/presentation/middlewares"
import {
  makeCreatePostController,
  makeUpdatePostController,
  makeDeletePostController,
  makeFetchPostController,
  makeSearchPostController
} from '@/main/factories/posts'

export async function routesPost(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt)

  app.post("/post", (req, res) => makeCreatePostController().handle(req, res))
  app.put("/me/posts/:postId", (req, res) => makeUpdatePostController().handle(req, res))
  app.delete("/me/posts/:postId", (req, res) => makeDeletePostController().handle(req, res))

  app.get("/posts/fetch", (req, res) => makeFetchPostController().handle(req, res))  
  app.get("/posts/search", (req, res) => makeSearchPostController().handle(req, res))
}