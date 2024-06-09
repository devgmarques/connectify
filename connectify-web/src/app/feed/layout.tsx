import { ReactNode } from 'react'
import { Header } from '../../components/shared/header/header'
import { InformationsAccount } from '../../components/pages/feed/informations-account'
import { Suggestions } from '../../components/shared/suggestions'

type FeedLayoutProps = {
  children: ReactNode
}

export default async function FeedLayout({ children }: FeedLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="pt-24 flex-1 h-full grid grid-cols-1 sm:grid-cols-[280px_1fr_286px]">
        <div className="hidden pl-5 sm:block">
          <InformationsAccount />
        </div>

        <div>{children}</div>

        <div className="hidden pr-5 sm:block">
          <Suggestions />
        </div>
      </div>
    </div>
  )
}
