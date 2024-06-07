import { PiHandshake } from 'react-icons/pi'
import { ToggleTheme } from './toggle-theme'

export function Header() {
  return (
    <header className="flex w-full justify-between items-center bg-foreground/90 py-4 px-6 antialiased border-b border-background/50">
      <div className="flex items-center gap-2 text-lg text-background">
        <PiHandshake size={20} />
        <span className="font-semibold">connectify</span>
      </div>

      <div className="flex gap-5 items-center">
        <ToggleTheme />
      </div>
    </header>
  )
}
