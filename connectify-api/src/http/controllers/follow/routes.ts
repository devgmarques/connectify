import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { create } from "./create";

export async function routesFollow(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt)

  app.post("/users/:followedId/follows", create)
}