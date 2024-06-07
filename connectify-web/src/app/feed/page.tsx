import type { Metadata } from 'next'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { Layout } from '@/components/shared/layout'
import { Grid } from '@/components/pages/feed/grid'

export const metadata: Metadata = {
  title: 'Feed | connectify',
}

export default async function Feed() {
  const cookieStore = cookies()
  const token = cookieStore.get('connectify.token')?.value

  if (!token) {
    redirect('/accounts/login')
  }

  return (
    <Layout>
      <Grid />
    </Layout>
  )
}
