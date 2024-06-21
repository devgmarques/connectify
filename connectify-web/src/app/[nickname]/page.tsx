import type { Metadata } from 'next'

import { notFound, redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { Grid } from '@/components/pages/profile/grid'
import { fetchProfile } from '@/actions/fetch-profile'

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

  const fetch = await fetchProfile(params.nickname, token)

  if (fetch === undefined) {
    notFound()
  }

  return <Grid data={fetch} />
}
