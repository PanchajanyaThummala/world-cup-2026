import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BracketSlot } from '@/components/features/bracket/BracketSlot'
import { TEAMS } from '@/data/teams'
import type { KnockoutSlot } from '@/types'

const tbdSlot: KnockoutSlot = {
  id: 'r32-m01', round: 'R32', matchNumber: 1, teamA: 'TBD', teamB: 'TBD',
}

const playedSlot: KnockoutSlot = {
  id: 'r32-m02', round: 'R32', matchNumber: 2, teamA: 'BRA', teamB: 'ARG',
}

describe('BracketSlot', () => {
  it('renders TBD for empty slots', () => {
    render(<BracketSlot slot={tbdSlot} teams={TEAMS} />)
    expect(screen.getAllByText('TBD').length).toBe(2)
  })

  it('resolves team codes to team names', () => {
    render(<BracketSlot slot={playedSlot} teams={TEAMS} />)
    expect(screen.getByText('Brazil')).toBeInTheDocument()
    expect(screen.getByText('Argentina')).toBeInTheDocument()
  })
})
