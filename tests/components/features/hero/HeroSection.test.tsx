import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HeroSection } from '@/components/features/hero/HeroSection'

describe('HeroSection', () => {
  it('renders the tournament title parts', () => {
    render(<HeroSection />)
    expect(screen.getByText('FIFA')).toBeInTheDocument()
    expect(screen.getByText('WORLD CUP')).toBeInTheDocument()
    expect(screen.getByText('2026')).toBeInTheDocument()
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
