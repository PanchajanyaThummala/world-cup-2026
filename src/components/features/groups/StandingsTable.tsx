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
        <tr className="border-b" style={{ fontSize: 10, color: 'var(--color-text-secondary)', borderColor: 'rgba(255,215,0,0.1)' }}>
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
              className={cn('border-b last:border-0')}
              style={{
                borderColor: 'rgba(255,215,0,0.08)',
                color: isQualifier ? 'var(--color-text-primary)' : 'rgba(255,240,240,0.6)',
                ...(isQualifier ? {
                  background: 'rgba(255,215,0,0.07)',
                  boxShadow: 'inset 2px 0 0 rgba(255,215,0,0.5)',
                } : {}),
              }}
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
                      className={cn(isQualifier ? 'font-bold' : 'font-semibold')}
                      style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '0.05em', whiteSpace: 'nowrap' }}
                    >
                      {s.team.code}
                    </span>
                  ) : (
                    /* Full: name truncated with ellipsis */
                    <span
                      title={s.team.name}
                      className={cn(isQualifier ? 'font-semibold' : 'font-medium')}
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
                className={cn('text-center py-2.5 tabular-nums font-bold')}
                style={{ color: isQualifier ? 'var(--color-primary)' : 'var(--color-text-secondary)' }}
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
