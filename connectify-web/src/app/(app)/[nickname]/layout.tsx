import { ReactNode } from 'react'

import { getTokenData } from '@/utils/get-token-data'
import { getProfile } from '@/http/get-profile'
import { Suggestions } from '@/components/shared/suggestions'

type ProfileLayoutProps = {
  children: ReactNode
}

export default async function ProfileLayout({ children }: ProfileLayoutProps) {
  const { nickname } = await getTokenData()
  const data = await getProfile({ nickname })

  return (
    <div className="min-h-screen flex flex-col">
      <div className="pt-24 flex-1 h-full grid grid-cols-1 sm:grid-cols-[1fr_286px]">
        <div>{children}</div>

        <div className="hidden pr-5 sm:block">
          <Suggestions follows={data.follows} />
        </div>
      </div>
    </div>
  )
}
