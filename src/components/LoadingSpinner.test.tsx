import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LoadingSpinner from './LoadingSpinner'

describe('LoadingSpinner', () => {
  it('renders loading message', () => {
    render(<LoadingSpinner />)

    const message = screen.getByText(/AIが台本を生成しています.../i)
    expect(message).toBeInTheDocument()
  })

  it('renders wait time message', () => {
    render(<LoadingSpinner />)

    const waitMessage = screen.getByText(/30秒ほどお待ちください/i)
    expect(waitMessage).toBeInTheDocument()
  })

  it('renders spinner animation', () => {
    const { container } = render(<LoadingSpinner />)

    const spinner = container.querySelector('.animate-spin')
    expect(spinner).toBeInTheDocument()
  })
})
