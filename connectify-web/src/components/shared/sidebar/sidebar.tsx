'use client'

import { LuHome, LuUser } from 'react-icons/lu'

import { ActiveLink } from './active-link'
import { ButtonLogout } from '../button-logout'

export function Sidebar() {
  return (
    <aside className="w-64 h-screen fixed p-4 pb-20 bg-background space-y-5 flex flex-col justify-between border-t border-foreground/20">
      <div>
        <ActiveLink href="/feed">
          <LuHome />
          <span>Inicio</span>
        </ActiveLink>

        <ActiveLink href="/me">
          <LuUser />
          <span>Perfil</span>
        </ActiveLink>
      </div>
      <ButtonLogout />
    </aside>
  )
}
