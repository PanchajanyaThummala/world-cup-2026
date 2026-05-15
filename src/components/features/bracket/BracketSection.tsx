import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { KnockoutBracket } from './KnockoutBracket'
import { KNOCKOUT_BRACKET } from '@/data/bracket'
import { TEAMS } from '@/data/teams'

export function BracketSection() {
  return (
    <SectionWrapper id="bracket" style={{ background: 'var(--color-bg-surface)' }} glowPosition="top-right">
      <SectionHeading
        eyebrow="Road to the Final"
        sectionNum="07"
        title="Knockout Bracket"
        subtitle="From the Round of 32 to the MetLife Stadium Final — every knockout match."
      />
      <KnockoutBracket slots={KNOCKOUT_BRACKET} teams={TEAMS} />
    </SectionWrapper>
  )
}
