import { ReactNode } from 'react'

import { getTokenData } from '@/utils'
import { getProfile } from '@/http'
import { InformationAccount, Suggestions } from '@/components/shared'

type FeedLayoutProps = {
  children: ReactNode
}

export default async function FeedLayout({ children }: FeedLayoutProps) {
  const { nickname } = await getTokenData()
  const data = await getProfile({ nickname })

  return (
    <div className="min-h-screen w-full flex flex-col">
      <div className="pt-24 flex-1 h-full grid grid-cols-1 lg:grid-cols-[280px_1fr_286px]">
        <div className="hidden pl-5 sm:block mx-auto">
          <InformationAccount
            follows={data.follows}
            posts={data.posts}
            user={data.user}
          />
        </div>

        <div>{children}</div>

        <div className="hidden pr-5 lg:block mx-auto">
          <Suggestions follows={data.follows} />
        </div>
      </div>
    </div>
  )
}
