import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export default async function NotFound() {
  const cookieStore = cookies()
  const token = cookieStore.get('connectify.token')?.value

  if (!token) {
    redirect('/accounts/login')
  }

  redirect('/feed')
}
