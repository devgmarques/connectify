import axios from 'axios'
import nookies from 'nookies'

const cookies = nookies.get(null)
const token = cookies['connectify.token']

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CONNECTIFY_BASE_URL,
})

if (token) {
  api.defaults.headers.Authorization = `Bearer ${token.replace(/["]/g, '')}`
}
