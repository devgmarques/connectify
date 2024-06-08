import { Button } from '@/components/ui/button'
import { PiCaretRight, PiHeartBold, PiNoteLight } from 'react-icons/pi'

export function CardPost() {
  return (
    <div className="w-full px-4 py-3 bg-background rounded-md">
      <div className="space-y-5 pb-3 border-b border-foreground/20">
        <div className="flex gap-3 items-center border-b border-foreground/20">
          <h2 className="font-bold text-md text-foreground/80">Nick name</h2>

          <PiCaretRight className="text-foreground" />

          <h3 className="font-bold text-lg text-foreground">Titulo do post</h3>
        </div>

        <p className="text-foreground text-medium">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
          corrupti a quia. Fugit, eos. Odio fugiat, exercitationem, praesentium
          fugit aliquam enim quos amet adipisci facere, ut quia in voluptatibus
          eius!.Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
          corrupti a quia. Fugit, eos. Odio fugiat, exercitationem, praesentium
          fugit aliquam enim quos amet adipisci facere, ut quia in voluptatibus
          eius!
        </p>
      </div>

      <div className="flex pt-3 gap-3">
        <Button
          variant="secondary"
          size="sm"
          className="flex items-center gap-2"
        >
          <PiHeartBold className="text-foreground" />
          <span className="font-medium text-sm text-foreground">Gostei</span>
        </Button>

        <Button
          variant="secondary"
          size="sm"
          className="flex items-center gap-2"
        >
          <PiNoteLight className="text-foreground" />
          <span className="font-medium text-sm text-foreground">Comentar</span>
        </Button>
      </div>
    </div>
  )
}
