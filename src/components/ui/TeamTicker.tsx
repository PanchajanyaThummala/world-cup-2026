import { motion } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'

const TICKER_ITEMS = [
  'Mexico', 'South Africa', 'South Korea', 'Czechia',
  'Canada', 'Bosnia-Herzegovina', 'Qatar', 'Switzerland',
  'Brazil', 'Morocco', 'Haiti', 'Scotland',
  'USA', 'Paraguay', 'Australia', 'Türkiye',
  'Germany', 'Ecuador', 'Ivory Coast', 'Curaçao',
  'Netherlands', 'Japan', 'Sweden', 'Tunisia',
  'Belgium', 'Iran', 'Egypt', 'New Zealand',
  'Spain', 'Uruguay', 'Saudi Arabia', 'Cape Verde',
  'France', 'Senegal', 'Norway', 'Iraq',
  'Argentina', 'Algeria', 'Austria', 'Jordan',
  'Portugal', 'Colombia', 'Uzbekistan', 'DR Congo',
  'England', 'Croatia', 'Panama', 'Ghana',
]

const SEPARATOR = '·'

export function TeamTicker() {
  const shouldReduce = useReducedMotion()
  const text = TICKER_ITEMS.map(t => `${t}  ${SEPARATOR}  `).join('')

  if (shouldReduce) return null

  return (
    <div
      style={{
        width: '100%',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,215,0,0.12)',
        borderBottom: '1px solid rgba(255,215,0,0.12)',
        background: 'rgba(255,215,0,0.03)',
        padding: '10px 0',
        position: 'relative',
      }}
    >
      {/* Fade edges */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to right, var(--color-bg-base), transparent)', zIndex: 2, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to left, var(--color-bg-base), transparent)', zIndex: 2, pointerEvents: 'none' }} />

      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', whiteSpace: 'nowrap', width: 'max-content' }}
      >
        {/* Duplicate for seamless loop */}
        {[text, text].map((t, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(255,215,0,0.45)',
            }}
          >
            {t}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
