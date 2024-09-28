import { FastifyInstance } from "fastify"

import { verifyJwt } from "@/presentation/middlewares"

import { 
  makeRegisterUserController,
  makeAuthenticateUserController, 
  makeUpdateUserController,
  makeUploadUserController,
  makeGetProfileUserController,
  makeSearchUserController,
  makeFetchUserController
} from '@/main/factories/users'

export async function routesUser(app: FastifyInstance) {
  app.post("/user", (req, res) => makeRegisterUserController().handle(req, res))
  app.post("/session", (req, res) => makeAuthenticateUserController().handle(req, res))

  app.put("/user", { onRequest: verifyJwt }, (req, res) => makeUpdateUserController().handle(req, res))
  app.post("/user/upload/avatar", { onRequest: verifyJwt }, (req, res) => makeUploadUserController().handle(req, res))

  app.get("/users/:nickname/profile", { onRequest: verifyJwt }, (req, res) => makeGetProfileUserController().handle(req, res))
  app.get("/users/search", { onRequest: verifyJwt }, (req, res) => makeSearchUserController().handle(req, res))
  app.get("/users/fetch", { onRequest: verifyJwt }, (req, res) => makeFetchUserController().handle(req, res))
}