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
import { useEffect, useState } from 'react'
import { SearchInput } from './search-input'

export function Header() {
  const [nickname, setNickname] = useState<string>()

  useEffect(() => {
    const { payload } = getTokenData()
    setNickname(payload.nickname as string)
  }, [])

  return (
    <header className="z-10 fixed flex w-full justify-between items-center bg-background py-5 px-6 antialiased border-b-2 border-foreground/20">
      <div className="flex items-center gap-2 text-lg text-foreground">
        <PiHandshake size={20} />
        <span className="font-semibold">connectify</span>

        <Separator orientation="vertical" className="h-6" />

        <nav className="hidden gap-2 items-center md:flex">
          <ActiveLink href="/feed">
            <LuHome />
            <span className="text-sm font-medium">Inicio</span>
          </ActiveLink>

          <ActiveLink href={`/${nickname}`}>
            <LuUser />
            <span className="text-sm font-medium">Perfil</span>
          </ActiveLink>
        </nav>
      </div>

      <div className="flex gap-5 items-center">
        <SearchInput />

        <ToggleTheme />

        <div className="hidden md:block">
          <ButtonLogout>
            <LogOut />
          </ButtonLogout>
        </div>

        <div className="block md:hidden">
          <LinkMenu nickname={nickname as string} />
        </div>
      </div>
    </header>
  )
}
