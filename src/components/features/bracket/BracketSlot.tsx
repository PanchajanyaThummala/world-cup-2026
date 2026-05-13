import type { KnockoutSlot, Team } from '@/types'
import { cn } from '@/lib/utils'

interface BracketSlotProps {
  slot: KnockoutSlot
  teams: Team[]
}

export function BracketSlot({ slot, teams }: BracketSlotProps) {
  const resolveTeam = (code: string) => {
    if (code === 'TBD') return null
    return teams.find(t => t.code === code) ?? null
  }

  const teamA = resolveTeam(slot.teamA)
  const teamB = resolveTeam(slot.teamB)

  const renderTeam = (team: Team | null, score: number | undefined, isWinner: boolean) => (
    <div className={cn(
      'flex items-center gap-2 px-3 py-1.5 text-xs',
      isWinner ? 'text-gold-400 font-bold' : 'text-neutral-400',
    )}>
      {team ? (
        <>
          <span role="img" aria-label={team.name} className="text-sm leading-none">{team.flag}</span>
          <span className="flex-1 truncate">{team.name}</span>
          {score !== undefined && <span className="ml-auto font-bold">{score}</span>}
        </>
      ) : (
        <span className="text-neutral-700 italic">TBD</span>
      )}
    </div>
  )

  const aWins = slot.winner === slot.teamA
  const bWins = slot.winner === slot.teamB

  return (
    <div className="w-44 rounded-lg overflow-hidden border border-neutral-800 bg-neutral-900 text-xs">
      {renderTeam(teamA, slot.scoreA, aWins)}
      <div className="h-px bg-neutral-800" />
      {renderTeam(teamB, slot.scoreB, bWins)}
    </div>
  )
}
