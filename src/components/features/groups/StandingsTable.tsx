import type { GroupStanding } from '@/types'
import { Flag } from '@/components/ui/Flag'
import { cn } from '@/lib/utils'

interface StandingsTableProps {
  standings: GroupStanding[]
  compact?: boolean
}

export function StandingsTable({ standings, compact = false }: StandingsTableProps) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-neutral-600 text-xs uppercase tracking-wider border-b border-neutral-800">
          <th className="text-left pb-2 font-medium">Team</th>
          <th className="text-center pb-2 font-medium w-8">MP</th>
          <th className="text-center pb-2 font-medium w-8">W</th>
          <th className="text-center pb-2 font-medium w-8">D</th>
          <th className="text-center pb-2 font-medium w-8">L</th>
          {!compact && <th className="text-center pb-2 font-medium w-8">GD</th>}
          <th className="text-center pb-2 font-medium w-10">Pts</th>
        </tr>
      </thead>
      <tbody>
        {standings.map((s, i) => (
          <tr
            key={s.team.code}
            className={cn(
              'border-b border-neutral-800/50 last:border-0',
              i < 2 ? 'text-neutral-200' : 'text-neutral-500',
            )}
          >
            <td className="py-2 flex items-center gap-2">
              <Flag emoji={s.team.flag} label={s.team.name} size="sm" />
              <span className={cn('text-xs font-medium truncate', i < 2 && 'text-neutral-100')}>
                {s.team.name}
              </span>
            </td>
            <td className="text-center py-2">{s.mp}</td>
            <td className="text-center py-2">{s.w}</td>
            <td className="text-center py-2">{s.d}</td>
            <td className="text-center py-2">{s.l}</td>
            {!compact && <td className="text-center py-2">{s.gd >= 0 ? `+${s.gd}` : s.gd}</td>}
            <td className={cn('text-center py-2 font-bold', i < 2 && 'text-gold-400')}>{s.pts}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
