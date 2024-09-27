import fastify from "fastify"
import fastifyJwt from "@fastify/jwt"
import fastifyCors from '@fastify/cors'

import { env } from "@/infra/env"

import { routesUser } from "@/http/controllers/users/routes"
import { routesPost } from '@/http/controllers/post/routes'
import { routesLike } from "./http/controllers/like/routes"
import { routesFollow } from "./http/controllers/follow/routes"
import { routesComment } from "./http/controllers/comment/routes"
import fastifyMultipart from '@fastify/multipart'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(fastifyMultipart)

app.register(fastifyCors, { origin: "http://localhost:3000" })

app.register(routesUser)
app.register(routesPost)
app.register(routesLike)
app.register(routesFollow)
app.register(routesComment)

app.listen({ port: env.PORT, host: "0.0.0.0" }, () => {
  console.log(`Server is running on port ${env.PORT}`)
})
