'use client'

import { Dispatch, SetStateAction, useState } from 'react'

import { PiDotsThreeVerticalBold } from 'react-icons/pi'

import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui'
import { Post } from '@/@types'

import { DialogUpdatePost } from '../dialog-update-post'
import { DialogDeletePost } from '../dialog-delete-post'

type ButtonOpenOperationsProps = {
  data: Post
  setData: Dispatch<SetStateAction<Post>>
}

export function ButtonOpenOperations({
  data,
  setData,
}: ButtonOpenOperationsProps) {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)

  function handleToggleDropdown() {
    setDropdownOpen(!dropdownOpen)
  }

  function handleDialogClick(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation()
    setDropdownOpen(true)
  }

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" onClick={handleToggleDropdown}>
          <PiDotsThreeVerticalBold className="text-foreground w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 p-2">
        <DropdownMenuLabel>Selecione a operação</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuCheckboxItem className="p-2">
          <div onClick={handleDialogClick}>
            <DialogUpdatePost data={data} setData={setData} />
          </div>
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem className="p-2">
          <div onClick={handleDialogClick}>
            <DialogDeletePost id={data.id} setData={setData} />
          </div>
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
