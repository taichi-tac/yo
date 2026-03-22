import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TitleInput from './TitleInput'

describe('TitleInput', () => {
  const mockOnChange = vi.fn()
  const mockOnGenerate = vi.fn()

  it('renders input field with label', () => {
    render(
      <TitleInput
        value=""
        onChange={mockOnChange}
        onGenerate={mockOnGenerate}
        disabled={false}
      />
    )

    const label = screen.getByLabelText(/動画タイトル/i)
    expect(label).toBeInTheDocument()
  })

  it('calls onChange when user types', async () => {
    const user = userEvent.setup()
    render(
      <TitleInput
        value=""
        onChange={mockOnChange}
        onGenerate={mockOnGenerate}
        disabled={false}
      />
    )

    const input = screen.getByPlaceholderText(/例: 初心者でもわかるプログラミング入門/i)
    await user.type(input, 'test')

    expect(mockOnChange).toHaveBeenCalled()
  })

  it('displays character count', () => {
    render(
      <TitleInput
        value="テスト"
        onChange={mockOnChange}
        onGenerate={mockOnGenerate}
        disabled={false}
      />
    )

    const charCount = screen.getByText(/3 \/ 200文字/i)
    expect(charCount).toBeInTheDocument()
  })

  it('calls onGenerate when form is submitted', () => {
    render(
      <TitleInput
        value="test title"
        onChange={mockOnChange}
        onGenerate={mockOnGenerate}
        disabled={false}
      />
    )

    const button = screen.getByRole('button', { name: /台本を生成する/i })
    fireEvent.click(button)

    expect(mockOnGenerate).toHaveBeenCalled()
  })

  it('disables button when input is empty', () => {
    render(
      <TitleInput
        value=""
        onChange={mockOnChange}
        onGenerate={mockOnGenerate}
        disabled={false}
      />
    )

    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('shows loading state when disabled', () => {
    render(
      <TitleInput
        value="test"
        onChange={mockOnChange}
        onGenerate={mockOnGenerate}
        disabled={true}
      />
    )

    const button = screen.getByRole('button', { name: /生成中.../i })
    expect(button).toBeDisabled()
  })
})
