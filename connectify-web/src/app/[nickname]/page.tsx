import type { Metadata } from 'next'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { Grid } from '@/components/pages/profile/grid'

export const metadata: Metadata = {
  title: 'Perfil | connectify',
}

type ProfileProps = {
  params: { nickname: string }
}

export default async function Profile({ params }: ProfileProps) {
  const cookieStore = cookies()
  const token = cookieStore.get('connectify.token')?.value

  if (!token) {
    redirect('/accounts/login')
  }

  return <Grid token={token} nickname={params.nickname} />
}
