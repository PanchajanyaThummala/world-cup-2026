import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Timeline } from './Timeline'
import { HISTORIC_MOMENTS } from '@/data/moments'

export function NostalgiaSection() {
  return (
    <SectionWrapper id="nostalgia" style={{ background: 'var(--color-bg-base)' }}>
      <SectionHeading
        eyebrow="Since 1930"
        title="Moments That Defined the Game"
        subtitle="96 years. 22 tournaments. The moments that changed football — and the world — forever."
      />
      <Timeline moments={HISTORIC_MOMENTS} />
    </SectionWrapper>
  )
}
