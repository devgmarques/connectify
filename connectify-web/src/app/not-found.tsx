import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function NotFound() {
  const cookieStore = cookies()
  const token = cookieStore.get('connectify.token')?.value

  if (!token) {
    redirect('/accounts/login')
  }

  redirect('/feed')
}
