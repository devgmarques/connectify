import z from "zod";
import "dotenv/config"

const schemaEnv = z.object({
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3333),
});

const _env = schemaEnv.safeParse(process.env);

if (_env.success === false) {
  console.log("Error environment not passed", _env.error.format);

  throw new Error();
}

export const env = _env.data;
