import { ReactNode } from 'react'
import { Header } from './header'
import { Sidebar } from './sidebar/sidebar'

type LayoutProps = {
  children: ReactNode
}
export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="pt-[81px] flex-1 h-full grid grid-cols-1 sm:grid-cols-[256px_1fr_256px]">
        <div className="hidden sm:block">
          <Sidebar />
        </div>

        <div>{children}</div>
      </div>
    </div>
  )
}
