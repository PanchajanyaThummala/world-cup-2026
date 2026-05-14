import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CountdownBanner } from '@/components/layout/CountdownBanner'

describe('CountdownBanner', () => {
  beforeEach(() => { vi.useFakeTimers() })
  afterEach(() => { vi.useRealTimers() })

  it('renders the kickoff label', () => {
    // Set time to well before kickoff
    vi.setSystemTime(new Date('2026-05-14T12:00:00Z'))
    render(<CountdownBanner />)
    expect(screen.getByText(/kickoff in/i)).toBeInTheDocument()
  })

  it('renders 4 numeric countdown segments before kickoff', () => {
    vi.setSystemTime(new Date('2026-05-14T12:00:00Z'))
    render(<CountdownBanner />)
    expect(screen.getByText(/days/i)).toBeInTheDocument()
    expect(screen.getByText(/hours/i)).toBeInTheDocument()
    expect(screen.getByText(/minutes/i)).toBeInTheDocument()
    expect(screen.getByText(/seconds/i)).toBeInTheDocument()
  })

  it('switches to Tournament Live mode after kickoff', () => {
    vi.setSystemTime(new Date('2026-06-15T20:00:00Z')) // 4 days after opening
    render(<CountdownBanner />)
    expect(screen.getByText(/tournament live/i)).toBeInTheDocument()
  })
})
