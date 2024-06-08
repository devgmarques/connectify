import { PiHandshake } from 'react-icons/pi'
import { ToggleTheme } from './toggle-theme'
import { ButtonLogout } from './button-logout'

export function Header() {
  return (
    <header className="fixed flex w-full justify-between items-center bg-background py-5 px-6 antialiased border-b-2 border-foreground/20">
      <div className="flex items-center gap-2 text-lg text-foreground">
        <PiHandshake size={20} />
        <span className="font-semibold">connectify</span>
      </div>

      <div className="flex gap-5 items-center">
        <ButtonLogout className="block sm:hidden" />
        <ToggleTheme />
      </div>
    </header>
  )
}
