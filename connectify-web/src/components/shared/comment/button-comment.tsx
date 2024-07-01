import { LuMessageCircle } from 'react-icons/lu'

import { Button } from '@/components/ui/button'

type ButtonCommentProps = {
  isOpenFormComment: boolean
  setIsOpenFormComment: React.Dispatch<React.SetStateAction<boolean>>
}

export function ButtonComment({
  isOpenFormComment,
  setIsOpenFormComment,
}: ButtonCommentProps) {
  function handleClick() {
    setIsOpenFormComment(!isOpenFormComment)
  }

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="col-span-2 flex items-center gap-2"
        onClick={handleClick}
      >
        <LuMessageCircle className="text-foreground" />
        <span className="font-medium text-sm text-foreground">Comentar</span>
      </Button>
    </>
  )
}
