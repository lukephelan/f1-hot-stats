import { render, screen, } from '@testing-library/react'
import { Circuit } from '@/app/lib/definitions';
import Bio from '@/app/ui/circuits/bio'

test('Bio', () => {
  const circuit: Circuit = {
    circuitId: 1,
    circuitRef: 'CIRC',
    name: 'Famous Circuit',
    location: 'Melbourne',
    country: 'Australia',
    url: 'circuit/url'
  }
  render(<Bio circuit={circuit} />)

  expect(screen.getByText('Melbourne')).toBeDefined()
  expect(screen.getByText('Australia')).toBeDefined()
})


