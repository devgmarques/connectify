import type { Metadata } from 'next'

import { notFound } from 'next/navigation'
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
  const fetch = await fetchProfile(params.nickname)

  if (fetch === undefined) {
    notFound()
  }

  return <Grid data={fetch} />
}
