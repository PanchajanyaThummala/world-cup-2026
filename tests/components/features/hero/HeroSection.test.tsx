import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HeroSection } from '@/components/features/hero/HeroSection'

describe('HeroSection', () => {
  it('renders the tournament title in h1', () => {
    render(<HeroSection />)
    const h1 = document.querySelector('h1')
    expect(h1).toBeTruthy()
    expect(h1?.textContent).toMatch(/FIFA/i)
    expect(h1?.textContent).toMatch(/World Cup/i)
    expect(h1?.textContent).toMatch(/2026/)
  })

  it('shows tournament dates in subtitle', () => {
    render(<HeroSection />)
    expect(screen.getByText(/June 11/i)).toBeInTheDocument()
  })

  it('shows all three host countries', () => {
    render(<HeroSection />)
    expect(screen.getByText(/USA/)).toBeInTheDocument()
    expect(screen.getByText(/Canada/)).toBeInTheDocument()
    expect(screen.getByText(/Mexico/)).toBeInTheDocument()
  })
})
