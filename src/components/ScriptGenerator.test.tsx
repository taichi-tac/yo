import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ScriptGenerator from './ScriptGenerator'
import * as api from '../services/api'

// APIのモック
vi.mock('../services/api')

describe('ScriptGenerator', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders title input form', () => {
    render(<ScriptGenerator />)

    const label = screen.getByLabelText(/動画タイトル/i)
    expect(label).toBeInTheDocument()
  })

  it('button is disabled when title is empty', () => {
    render(<ScriptGenerator />)

    const button = screen.getByRole('button', { name: /台本を生成する/i })
    expect(button).toBeDisabled()
  })

  it('generates script successfully', async () => {
    const mockScript = '【オープニング】\nテスト台本'
    vi.mocked(api.generateScript).mockResolvedValue(mockScript)

    const user = userEvent.setup()
    render(<ScriptGenerator />)

    const input = screen.getByPlaceholderText(/例: 初心者でもわかるプログラミング入門/i)
    await user.type(input, 'テストタイトル')

    const button = screen.getByRole('button', { name: /台本を生成する/i })
    fireEvent.click(button)

    // ローディング表示を確認
    await waitFor(() => {
      expect(screen.getByText(/AIが台本を生成しています.../i)).toBeInTheDocument()
    })

    // 台本が表示されることを確認
    await waitFor(() => {
      expect(screen.getByText(/生成された台本/i)).toBeInTheDocument()
      expect(screen.getByText(/【オープニング】/i)).toBeInTheDocument()
    })
  })

  it('shows error message when API fails', async () => {
    vi.mocked(api.generateScript).mockRejectedValue(new Error('API Error'))

    const user = userEvent.setup()
    render(<ScriptGenerator />)

    const input = screen.getByPlaceholderText(/例: 初心者でもわかるプログラミング入門/i)
    await user.type(input, 'テストタイトル')

    const button = screen.getByRole('button', { name: /台本を生成する/i })
    fireEvent.click(button)

    await waitFor(() => {
      const error = screen.getByText(/API Error/i)
      expect(error).toBeInTheDocument()
    })
  })

  it('disables button during generation', async () => {
    vi.mocked(api.generateScript).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve('台本'), 100))
    )

    const user = userEvent.setup()
    render(<ScriptGenerator />)

    const input = screen.getByPlaceholderText(/例: 初心者でもわかるプログラミング入門/i)
    await user.type(input, 'テストタイトル')

    const button = screen.getByRole('button')
    fireEvent.click(button)

    // ボタンが無効化されることを確認
    await waitFor(() => {
      expect(button).toBeDisabled()
    })
  })
})
