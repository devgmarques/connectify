import { FastifyInstance } from "fastify";

import { verifyJwt } from "@/http/middlewares/verify-jwt";

import { register } from "./register";
import { search } from "./search";
import { profile } from "./profile";
import { authentificate } from "./authentificate";
import { edit } from "./edit";

export async function routesUser(app: FastifyInstance) {
  app.post("/user", register);
  app.post("/session", authentificate);

  app.get("/me", { onRequest: verifyJwt }, profile);
  app.get("/users", { onRequest: verifyJwt }, search);
  app.put("/user", { onRequest: verifyJwt }, edit);
}