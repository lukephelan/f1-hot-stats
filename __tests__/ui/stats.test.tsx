import { render, screen, } from '@testing-library/react'
import { StatCard } from '@/app/ui/stats'

describe('StatCard', () => {
  const expectedLabel = 'Points'
  const expectedValue = '17.50'

  describe('value as string', () => {
    beforeEach(() => {
      render(<StatCard label={expectedLabel} value={'17.50'} />)
    })

    it('renders', () => {
      expect(screen.getByText(expectedLabel)).toBeDefined()
      expect(screen.getByText(expectedValue)).toBeDefined()
    })
  })

  describe('value as number to decimal places', () => {
    beforeEach(() => {
      render(<StatCard label={expectedLabel} value={17.4991} />)
    })

    it('renders', () => {
      expect(screen.getByText(expectedLabel)).toBeDefined()
      expect(screen.getByText(expectedValue)).toBeDefined()
    })
  })

  describe('value as number without decimal places', () => {
    beforeEach(() => {
      render(<StatCard label={expectedLabel} value={17} />)
    })

    it('renders', () => {
      expect(screen.getByText(expectedLabel)).toBeDefined()
      expect(screen.getByText('17')).toBeDefined()
    })
  })
})