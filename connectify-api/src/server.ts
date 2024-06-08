import fs from "node:fs"
import path from "node:path";

import fastify from "fastify"
import fastifyJwt from "@fastify/jwt";
import fastifyCors from '@fastify/cors'

import { ZodError } from "zod";
import { env } from "@/env";

import { routesUser } from "@/http/controllers/users/routes";
import { routesPost } from '@/http/controllers/post/routes';
import { routesLike } from "./http/controllers/like/routes";
import { routesFollow } from "./http/controllers/follow/routes";
import { routesComment } from "./http/controllers/comment/routes";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(fastifyCors, { origin: "http://localhost:3000" })

const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, 'swagger.json'), 'utf8'));

app.register(fastifySwagger, {
  mode: 'static',
  specification: {
    document: swaggerDocument
  }
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs"
});


app.register(routesUser);
app.register(routesPost);
app.register(routesLike)
app.register(routesFollow)
app.register(routesComment)

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
  console.log(`Server is running on port ${env.PORT}`);
});
