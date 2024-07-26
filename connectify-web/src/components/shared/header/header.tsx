'use client'

import { useEffect, useState } from 'react'

import { PiHandshake } from 'react-icons/pi'
import { LuHome, LuUser } from 'react-icons/lu'
import { LogOut } from 'lucide-react'

import { getTokenData } from '@/utils/get-token-data'

import { SearchInput } from './search-input'
import { LinkMenu } from './menu-links'
import { ActiveLink } from './active-link'

import { ToggleTheme } from '../toggle-theme'
import { ButtonLogout } from '../button-logout'
import { Separator } from '../../ui/separator'

export function Header() {
  const [nickname, setNickname] = useState<string>()

  useEffect(() => {
    const { nickname } = getTokenData()
    setNickname(nickname as string)
  }, [])

  return (
    <header className="z-10 fixed w-full bg-background antialiased border-b-2 border-foreground/20">
      <div className="flex justify-between items-center py-5 px-6 max-w-7xl m-auto">
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

        <div className="flex gap-2 items-center">
          <SearchInput />

          <div className="hidden md:block">
            <ToggleTheme />
          </div>

          <div className="hidden md:block">
            <ButtonLogout>
              <LogOut className="h-[1.2rem] w-[1.2rem]" />
            </ButtonLogout>
          </div>

          <div className="block md:hidden">
            <LinkMenu nickname={nickname as string} />
          </div>
        </div>
      </div>
    </header>
  )
}
