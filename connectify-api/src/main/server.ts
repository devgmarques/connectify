import fastify from "fastify"
import fastifyJwt from "@fastify/jwt"
import fastifyCors from "@fastify/cors"
import fastifyMultipart from "@fastify/multipart"

import { env } from "@/infra/env"

import { routesUser } from "./routes/users"
import { routesPost } from "./routes/posts"
import { routesComment } from "./routes/comments"
import { routesLike } from "./routes/likes"
import { routesFollow } from "./routes/follows"

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})
app.register(fastifyMultipart)
app.register(fastifyCors, { origin: env.ORIGIN_URL_CORS })

app.register(routesUser)
app.register(routesPost)
app.register(routesComment)
app.register(routesLike)
app.register(routesFollow)

app.listen({ port: env.PORT, host: "0.0.0.0" }, () => {
  console.log(`Server is running on port ${env.PORT}`)
})