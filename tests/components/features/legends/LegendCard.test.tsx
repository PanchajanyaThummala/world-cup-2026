import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LegendCard } from '@/components/features/legends/LegendCard'
import { LEGENDS } from '@/data/legends'

describe('LegendCard', () => {
  it('renders player name, nation, and era', () => {
    render(<LegendCard legend={LEGENDS[0]} index={0} />)
    expect(screen.getByText(LEGENDS[0].name)).toBeInTheDocument()
    expect(screen.getByText(LEGENDS[0].nation)).toBeInTheDocument()
    expect(screen.getByText(LEGENDS[0].era)).toBeInTheDocument()
  })

  it('renders img when photo is provided', () => {
    const legendWithPhoto = LEGENDS.find(l => l.photo)!
    render(<LegendCard legend={legendWithPhoto} index={0} />)
    const img = screen.getByRole('img', { name: legendWithPhoto.name })
    expect(img).toBeInTheDocument()
  })

  it('renders gradient fallback when no photo', () => {
    const legendNoPhoto = LEGENDS.find(l => !l.photo)!
    render(<LegendCard legend={legendNoPhoto} index={0} />)
    expect(screen.queryByRole('img', { name: legendNoPhoto.name })).not.toBeInTheDocument()
    expect(screen.getByText(legendNoPhoto.name)).toBeInTheDocument()
  })
})
