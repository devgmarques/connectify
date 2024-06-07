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

      <div className="flex-1 h-full grid grid-cols-1 sm:grid-cols-[224px_1fr]">
        <div className="hidden sm:block">
          <Sidebar />
        </div>

        <div>{children}</div>
      </div>
    </div>
  )
}
