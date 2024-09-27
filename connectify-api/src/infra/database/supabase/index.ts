import { env } from '@/infra/env'
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(env.SUPABASE_BASEURL, env.SUPABASE_KEY, {
  auth: {
    persistSession: false
  }
})