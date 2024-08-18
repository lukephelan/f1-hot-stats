import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from '@/app/acknowledgements/page'

test('Page', () => {
  render(<Page />)
  expect(screen.getByRole('heading', { level: 1, name: 'Acknowledgements' })).toBeDefined()
  expect(screen.getByText('Ergast.').getAttribute('href')).toBe('http://ergast.com/mrd/')
  expect(screen.getByText('Flaticon').getAttribute('href')).toBe('https://www.flaticon.com')
})