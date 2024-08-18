import { render, screen, } from '@testing-library/react'
import { F1Constructor } from '@/app/lib/definitions';
import Bio from '@/app/ui/constructors/bio'

test('Bio', () => {
  const f1Constructor: F1Constructor = {
    constructorId: 1,
    constructorRef: 'CIRC',
    name: 'Lambo',
    nationality: 'Italian',
    url: 'constructor/url'
  }
  render(<Bio f1Constructor={f1Constructor} />)

  expect(screen.getByText('Italian')).toBeDefined()
})


