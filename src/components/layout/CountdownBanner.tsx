import { motion } from 'framer-motion'
import { useCountdown, type CountdownState } from '@/hooks/useCountdown'

const TARGET = '2026-06-11T20:00:00-04:00'

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function Segment({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span
        className="tabular-nums"
        style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: 15, lineHeight: 1, color: 'var(--color-primary)' }}
      >
        {pad(value)}
      </span>
      <span className="uppercase" style={{ fontSize: 9, letterSpacing: '0.14em', color: 'var(--color-text-secondary)' }}>
        {label}
      </span>
    </div>
  )
}

export function CountdownBanner() {
  const state: CountdownState = useCountdown(TARGET)

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      role="banner"
      className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-center"
      style={{
        height: 'var(--banner-h)',
        background: 'rgba(10,8,0,0.97)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div
        className="w-full max-w-7xl mx-auto flex items-center gap-3 md:gap-6 text-center flex-wrap justify-center"
        style={{ paddingLeft: 'var(--gutter-x)', paddingRight: 'var(--gutter-x)' }}
      >
        {state.phase === 'countdown' ? (
          <>
            <span
              className="uppercase font-bold whitespace-nowrap"
              style={{ fontSize: 10, letterSpacing: '0.2em', fontFamily: "'Inter', sans-serif", color: 'var(--color-primary)' }}
            >
              KICKOFF IN
            </span>
            <div className="flex items-center gap-3 md:gap-4">
              <Segment value={state.days} label="Days" />
              <span style={{ color: 'var(--color-border)' }} aria-hidden="true">·</span>
              <Segment value={state.hours} label="Hours" />
              <span style={{ color: 'var(--color-border)' }} aria-hidden="true">·</span>
              <Segment value={state.minutes} label="Minutes" />
              <span style={{ color: 'var(--color-border)' }} aria-hidden="true">·</span>
              <Segment value={state.seconds} label="Seconds" />
            </div>
            <span
              className="hidden md:inline whitespace-nowrap"
              style={{ fontSize: 11, fontFamily: "'Inter', sans-serif", color: 'var(--color-text-secondary)' }}
            >
              Opening match · Mexico City
            </span>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <span
              className="w-1.5 h-1.5 rounded-full bg-green-400"
              style={{ boxShadow: '0 0 8px rgba(34,197,94,0.8)' }}
              aria-hidden="true"
            />
            <span
              className="font-bold uppercase"
              style={{ fontSize: 11, letterSpacing: '0.18em', fontFamily: "'Inter', sans-serif", color: 'var(--color-text-primary)' }}
            >
              Tournament Live
            </span>
            <span style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>
              Matchday {state.matchday}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  )
}
