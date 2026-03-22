import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the main heading', () => {
    render(<App />)
    const heading = screen.getByText(/YouTube台本ジェネレーター/i)
    expect(heading).toBeInTheDocument()
  })

  it('renders the subtitle', () => {
    render(<App />)
    const subtitle = screen.getByText(/タイトルを入力するだけで、AIが魅力的な台本を自動生成/i)
    expect(subtitle).toBeInTheDocument()
  })

  it('renders the footer', () => {
    render(<App />)
    const footer = screen.getByText(/Powered by Anthropic Claude API/i)
    expect(footer).toBeInTheDocument()
  })
})
