import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { create } from "./create";
import { fetch } from "./fetch";
import { search } from "./search";
import { edit } from "./edit";
import { remove } from "./remove";

export async function routesPost(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt)

  app.post("/post", create)
  app.put("/me/posts/:postId", edit)
  app.delete("/me/posts/:postId", remove)

  app.get("/posts/fetch", fetch)  
  app.get("/posts/search", search)
}