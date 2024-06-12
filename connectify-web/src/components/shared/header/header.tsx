'use client'

import { PiHandshake } from 'react-icons/pi'
import { ToggleTheme } from '../toggle-theme'
import { ButtonLogout } from '../button-logout'
import { ActiveLink } from './active-link'

import { LuHome, LuUser } from 'react-icons/lu'
import { Separator } from '../../ui/separator'
import { LinkMenu } from './menu-links'
import { LogOut } from 'lucide-react'
import { getTokenData } from '@/utils/get-token-data'

export function Header() {
  const { payload } = getTokenData()

  return (
    <header className="z-10 fixed flex w-full justify-between items-center bg-background py-5 px-6 antialiased border-b-2 border-foreground/20">
      <div className="flex items-center gap-2 text-lg text-foreground">
        <PiHandshake size={20} />
        <span className="font-semibold">connectify</span>

        <Separator orientation="vertical" className="h-6" />

        <nav className="hidden gap-2 items-center sm:flex">
          <ActiveLink href="/feed">
            <LuHome />
            <span className="text-sm font-medium">Inicio</span>
          </ActiveLink>

          <ActiveLink href={`/${payload.nickname}`}>
            <LuUser />
            <span className="text-sm font-medium">Perfil</span>
          </ActiveLink>
        </nav>
      </div>

      <div className="flex gap-5 items-center">
        <ToggleTheme />
        <div className="hidden sm:block">
          <ButtonLogout>
            <LogOut />
          </ButtonLogout>
        </div>
        <div className="block sm:hidden">
          <LinkMenu />
        </div>
      </div>
    </header>
  )
}
