import type { Metadata } from 'next'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { Grid } from '@/components/pages/profile/grid'

type ProfileProps = {
  params: { nickname: string }
}

export async function generateMetadata({
  params,
}: ProfileProps): Promise<Metadata> {
  const { nickname } = params

  return {
    title: `${nickname} | connectify`,
  }
}

export default async function Profile({ params }: ProfileProps) {
  const cookieStore = cookies()
  const token = cookieStore.get('connectify.token')?.value

  if (!token) {
    redirect('/accounts/login')
  }

  return <Grid token={token} nickname={params.nickname} />
}
