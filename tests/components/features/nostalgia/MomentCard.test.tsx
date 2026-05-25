import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MomentCard } from '@/components/features/nostalgia/MomentCard'
import { HISTORIC_MOMENTS } from '@/data/moments'

describe('MomentCard', () => {
  it('renders year, title, narrative, and era badge', () => {
    const moment = HISTORIC_MOMENTS[0]
    render(<MomentCard moment={moment} side="left" index={0} />)
    // Year appears in both the marker and gradient fallback — check at least one
    expect(screen.getAllByText(moment.year.toString()).length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText(moment.title)).toBeInTheDocument()
    expect(screen.getByText(moment.narrative)).toBeInTheDocument()
    expect(screen.getByText(moment.era)).toBeInTheDocument()
  })

  it('renders photo img when moment.photo is set', () => {
    const moment = { ...HISTORIC_MOMENTS[0], photo: 'images/moments/2022-argentina-france.avif' }
    render(<MomentCard moment={moment} side="left" index={0} />)
    const img = screen.getByAltText(moment.title)
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', expect.stringContaining('2022-argentina-france.avif'))
  })
})
