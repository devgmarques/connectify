import { FastifyInstance } from "fastify";
import { register } from "./register";

export async function routesUsers(app: FastifyInstance) {
  app.post("/users", register);
}
