import axios from 'axios'
import { parseCookies } from 'nookies'

const cookies = parseCookies()
const token = cookies['connectify.token']

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CONNECTIFY_BASE_URL,
})

if (token) {
  api.defaults.headers.Authtorization = `Bearer ${token}`
}
