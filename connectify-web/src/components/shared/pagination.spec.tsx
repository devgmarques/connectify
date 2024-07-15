import React from 'react'

import { render } from '@testing-library/react'

import { Pagination } from './pagination'

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
  useRouter: vi.fn(() => ({
    replace: vi.fn(),
  })),
  useSearchParams: vi.fn(() => ({
    get: vi.fn((key) => {
      return key
    }),
    set: (page: number) => {
      return page
    },
  })),
}))

describe('Pagination', () => {
  it('should be able render five buttons', () => {
    const wrapper = render(<Pagination countAllItems={30} />)
    const paginationItems = wrapper.getAllByRole('listitem')

    expect(paginationItems).toHaveLength(5)
  })
})
