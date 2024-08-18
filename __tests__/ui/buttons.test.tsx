import { render, screen, fireEvent, } from '@testing-library/react'
import { BackButton } from '@/app/ui/buttons'

const mockPush = vi.fn()
const mockBack = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    back: mockBack
  })
}))

describe('BackButton', () => {
  it('calls router.push with href when href is provided', () => {
    const href = 'test-path'
    render(<BackButton href={href} />)
    fireEvent.click(screen.getByText('Back'))
    expect(mockPush).toHaveBeenCalledWith(href)
    expect(mockPush).toHaveBeenCalledTimes(1)
  })

  it('calls router.back when href is not provided', () => {
    render(<BackButton />)
    fireEvent.click(screen.getByText('Back'))
    expect(mockBack).toHaveBeenCalledTimes(1)
  })
})

