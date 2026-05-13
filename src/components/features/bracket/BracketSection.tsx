import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { KnockoutBracket } from './KnockoutBracket'
import { GroupCard } from '@/components/features/groups/GroupCard'
import { KNOCKOUT_BRACKET } from '@/data/bracket'
import { GROUPS } from '@/data/groups'
import { TEAMS } from '@/data/teams'

export function BracketSection() {
  return (
    <SectionWrapper id="bracket" className="bg-neutral-950">
      <SectionHeading
        eyebrow="Road to the Final"
        title="Bracket & Standings"
        subtitle="Follow every team's path from the group stage to the MetLife Stadium final."
      />

      <div className="mb-16">
        <h3 className="text-neutral-300 font-bold text-lg mb-6">Group Stage</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {GROUPS.map(group => <GroupCard key={group.label} group={group} />)}
        </div>
      </div>

      <div>
        <h3 className="text-neutral-300 font-bold text-lg mb-6">Knockout Stage</h3>
        <KnockoutBracket slots={KNOCKOUT_BRACKET} teams={TEAMS} />
      </div>
    </SectionWrapper>
  )
}
