import type { GroupStanding } from '@/types'

interface StandingsTableProps {
  standings: GroupStanding[]
  compact?: boolean
}

function RankBadge({ rank, isQualifier }: { rank: number; isQualifier: boolean }) {
  return (
    <span
      aria-label={`Rank ${rank}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 18,
        height: 18,
        borderRadius: '50%',
        fontSize: 9,
        fontWeight: 700,
        fontFamily: "'Oswald', sans-serif",
        letterSpacing: 0,
        flexShrink: 0,
        background: isQualifier
          ? 'linear-gradient(135deg, #FFD700 0%, #B8960C 100%)'
          : 'rgba(255,215,0,0.08)',
        color: isQualifier ? '#050400' : 'rgba(255,240,240,0.35)',
        boxShadow: isQualifier ? '0 0 6px rgba(255,215,0,0.4)' : 'none',
      }}
    >
      {rank}
    </span>
  )
}

export function StandingsTable({ standings, compact = false }: StandingsTableProps) {
  const tournamentStarted = standings.some(s => s.mp > 0)

  return (
    <div style={{ width: '100%' }}>
      {/* Header */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: compact ? '24px 1fr 28px 28px 28px 28px 32px' : '24px 1fr 32px 32px 32px 32px 36px 36px',
          gap: 0,
          paddingBottom: 8,
          marginBottom: 2,
          borderBottom: '1px solid rgba(255,215,0,0.18)',
        }}
      >
        <span style={{ fontSize: 9, color: 'var(--color-primary)', fontFamily: "'Inter', sans-serif", fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>#</span>
        <span style={{ fontSize: 9, color: 'var(--color-primary)', fontFamily: "'Inter', sans-serif", fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Team</span>
        <span style={{ fontSize: 9, color: 'var(--color-primary)', fontFamily: "'Inter', sans-serif", fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'center' }}>MP</span>
        <span style={{ fontSize: 9, color: 'var(--color-primary)', fontFamily: "'Inter', sans-serif", fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'center' }}>W</span>
        <span style={{ fontSize: 9, color: 'var(--color-primary)', fontFamily: "'Inter', sans-serif", fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'center' }}>D</span>
        <span style={{ fontSize: 9, color: 'var(--color-primary)', fontFamily: "'Inter', sans-serif", fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'center' }}>L</span>
        {!compact && <span style={{ fontSize: 9, color: 'var(--color-primary)', fontFamily: "'Inter', sans-serif", fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'center' }}>GD</span>}
        <span style={{ fontSize: 9, color: 'var(--color-primary)', fontFamily: "'Inter', sans-serif", fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'center' }}>Pts</span>
      </div>

      {/* Rows */}
      {standings.map((s, i) => {
        const isQualifier = tournamentStarted && i < 2
        const rank = i + 1

        return (
          <div
            key={s.team.code}
            style={{
              display: 'grid',
              gridTemplateColumns: compact ? '24px 1fr 28px 28px 28px 28px 32px' : '24px 1fr 32px 32px 32px 32px 36px 36px',
              alignItems: 'center',
              gap: 0,
              paddingTop: 7,
              paddingBottom: 7,
              borderBottom: i < standings.length - 1 ? '1px solid rgba(255,215,0,0.06)' : 'none',
              background: isQualifier ? 'rgba(255,215,0,0.055)' : 'transparent',
              borderLeft: isQualifier ? '3px solid #FFD700' : '3px solid transparent',
              paddingLeft: isQualifier ? 4 : 4,
              transition: 'background 150ms ease',
            }}
          >
            {/* Rank badge */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <RankBadge rank={rank} isQualifier={isQualifier} />
            </div>

            {/* Flag + name */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, overflow: 'hidden', minWidth: 0 }}>
              <span aria-hidden="true" style={{ fontSize: 13, lineHeight: 1, flexShrink: 0 }}>
                {s.team.flag}
              </span>
              <span
                title={s.team.name}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: compact ? 11 : 12,
                  fontWeight: isQualifier ? 700 : 500,
                  letterSpacing: '0.03em',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  color: isQualifier ? 'var(--color-text-primary)' : 'rgba(255,240,240,0.65)',
                }}
              >
                {compact ? s.team.code : s.team.name}
              </span>
            </div>

            {/* Stats */}
            {[s.mp, s.w, s.d, s.l].map((val, ci) => (
              <span
                key={ci}
                style={{
                  textAlign: 'center',
                  fontSize: 11,
                  fontFamily: "'Oswald', sans-serif",
                  fontWeight: 400,
                  color: isQualifier ? 'rgba(255,240,240,0.8)' : 'rgba(255,240,240,0.4)',
                  tabularNums: 'tabular-nums',
                }}
              >
                {val}
              </span>
            ))}

            {/* GD (non-compact) */}
            {!compact && (
              <span
                style={{
                  textAlign: 'center',
                  fontSize: 11,
                  fontFamily: "'Oswald', sans-serif",
                  color: isQualifier ? 'rgba(255,240,240,0.8)' : 'rgba(255,240,240,0.4)',
                }}
              >
                {s.gd >= 0 ? `+${s.gd}` : s.gd}
              </span>
            )}

            {/* Points */}
            <span
              style={{
                textAlign: 'center',
                fontSize: compact ? 12 : 13,
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 700,
                color: isQualifier ? 'var(--color-primary)' : 'rgba(255,240,240,0.35)',
                textShadow: isQualifier ? '0 0 8px rgba(255,215,0,0.4)' : 'none',
              }}
            >
              {s.pts}
            </span>
          </div>
        )
      })}
    </div>
  )
}
