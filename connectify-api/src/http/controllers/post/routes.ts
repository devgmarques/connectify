import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { create } from "./create";
import { fetch } from "./fetch";
import { search } from "./search";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export async function routesPost(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt)

  app.withTypeProvider<ZodTypeProvider>()
    .post("/post", {
      schema: {
        tags: ["posts"],
        body: z.object({
          title: z.string(),
          body: z.string(),
        }),
        response: {
          201: null
        },
      }
    }, create)

  app.withTypeProvider<ZodTypeProvider>()
    .get("/posts/fetch", {
      schema: {
        tags: ["posts"],
        querystring: z.object({
          page: z.coerce.number().default(1),
        }),
        response: {
          200: z.object({
            posts: z.array(
              z.object({
                id: z.number(),
                title: z.string(),
                body: z.string(),
                userId: z.string(),
                createdAt: z.date(),
              })
            )
          })
        },
      }
    }, fetch)

  app.withTypeProvider<ZodTypeProvider>()
    .get("/posts/search", {
      schema: {
        tags: ["posts"],
        querystring: z.object({
          query: z.string(),
          page: z.coerce.number().default(1),
        }),
        response: {
          200: z.object({
            posts: z.array(
              z.object({
                id: z.number(),
                title: z.string(),
                body: z.string(),
                userId: z.string(),
                createdAt: z.date(),
              })
            )
          })
        },
      }
    }, search)
}