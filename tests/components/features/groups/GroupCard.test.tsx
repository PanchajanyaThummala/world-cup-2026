import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { GroupCard } from '@/components/features/groups/GroupCard'
import { GROUPS } from '@/data/groups'

describe('GroupCard', () => {
  it('renders the group label', () => {
    render(<GroupCard group={GROUPS[0]} />)
    // Label now renders as 'A' in display type + 'Group' eyebrow separately
    expect(screen.getByText('A')).toBeInTheDocument()
    expect(screen.getByText(/group/i)).toBeInTheDocument()
  })

  it('renders all 4 team codes (compact mode shows code not full name)', () => {
    const group = GROUPS[0]
    render(<GroupCard group={group} />)
    // GroupCard uses compact StandingsTable which shows 3-letter code
    group.standings.forEach(s => {
      // code shown in compact; full name available via title attr
      expect(screen.getByTitle(s.team.name)).toBeInTheDocument()
    })
  })

  it('renders team flag emojis as decorative spans', () => {
    const { container } = render(<GroupCard group={GROUPS[0]} />)
    // Flags are now aria-hidden decorative; check 4 are present alongside team names
    const flagSpans = container.querySelectorAll('span[aria-hidden="true"]')
    expect(flagSpans.length).toBeGreaterThanOrEqual(4)
  })
})
