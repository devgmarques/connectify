import React from 'react'

import { render } from '@testing-library/react'

import { ActiveLink } from './active-link'

vi.mock('next/navigation', () => ({
  usePathname: () => '/home',
}))

describe('Active Link Component', () => {
  it('should be able to render link current path', () => {
    const { getByText } = render(<ActiveLink href="/home">Home</ActiveLink>)

    expect(getByText('Home').dataset.current).toBe('true')
  })

  it('should be able to render link random path', () => {
    const { getByText } = render(<ActiveLink href="/about">About</ActiveLink>)

    expect(getByText('About').dataset.current).toBe('false')
  })
})
