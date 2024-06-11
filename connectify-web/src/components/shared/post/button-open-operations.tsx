'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { PiDotsThreeVerticalBold } from 'react-icons/pi'
import { Post } from '@/types/post'
import { EditPostDialog } from './edit-post'
import { DeletePostDialog } from './delete-project'

type ButtonOpenOperationsProps = {
  data: Post
}

export function ButtonOpenOperations({ data }: ButtonOpenOperationsProps) {
  const [dropdownOpen, setDropdownOpen] = React.useState(false)

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
            <EditPostDialog data={data} />
          </div>
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem className="p-2">
          <div onClick={handleDialogClick}>
            <DeletePostDialog id={data.id} />
          </div>
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
