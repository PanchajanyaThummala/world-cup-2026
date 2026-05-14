import type { GroupStanding } from '@/types'
import { cn } from '@/lib/utils'

interface StandingsTableProps {
  standings: GroupStanding[]
  compact?: boolean
}

export function StandingsTable({ standings, compact = false }: StandingsTableProps) {
  const tournamentStarted = standings.some(s => s.mp > 0)

  return (
    <table className="w-full" style={{ tableLayout: 'fixed', borderCollapse: 'collapse' }}>
      <colgroup>
        <col style={{ width: '38%' }} />
        <col /><col /><col /><col />
        {!compact && <col />}
        <col />
      </colgroup>
      <thead>
        <tr className="text-neutral-600 border-b border-neutral-800/80" style={{ fontSize: 10 }}>
          <th className="text-left pb-2 font-semibold uppercase tracking-wider">Team</th>
          <th className="text-center pb-2 font-semibold uppercase">MP</th>
          <th className="text-center pb-2 font-semibold uppercase">W</th>
          <th className="text-center pb-2 font-semibold uppercase">D</th>
          <th className="text-center pb-2 font-semibold uppercase">L</th>
          {!compact && <th className="text-center pb-2 font-semibold uppercase">GD</th>}
          <th className="text-center pb-2 font-semibold uppercase">Pts</th>
        </tr>
      </thead>
      <tbody>
        {standings.map((s, i) => {
          const isQualifier = tournamentStarted && i < 2
          return (
            <tr
              key={s.team.code}
              className={cn(
                'border-b border-neutral-800/40 last:border-0',
                isQualifier ? 'text-neutral-100' : 'text-neutral-300',
              )}
              style={isQualifier ? {
                background: 'rgba(201,168,76,0.06)',
                boxShadow: 'inset 2px 0 0 rgba(201,168,76,0.5)',
              } : undefined}
            >
              <td className="py-2.5 pr-1">
                {/* Flag + label always on ONE line */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, overflow: 'hidden' }}>
                  <span aria-hidden="true" style={{ fontSize: 13, lineHeight: 1, flexShrink: 0 }}>
                    {s.team.flag}
                  </span>
                  {compact ? (
                    /* Compact: 3-letter FIFA code — always fits on one line */
                    <span
                      title={s.team.name}
                      className={cn(isQualifier ? 'font-bold text-neutral-50' : 'font-semibold')}
                      style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '0.05em', whiteSpace: 'nowrap' }}
                    >
                      {s.team.code}
                    </span>
                  ) : (
                    /* Full: name truncated with ellipsis */
                    <span
                      title={s.team.name}
                      className={cn(isQualifier ? 'font-semibold text-neutral-50' : 'font-medium')}
                      style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0, flex: 1 }}
                    >
                      {s.team.name}
                    </span>
                  )}
                </div>
              </td>
              <td className="text-center py-2.5 tabular-nums" style={{ fontSize: 11 }}>{s.mp}</td>
              <td className="text-center py-2.5 tabular-nums" style={{ fontSize: 11 }}>{s.w}</td>
              <td className="text-center py-2.5 tabular-nums" style={{ fontSize: 11 }}>{s.d}</td>
              <td className="text-center py-2.5 tabular-nums" style={{ fontSize: 11 }}>{s.l}</td>
              {!compact && (
                <td className="text-center py-2.5 tabular-nums" style={{ fontSize: 11 }}>
                  {s.gd >= 0 ? `+${s.gd}` : s.gd}
                </td>
              )}
              <td
                className={cn('text-center py-2.5 tabular-nums font-bold', isQualifier ? 'text-gold-400' : 'text-neutral-400')}
                style={{ fontSize: 12 }}
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
