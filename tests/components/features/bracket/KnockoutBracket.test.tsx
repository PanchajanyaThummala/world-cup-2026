import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { KnockoutBracket } from '@/components/features/bracket/KnockoutBracket'
import { KNOCKOUT_BRACKET } from '@/data/bracket'
import { TEAMS } from '@/data/teams'

describe('KnockoutBracket', () => {
  it('renders all round headings', () => {
    render(<KnockoutBracket slots={KNOCKOUT_BRACKET} teams={TEAMS} />)
    expect(screen.getByText('Round of 32')).toBeInTheDocument()
    expect(screen.getByText('Round of 16')).toBeInTheDocument()
    expect(screen.getByText('Quarter-finals')).toBeInTheDocument()
    expect(screen.getByText('Semi-finals')).toBeInTheDocument()
    expect(screen.getByText('Final')).toBeInTheDocument()
  })
})
