import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ScriptDisplay from './ScriptDisplay'

// clipboard APIのモック
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(() => Promise.resolve()),
  },
})

// URL.createObjectURLのモック
global.URL.createObjectURL = vi.fn(() => 'mock-url')
global.URL.revokeObjectURL = vi.fn()

describe('ScriptDisplay', () => {
  const mockScript = 'これはテスト台本です。\n\n【オープニング】\nテスト内容'
  const mockTitle = 'テスト動画タイトル'

  it('renders the script title', () => {
    render(<ScriptDisplay script={mockScript} title={mockTitle} />)

    const title = screen.getByText(/生成された台本/i)
    expect(title).toBeInTheDocument()
  })

  it('displays the script content', () => {
    render(<ScriptDisplay script={mockScript} title={mockTitle} />)

    const scriptContent = screen.getByText(/これはテスト台本です/i)
    expect(scriptContent).toBeInTheDocument()
  })

  it('copies script to clipboard when copy button is clicked', async () => {
    render(<ScriptDisplay script={mockScript} title={mockTitle} />)

    const copyButton = screen.getByRole('button', { name: /コピー/i })
    fireEvent.click(copyButton)

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockScript)
    })
  })

  it('shows "コピー済み" after copying', async () => {
    render(<ScriptDisplay script={mockScript} title={mockTitle} />)

    const copyButton = screen.getByRole('button', { name: /コピー/i })
    fireEvent.click(copyButton)

    await waitFor(() => {
      expect(screen.getByText(/コピー済み/i)).toBeInTheDocument()
    })
  })

  it('renders copy and download buttons', () => {
    render(<ScriptDisplay script={mockScript} title={mockTitle} />)

    const copyButton = screen.getByRole('button', { name: /コピー/i })
    const downloadButton = screen.getByRole('button', { name: /ダウンロード/i })

    expect(copyButton).toBeInTheDocument()
    expect(downloadButton).toBeInTheDocument()
  })
})
