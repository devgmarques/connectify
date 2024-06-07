import { FastifyInstance } from "fastify";

import { verifyJwt } from "@/http/middlewares/verify-jwt";

import { register } from "./register";
import { search } from "./search";
import { profile } from "./profile";
import { authentificate } from "./authentificate";
import { edit } from "./edit";
import { z } from "zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export async function routesUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>()
    .post("/user", {
      schema: {
        tags: ["users"],
        body: z.object({
          name: z.string(),
          nickname: z.string(),
          email: z.string(),
          password: z.string().min(6),
        }),
        response: {
          201: null
        },
      }
    }, register);

  app.withTypeProvider<ZodTypeProvider>()
    .post("/session", {
      schema: {
        tags: ["users"],
        body: z.object({
          email: z.string(),
          password: z.string(),
        }),
        response: {
          201: z.object({
            token: z.string()
          })
        },
      }
    }, authentificate);

  app.withTypeProvider<ZodTypeProvider>()
    .get("/me", {
      schema: {
        tags: ["users"],
        response: {
          201: z.object({
            user: z.object({
              name: z.string(),
              nickname: z.string(),
              email: z.string(),
              details: z.string()
            }),
            posts: z.array(
              z.object({
                id: z.string(),
                title: z.string(),
                body: z.string(),
                userId: z.string(),
                createdAt: z.date()
              })
            )
          })
        },
      },
      onRequest: verifyJwt
    }, profile);

  app.withTypeProvider<ZodTypeProvider>()
    .get("/users/search", {
      schema: {
        tags: ["users"],
        querystring: z.object({
          query: z.string(),
          page: z.coerce.number().min(1).default(1),
        }),
        response: {
          201: z.object({
            user: z.object({
              name: z.string(),
              nickname: z.string(),
              email: z.string(),
              details: z.string()
            }),
            posts: z.array(
              z.object({
                id: z.string(),
                title: z.string(),
                body: z.string(),
                userId: z.string(),
                createdAt: z.date()
              })
            )
          })
        },
      },
      onRequest: verifyJwt
    }, search);

  app.put("/user", { onRequest: verifyJwt }, edit);
}
