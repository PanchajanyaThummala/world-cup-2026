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
          border: '1.5px dashed rgba(255,215,0,0.15)',
          background: 'rgba(5,4,0,0.5)',
          opacity: 0.55,
          minHeight: 72,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--color-text-secondary)' }} />
          <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" style={{ color: 'var(--color-text-secondary)' }} />
        </svg>
        <span className="italic" style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>Awaiting</span>
      </div>
    )
  }

  const renderTeam = (team: Team | null, score: number | undefined, isWinner: boolean) => (
    <div
      className={cn('flex items-center gap-2 px-3 py-2 text-xs', isWinner ? 'font-bold' : '')}
      style={{ color: isWinner ? 'var(--color-primary)' : 'var(--color-text-primary)' }}
    >
      {team ? (
        <>
          <span aria-hidden="true" className="text-sm leading-none">{team.flag}</span>
          <span className="flex-1 truncate">{team.name}</span>
          {score !== undefined && <span className="ml-auto font-bold tabular-nums">{score}</span>}
        </>
      ) : (
        <span className="italic" style={{ color: 'var(--color-text-secondary)' }}>TBD</span>
      )}
    </div>
  )

  const aWins = slot.winner === slot.teamA
  const bWins = slot.winner === slot.teamB

  return (
    <div
      className="w-44 rounded-lg overflow-hidden text-xs"
      style={{
        background: 'var(--color-bg-surface)',
        border: '1px solid var(--color-border)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {renderTeam(teamA, slot.scoreA, aWins)}
      <div className="h-px" style={{ background: 'var(--color-border)' }} />
      {renderTeam(teamB, slot.scoreB, bWins)}
    </div>
  )
}
