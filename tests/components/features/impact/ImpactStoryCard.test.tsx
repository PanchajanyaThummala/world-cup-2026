import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ImpactStoryCard } from '@/components/features/impact/ImpactStoryCard'
import { IMPACT_STORIES } from '@/data/impact-stories'

describe('ImpactStoryCard', () => {
  it('renders tournament year, title, narrative, era badge, and category', () => {
    const story = IMPACT_STORIES[0]
    render(<ImpactStoryCard story={story} index={0} />)
    expect(screen.getByText(story.title)).toBeInTheDocument()
    expect(screen.getByText(story.narrative)).toBeInTheDocument()
    expect(screen.getByText(story.eraBadge)).toBeInTheDocument()
    expect(screen.getByText(story.tournament)).toBeInTheDocument()
  })
})
