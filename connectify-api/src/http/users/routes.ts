import { FastifyInstance } from "fastify";
import { register } from "./register";
import { search } from "./search";

export async function routesUsers(app: FastifyInstance) {
  app.post("/user", register);

  app.get("/users", search)
}
