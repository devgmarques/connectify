import fastify from "fastify"
import fastifyJwt from "@fastify/jwt";

import { ZodError } from "zod";
import { env } from "@/env";

import { routesUsers } from "@/http/controllers/users/routes";
import { routesPost } from '@/http/controllers/post/routes';

const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(routesUsers);
app.register(routesPost);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  }

  console.log(error);

  return reply.status(500).send({ message: "Internal server error." });
});

app.listen({ port: env.PORT }, () => {
  console.log("Server is running");
});
