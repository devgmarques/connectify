import axios from 'axios'
import nookies from 'nookies'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CONNECTIFY_BASE_URL,
})

api.interceptors.request.use(
  async (config) => {
    let token

    if (typeof window === 'undefined') {
      const { cookies } = await import('next/headers')
      const cookieStore = cookies()

      token = cookieStore.get('connectify.token')?.value
    } else {
      const cookiesNookies = nookies.get(null)
      token = cookiesNookies['connectify.token']
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token.replace(/["]/g, '')}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
