import { motion } from 'framer-motion'
import type { Group } from '@/types'
import { Card } from '@/components/ui/Card'
import { EASE_OUT_EXPO } from '@/lib/motion'

interface GroupCardProps {
  group: Group
}

const slideInVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT_EXPO },
  },
}

export function GroupCard({ group }: GroupCardProps) {
  const tournamentStarted = group.standings.some(s => s.mp > 0)

  return (
    <motion.div
      variants={slideInVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className="h-full min-w-0"
    >
      <Card hover className="h-full flex flex-col" style={{ padding: '20px 20px 16px' }}>

        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: 12,
            marginBottom: 12,
            borderBottom: '1px solid rgba(255,215,0,0.18)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 32,
                lineHeight: 1,
                color: 'var(--color-primary)',
                letterSpacing: '0.02em',
              }}
            >
              {group.label}
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--color-text-secondary)',
              }}
            >
              Group
            </span>
          </div>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(255,215,0,0.35)',
            }}
          >
            {group.standings.length} Teams
          </span>
        </div>

        {/* Team list — full name + code */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, flex: 1 }}>
          {/* Column headers */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '18px 1fr 28px 28px 30px',
              gap: 0,
              paddingBottom: 6,
              marginBottom: 2,
              borderBottom: '1px solid rgba(255,215,0,0.12)',
            }}
          >
            {['#', 'Team', 'MP', 'W', 'Pts'].map((h) => (
              <span
                key={h}
                style={{
                  fontSize: 8,
                  fontWeight: 700,
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--color-primary)',
                  textAlign: h === '#' || h === 'Team' ? 'left' : 'center',
                }}
              >
                {h}
              </span>
            ))}
          </div>

          {/* Team rows */}
          {group.standings.map((s, i) => {
            const isQ = tournamentStarted && i < 2
            return (
              <div
                key={s.team.code}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '18px 1fr 28px 28px 30px',
                  alignItems: 'center',
                  gap: 0,
                  paddingTop: 7,
                  paddingBottom: 7,
                  borderBottom: i < group.standings.length - 1
                    ? '1px solid rgba(255,215,0,0.05)'
                    : 'none',
                  background: isQ ? 'rgba(255,215,0,0.045)' : 'transparent',
                  borderLeft: isQ ? '2px solid #FFD700' : '2px solid transparent',
                  paddingLeft: 2,
                }}
              >
                {/* Rank badge */}
                <span
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 8,
                    fontWeight: 700,
                    fontFamily: "'Oswald', sans-serif",
                    background: isQ
                      ? 'linear-gradient(135deg,#FFD700,#B8960C)'
                      : 'rgba(255,215,0,0.07)',
                    color: isQ ? '#050400' : 'rgba(255,240,240,0.3)',
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </span>

                {/* Flag + full name + code */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, overflow: 'hidden', minWidth: 0 }}>
                  <span aria-hidden="true" style={{ fontSize: 12, lineHeight: 1, flexShrink: 0 }}>
                    {s.team.flag}
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                    <span
                      title={s.team.name}
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 11,
                        fontWeight: isQ ? 700 : 500,
                        color: isQ ? 'var(--color-text-primary)' : 'rgba(255,240,240,0.75)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        lineHeight: 1.2,
                      }}
                    >
                      {s.team.name}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Oswald', sans-serif",
                        fontSize: 9,
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        color: isQ ? 'rgba(255,215,0,0.7)' : 'rgba(255,240,240,0.3)',
                        lineHeight: 1.1,
                      }}
                    >
                      {s.team.code}
                    </span>
                  </div>
                </div>

                {/* MP */}
                <span style={{
                  textAlign: 'center', fontSize: 11,
                  fontFamily: "'Oswald', sans-serif",
                  color: isQ ? 'rgba(255,240,240,0.85)' : 'rgba(255,240,240,0.35)',
                }}>
                  {s.mp}
                </span>

                {/* W */}
                <span style={{
                  textAlign: 'center', fontSize: 11,
                  fontFamily: "'Oswald', sans-serif",
                  color: isQ ? 'rgba(255,240,240,0.85)' : 'rgba(255,240,240,0.35)',
                }}>
                  {s.w}
                </span>

                {/* Pts */}
                <span style={{
                  textAlign: 'center',
                  fontSize: 12,
                  fontFamily: "'Oswald', sans-serif",
                  fontWeight: 700,
                  color: isQ ? 'var(--color-primary)' : 'rgba(255,240,240,0.3)',
                  textShadow: isQ ? '0 0 8px rgba(255,215,0,0.5)' : 'none',
                }}>
                  {s.pts}
                </span>
              </div>
            )
          })}
        </div>
      </Card>
    </motion.div>
  )
}
