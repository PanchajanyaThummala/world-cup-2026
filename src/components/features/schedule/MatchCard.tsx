import { motion } from 'framer-motion'
import type { Match } from '@/types'
import { TEAMS } from '@/data/teams'
import { VENUES } from '@/data/venues'
import { EASE_OUT_EXPO } from '@/lib/motion'

interface MatchCardProps {
  match: Match
  index: number
}

function getTeam(code: string) {
  return TEAMS.find(t => t.code === code)
}

function getVenue(id: string) {
  return VENUES.find(v => v.id === id)
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T12:00:00')
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

export function MatchCard({ match, index }: MatchCardProps) {
  const home = getTeam(match.homeTeam)
  const away = getTeam(match.awayTeam)
  const venue = getVenue(match.venue)
  const isTBD = match.homeTeam === 'TBD' || match.awayTeam === 'TBD'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-20px' }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.05, ease: EASE_OUT_EXPO }}
      style={{
        background: 'var(--color-bg-elevated)',
        border: '1px solid var(--color-border)',
        borderRadius: 10,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Gold top bar */}
      <div style={{ height: 2, background: 'linear-gradient(90deg, rgba(255,215,0,0.5), transparent)' }} />

      <div style={{ padding: '14px 16px' }}>
        {/* Header row: date + time + group badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: 'rgba(255,215,0,0.7)',
              textTransform: 'uppercase',
            }}>
              {formatDate(match.date)}
            </span>
            <span style={{ color: 'rgba(255,240,240,0.2)', fontSize: 10 }}>·</span>
            <span style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: 11,
              color: 'rgba(255,240,240,0.45)',
              letterSpacing: '0.04em',
            }}>
              {match.time}
            </span>
          </div>
          {match.group && (
            <span style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 11,
              letterSpacing: '0.1em',
              color: 'rgba(255,215,0,0.5)',
              background: 'rgba(255,215,0,0.06)',
              border: '1px solid rgba(255,215,0,0.15)',
              borderRadius: 4,
              padding: '2px 7px',
            }}>
              GROUP {match.group}
            </span>
          )}
        </div>

        {/* Teams row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Home team */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
            {home ? (
              <>
                <span style={{ fontSize: 22, lineHeight: 1, flexShrink: 0 }}>{home.flag}</span>
                <div style={{ minWidth: 0 }}>
                  <div style={{
                    fontFamily: "'Oswald', sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    color: 'var(--color-text-primary)',
                    textTransform: 'uppercase',
                  }}>
                    {home.code}
                  </div>
                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 10,
                    color: 'rgba(255,240,240,0.4)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    {home.name}
                  </div>
                </div>
              </>
            ) : (
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 13, color: 'rgba(255,240,240,0.3)' }}>TBD</div>
            )}
          </div>

          {/* VS / score */}
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: isTBD ? 13 : 18,
            letterSpacing: '0.1em',
            color: isTBD ? 'rgba(255,240,240,0.2)' : 'rgba(255,215,0,0.6)',
            textAlign: 'center',
            flexShrink: 0,
            minWidth: 36,
          }}>
            {match.homeScore != null && match.awayScore != null
              ? `${match.homeScore}–${match.awayScore}`
              : 'VS'
            }
          </div>

          {/* Away team */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end', minWidth: 0 }}>
            {away ? (
              <>
                <div style={{ minWidth: 0, textAlign: 'right' }}>
                  <div style={{
                    fontFamily: "'Oswald', sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    color: 'var(--color-text-primary)',
                    textTransform: 'uppercase',
                  }}>
                    {away.code}
                  </div>
                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 10,
                    color: 'rgba(255,240,240,0.4)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    {away.name}
                  </div>
                </div>
                <span style={{ fontSize: 22, lineHeight: 1, flexShrink: 0 }}>{away.flag}</span>
              </>
            ) : (
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 13, color: 'rgba(255,240,240,0.3)' }}>TBD</div>
            )}
          </div>
        </div>

        {/* Venue */}
        {venue && (
          <div style={{
            marginTop: 10,
            paddingTop: 8,
            borderTop: '1px solid rgba(255,240,240,0.06)',
            fontFamily: "'Inter', sans-serif",
            fontSize: 10,
            color: 'rgba(255,240,240,0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}>
            <svg width="9" height="10" viewBox="0 0 9 10" fill="none" style={{ flexShrink: 0 }}>
              <path d="M4.5 0C2.57 0 1 1.57 1 3.5c0 2.625 3.5 6.5 3.5 6.5S8 6.125 8 3.5C8 1.57 6.43 0 4.5 0zm0 4.75a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill="rgba(255,215,0,0.4)" />
            </svg>
            <span>{venue.name}, {venue.city}</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}
