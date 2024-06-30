import { cookies } from 'next/headers'

export function isAuthenticated() {
  const cookieStore = cookies()

  return !!cookieStore.get('connectify.token')?.value
}
