import { render, screen, } from '@testing-library/react'
import { Race } from '@/app/lib/definitions';
import Bio from '@/app/ui/races/bio'

test('Bio', () => {
  const race: Race = {
    raceId: 1,
    year: 2017,
    round: 5,
    name: 'Famous Race',
    date: '03/04/2017',
    url: 'race/url',
    circuit: 'Monaco'
  }
  render(<Bio race={race} />)

  expect(screen.getByText('Monaco')).toBeDefined()
  expect(screen.getByText('Mar 4, 2017')).toBeDefined()
  expect(screen.getByText('5')).toBeDefined()
})


