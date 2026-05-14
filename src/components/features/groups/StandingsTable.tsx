import type { GroupStanding } from '@/types'
import { cn } from '@/lib/utils'

interface StandingsTableProps {
  standings: GroupStanding[]
  compact?: boolean
}

export function StandingsTable({ standings, compact = false }: StandingsTableProps) {
  return (
    <table className="w-full text-sm" style={{ tableLayout: 'fixed' }}>
      <colgroup>
        <col style={{ width: '44%' }} />
        <col style={{ width: '9%' }} />
        <col style={{ width: '9%' }} />
        <col style={{ width: '9%' }} />
        <col style={{ width: '9%' }} />
        {!compact && <col style={{ width: '9%' }} />}
        <col style={{ width: '11%' }} />
      </colgroup>
      <thead>
        <tr className="text-neutral-600 border-b border-neutral-800/80" style={{ fontSize: 10, letterSpacing: '0.1em' }}>
          <th className="text-left pb-2 px-2 font-medium uppercase">Team</th>
          <th className="text-center pb-2 px-2 font-medium uppercase">MP</th>
          <th className="text-center pb-2 px-2 font-medium uppercase">W</th>
          <th className="text-center pb-2 px-2 font-medium uppercase">D</th>
          <th className="text-center pb-2 px-2 font-medium uppercase">L</th>
          {!compact && <th className="text-center pb-2 px-2 font-medium uppercase">GD</th>}
          <th className="text-center pb-2 px-2 font-medium uppercase">Pts</th>
        </tr>
      </thead>
      <tbody>
        {standings.map((s, i) => {
          const isQualifier = i < 2
          return (
            <tr
              key={s.team.code}
              className={cn(
                'border-b border-neutral-800/30 last:border-0 transition-colors',
                isQualifier ? 'text-neutral-100' : 'text-neutral-500',
              )}
              style={isQualifier ? {
                background: 'rgba(201,168,76,0.06)',
                boxShadow: 'inset 2px 0 0 rgba(201,168,76,0.5)',
              } : undefined}
            >
              <td className="py-2.5 px-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span aria-hidden="true" className="text-base leading-none flex-shrink-0">{s.team.flag}</span>
                  <span className={cn(
                    'text-xs leading-tight',
                    isQualifier ? 'font-semibold text-neutral-50' : 'font-medium',
                  )} style={{ fontFamily: "'Inter', sans-serif" }}>
                    {s.team.name}
                  </span>
                </div>
              </td>
              <td className="text-center py-2.5 px-2 tabular-nums" style={{ fontSize: 12 }}>{s.mp}</td>
              <td className="text-center py-2.5 px-2 tabular-nums" style={{ fontSize: 12 }}>{s.w}</td>
              <td className="text-center py-2.5 px-2 tabular-nums" style={{ fontSize: 12 }}>{s.d}</td>
              <td className="text-center py-2.5 px-2 tabular-nums" style={{ fontSize: 12 }}>{s.l}</td>
              {!compact && (
                <td className="text-center py-2.5 px-2 tabular-nums" style={{ fontSize: 12 }}>
                  {s.gd >= 0 ? `+${s.gd}` : s.gd}
                </td>
              )}
              <td
                className={cn('text-center py-2.5 px-2 tabular-nums font-bold', isQualifier && 'text-gold-400')}
                style={{ fontSize: 13 }}
              >
                {s.pts}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
