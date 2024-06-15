'use client'

import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

type PaginationProps = {
  countAllItems: number
}

export function Pagination({ countAllItems }: PaginationProps) {
  const [assetNumber, setAssetNumber] = useState<number>(0)

  const pages = Math.ceil(countAllItems / 10)

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  useEffect(() => {
    setAssetNumber(Number(searchParams.get('page')) ?? 1)
  }, [])

  const handleClickPage = useDebouncedCallback((pageNumber: number) => {
    const params = new URLSearchParams(searchParams)

    if (pageNumber >= 1 && pageNumber <= pages) {
      params.set('page', pageNumber.toString())

      if (pageNumber === 1) {
        params.delete('page')
      }

      setAssetNumber(pageNumber)
    }

    if (pageNumber > pages) {
      params.set('page', `${pages}`)
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false })
  }, 300)

  return (
    <PaginationComponent>
      <PaginationContent>
        <PaginationItem
          onClick={() =>
            handleClickPage(Number(searchParams.get('page')) - 1 || 1)
          }
          className={`${assetNumber > 1 ? 'cursor-pointer' : 'cursor-no-drop text-slate-300 hover:text-slate-300'}`}
        >
          <PaginationPrevious className="" />
        </PaginationItem>

        {Array.from({ length: pages }).map((_, i) => {
          return (
            <PaginationItem
              key={i}
              className="cursor-pointer"
              onClick={() => handleClickPage(Number(i + 1))}
            >
              <PaginationLink isActive={assetNumber === i + 1}>
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        <PaginationItem
          className={`${assetNumber < pages ? 'cursor-pointer' : 'cursor-no-drop text-slate-300 hover:text-slate-300'}`}
          onClick={() => handleClickPage(assetNumber + 1)}
        >
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </PaginationComponent>
  )
}
