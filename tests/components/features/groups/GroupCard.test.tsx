import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { GroupCard } from '@/components/features/groups/GroupCard'
import { GROUPS } from '@/data/groups'

describe('GroupCard', () => {
  it('renders the group label', () => {
    render(<GroupCard group={GROUPS[0]} />)
    expect(screen.getByText('Group A')).toBeInTheDocument()
  })

  it('renders all 4 team names', () => {
    const group = GROUPS[0]
    render(<GroupCard group={group} />)
    group.standings.forEach(s => {
      expect(screen.getByText(s.team.name)).toBeInTheDocument()
    })
  })

  it('renders team flag emojis', () => {
    render(<GroupCard group={GROUPS[0]} />)
    const flags = screen.getAllByRole('img')
    expect(flags.length).toBeGreaterThanOrEqual(4)
  })
})
