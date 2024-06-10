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
import { PiDotsThreeVerticalBold, PiTrashBold } from 'react-icons/pi'
import { ButtonDeleteProject } from './button-delete-project'
import { EditPostDialog } from '@/components/pages/profile/edit-post'
import { Post } from '@/types/post'

type ButtonOpenOperationsProps = {
  data: Post
}

export function ButtonOpenOperations({ data }: ButtonOpenOperationsProps) {
  console.log(data)

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
          <ButtonDeleteProject className="flex gap-3 text-red-500 dark:text-red-400 bg-transparent hover:bg-transparent p-0 m-0">
            <PiTrashBold className="text-red-500 dark:text-red-400 w-5 h-5" />
            Deletar projeto
          </ButtonDeleteProject>
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
