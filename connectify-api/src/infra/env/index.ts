import z from "zod"
import "dotenv/config"

const schemaEnv = z.object({
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(3333),
  SUPABASE_KEY: z.string(),
  SUPABASE_BASEURL: z.string(),
  SUPABASE_IMG_BASEUR: z.string()
})

const _env = schemaEnv.safeParse(process.env)

if (_env.success === false) {
  console.log("Error environment not passed", _env.error.format)

  throw new Error()
}

export const env = _env.data
