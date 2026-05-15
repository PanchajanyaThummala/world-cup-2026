import type { KnockoutSlot, Team } from '@/types'
import { BracketSlot } from './BracketSlot'

interface KnockoutBracketProps {
  slots: KnockoutSlot[]
  teams: Team[]
}

const ROUNDS: { key: KnockoutSlot['round']; label: string }[] = [
  { key: 'R32', label: 'Round of 32' },
  { key: 'R16', label: 'Round of 16' },
  { key: 'QF', label: 'Quarter-finals' },
  { key: 'SF', label: 'Semi-finals' },
  { key: 'Final', label: 'Final' },
]

export function KnockoutBracket({ slots, teams }: KnockoutBracketProps) {
  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-8 min-w-max">
        {ROUNDS.map(({ key, label }) => {
          const roundSlots = slots.filter(s => s.round === key)
          return (
            <div key={key} className="flex flex-col gap-4">
              <h4 className="font-semibold text-xs uppercase tracking-widest text-center" style={{ color: 'var(--color-primary)' }}>
                {label}
              </h4>
              <div className="flex flex-col gap-3 justify-around flex-1">
                {roundSlots.map(slot => (
                  <BracketSlot key={slot.id} slot={slot} teams={teams} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
