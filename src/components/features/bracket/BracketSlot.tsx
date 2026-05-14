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
  const isEmpty = slot.teamA === 'TBD' && slot.teamB === 'TBD'

  // T022: Empty state visual hierarchy
  if (isEmpty) {
    return (
      <div
        className="w-44 rounded-lg flex items-center justify-center gap-2 text-xs px-3 py-4"
        style={{
          border: '1.5px dashed rgba(31,41,55,0.9)',
          background: 'rgba(8,10,15,0.4)',
          opacity: 0.55,
          minHeight: 72,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" className="text-neutral-600" />
          <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-neutral-600" />
        </svg>
        <span className="text-neutral-500 italic" style={{ fontSize: 11 }}>Awaiting</span>
      </div>
    )
  }

  const renderTeam = (team: Team | null, score: number | undefined, isWinner: boolean) => (
    <div className={cn(
      'flex items-center gap-2 px-3 py-2 text-xs',
      isWinner ? 'text-gold-400 font-bold' : 'text-neutral-300',
    )}>
      {team ? (
        <>
          <span aria-hidden="true" className="text-sm leading-none">{team.flag}</span>
          <span className="flex-1 truncate">{team.name}</span>
          {score !== undefined && <span className="ml-auto font-bold tabular-nums">{score}</span>}
        </>
      ) : (
        <span className="text-neutral-600 italic">TBD</span>
      )}
    </div>
  )

  const aWins = slot.winner === slot.teamA
  const bWins = slot.winner === slot.teamB

  return (
    <div
      className="w-44 rounded-lg overflow-hidden text-xs"
      style={{
        background: 'rgba(13,17,23,0.7)',
        border: '1px solid rgba(31,41,55,0.9)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {renderTeam(teamA, slot.scoreA, aWins)}
      <div className="h-px bg-neutral-800/60" />
      {renderTeam(teamB, slot.scoreB, bWins)}
    </div>
  )
}
