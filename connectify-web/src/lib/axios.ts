import 'dotenv/config'

import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CONNECTIFY_BASE_URL,
})
