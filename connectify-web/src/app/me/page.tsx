import type { Metadata } from 'next'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { Grid } from '@/components/pages/profile/grid'

export const metadata: Metadata = {
  title: 'Perfil | connectify',
}

export default async function Profile() {
  const cookieStore = cookies()
  const token = cookieStore.get('connectify.token')?.value

  if (!token) {
    redirect('/accounts/login')
  }

  return <Grid />
}
