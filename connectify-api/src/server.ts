import fastify from "fastify";
import { env } from "./env";

const app = fastify();

app.listen({ port: env.PORT }, () => {
  console.log("Server is running");
});
