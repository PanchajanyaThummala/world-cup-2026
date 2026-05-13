import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StandingsTable } from '@/components/features/groups/StandingsTable'
import { GROUPS } from '@/data/groups'

describe('StandingsTable', () => {
  it('renders column headers', () => {
    render(<StandingsTable standings={GROUPS[0].standings} />)
    expect(screen.getByText('MP')).toBeInTheDocument()
    expect(screen.getByText('W')).toBeInTheDocument()
    expect(screen.getByText('D')).toBeInTheDocument()
    expect(screen.getByText('L')).toBeInTheDocument()
    expect(screen.getByText('Pts')).toBeInTheDocument()
  })

  it('renders 4 team rows', () => {
    render(<StandingsTable standings={GROUPS[0].standings} />)
    GROUPS[0].standings.forEach(s => {
      expect(screen.getByText(s.team.name)).toBeInTheDocument()
    })
  })
})
