import { render, screen, } from '@testing-library/react'
import PageHeader from '@/app/ui/page-header'

vi.mock('@/app/ui/buttons', () => ({
  __esModule: true,
  BackButton: () => <button>Button Text</button>
}))

describe('PageHeader', () => {
  const expectedTitle = "Drivers"

  describe("with back button", () => {
    beforeEach(() => {
      render(<PageHeader title={expectedTitle} showBackButton={true} />)
    })
    it("renders page and button", () => {
      expect(screen.getByRole('heading', { level: 1, name: expectedTitle })).toBeDefined()
      expect(screen.getByRole('button')).toBeDefined()
    })
  })

  describe('without back button', () => {
    beforeEach(() => {
      render(<PageHeader title={expectedTitle} showBackButton={false} />)
    })
    it("renders page without button", () => {
      expect(screen.getByRole('heading', { level: 1, name: expectedTitle })).toBeDefined()
      expect(screen.queryByText('Button Text')).toBeNull()
    })
  })
})