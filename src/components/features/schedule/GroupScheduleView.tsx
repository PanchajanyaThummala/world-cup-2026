import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MATCHES } from '@/data/schedule'
import { MatchCard } from './MatchCard'

const GROUPS = ['All', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'] as const
const MATCHDAYS = ['All', 'MD1', 'MD2', 'MD3'] as const
type GroupFilter = typeof GROUPS[number]
type MatchdayFilter = typeof MATCHDAYS[number]

const GROUP_STAGE = MATCHES.filter(m => m.stage === 'Group Stage')

// Determine matchday from match date ranges
function getMatchday(date: string): 'MD1' | 'MD2' | 'MD3' {
  const d = new Date(date)
  const md1End = new Date('2026-06-19')
  const md2End = new Date('2026-06-27')
  if (d < md1End) return 'MD1'
  if (d < md2End) return 'MD2'
  return 'MD3'
}

const tabStyle = (active: boolean): React.CSSProperties => ({
  padding: '5px 14px',
  borderRadius: 5,
  border: `1px solid ${active ? 'rgba(255,215,0,0.65)' : 'rgba(255,215,0,0.15)'}`,
  background: active ? 'rgba(255,215,0,0.09)' : 'transparent',
  color: active ? 'rgba(255,215,0,0.95)' : 'rgba(255,240,240,0.4)',
  fontFamily: "'Inter', sans-serif",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase' as const,
  cursor: 'pointer',
  transition: 'all 0.18s',
})

export function GroupScheduleView() {
  const [groupFilter, setGroupFilter] = useState<GroupFilter>('All')
  const [matchdayFilter, setMatchdayFilter] = useState<MatchdayFilter>('All')

  const filtered = useMemo(() => {
    return GROUP_STAGE.filter(m => {
      const groupOk = groupFilter === 'All' || m.group === groupFilter
      const mdOk = matchdayFilter === 'All' || getMatchday(m.date) === matchdayFilter
      return groupOk && mdOk
    })
  }, [groupFilter, matchdayFilter])

  // Group by date for section headers
  const byDate = useMemo(() => {
    const map = new Map<string, typeof filtered>()
    for (const m of filtered) {
      const list = map.get(m.date) ?? []
      list.push(m)
      map.set(m.date, list)
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b))
  }, [filtered])

  return (
    <div>
      {/* Filters */}
      <div style={{ marginBottom: 28 }}>
        {/* Group filter */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
          {GROUPS.map(g => (
            <motion.button
              key={g}
              onClick={() => setGroupFilter(g)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              style={tabStyle(groupFilter === g)}
            >
              {g === 'All' ? 'All Groups' : `Group ${g}`}
            </motion.button>
          ))}
        </div>

        {/* Matchday filter */}
        <div style={{ display: 'flex', gap: 6 }}>
          {MATCHDAYS.map(md => (
            <motion.button
              key={md}
              onClick={() => setMatchdayFilter(md)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              style={tabStyle(matchdayFilter === md)}
            >
              {md === 'All' ? 'All Matchdays' : `Matchday ${md.slice(2)}`}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Match count */}
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 12,
        color: 'rgba(255,240,240,0.3)',
        marginBottom: 24,
        letterSpacing: '0.04em',
      }}>
        {filtered.length} match{filtered.length !== 1 ? 'es' : ''}
      </p>

      {/* Matches grouped by date */}
      <AnimatePresence mode="popLayout">
        {byDate.map(([date, matches]) => (
          <motion.div
            key={date + groupFilter + matchdayFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ marginBottom: 32 }}
          >
            {/* Date header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 14,
            }}>
              <span style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 14,
                letterSpacing: '0.12em',
                color: 'rgba(255,215,0,0.65)',
              }}>
                {new Date(date + 'T12:00:00').toLocaleDateString('en-US', {
                  weekday: 'long', month: 'long', day: 'numeric',
                }).toUpperCase()}
              </span>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,215,0,0.08)' }} />
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {matches.map((m, i) => (
                <MatchCard key={m.id} match={m} index={i} />
              ))}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {filtered.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '48px 0',
          color: 'rgba(255,240,240,0.3)',
          fontFamily: "'Inter', sans-serif",
          fontSize: 14,
        }}>
          No matches found for this filter.
        </div>
      )}
    </div>
  )
}
