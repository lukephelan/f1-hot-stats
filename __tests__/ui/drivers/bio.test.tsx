import { render, screen, } from '@testing-library/react'
import { Driver } from '@/app/lib/definitions';
import Bio from '@/app/ui/drivers/bio'

describe('Bio', () => {
  describe('with all fields', () => {
    beforeEach(() => {
      const driver: Driver = {
        driverId: 1,
        driverRef: 'PAT',
        number: 5,
        code: "PAT",
        name: "Patricio O'Ward",
        dob: "06/05/1999",
        nationality: "Mexican",
        url: 'circuit/url'
      }
      render(<Bio driver={driver} />)
    })

    it('displays all possible fields', () => {
      expect(screen.getByText('5')).toBeDefined()
      expect(screen.getByText('PAT')).toBeDefined()
      expect(screen.getByText('Mexican')).toBeDefined()
    })
  })

  describe('with minimal fields', () => {
    beforeEach(() => {
      const driver: Driver = {
        driverId: 1,
        driverRef: 'PAT',
        name: "Patricio O'Ward",
        dob: "06/05/1999",
        nationality: "Mexican",
        url: 'circuit/url'
      }
      render(<Bio driver={driver} />)
    })

    it('displays minimal', () => {
      expect(screen.queryByText('5')).toBeNull()
      expect(screen.queryByText('PAT')).toBeNull()
      expect(screen.getByText('Mexican')).toBeDefined()
    })
  })
})


