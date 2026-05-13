import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FactCard } from '@/components/features/facts/FactCard'
import { DEEP_FACTS } from '@/data/facts'

describe('FactCard', () => {
  it('renders hook, supporting text, and category badge', () => {
    const fact = DEEP_FACTS[0]
    render(<FactCard fact={fact} index={0} />)
    expect(screen.getByText(fact.hook)).toBeInTheDocument()
    expect(screen.getByText(fact.supporting)).toBeInTheDocument()
    expect(screen.getByText(fact.category)).toBeInTheDocument()
  })
})
