import z from "zod"
import "dotenv/config"

const schemaEnv = z.object({
  ORIGIN_URL_CORS: z.string(),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(3333),
  SUPABASE_KEY: z.string(),
  SUPABASE_BASEURL: z.string(),
  SUPABASE_IMG_BASEURL: z.string()
})

const _env = schemaEnv.safeParse(process.env)

if (!_env.success) {
  console.log("Error environment not passed", _env.error)

  throw new Error()
}

export const env = _env.data
