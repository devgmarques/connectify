import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { getProfile } from '@/http/get-profile'
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
  const fetch = await getProfile({ nickname: params.nickname })

  if (!fetch) {
    notFound()
  }

  return <Grid data={fetch} />
}
