import { FastifyInstance } from "fastify";

import { verifyJwt } from "@/http/middlewares/verify-jwt";

import { register } from "./register";
import { search } from "./search";
import { profile } from "./profile";
import { authentificate } from "./authentificate";
import { edit } from "./edit";
import { fetch } from "./fetch";
import { upload } from "./upload";

export async function routesUser(app: FastifyInstance) {
  app.post("/user", register);
  app.post("/session", authentificate);

  app.put("/user", { onRequest: verifyJwt }, edit);
  app.post("/user/upload/avatar", { onRequest: verifyJwt }, upload)

  app.get("/users/:nickname/profile", { onRequest: verifyJwt }, profile);
  app.get("/users/search", { onRequest: verifyJwt }, search);
  app.get("/users/fetch", { onRequest: verifyJwt }, fetch);
}