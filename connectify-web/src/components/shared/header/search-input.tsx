'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export function SearchParams() {
  const [initialValue, setInitialValue] = useState<string>('')

  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const handleChange = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(searchParams)

      const searchString = e.target.value

      if (searchString) {
        params.set('q', searchString)
      } else {
        params.delete('q')
      }

      replace(`/search?${params.toString()}`)
    },
    300,
  )

  useEffect(() => {
    const isValidatedQuery = searchParams.get('q')

    setInitialValue(isValidatedQuery ?? '')
  }, [searchParams])

  return (
    <div className="flex items-center space-x-2">
      <Label
        className="hidden md:inline-flex p-3 h-10 w-10 border border-input bg-background hover:bg-accent hover:text-accent-foreground items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        htmlFor="search"
      >
        <Search className="text-foreground" />
      </Label>
      <Input
        className="focus:outline focus:outline-2 focus:outline-black focus:outline-offset-2"
        id="search"
        type="text"
        placeholder="Pesquisar"
        value={initialValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setInitialValue(e.target.value)
          handleChange(e)
        }}
      />
    </div>
  )
}

export function SearchInput() {
  return (
    <Suspense>
      <SearchParams />
    </Suspense>
  )
}
